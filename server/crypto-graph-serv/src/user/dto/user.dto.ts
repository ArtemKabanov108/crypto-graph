import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class favoritesDto {
  @ApiProperty()
  @IsNotEmpty()
  cryptoName: string;
}
