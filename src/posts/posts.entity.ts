import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable } from "typeorm";
import { PostType } from "./Enums/postTypeEnum";
import { PostStatus } from "./Enums/postStatusEnum";
import { Users } from "src/users/users.entity";
import { Tags } from "src/tags/tags.entity";


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
        enum: PostType,
        nullable: false,
        default: PostType.POST,
    })
    postType: PostType;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true,
    })
    slug: string;

    @Column({
        type: 'enum',
        enum: PostStatus,
        nullable: false,
        default: PostStatus.DRAFT,
    })
    status: PostStatus;

    @Column({
        type: 'text',
        nullable: true,
    })
    content?: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    schema?: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    featuredImageUrl?: string;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    publishOn?: Date;

    @ManyToMany(() => Tags, (tag) => tag.posts)
    @JoinTable()
    tags?: Tags[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Users, user => user.posts, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userId' })
    user: Users;
}