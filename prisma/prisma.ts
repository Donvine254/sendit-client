import { PrismaClient } from "@prisma/client";

declare global {
  // Declare global.prisma as a variable of type PrismaClient | undefined
//   eslint-disable-next-line
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
