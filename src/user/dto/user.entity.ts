import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Blog } from 'src/blog/dto/blog.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Blog, blog => blog.user)
    blogs: Blog[];
 
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}