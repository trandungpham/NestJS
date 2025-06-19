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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./dto/user.entity");
const typeorm_2 = require("typeorm");
const auth_service_1 = require("../auth/auth.service");
let UserService = class UserService {
    userRepository;
    authService;
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }
    async create(createUserDto) {
        const user = new user_entity_1.User();
        const hashed_pwd = await this.authService.hashPassword(createUserDto.password);
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.password = hashed_pwd;
        return this.userRepository.save(user);
    }
    findAll() {
        return this.userRepository.find();
    }
    async findbyID(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }
    async remove(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        await this.userRepository.delete(id);
        return user;
    }
    async update(id, updateData) {
        const existingUser = await this.userRepository.findOneBy({ id });
        if (!existingUser) {
            throw new Error(`User with id ${id} not found`);
        }
        const updatedUser = this.userRepository.merge(existingUser, updateData);
        return await this.userRepository.save(updatedUser);
    }
    async signIn(name, pass) {
        const user = await this.userRepository.findOneBy({ name });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isMatch = await this.authService.comparePasswords(pass, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return await this.authService.generateJWT(user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], UserService);
//# sourceMappingURL=user.service.js.map