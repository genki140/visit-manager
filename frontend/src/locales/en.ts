// 英語のメッセージを定義
export const enMessages = {
  home: 'Home',
  visitManage: 'Visit Manage',
  login: 'Login',
  logout: 'Logout',
};

// undefined可能に変換して物をタイプとする
export type messagesType = Partial<typeof enMessages>;
