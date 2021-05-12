// 型でIDを取ってくる仕組み
import { useIntl } from 'react-intl';
import { enMessages } from './en';
import { jaMessages } from './ja';

// とりあえず他の引数省略
export const useFormatMessage = () => {
  const intl = useIntl();
  return (getter: (messages: typeof enMessages) => string) => intl.formatMessage({ id: getter(sameKeyValueMessages) });
};
// 上の処理のgetterに渡す、値=keyになってるメッセージ
const sameKeyValueMessages = (() => {
  const defaultMessages = enMessages;
  const copiedMessages = Object.assign({}, defaultMessages) as any;
  for (const key of Object.keys(defaultMessages)) {
    copiedMessages[key] = key;
  }
  return copiedMessages;
})();

// console.log(sameKeyValueMessages);

const abc = (messages: any) => {
  const defaultMessages = enMessages;
  const copiedMessages = Object.assign({}, messages);
  for (const key of Object.keys(defaultMessages)) {
    if (copiedMessages[key] == null) {
      copiedMessages[key] = (defaultMessages as any)[key];
    }
  }
  return copiedMessages;
};

// 未定義のものはデフォルトに置き換える
export const locales = {
  en: enMessages,
  ja: abc(jaMessages),
};
