import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from '../../constants';
import * as userschema from './schema/userschema';
import * as eventschema from './schema/eventschema';
import * as profileschema from './schema/profileschema';
import * as tokenschema from './schema/tokenschema';
import * as postgres from 'postgres';
import * as ticketschema from './schema/ticketschema';
import { Client, Pool } from 'pg';
@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        const pool = new Pool({
          host: 'localhost',
          port: 5432,
          user: 'postgres',
          password: 'pass',
          database: 'eventaddis',
        });
        // await client.connect();
        const db = drizzle(pool, {
          schema: {
            ...userschema,
            ...eventschema,
            ...profileschema,
            ...ticketschema,
            ...tokenschema,
          },
        });
        return db;
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzleModule {}
