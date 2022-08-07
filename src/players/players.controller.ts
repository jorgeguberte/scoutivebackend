import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { ApiTags, ApiResponse, ApiOkResponse } from '@nestjs/swagger';


@ApiTags('Player')
@Controller('player')
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  /*CREATE*/
  @ApiResponse({status:201, description: 'Player created'}) //swagger
    @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createPlayerDto: CreatePlayerDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.playersService.create(createPlayerDto, userId);
  }

  
  @Post('all')

  @ApiResponse({status: 200, description: 'Retrieving all players'})
  @HttpCode(HttpStatus.OK)
  findAll(@GetCurrentUserId() userId: string) {
    return this.playersService.findAll(userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  @ApiOkResponse({description: 'Player deleted'})
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.playersService.remove(id);
  }
}
