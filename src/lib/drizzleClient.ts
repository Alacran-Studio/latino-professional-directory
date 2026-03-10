import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var _pgClient: postgres.Sql | undefined;
}

const dbCredentials = {
  host: process.env.POSTGRES_HOST!,
  database: process.env.POSTGRES_DATABASE!,
  port: Number(process.env.POSTGRES_PORT!),
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
  max: 5, // cap connections per process
};

// Reuse the client across hot reloads in dev to avoid connection exhaustion
const client = globalThis._pgClient ?? postgres(dbCredentials);
if (process.env.NODE_ENV !== "production") globalThis._pgClient = client;

export const db = drizzle(client);
