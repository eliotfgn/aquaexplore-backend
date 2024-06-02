import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';
export declare const EnvVariablesSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "test", "staging", "production"]>>;
    PORT: z.ZodDefault<z.ZodString>;
    KAFKA_BROKER: z.ZodString;
}, "strip", z.ZodTypeAny, {
    NODE_ENV: "development" | "test" | "staging" | "production";
    PORT: string;
    KAFKA_BROKER: string;
}, {
    KAFKA_BROKER: string;
    NODE_ENV?: "development" | "test" | "staging" | "production" | undefined;
    PORT?: string | undefined;
}>;
export type Environment = z.infer<typeof EnvVariablesSchema>;
export declare const envConfigOptions: ConfigModuleOptions;
