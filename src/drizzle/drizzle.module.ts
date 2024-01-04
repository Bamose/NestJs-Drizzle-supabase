import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { PG_CONNECTION } from '../../constants';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from '../drizzle/schema';
import postgres from 'postgres';

@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString =
          'postgresql://postgres:YD*n2i3v_L7mN-p@db.dijlmcnlzzmgwwunhyvx.supabase.co:5432/postgres';
        const client = postgres(connectionString);
        const db = drizzle(client, { schema });
        return db;
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzleModule {}
