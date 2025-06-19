import { Blog } from 'src/blog/dto/blog.entity';
export declare class User {
    id: number;
    blogs: Blog[];
    name: string;
    email: string;
    password: string;
}
