import { z } from 'zod';
import { UserSchema } from '../entities';

export const CreateUserSchema = UserSchema.pick({
    email: true,
    password: true,
    firstName: true,
    lastName: true,
    role: true
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
