import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { Blog } from './entity/blog.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const user = await this.userRepository.findOne({
      where: { id: createBlogDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with id ${createBlogDto.userId} not found`,
      );
    }
    const blog = new Blog();
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

  async findOne(id: number) {
    const blog = await this.blogRepository.findOneBy({ id });
    if (!blog) {
      throw new Error(`Blog with id ${id} not found`);
    }
    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }

    if (updateBlogDto.userId) {
      const user = await this.userRepository.findOneBy({
        id: updateBlogDto.userId,
      });
      if (!user) {
        throw new NotFoundException(
          `User with id ${updateBlogDto.userId} not found`,
        );
      }
      blog.user = user;
    }

    if (updateBlogDto.name !== undefined) blog.name = updateBlogDto.name;
    if (updateBlogDto.content !== undefined)
      blog.content = updateBlogDto.content;

    blog.dateUpdate = new Date(); // Update timestamp

    return this.blogRepository.save(blog);
  }

  async remove(id: number) {
    const blog = await this.blogRepository.findOneBy({ id });

    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }

    await this.blogRepository.remove(blog);
  }
}
