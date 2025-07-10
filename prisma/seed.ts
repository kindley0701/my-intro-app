import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Admin シード
  const rawPassword = process.env.ADMIN_PASSWORD;
  if (!rawPassword) throw new Error('❌ ADMIN_PASSWORD is not set in .env file');
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  //unique設定しているものがあればupsert。なければいきなりcreateで行ける。
  await prisma.admin.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      password: hashedPassword,
    },
  });

  // Hobby シード
  const hobbies = [
    {
      title: "ドローン",
      text: "普通では見れない空からの視点で世界を眺めるのが好きです\nDJIのMavic4 Pro・Mini2・neoの３機種を所有しています",
      imageUrl: "/drone.mp4",
      halfWidth: false,
    },
    {
      title: "ドライブ",
      text: "いろいろな風景や街並みの中を走ったり、時にはいつもと違う道を走ったり\nそんな時間が何よりのリフレッシュです",
      imageUrl: "/drive.jpg",
      halfWidth: true,
    },
    {
      title: "旅",
      text: "学生の時に47都道府県を制覇しました\nそこでしか見れない絶景に出会ったときの感動を追い求めています",
      imageUrl: "/travel.jpg",
      halfWidth: true,
    },
    {
      title: "プログラミング",
      text: "学生の時にプログラミングスクールのアルバイトで培った経験をベースに\nRuby、Javascript、Pythonを扱ったWebアプリ・ツールの作成経験があります",
      imageUrl: "/programming.jpg",
      halfWidth: false,
    },
    {
      title: "ボルダリング",
      text: "コロナ期にはじめ、今では週２程度で取り組んでいます\n傾斜の強い壁を上る方がワクワクします",
      imageUrl: "/bouldering.jpg",
      halfWidth: true,
    },
    {
      title: "バレーボール",
      text: "中高の部活で入っており、今では週に１回程度で活動しています\nポジションはリベロです",
      imageUrl: "/volleyball.jpg",
      halfWidth: true,
    },
    {
      title: "スノーボード",
      text: "24-25シーズンは14日間も滑り、\n見事ドはまりした結果、一式そろえてしまいました",
      imageUrl: "/snowboard.jpg",
      halfWidth: true,
    },
    {
      title: "ビリヤード",
      text: "大学時代にサークルで活動していました\nスキルは高くないですがJPAというチーム戦の出場経験があります",
      imageUrl: "/billiards.mp4",
      halfWidth: true,
    },
    {
      title: "DIY",
      text: "ルームデザインに不便な点が多く、モノを自作することを始めました\n",
      imageUrl: "/diy.jpg",
      halfWidth: true,
    },
    {
      title: "DIY",
      text: "ルームデザインに不便さを感じたことをきっかけに物を自作することを始めました\n",
      imageUrl: "/diy.jpg",
      halfWidth: true,
    },
  ];

  for (let i = 0; i < hobbies.length; i++) {
    const hobby = hobbies[i];

    await prisma.hobby.upsert({
      where: { title: hobby.title },
      update: {},
      create: {
        title: hobby.title,
        text: hobby.text,
        imageUrl: hobby.imageUrl,
        cropCenterX: 50,         // 仮の初期値（0〜100の割合に応じて中央を指定するなど）
        cropCenterY: 50,
        cropWidth: 100,
        cropHeight: 100,
        order: i,                // 表示順に対応
        halfWidth: hobby.halfWidth,
      },
    });
  }

  console.log('✅ Admin and all Hobby data seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
