import { Module, Post } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/users.entity';
import { Posts } from './posts/posts.entity';
import { TagsModule } from './tags/tags.module';
import { Tags } from './tags/tags.entity';

@Module({
  imports: [UsersModule, PostsModule, AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        // entities: [Users, Posts, Tags],
        autoLoadEntities: true,
        synchronize: true,
        port: 5432,
        username: 'postgres',
        password: 'root', 
        host: 'localhost',
        database: 'Lms',
      }),
    }),
    TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
