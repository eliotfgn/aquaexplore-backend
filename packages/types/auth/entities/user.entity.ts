import { IsBoolean, IsDate, IsEmail, IsEnum, IsString, IsUUID, Min } from 'class-validator';

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
    EXPERT = 'expert'
}

export class UserEntity {
    @IsUUID()
    id!: string;

    @IsString()
    firstName?: string;

    @IsString()
    lastName?: string;

    @IsString()
    @IsEmail()
    email!: string;

    @IsString()
    @Min(8)
    password!: string;

    @IsEnum(Role)
    role?: Role;

    @IsBoolean()
    isVerified!: boolean;

    @IsDate()
    createdAt!: Date;

    @IsDate()
    updatedAt!: Date;
}
