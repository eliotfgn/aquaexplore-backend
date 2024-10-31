import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string().cuid(),
    email: z.string().email(),
    password: z.string(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    isVerified: z.boolean().default(true),
    role: z.enum(['user', 'admin', 'expert']).default('user'),
    createdAt: z.date(),
    updatedAt: z.date().optional()
});

export type UserEntity = z.infer<typeof UserSchema>;
