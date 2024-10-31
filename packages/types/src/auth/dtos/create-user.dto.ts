import { z } from 'zod';
import { UserSchema } from '../entities';

export const CreateUserSchema = UserSchema.pick({ email: true, password: true });

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
