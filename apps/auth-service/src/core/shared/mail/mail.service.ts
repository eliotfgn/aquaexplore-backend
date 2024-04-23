import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  async sendMail(mailContent: string, email: string) {
    const resend = new Resend('re_123456789');

    const { error } = await resend.emails.send({
      from: 'Acme <efagnon2002@gmail.com>',
      to: email,
      subject: 'Hello World',
      html: mailContent
    });

    if (error) {
      return console.error({ error });
    }
  }
}
