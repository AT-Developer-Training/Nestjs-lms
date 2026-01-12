
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { UsersModule } from 'src/users/users.module';
import { Tags } from 'src/tags/tags.entity';
import { TagsModule } from 'src/tags/tags.module';

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [UsersModule, TagsModule, TypeOrmModule.forFeature([Posts])],
})
export class PostsModule {

}