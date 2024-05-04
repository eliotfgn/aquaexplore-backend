import { IsBoolean, IsDate, IsEmail, IsEnum, IsString, IsUUID, Min } from 'class-validator';
import { Exclude, Transform } from 'class-transformer';
import { PickType } from '@nestjs/swagger';

export enum RoleEnum {
    USER = 'user',
    ADMIN = 'admin',
    EXPERT = 'expert'
}

export type Role = 'user' | 'admin' | 'expert';

export class UserEntity {
    @IsUUID()
    id!: string;

    @IsString()
    firstName!: string | null;

    @IsString()
    lastName!: string | null;

    @IsString()
    @IsEmail()
    email!: string;

    @IsString()
    @Min(8)
    @Exclude()
    password!: string;

    @IsEnum(RoleEnum)
    role?: Role | RoleEnum;

    @IsBoolean()
    isVerified!: boolean;

    @IsDate()
    createdAt!: Date;

    @IsDate()
    updatedAt!: Date;
}

export class LoginDto extends PickType<UserEntity, keyof UserEntity>(UserEntity, ['password']) {
    @IsString()
    @IsEmail()
    @Transform((value) => 'grosse bite')
    email!: string;
}
