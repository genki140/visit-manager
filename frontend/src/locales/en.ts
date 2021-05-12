// 英語のメッセージを定義
export const enMessages = {
  home: 'Home',
  visit_manage: 'Visit Manage',
  login: 'Login',
  logout: 'Logout',
  affiliation_organiozation: 'Affiliation Organiozation',
};

// undefined可能に変換して物をタイプとする
export type messagesType = Partial<typeof enMessages>;
