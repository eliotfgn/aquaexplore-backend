import { CreateUserDto, LoginDto } from '@aquaexplore/types';
import { OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
export declare class AuthController implements OnModuleInit {
    private readonly grpcClient;
    private authServiceClient;
    constructor(grpcClient: ClientGrpc);
    onModuleInit(): void;
    login(payload: LoginDto): Observable<any>;
    register(payload: CreateUserDto): Observable<any>;
}
