import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/createPost.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdatePostDto } from './dtos/updatePost.dto';

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

    @Get('/findAll')
    public findAllPosts() {
        return this.postsService.findAllPosts();
    }

    @Patch('/update')
    public updatePost(@Body() updatePostDto: UpdatePostDto) {

        console.log('UpdatePostDto received in controller:', updatePostDto);
        return this.postsService.updatePost(updatePostDto);
    }

    @Delete('/delete/:id')
    public deletePost(@Param('id') id: number) {
        return this.postsService.deletePost(id);
    }
}
