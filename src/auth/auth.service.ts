import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateJWT(user: User) {
    return this.jwtService.signAsync({ user });
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }

  comparePasswords(newPassword: string, passwortHash: string) {
    return bcrypt.compare(newPassword, passwortHash);
  }
}
