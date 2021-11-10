import { ApiProperty } from '@nestjs/swagger';

export class ValidationUserResponse {
  @ApiProperty()
  watchlist: string[];
}
