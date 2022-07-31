import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) {}

  async create(
    createPlayerDto: CreatePlayerDto,
    @GetCurrentUserId() userId: string,
  ) {
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
    if (!response) throw new NotFoundException();
    return response;
  }

  async findOne(id: string) {
    const response = await this.prisma.player.findUnique({
      where: {
        id: id,
      },
    });
    if (!response) throw new NotFoundException();

    return response;
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto) {
    const updatePlayer = await this.prisma.player.update({
      where:{
        id: id
      },
      data: updatePlayerDto
    })
    .catch((err)=>{
      console.log(err);
      throw new NotFoundException();
    });
    return updatePlayer;


  }

  async remove(id: string) {
    const deletePlayer = await this.prisma.player
      .delete({
        where: {
          id: id,
        },
      })
      .catch((err) => {
        throw new NotFoundException();
      });
  }
}
