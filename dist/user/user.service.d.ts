import { User } from './dto/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';
export declare class UserService {
    private readonly userRepository;
    private readonly authService;
    constructor(userRepository: Repository<User>, authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findbyID(id: number): Promise<User>;
    remove(id: number): Promise<User>;
    update(id: number, updateData: UpdateUserDto): Promise<User>;
    signIn(name: string, pass: string): Promise<string>;
}
