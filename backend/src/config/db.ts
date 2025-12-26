// src/config/db.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

declare global {
    var prisma: PrismaClient | undefined;
}

// Validate DATABASE_URL exists
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables");
}

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma =
    global.prisma ??
    new PrismaClient({
        adapter,
        log: ["query", "error", "warn"],
    });

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

export async function checkDbConnection() {
    try {
        await prisma.$connect();
        console.log("✅ Prisma connected to database");
    } catch (error) {
        console.error("❌ Prisma failed to connect to database", error);
        throw error; // Re-throw to prevent server from continuing with bad connection
    }
}