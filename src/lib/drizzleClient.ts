import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const dbCredentials = {
  host: process.env.POSTGRES_HOST!,
  database: process.env.POSTGRES_DATABASE!,
  port: Number(process.env.POSTGRES_PORT!),
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
};

const client = postgres(dbCredentials);
export const db = drizzle(client);
