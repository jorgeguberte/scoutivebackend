import { Body, Controller, HttpCode, HttpStatus, InternalServerErrorException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { Request } from 'express';
import { AtGuard, RtGuard } from '../common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({status: 200, description: 'User created scuccessfully'})
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  @ApiResponse({status: 200, description: 'Tokens created'})
  @ApiBadRequestResponse({description: 'Already signed in'})
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  //@UseGuards(AtGuard)
  @Post('logout')
  @ApiResponse({status: HttpStatus.OK, description: 'Logged out'})
  @ApiUnauthorizedResponse({description: 'Unauthorized'})
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId:string) {
    //return this.authService.logout(userId);
    if (this.authService.logout(userId)) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Logged out'
      };
    }else{
      throw new InternalServerErrorException();
    }
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')  
  @ApiAcceptedResponse({description: 'Tokens refreshed'})
  @ApiForbiddenResponse({description: 'Could not refresh tokens'})

  @HttpCode(HttpStatus.OK)
  refreshTokens(@GetCurrentUserId() userId:string,  @GetCurrentUser('refreshToken') refreshToken:string) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
