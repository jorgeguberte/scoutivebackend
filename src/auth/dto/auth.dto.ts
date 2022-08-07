import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto{
    @ApiProperty({
        type: String,
        description: 'User email',
      })
    @IsNotEmpty()
    @IsString()
    email: string;


    @ApiProperty({
        type: String,
        description: 'User password',
      })
    @IsNotEmpty()
    @IsString()
    password: string;
}