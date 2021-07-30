import { IsJWT, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class jwtRefreshTokenDto {
  @ApiProperty()
  @IsString()
  user: Object;

  @ApiProperty()
  @IsJWT()
  email: string;

  @ApiProperty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsJWT()
  jwtRefreshToken: string;
}
