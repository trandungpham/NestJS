"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBlogDto = exports.CreateBlogDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
class CreateBlogDto {
    name;
    userId;
    content;
    dateCreate;
    dateUpdate;
}
exports.CreateBlogDto = CreateBlogDto;
class UpdateBlogDto extends (0, mapped_types_1.PartialType)(CreateBlogDto) {
}
exports.UpdateBlogDto = UpdateBlogDto;
//# sourceMappingURL=blog.dto.js.map