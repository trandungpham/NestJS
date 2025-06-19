import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { Blog } from './dto/blog.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/dto/user.entity';
export declare class BlogService {
    private readonly blogRepository;
    private readonly userRepository;
    constructor(blogRepository: Repository<Blog>, userRepository: Repository<User>);
    create(createBlogDto: CreateBlogDto): Promise<Blog>;
    findAll(): Promise<Blog[]>;
    findOne(id: number): Promise<Blog>;
    update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog>;
    remove(id: number): Promise<void>;
}
