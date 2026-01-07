import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/createPost.dto';

@Injectable()
export class PostsService {
    public createPost(createPostDto: CreatePostDto){
        return "Post created successfully!";
    }
}