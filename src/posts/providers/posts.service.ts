import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dtos/createPost.dto';
import { Posts } from '../posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { UpdatePostDto } from '../dtos/updatePost.dto';

@Injectable()
export class PostsService {
    // injecting Posts entity
    constructor(
        private readonly userService: UsersService,

        @InjectRepository(Posts)
        private postsRepository: Repository<Posts>,

        private readonly tagsService: TagsService,
    ) { }

    public async createPost(createPostDto: CreatePostDto) {
        // Validate and fetch user
        const user = await this.userService.findOneById(createPostDto.userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Find Tags also
        let tags = await this.tagsService.findMultipleTags(createPostDto.tags || []);

        const post = this.postsRepository.create({
            ...createPostDto,
            user: user,
            tags: tags,
        });

        // Save post (TypeORM automatically handles the join table for ManyToMany)
        return await this.postsRepository.save(post);
    }

    public async findAllPosts() {
        return await this.postsRepository.find({ relations: ['user', 'tags'] });
    }

    public async updatePost(updatePostDto: UpdatePostDto) {

        let tags = await this.tagsService.findMultipleTags(updatePostDto.tags || []);
        // Merge existing post with incoming DTO
        const post = await this.postsRepository.preload({
            ...updatePostDto,
            tags, // overwrite tags after mapping
        });

        if (!post) throw new NotFoundException('Post not found');

        return await this.postsRepository.save(post);
    }

    public async deletePost(id: number) {
        
        await this.postsRepository.delete(id);
        return { message: 'Post deleted successfully' };
    }
}