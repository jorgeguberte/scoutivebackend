import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards';
import { PrismaModule } from './prisma/prisma.module';
import { PlayersModule } from './players/players.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, PrismaModule, PlayersModule],
  providers:[
    {
      provide: APP_GUARD,
      useClass: AtGuard
    },
    PrismaService
  ]
})
export class AppModule {}
