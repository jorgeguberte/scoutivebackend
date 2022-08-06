import {
  BadRequestException,
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import * as argon from 'argon2';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

/*
#FIXME: When sending a refresh request against a logged-out user, an exception is raised because there's no rtHash associated with the user in the database.
So we need to check if the user has a rtHash stored (thus being logged in) BEFORE running it through argon, and prevent the error from happening.
*/

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    try {
      const hash = await argon.hash(dto.password);
      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      //#TODO: Find out how to raise error here to be treated in the catch block

      const tokens = await this.getTokens(newUser.id, newUser.email);
      await this.updateRtHash(newUser.id, tokens.refresh_token);
      return tokens;
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    //No user found
    if (!user) throw new ForbiddenException('Access Denied');
    
    //User found, check for authToken
    if(user.hashedRt != null){
      throw new BadRequestException('User already logged in');
    }else{
      /*
      * User was not already logged in
      */
    }

    

    const passwordMatches = await argon.verify(user.hash, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access....DENIED!');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: string) {
    const logoutBuffer = await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    if (!logoutBuffer) throw new InternalServerErrorException();
    else return true;
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashedRt) throw new ForbiddenException('access denied');

    //const rtMatches = bcrypt.compare(rt, user.hashedRt);
    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('access denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(userId: string, rt: string) {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }
}
