import bcrypt from 'bcrypt';

export const admins = [
  {
    id: 'admin1',
    username: 'admin',
    // パスワードは「password123」をハッシュ化したもの（開発中は都度生成可能）
    passwordHash: bcrypt.hashSync('password123', 10),
  },
];