import {IsBoolean, IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested} from 'class-validator';
import {APP_ROLES_ALL} from "../../common/constants";
import {UserRole} from "../../common/types";
import {Type} from "class-transformer";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {Prop} from "@nestjs/mongoose";

export class CreateUserDto {

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    createAt: string;

}

