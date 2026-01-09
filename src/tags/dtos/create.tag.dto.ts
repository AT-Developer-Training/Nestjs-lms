import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, Max, MaxLength, MinLength } from "class-validator";

export class CreateTagDto {

    @ApiProperty({
        example: 'JavaScript',
    })
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @MaxLength(256)
    name: string;

    @ApiProperty({
        description: 'URL-friendly version of the title',
        example: 'my-url',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug can only contain lowercase letters, numbers, and hyphens : for eg "my-url"' })
    slug: string;

    @ApiPropertyOptional({
        example: 'A programming language',
    })
    @IsString()
    @IsOptional()
    description?: string;


    @ApiPropertyOptional({
        example: '<svg>...</svg>',
    })
    @IsJSON()
    @IsOptional()
    schema?: string;

    @ApiPropertyOptional({
        example: 'http://example.com/image.png',
    })
    @IsUrl()
    @IsOptional()
    @MaxLength(1024)
    featuredImageUrl?: string;
}