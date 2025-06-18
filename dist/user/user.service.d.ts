import { User } from './dto/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly userRepository;
    private readonly authService;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, authService: AuthService, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findbyID(id: number): Promise<User>;
    remove(id: number): Promise<User>;
    update(id: number, updateData: UpdateUserDto): Promise<User>;
    signIn(name: string, pass: string): Promise<string>;
}
