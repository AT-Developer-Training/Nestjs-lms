import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Posts {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    title: string;

    @Column({
        type: 'enum',
        enum: ['POST', 'PAGE', 'STORY', 'SERIES'],
        nullable: false,
    })
    postType: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    slug: string;

    @Column({
        type: 'enum',
        enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
        nullable: false,
    })
    status: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    content: string;

    @Column({
        type: 'json',
        nullable: true,
    })
    schema: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    featuredImageUrl: string;

    @Column({
        type: 'date',
        nullable: true,
    })
    publishOn: Date;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    tags: string[];
}