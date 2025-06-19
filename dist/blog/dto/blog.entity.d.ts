import { User } from 'src/user/dto/user.entity';
export declare class Blog {
    id: number;
    name: string;
    content: string;
    dateCreate: Date;
    dateUpdate: Date;
    user: User;
}
