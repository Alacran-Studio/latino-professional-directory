import "./drizzle/envConfig";
import { defineConfig } from "drizzle-kit";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const dbCredentials = {
  host: process.env.POSTGRES_HOST!,
  database: process.env.POSTGRES_DATABASE!,
  port: Number(process.env.POSTGRES_PORT!),
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,

  /* NOTE: Alternative approach */
  // url: process.env.POSTGRES_URL!,
};

const client = postgres(dbCredentials);
export const db = drizzle(client);

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials,
  migrations: {
    prefix: "timestamp",
  },
});
