import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/createPost.dto';

@Controller('posts')
export class PostsController{
    // injecting post service
    constructor(private readonly postsService: PostsService){}

    @Post('/create')
    public createPost(@Body() createPostDto: CreatePostDto){

        console.log(createPostDto);
        return this.postsService.createPost(createPostDto);
    }
}