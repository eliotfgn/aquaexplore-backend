"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfigOptions = exports.EnvVariablesSchema = void 0;
const zod_1 = require("zod");
exports.EnvVariablesSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(['development', 'test', 'staging', 'production'])
        .default('development'),
    PORT: zod_1.z.string().default('2020'),
    KAFKA_BROKER: zod_1.z.string(),
});
function validate(config) {
    return exports.EnvVariablesSchema.parse(config);
}
exports.envConfigOptions = {
    cache: true,
    isGlobal: true,
    validate: validate,
    envFilePath: ['.env.development', '.env.staging', '.env.production', '.env'],
};
//# sourceMappingURL=env.config.js.map