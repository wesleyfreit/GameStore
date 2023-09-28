import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UserGames = prisma.userGames;

export default UserGames;
