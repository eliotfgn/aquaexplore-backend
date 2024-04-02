import DbClient from '@db/db.type';
import { CreateUserDto, UserEntity } from '@aquaexplore/types';
import { Inject, Injectable } from '@nestjs/common';
import { DB_CLIENT } from '@db/db.provider';
import { users } from '@db/schema';

@Injectable()
export class UserService {
  constructor(@Inject(DB_CLIENT) private readonly dbClient: DbClient) {}

  async createUser(payload: CreateUserDto): Promise<UserEntity> {
    const query: CreateUserDto[] = await this.dbClient
      .insert(users)
      .values(payload)
      .returning();
    const user: UserEntity = query[0];

    return user;
  }
}
