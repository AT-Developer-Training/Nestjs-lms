import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dtos/createPost.dto';
import { Posts } from '../posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
    // injecting Posts entity
    constructor(
        private readonly userService: UsersService,

        @InjectRepository(Posts)
        private postsRepository: Repository<Posts>
    ) { }

    public async createPost(createPostDto: CreatePostDto) {

        const user = await this.userService.findOneById(createPostDto.userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Exclude tags and userId from DTO (tags is number[] but entity needs Tags[], userId is not a property)
        const { tags, userId, ...postData } = createPostDto;
        
        // Create post with user relation (not userId)
        const post = this.postsRepository.create({
            ...postData,
            user,
        });

        return await this.postsRepository.save(post);
    }
}