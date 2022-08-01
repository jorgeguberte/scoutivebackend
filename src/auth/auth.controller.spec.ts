import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

describe('AuthController', () => {
  let controller: AuthController;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let authDto: AuthDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, JwtService, AuthDto],
    }).compile();

    jwtService = module.get<JwtService>(JwtService);
    prisma = module.get<PrismaService>(PrismaService);
    controller = module.get<AuthController>(AuthController);
    authDto = module.get<AuthDto>(AuthDto);
    authDto.email = 'jorgegberte@gmail.com';
    authDto.password = '123456';
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signupLocal', () => {
    it('should return a status of CREATED only if unique', async () => {
      const response = await controller.signupLocal(authDto);
    });

  
  });
});
