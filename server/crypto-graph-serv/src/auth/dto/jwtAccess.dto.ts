import {ApiProperty} from "@nestjs/swagger";
import {IsJWT} from "class-validator";

export class JwtAccessDto {
  @ApiProperty()
  @IsJWT()
  jwt: string;
}