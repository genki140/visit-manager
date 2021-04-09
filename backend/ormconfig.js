// typeormの接続設定。変更するには.envファイルを編集すること

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'username',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'database',
  synchronize: true,
  logging: true,
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

// // ormconfig.js に書くのが多分正解
// imports: [ConfigModule],
// inject: [ConfigService],
// useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
//   type: 'mysql',
//   host: configService.get('DB_HOST') || 'db',
//   port: configService.get('DB_PORT') || 3306,
//   username: configService.get('DB_USERNAME') || 'username',
//   password: configService.get('DB_PASSWORD') || 'password',
//   database: configService.get('DB_NAME') || 'database',
//   // extra: { socketPath: configService.get('DB_SOCKET_PATH') },
//   autoLoadEntities: true,
//   synchronize: true,
// }),
