import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({
    description: 'Full name of the player',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

 
  @ApiProperty({ description: "Player's nickname. e.g: Ronaldinho" })
  @IsString()
  nickname?: string;

  
  
  @ApiProperty({
    description:
      'The position adopted by the player. e.g: GK (Goalkeeper), RB (Right Back), ST (Striker). A full list of available positions will be in the roadmap.',
  })
  @IsNotEmpty()
  @IsString()
  position: string;

  
  @ApiProperty({
    description:
      "Player's strongest foot; R, L, B (if player is strong with both feet)",
  })
  @IsNotEmpty()
  @IsString()
  foot: string;

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
      currentClub,
      endOfContract,
      generalRating,
      physicalRating,
      technicalRating,
      tacticalRating,
      photoSrc,
}
*/
