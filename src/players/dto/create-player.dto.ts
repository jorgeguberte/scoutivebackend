import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreatePlayerDto {
  /*
  * Name
  */
  @ApiProperty({
    type: String,
    description: 'The Player\'s full name is required',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  /*
  * Position
  */
  @ApiProperty({
    type: String,
    description: "Player's preferred position on the pitch. Required.",
  })
  @IsNotEmpty()
  @IsString()
  position: string;

  /*
  * Foot
  */
  @ApiProperty({
    type: String,
    description: 'Player\'s ability with their feet. R, L or B (right, left or both). Required.',
  })
  @IsNotEmpty()
  @IsString()
  foot: string;

  /*
  * Nickname
  */
  @ApiPropertyOptional({
    type: String,
    description: 'Player\'s nickname',
  })
  @IsString()
  nickname?: string;


  /*
  * Date of birth
  */
 @ApiPropertyOptional({
    type: String,
    description: 'Player\'s date of birth',
  })
  @IsString()
  dob: string;

  /*
  * Nationality
  */
 @ApiPropertyOptional({
  type: String,
  description: 'Player\'s nationality'
 })
  @IsString()
  nationality: string;
 
  /*
  * Height
  */
 @ApiPropertyOptional({
  type: Number,
  description: "Player's height"
 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  height: number;

  /*
  * Weight
  */
  @ApiPropertyOptional({
    type: Number,
    description: "Player's weight"
  })
  @Type(() => Number)
  @IsOptional()
  weight: number;

  /*
  * Current Club
  */
 @ApiPropertyOptional({
  type: String,
  description: 'Player\'s current club'
  })
  @IsString()
  @IsOptional()
  current_club: string;

  /*
  * Current Contract
  */  
  @ApiPropertyOptional({
    type: String,
    description: 'Player\'s current contract'
  })
  @IsString()
  @IsOptional()
  contract: string;


  /*
  * Current Contract
  */  
  @ApiPropertyOptional({
    type: Number,
    description: 'Player\'s overall rating'
  })
  @Type(() => Number)
  @IsOptional()
  rating: number;

  /*
  * Img src
  */  
  @ApiPropertyOptional({
    type: String,
    description: 'Player\'s photo url'
  })
  @IsString()
  @IsOptional()
  img_src: string;

  @ApiPropertyOptional({
    type: String,
    description: "The id of the User who created the Player. roadmap: make it readonly"
  })
  ownerId: string;
}
