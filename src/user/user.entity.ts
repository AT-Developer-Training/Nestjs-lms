import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('users') // table name
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Index() // perf for search
  @Column({ length: 100 })
  fname: string; 

  @Column({ length: 100 })
  lname: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) // security
  password: string;

  @Column({ length: 100, enum: ['user', 'admin'], default: 'user' })
  role: string;

  @CreateDateColumn()
  created_at: Date;
}
