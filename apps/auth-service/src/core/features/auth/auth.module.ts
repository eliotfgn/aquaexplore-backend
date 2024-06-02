import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@features/user/user.module';
import { VerificationService } from './verification/verification.service';
import { MailModule } from '@/core/shared/mail/mail.module';

@Module({
  imports: [UserModule, MailModule],
  providers: [AuthService, VerificationService],
  controllers: [AuthController]
})
export class AuthModule {}
