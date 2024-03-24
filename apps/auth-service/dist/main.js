"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const kafka_interface_1 = require("@nestjs/microservices/external/kafka.interface");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                clientId: 'aquaexplore-auth-service',
                brokers: ['localhost:9092'],
                logLevel: kafka_interface_1.logLevel.ERROR,
            },
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map