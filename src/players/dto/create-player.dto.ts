import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "Player's nickname. e.g: Ronaldinho" })
  @IsString()
  nickname?: string;

  @IsString()
  dob: string;

  @IsString()
  nationality: string;



  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsString()
  foot: string;

  @IsString()
  height: string;

  @IsString()
  weight: string;
  
  /* TODO: Implement Club entity then relation it here
  @IsString()
  current_club: string;
  */

@IsString()
contract: string;

@IsString()
rating: string;

@IsString()
img_src: string;
  
  ownerId: string;
}

/*
model Player {
  //metadata
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  owner     User     @relation(fields: [ownerId], references: [id])
  ownerId   String @db.ObjectId
  //fields
  name      String
  position  String
  foot      String


      playerId,
      name,
      nickname,
      dob,
      nationality,
      position,
      foot,
      height,
      weight,
      current_club,
      contract{},
      rating{general,physical, technical, tactical},
      img_src
}
*/
