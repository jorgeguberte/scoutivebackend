export class CreatePlayerDto {
    name: string;
    position: string;
    foot: string;
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
}
*/