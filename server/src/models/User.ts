import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const User = prisma.user;

export default User;
