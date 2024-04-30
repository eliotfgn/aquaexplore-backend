import { UserEntity } from '@aquaexplore/types';
import { DB_CLIENT } from '@db/db.provider';
import DbClient from '@db/db.type';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { init } from '@paralleldrive/cuid2';
import { UserService } from '@features/user/user.service';
import { users, verificationCodes } from '@db/schema';
import { MailService } from '@/core/shared/mail/mail.service';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class VerificationService {
  private readonly CODE_EXPIRES_IN = 1000 * 60 * 30; // 30 minutes

  constructor(
    @Inject(DB_CLIENT) private readonly dbClient: DbClient,
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {}

  private readonly generateVerificationCode = init({
    length: 6
  });

  async createAccountVerificationCode(userId: UserEntity['id']) {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isVerified) {
      return;
    }

    const code = this.generateVerificationCode();
    const expiresAt = new Date(Date.now() + this.CODE_EXPIRES_IN);

    const result = await this.dbClient
      .insert(verificationCodes)
      .values({
        code,
        expiresAt,
        userId: user.id,
        type: 'account'
      })
      .returning();

    return result[0];
  }

  async sendAccountVerificationCode(userId: UserEntity['id']) {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isVerified) {
      return;
    }
    const verificationCode = await this.createAccountVerificationCode(userId);

    await this.mailService.sendMail(
      `Your verification code is: ${verificationCode.code} .`,
      user.email
    );
  }

  async verifyCode(payload: { email: string; code: string }) {
    const user: UserEntity | undefined = await this.userService.getUserByEmail(
      payload.email
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const result = await this.dbClient
      .select()
      .from(verificationCodes)
      .where(
        and(
          eq(verificationCodes.code, payload.code),
          eq(verificationCodes.userId, user.id)
        )
      );

    if (result.length == 0) {
      throw new NotFoundException('Verification code not found');
    }

    const verificationCode = result[0];

    if (verificationCode.expiresAt < new Date()) {
      throw new BadRequestException('Verification code expired.');
    }

    if (verificationCode.code !== payload.code) {
      throw new BadRequestException('Unmatched verification code');
    }
  }
}
