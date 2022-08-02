import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {

  @IsNotEmpty()
  @IsString()
  name: string;


  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsString()
  foot: string;

  @IsString()
  nickname?: string;

  @IsString()
  dob: string;


  
  ownerId: string;
}

