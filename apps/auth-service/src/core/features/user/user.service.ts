import DbClient from '@db/db.type';
import { CreateUserDto, UserEntity } from '@aquaexplore/types';
import { Inject, Injectable } from '@nestjs/common';
import { DB_CLIENT } from '@db/db.provider';
import { users } from '@db/schema';
import { eq } from 'drizzle-orm';

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

  async existingEmail(email: string): Promise<boolean> {
    const userWithEmail: UserEntity[] = await this.dbClient
      .select()
      .from(users)
      .where(eq(users.email, email));

    return userWithEmail.length === 0;
  }
}
