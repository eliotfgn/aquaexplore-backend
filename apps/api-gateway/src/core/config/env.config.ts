import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';

export const EnvVariablesSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'staging', 'production'])
    .default('development'),
  PORT: z.string().default('2020'),
  KAFKA_BROKER: z.string(),
});

export type Environment = z.infer<typeof EnvVariablesSchema>;

function validate(config: Record<string, unknown>): Environment {
  return EnvVariablesSchema.parse(config);
}

export const envConfigOptions: ConfigModuleOptions = {
  cache: true,
  isGlobal: true,
  validate: validate,
  envFilePath: ['.env.development', '.env.staging', '.env.production', '.env'],
};
