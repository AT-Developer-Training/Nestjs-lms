import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/createPost.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
    // injecting post service
    constructor(private readonly postsService: PostsService) { }

    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({
        status: 201,
        description: 'The post has been successfully created.',
    })
    @Post('/create')
    public createPost(@Body() createPostDto: CreatePostDto) {
        return this.postsService.createPost(createPostDto);
    }
}
