import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';

export const EnvVariablesSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'staging', 'production'])
    .default('development'),
  PORT: z.string().default('9000'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  SMTP_HOST: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string()
});

export type Environment = z.infer<typeof EnvVariablesSchema>;

function validate(config: Record<string, unknown>): Environment {
  return EnvVariablesSchema.parse(config);
}

export const envConfigOptions: ConfigModuleOptions = {
  cache: true,
  isGlobal: true,
  validate: validate,
  envFilePath: ['.env.development', '.env.staging', '.env.production']
};
