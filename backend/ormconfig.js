// typeormの接続設定。変更するには.envファイルを編集すること

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT != null ? Number(process.env.DB_PORT.toString()) : 3306,
  username: process.env.DB_USERNAME || 'username',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'database',
  synchronize: true,
  logging: process.env.DB_LOGGING === 'TRUE' || false, // デバッグにSQLを出力する

  // entities: [join(__dirname, '**', '*.model.ts}')],
  // entities: ['./src/entities/**/*.model.ts'],
  // migrations: ['common/migration/**/*.ts'],
  // subscribers: ['common/subscriber/**/*.ts'],
  // cli: {
  //   entitiesDir: 'common/entity',
  //   migrationsDir: 'common/migration',
  //   subscribersDir: 'common/subscriber',
  // },
};
