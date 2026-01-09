import { Posts } from "src/posts/posts.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    lastName: string;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: false,
    })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Posts, post => post.user)
    posts: Posts[];
}