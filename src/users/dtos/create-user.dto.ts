// Here this dto and class validator is the same  as Form Class Validation we have used in Laravel , This bAscially validates the payload coming from the request body, and it throughs error and stops execution if any validation fails

import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, min, MinLength } from "class-validator";
export class CreateUserDto {
    @IsString()       //this decorator checks whether the value is a string
    @IsNotEmpty()     //this decorator checks whether the value is not empty
    @MinLength(3)   //this decorator checks whether the value has minimum length of 3
    @MaxLength(20)  //this decorator checks whether the value has maximum length of 20
    firstName: string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(20)
    lastName?: string;

    @IsEmail()      //this decorator checks whether the value is a valid email format
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}