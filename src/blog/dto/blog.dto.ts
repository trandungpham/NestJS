import { PartialType } from "@nestjs/mapped-types";
export class CreateBlogDto {
    name: string;
    userId: number;
    content: string;
    dateCreate: Date;
    dateUpdate: Date;
}

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}
