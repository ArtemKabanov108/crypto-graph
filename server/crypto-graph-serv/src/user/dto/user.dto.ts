import {IsEmail, IsMongoId, IsNotEmpty, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/types';

export class CreateUserDto {
  @ApiProperty()
  @IsMongoId()
  _id: any;

  @ApiProperty()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  watchlist: string[];

  @ApiProperty()
  @IsNotEmpty()
  role: UserRole

  // checking schema....
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty()
  // @Prop({ type: Date, required: true })
}
