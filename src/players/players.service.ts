import {Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    const response = await this.prisma.player.findMany();
    if(!response) throw new NotFoundException();
    return response;
  }

  async findOne(id: string) {
    const response = await this.prisma.player.findUnique({
      where:{
        id: id,
      }
    });
    if(!response) throw new NotFoundException();

    return response;
    
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
