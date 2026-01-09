// Here this dto and class validator is the same  as Form Class Validation we have used in Laravel , This bAscially validates the payload coming from the request body, and it throughs error and stops execution if any validation fails

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, min, MinLength } from "class-validator";
export class CreateUserDto {

    @ApiProperty({
        example: 'John',
    })
    @IsString()       //this decorator checks whether the value is a string
    @IsNotEmpty()     //this decorator checks whether the value is not empty
    @MinLength(3)   //this decorator checks whether the value has minimum length of 3
    @MaxLength(20)  //this decorator checks whether the value has maximum length of 20
    firstName: string;

    @ApiProperty({
        example: 'Amali',
    })
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(20)
    lastName?: string;

    @ApiProperty({
        example: 'John@gmail.com',
    })
    @IsEmail()      //this decorator checks whether the value is a valid email format
    @IsNotEmpty()
    @MaxLength(96)
    email: string;

    @ApiProperty({
        example: '12121211',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(96)
    password: string;
}