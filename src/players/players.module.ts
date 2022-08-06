import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PlayersController],
  providers: [PlayersService],
  imports:[PrismaModule]
})
export class PlayersModule {}
