import { Controller, Get, Post, Patch, Put, Delete, Param, Query, Body, ParseIntPipe, DefaultValuePipe, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {

    // injecting the UsersService inside constructor
    constructor(private readonly usersService: UsersService) { }

    @Get('/{:id}')
    public getUsers(
        @Param() GetUsersParamDto: GetUsersParamDto,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number) {
        return this.usersService.findAll(GetUsersParamDto, page, limit);
    }

    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully created.',
    })
    @Post()
    public createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Patch()
    public patchUser(@Body() patchUserDto: PatchUserDto) {
        return patchUserDto;
    }

    @Delete(':id')
    public deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }
}
