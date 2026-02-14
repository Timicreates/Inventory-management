// prisma.config.ts
import "dotenv/config";

export default {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // This tells Prisma where your database is for migrations
    url: process.env.DATABASE_URL,
  },
};
