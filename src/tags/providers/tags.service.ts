import { Injectable, } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create.tag.dto';
import { Repository } from 'typeorm';
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
}
