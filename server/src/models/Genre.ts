import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Genre = prisma.genre;

export default Genre;
