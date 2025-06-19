import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './dto/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly authService: AuthService
        ) {}

    async create(createUserDto: CreateUserDto) {
        const user = new User();
        const hashed_pwd = await this.authService.hashPassword(createUserDto.password);
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.password = hashed_pwd
        return this.userRepository.save(user);
    }

    findAll() {
        return this.userRepository.find();
    }

    async findbyID(id: number){
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }

    async remove(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        await this.userRepository.delete(id);
        return user; // return the deleted user
    }


    async update(id: number, updateData: UpdateUserDto) {
        const existingUser = await this.userRepository.findOneBy({ id });

        if (!existingUser) {
            throw new Error(`User with id ${id} not found`);
        }

        const updatedUser = this.userRepository.merge(existingUser, updateData);

        return await this.userRepository.save(updatedUser);
    }

    async signIn( name: string, pass: string ) {
        const user = await this.userRepository.findOneBy({ name });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isMatch = await this.authService.comparePasswords(pass, user.password);
            if (!isMatch) {
                throw new UnauthorizedException('Invalid credentials');
        }
        return await this.authService.generateJWT(user);
    }

}
