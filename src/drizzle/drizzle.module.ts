import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { PG_CONNECTION } from '../../constants';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as userschema from './schema/userschema';
import * as departmentschema from './schema/departmentschema';
import * as eventschema from './schema/eventschema';
import * as memberschema from './schema/memberschema';
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
        const client = postgres(connectionString);
        const db = drizzle(client, {
          schema: {
            ...userschema,
            ...departmentschema,
            ...eventschema,
            ...memberschema,
            ...profileschema,
            ...Registrationschema,
            ...tokenschema,
          },
        });
        /*   await migrate(db, { migrationsFolder: 'migration' }); */
        return db;
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzleModule {}
