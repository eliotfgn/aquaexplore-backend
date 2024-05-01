import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { CreateUserDto, LoginDto, UserEntity } from '@aquaexplore/types';
import { hashPassword } from '@/utils/password.util';
import { UserService } from '@features/user/user.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(payload: CreateUserDto) {
    const existingEmail = await this.userService.existingEmail(payload.email);

    if (existingEmail) {
      throw new RpcException(new BadRequestException('Email already exists.'));
    }

    const hashedPassword = await hashPassword(payload.password);
    payload.password = hashedPassword;

    const user = await this.userService.createUser(payload);

    //TODO: Trigger account verification process
    //TODO: Send account creation notification

    return user;
  }

  async login(payload: LoginDto): Promise<UserEntity> {
    const { email, password } = payload;

    const user: UserEntity | undefined = await this.userService.getUserByEmail(
      email
    );

    if (!user) {
      throw new RpcException(new UnauthorizedException());
    }

    if (user.password !== password) {
      throw new RpcException(new UnauthorizedException());
    }

    return user;
  }
}
