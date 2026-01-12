import { Injectable, } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create.tag.dto';
import { In, Repository } from 'typeorm';
import { Tags } from '../tags.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {

    constructor(
        @InjectRepository(Tags)
        private readonly tagRepository: Repository<Tags>,
    ) { }

    public async create(createTagDto: CreateTagDto) {
        let tag = this.tagRepository.create(createTagDto);
        return await this.tagRepository.save(tag);
    }

    public async findMultipleTags(tags: number[]) {
        let result = await this.tagRepository.find({
            where: 
            { id: In(tags) }
        });
        return result;
    }

    public async delete(id: number) {
        await this.tagRepository.delete(id);
        return { message: 'Tag deleted successfully' };
    }
}
