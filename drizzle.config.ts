import type { Config } from 'drizzle-kit';

export default {
  schema: './src/drizzle/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString:
      'postgresql://postgres:YD*n2i3v_L7mN-p@db.dijlmcnlzzmgwwunhyvx.supabase.co:5432/postgres',
  },
} satisfies Config;
