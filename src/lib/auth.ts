import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import path from "path";

// Initialize SQLite database stored locally in the project root
const dbPath = path.join(process.cwd(), "bazardor.db");
const sqlite = new Database(dbPath);

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET ?? "bazardor-secret-key-change-in-production-12345678",
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  database: sqlite,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    },
  },
  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false,
      },
    },
  },
});
