import { BlogService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    create(createBlogDto: CreateBlogDto): Promise<import("./dto/blog.entity").Blog>;
    findAll(): Promise<import("./dto/blog.entity").Blog[]>;
    findOne(id: number): Promise<import("./dto/blog.entity").Blog>;
    update(id: number, updateBlogDto: UpdateBlogDto): Promise<import("./dto/blog.entity").Blog>;
    remove(id: number): Promise<void>;
}
