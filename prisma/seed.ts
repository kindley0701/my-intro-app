import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config(); // .envファイルを読み込む

const prisma = new PrismaClient();

async function main() {
  const rawPassword = process.env.ADMIN_PASSWORD;

  if (!rawPassword) {
    throw new Error('❌ ADMIN_PASSWORD is not set in .env file');
  }

  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  });

  console.log('✅ Admin user seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });