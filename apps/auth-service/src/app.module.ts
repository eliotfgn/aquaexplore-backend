import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@db/db.module';
import { AuthModule } from '@features/auth/auth.module';
import { UserModule } from '@features/user/user.module';
import { TokenModule } from './core/shared/token/token.module';

@Module({
  imports: [DbModule, AuthModule, UserModule, TokenModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
