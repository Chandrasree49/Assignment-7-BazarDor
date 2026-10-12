import { betterAuth } from "better-auth";
import { memoryAdapter } from "@better-auth/memory-adapter";

const isVercel =
  Boolean(process.env.VERCEL) ||
  Boolean(process.env.VERCEL_ENV) ||
  Boolean(process.env.VERCEL_URL) ||
  process.platform === "linux";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

const getBaseURL = () => {
  if (isVercel) {
    return "https://bazardor-wheat.vercel.app";
  }
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  return "http://localhost:3000";
};

const initialMemoryDb = {
  user: [],
  session: [],
  account: [],
  verification: [],
};

let sqliteDb: any = null;
// Only attempt SQLite locally on Windows machine, never on Vercel
if (!isVercel && process.platform === "win32") {
  try {
    const Database = require("better-sqlite3");
    const path = require("path");
    const dbPath = path.join(process.cwd(), "bazardor.db");
    const db = new Database(dbPath);
    db.exec(`
      CREATE TABLE IF NOT EXISTS user (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          emailVerified INTEGER NOT NULL DEFAULT 0,
          image TEXT,
          createdAt INTEGER NOT NULL,
          updatedAt INTEGER NOT NULL
      );
      CREATE TABLE IF NOT EXISTS session (
          id TEXT PRIMARY KEY,
          expiresAt INTEGER NOT NULL,
          token TEXT NOT NULL UNIQUE,
          createdAt INTEGER NOT NULL,
          updatedAt INTEGER NOT NULL,
          ipAddress TEXT,
          userAgent TEXT,
          userId TEXT NOT NULL,
          FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS account (
          id TEXT PRIMARY KEY,
          accountId TEXT NOT NULL,
          providerId TEXT NOT NULL,
          userId TEXT NOT NULL,
          accessToken TEXT,
          refreshToken TEXT,
          idToken TEXT,
          accessTokenExpiresAt INTEGER,
          refreshTokenExpiresAt INTEGER,
          scope TEXT,
          password TEXT,
          createdAt INTEGER NOT NULL,
          updatedAt INTEGER NOT NULL,
          FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS verification (
          id TEXT PRIMARY KEY,
          identifier TEXT NOT NULL,
          value TEXT NOT NULL,
          expiresAt INTEGER NOT NULL,
          createdAt INTEGER,
          updatedAt INTEGER
      );
    `);
    sqliteDb = db;
  } catch {
    sqliteDb = null;
  }
}

export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "bazardor-secret-key-change-in-production-12345678-bazar-auth-key",
  baseURL: getBaseURL(),
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://bazardor-wheat.vercel.app",
    "https://*.vercel.app",
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    process.env.BETTER_AUTH_URL || "",
    process.env.NEXT_PUBLIC_APP_URL || "",
  ].filter(Boolean),
  database: isVercel ? memoryAdapter(initialMemoryDb) : (sqliteDb || memoryAdapter(initialMemoryDb)),
  account: {
    storeStateStrategy: "cookie",
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
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
