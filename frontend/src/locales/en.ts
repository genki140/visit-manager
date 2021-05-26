// 英語のメッセージを定義
export const enMessages = {
  home: 'Home',
  visit_manager: 'Visit Manage',
  login: 'Login',
  logout: 'Logout',
  affiliation_organiozation: 'Affiliation Organiozation',

  settings: 'Settings',
  development: 'Development',

  graphql: 'graphql',
  database: 'Database',
  github: 'GitHub',

  ok: 'OK',
  cancel: 'Cancel',
  yes: 'Yes',
  no: 'No',
  create: 'Create',

  user_id: 'User ID',
  user_name: 'User Name',
  password: 'Password',
  password_confirm: 'Password(Confirm)',

  create_new_account: 'Create New Account',
  create_new_account_description: 'Create a user to join or create an organization',

  locale_ja: 'Japanese',
  locale_en: 'English',
};

// undefined可能に変換して物をタイプとする
export type messagesType = Partial<typeof enMessages>;
