
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { UsersModule } from 'src/users/users.module';
import { Tags } from 'src/tags/tags.entity';

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [UsersModule, TypeOrmModule.forFeature([Posts,Tags])],
})
export class PostsModule {

}