// サーバー処理エラーをクライアントに返す際のコードを定義。
// サーバーに翻訳ロジックは実装しないため、必ずコードで返す。
export const ErrorCodes = {
  UNUSABLE_NAME: 'UNUSABLE_NAME',
} as const;

export type ErrorCodes = typeof ErrorCodes[keyof typeof ErrorCodes];
