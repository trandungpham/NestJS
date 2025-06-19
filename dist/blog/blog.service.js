"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blog_entity_1 = require("./dto/blog.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/dto/user.entity");
let BlogService = class BlogService {
    blogRepository;
    userRepository;
    constructor(blogRepository, userRepository) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }
    async create(createBlogDto) {
        const user = await this.userRepository.findOne({ where: { id: createBlogDto.userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${createBlogDto.userId} not found`);
        }
        const blog = new blog_entity_1.Blog();
        blog.name = createBlogDto.name;
        blog.user = user;
        blog.content = createBlogDto.content;
        blog.dateCreate = new Date();
        blog.dateUpdate = new Date();
        return this.blogRepository.save(blog);
    }
    findAll() {
        return this.blogRepository.find();
    }
    async findOne(id) {
        const blog = await this.blogRepository.findOneBy({ id });
        if (!blog) {
            throw new Error(`Blog with id ${id} not found`);
        }
        return blog;
    }
    async update(id, updateBlogDto) {
        const blog = await this.blogRepository.findOne({ where: { id }, relations: ['user'] });
        if (!blog) {
            throw new common_1.NotFoundException(`Blog with id ${id} not found`);
        }
        if (updateBlogDto.userId) {
            const user = await this.userRepository.findOneBy({ id: updateBlogDto.userId });
            if (!user) {
                throw new common_1.NotFoundException(`User with id ${updateBlogDto.userId} not found`);
            }
            blog.user = user;
        }
        if (updateBlogDto.name !== undefined)
            blog.name = updateBlogDto.name;
        if (updateBlogDto.content !== undefined)
            blog.content = updateBlogDto.content;
        blog.dateUpdate = new Date();
        return this.blogRepository.save(blog);
    }
    async remove(id) {
        const blog = await this.blogRepository.findOneBy({ id });
        if (!blog) {
            throw new common_1.NotFoundException(`Blog with id ${id} not found`);
        }
        await this.blogRepository.remove(blog);
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_entity_1.Blog)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BlogService);
//# sourceMappingURL=blog.service.js.map