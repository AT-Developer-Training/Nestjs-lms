import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './createPost.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {

    @ApiProperty({ description: 'The ID of the post to update' })

    @IsInt()
    @IsNotEmpty()
    id: number;
}