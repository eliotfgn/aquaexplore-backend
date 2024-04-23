import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@db/db.module';
import { AuthModule } from '@features/auth/auth.module';
import { UserModule } from '@features/user/user.module';
import { TokenModule } from './core/shared/token/token.module';
import { ConfigModule } from '@nestjs/config';
import { envConfigOptions } from './config/env.config';
import { MailModule } from './core/shared/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfigOptions),
    DbModule,
    AuthModule,
    UserModule,
    TokenModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
