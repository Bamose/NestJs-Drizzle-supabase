import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { PG_CONNECTION } from '../../constants';
import * as userschema from './schema/userschema';
import * as eventschema from './schema/eventschema';
import * as profileschema from './schema/profileschema';
import * as Registrationschema from './schema/registrationschema';
import * as tokenschema from './schema/tokenschema';
import * as postgres from 'postgres';

@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        const client = postgres(connectionString, { prepare: false });
        const db = drizzle(client, {
          schema: {
            ...userschema,
            ...eventschema,
            ...profileschema,
            ...Registrationschema,
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
