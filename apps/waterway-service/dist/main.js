"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
require("dotenv/config");
const microservices_1 = require("@nestjs/microservices");
const kafka_interface_1 = require("@nestjs/microservices/external/kafka.interface");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                clientId: 'aquaexplore-waterway-service',
                brokers: [process.env.KAFKA_BROKER],
                logLevel: kafka_interface_1.logLevel.ERROR,
                requestTimeout: 45000,
                connectionTimeout: 45000,
            },
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map