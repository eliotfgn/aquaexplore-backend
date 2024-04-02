import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DB_CLIENT } from '@db/db.provider';
import DbClient from '@db/db.type';
import { CreateUserDto } from '@aquaexplore/types';
import { hashPassword } from '@/utils/password.util';
import { UserService } from '@features/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DB_CLIENT) private readonly dbClient: DbClient,
    private readonly userService: UserService
  ) {}

  async register(payload: CreateUserDto) {
    const existingEmail = await this.userService.existingEmail(payload.email);

    if (existingEmail) {
      throw new BadRequestException('Email already exists.');
    }

    const hashedPassword = await hashPassword(payload.password);
    payload.password = hashedPassword;

    const user = await this.userService.createUser(payload);

    //TODO: Trigger account verification process
    //TODO: Send account creation notification

    return user;
  }
}
