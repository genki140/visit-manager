// 英語のメッセージを定義
export const enMessages = {
  home: 'Home',
  visit_manage: 'Visit Manage',
  login: 'Login',
  logout: 'Logout',
  affiliation_organiozation: 'Affiliation Organiozation',

  settings: 'Settings',
  development: 'Development',

  graphql: 'graphql',
  database: 'Database',
  github: 'GitHub',

  username: 'User Name',
  password: 'Password',

  locale_ja: 'Japanese',
  locale_en: 'English',
};

// undefined可能に変換して物をタイプとする
export type messagesType = Partial<typeof enMessages>;
