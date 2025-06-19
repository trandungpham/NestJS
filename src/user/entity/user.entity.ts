import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Blog } from 'src/blog/entity/blog.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
