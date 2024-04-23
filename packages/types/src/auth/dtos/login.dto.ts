import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities';

export class LoginDto extends PickType<UserEntity, keyof UserEntity>(UserEntity, [
    'email',
    'password'
]) {}
