import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional } from "class-validator";
import { gender } from "../entities/users-entity";

export class UpdateUsersDto{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

  
    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    dateOfBirth: Date;

    @IsEnum(gender)
    gender: gender;

    @IsNotEmpty()
    @IsMobilePhone()
    phoneNumber: string;

    @IsOptional()
    photo: string;

    @IsNotEmpty()
    address: string;
}