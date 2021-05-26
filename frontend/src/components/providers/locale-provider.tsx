import { IntlProvider } from 'react-intl';
import { locales } from '@/locales';
import { useRouter } from 'next/router';

export const LocaleProvider = (props: { children: any }) => {
  const router = useRouter();
  return (
    <IntlProvider
      locale={router.locale ?? 'en'}
      defaultLocale={router.defaultLocale}
      messages={(locales as any)[router.locale ?? 'en']}
    >
      {props.children}
    </IntlProvider>
  );
};
