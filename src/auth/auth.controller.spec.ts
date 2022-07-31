import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


describe('AuthController', () => {
  let controller: AuthController;
  let prisma:PrismaService;
  let jwtService:JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    jwtService = module.get<JwtService>(JwtService);
    prisma = module.get<PrismaService>(PrismaService);
    controller = module.get<AuthController>(AuthController);
    
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
