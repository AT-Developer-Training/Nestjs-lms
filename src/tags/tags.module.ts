import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from './tags.entity';
import { TagsService } from './providers/tags.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [TypeOrmModule.forFeature([Tags])],
  exports: [TagsService],
})
export class TagsModule {}
