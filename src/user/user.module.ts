import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './dto/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Blog } from 'src/blog/dto/blog.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Blog]),
                forwardRef(() => AuthModule),
                JwtModule.register({})],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
