import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsEnum, IsOptional, IsDate, IsArray, MinLength, Matches, IsJSON, IsUrl, IsISO31661Alpha2, IsISO8601, min, MaxLength} from 'class-validator';
import { PostType } from '../Enums/postTypeEnum';
import { PostStatus } from '../Enums/postStatusEnum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {

    @ApiProperty({
        example: 'Introduction to NestJS',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(100)
    title: string;

    @ApiProperty({
        enum: PostType,
        description: 'Possible values: POST, PAGE, STORY, SERIES',
    })
    @IsNotEmpty()
    @IsEnum(PostType)
    postType: PostType;

    @ApiProperty({
        description: 'URL-friendly version of the title',
        example: 'my-url',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug can only contain lowercase letters, numbers, and hyphens : for eg "my-url"' })
    slug: string;

    @ApiProperty({
        enum: PostStatus,
        description: 'Possible values: DRAFT, PUBLISHED, ARCHIVED',
    })
    @IsNotEmpty()
    @IsEnum(PostStatus)
    status: PostStatus;

    @ApiPropertyOptional({
        example: 'This is the content of the post.',
    })
    @IsString()
    @IsOptional()
    content?: string;

    @ApiPropertyOptional({
        description: 'JSON schema for the post content',
        example: '{\"id\":1,\"title\":\"Test\"}',
    })
    @IsOptional()
    @IsJSON()
    schema?: string;

    @ApiPropertyOptional({
        description: 'URL of the featured image for the post',
        example: 'https://example.com/image.jpg',
    })
    @IsUrl()
    @IsOptional()
    featuredImageUrl?: string;

    @ApiPropertyOptional({
        description: 'ISO 8601 representing the post\'s target audience',
        example: '2026-01-07T00:00:00Z',
    })
    @IsISO8601()
    @IsOptional()
    publishOn?: Date;

    @ApiPropertyOptional({
        description: 'ISO 8601 representing the post\'s target audience',
        example: ["nestJs", "typescript"],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @MinLength(3, { each: true })
    tags?: string[];
}