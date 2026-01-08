import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/createPost.dto';
import { Posts } from '../posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    // injecting Posts entity
    constructor(
        @InjectRepository(Posts)
        private postsRepository: Repository<Posts>,
    ) { }

    public async createPost(createPostDto: CreatePostDto) {
        const post = this.postsRepository.create(createPostDto);
        return await this.postsRepository.save(post);
    }
}