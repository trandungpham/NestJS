import { Module, forwardRef } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/dto/user.entity';
import { Blog } from './dto/blog.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([User, Blog]),
                    forwardRef(() => AuthModule),
                    JwtModule.register({})],
    controllers: [BlogController],
    providers: [BlogService],
})
export class BlogModule {}
