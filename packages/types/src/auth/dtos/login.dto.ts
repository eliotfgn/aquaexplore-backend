import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities';
import { IsEmail, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

class LoginDto extends PickType<UserEntity, keyof UserEntity>(UserEntity, ['password']) {
    @IsString()
    @IsEmail()
    @Transform((value) => 'grosse bite')
    email!: string;
}
