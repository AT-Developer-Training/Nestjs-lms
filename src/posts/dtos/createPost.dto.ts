import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsEnum, IsOptional, IsDate, IsArray } from 'class-validator';
import { PostType } from '../Enums/postTypeEnum';
import { PostStatus } from '../Enums/postStatusEnum';

export class CreatePostDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(['post', 'page', 'story', 'series'])
    postType: PostType;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(['draft', 'scheduled', 'review', 'published'])
    status: PostStatus;

    @IsString()
    @IsOptional()
    content?: string;

    @IsString()
    @IsOptional()
    schema?: string;

    @IsString()
    @IsOptional()
    featuredImageUrl?: string;

    @IsDate()
    @Type(() => Date)
    publishOn?: Date;

    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @IsArray()
    @IsString({ each: true })
    metaOptions: [{ key: 'sideBarEnabled'; value: true }];
}