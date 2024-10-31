import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import 'dotenv/config';
import { AUTH_SERVICE } from 'src/config/constants';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@aquaexplore/protos';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(
            __dirname,
            '../../../../node_modules/@aquaexplore/protos/src/auth.proto',
          ),
        },
      },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
