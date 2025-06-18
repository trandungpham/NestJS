import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/dto/user.entity';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    generateJWT(user: User): Promise<string>;
    hashPassword(password: string): Promise<string>;
    comparePasswords(newPassword: string, passwortHash: string): Promise<any>;
}
