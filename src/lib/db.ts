import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
  globalForPrisma.prisma = globalForPrisma.prisma ?? new PrismaClient()
} else {
  globalForPrisma.prisma = new PrismaClient({ log: ['query', 'error', 'warn'] })
}

export const db = globalForPrisma.prisma
