import {Injectable, InternalServerErrorException } from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) {}

  async create(createPlayerDto: CreatePlayerDto, @GetCurrentUserId() userId:string) {
    try {
      const newPlayer = await this.prisma.player.create({
        data: {
          name: createPlayerDto.name,
          position: createPlayerDto.position,
          foot: createPlayerDto.foot,
          ownerId: userId,
        },
      });

      return newPlayer;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(userId: string): Promise<Player> {
    console.log(`gonna find all players belonging to ${userId}`);
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
