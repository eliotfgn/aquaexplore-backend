import { OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthService } from './auth.service';
export declare enum RoleEnum {
    USER = "user",
    ADMIN = "admin",
    EXPERT = "expert"
}
export type Role = 'user' | 'admin' | 'expert';
export declare class LoginDto {
    email: string;
    password: string;
}
declare class UserEntity {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    password: string;
    role?: Role | RoleEnum;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    constructor(data: UserEntity);
}
export declare class AuthController implements OnModuleInit {
    private readonly authService;
    private readonly authServiceClient;
    constructor(authService: AuthService, authServiceClient: ClientKafka);
    onModuleInit(): void;
    login(payload: LoginDto): Promise<UserEntity>;
    register(payload: any): Promise<UserEntity>;
}
export {};
