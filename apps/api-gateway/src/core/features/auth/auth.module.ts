import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule } from '@nestjs/microservices';
import 'dotenv/config';

@Module({
  imports: [ClientsModule.register([])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
