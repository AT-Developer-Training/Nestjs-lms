import { Controller, Get, Post, Patch, Put, Delete, Param, Query, Body, ParseIntPipe, DefaultValuePipe, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {

    @Get('/:id')
    public getUsers(
        @Param('id', ParseIntPipe) id: number | undefined,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number) {
        console.log(typeof id);
        return "Get all users";
    }
    
    @Post()
    public createUser(
        @Body() createUserDto: CreateUserDto) 
    {
        console.log(createUserDto);
    }
}
