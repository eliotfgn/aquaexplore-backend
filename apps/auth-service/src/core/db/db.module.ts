import { Global, Module } from '@nestjs/common';
import { DB_CLIENT, DbProvider } from './db.provider';

@Global()
@Module({
  providers: [DbProvider],
  exports: [DB_CLIENT]
})
export class DbModule {}
