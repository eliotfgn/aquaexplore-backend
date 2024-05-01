import { OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthService } from './auth.service';
export declare class AuthController implements OnModuleInit {
    private readonly authService;
    authServiceClient: ClientKafka;
    constructor(authService: AuthService);
    onModuleInit(): Promise<void>;
    login(payload: any): void;
}
