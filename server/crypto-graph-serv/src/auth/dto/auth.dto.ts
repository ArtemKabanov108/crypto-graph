import { IsEmail, IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/types';
import { Types } from 'mongoose';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class CreateUserDto {
  @ApiProperty()
  @IsMongoId()
  _id: Types.ObjectId;

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
  role: UserRole;

  // checking schema....
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty()
  // @Prop({ type: Date, required: true })
}