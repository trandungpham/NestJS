"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModule = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
const blog_controller_1 = require("./blog.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/dto/user.entity");
const blog_entity_1 = require("./dto/blog.entity");
const auth_module_1 = require("../auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
let BlogModule = class BlogModule {
};
exports.BlogModule = BlogModule;
exports.BlogModule = BlogModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, blog_entity_1.Blog]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            jwt_1.JwtModule.register({})],
        controllers: [blog_controller_1.BlogController],
        providers: [blog_service_1.BlogService],
    })
], BlogModule);
//# sourceMappingURL=blog.module.js.map