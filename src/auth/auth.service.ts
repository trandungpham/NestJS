import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/dto/user.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor( private jwtService: JwtService ) {}


    generateJWT(user: User): Promise<string> {
        return this.jwtService.signAsync({user});
    }

    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);

    }

    comparePasswords(newPassword: string, passwortHash: string): Promise<any>{
        return bcrypt.compare(newPassword, passwortHash);
    }
}

