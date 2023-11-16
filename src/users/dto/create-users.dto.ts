import { IsDate, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { gender, statusUser } from "../entities/users-entity";

export class CreateUsersDto{
    @IsNotEmpty()
    level_id: string;

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