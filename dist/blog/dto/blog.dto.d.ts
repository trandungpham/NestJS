export declare class CreateBlogDto {
    name: string;
    userId: number;
    content: string;
    dateCreate: Date;
    dateUpdate: Date;
}
declare const UpdateBlogDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBlogDto>>;
export declare class UpdateBlogDto extends UpdateBlogDto_base {
}
export {};
