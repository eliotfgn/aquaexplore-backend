import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { AuthModule } from './core/features/auth/auth.module';
import { UserModule } from './core/features/user/user.module';

@Module({
  imports: [DbModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
