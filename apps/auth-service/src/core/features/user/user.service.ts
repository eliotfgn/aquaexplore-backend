import DbClient from '@db/db.type';
import { CreateUserDto, UserEntity } from '@aquaexplore/types';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DB_CLIENT } from '@db/db.provider';
import { users } from '@db/schema';
import { eq } from 'drizzle-orm';
import {
  UserServiceClient,
  UserServiceControllerMethods
} from '@aquaexplore/protos';

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

  async getUserById(id: string): Promise<UserEntity | undefined> {
    const user = await this.dbClient.query.users.findFirst({
      where: eq(users.id, id)
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await this.dbClient.query.users.findFirst({
      where: eq(users.email, email)
    });

    return user;
  }

  async existingEmail(email: string): Promise<boolean> {
    const userWithEmail: UserEntity[] = await this.dbClient
      .select()
      .from(users)
      .where(eq(users.email, email));

    return userWithEmail.length > 0;
  }

  async updateUser(
    id: UserEntity['id'],
    payload: Partial<UserEntity>
  ): Promise<UserEntity> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const result = await this.dbClient
      .update(users)
      .set(payload)
      .where(eq(users.id, id))
      .returning();

    return result[0];
  }
}
