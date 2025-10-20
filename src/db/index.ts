import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

let cachedDb: PostgresJsDatabase | null = null;

export const getDb = (): PostgresJsDatabase => {
  if (cachedDb) {
    return cachedDb;
  }

  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL is not set. Please configure it before using the database client.',
    );
  }

  const queryClient = postgres(process.env.DATABASE_URL);
  cachedDb = drizzle(queryClient);
  return cachedDb;
};

export default getDb;
