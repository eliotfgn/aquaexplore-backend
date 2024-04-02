import { Inject, Injectable } from '@nestjs/common';
import { DB_CLIENT } from 'src/db/db.provider';
import DbClient from 'src/db/db.type';

@Injectable()
export class UserService {
  //constructor(@Inject(DB_CLIENT) private readonly dbClient: DbClient) {}
}
