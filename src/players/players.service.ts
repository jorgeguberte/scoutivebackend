import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService){}

  create(createPlayerDto: CreatePlayerDto) {
    return 'This action adds a new player';
  }

  async findAll(userId:string):Promise<Player> {
    console.log(`gonna find all players belonging to ${userId}`)
    const response = await this.prisma.player.findMany();
    console.log(response);
    return response;
    
  }

  findOne(id: number) {
    return `This action returnsss a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
