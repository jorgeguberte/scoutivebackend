import { IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

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

  @IsString()
  nationality: string;

  @Type(()=>Number)
  @IsNumber()
  @IsOptional()
  height: number;

  @Type(()=>Number)
  @IsOptional()
  weight: number;

  @IsString()
  @IsOptional()
  current_club: string;

  @IsString()
  @IsOptional()
  contract: string;
  
  @Type(()=>Number)
  @IsOptional()
  rating: number;

  
  @IsString()
  @IsOptional()
  img_src: string;


  
  ownerId: string;
}

