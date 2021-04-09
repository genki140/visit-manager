import React from 'react';
import { makeStyles, Tab, Tabs } from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import MainSettings from '@/components/settings/main';
import UserSettings from '@/components/settings/users';
import ErrorPage from 'next/error';
import Link from 'next/link';
import AreaSettings from '@/components/settings/area-settings';

// ファイル名[[...id]].tsxは、settings以降の存在する全てのパスに対応する。

const useStyles = makeStyles((theme) => ({}));

const Page = () => {
  const classes = useStyles();
  const router = useRouter();
  const organizationName = (router.query.organizationName ?? '').toString();
  const organizationPath = organizationName === '' ? '' : '/' + organizationName;
  // const app = useAppState().app;

  // 設定URLとコンポーネント対応
  const settings = [
    {
      url: '',
      title: '基本設定',
      component: () => <MainSettings />,
    },
    {
      url: 'areas',
      title: 'エリア管理',
      component: () => <AreaSettings />,
    },
  ];
  const settingIndex = settings.findIndex((x) => x.url === ((router.query.id ?? [])[0] ?? ''));
  if ((router.query.id?.length ?? 0) >= 2 || settingIndex === -1) {
    return <ErrorPage statusCode={404} />;
  }
  const setting = settings[settingIndex];

  return (
    <Layout title={organizationName + ' － ' + setting.title}>
      <Tabs value={settingIndex} aria-label="simple tabs example">
        {settings.map((x) => (
          <Link
            href={organizationPath + '/settings'}
            as={organizationPath + '/settings' + (x.url === '' ? '' : '/' + x.url)}
            key={x.url}
          >
            <Tab label={x.title} />
          </Link>
        ))}
      </Tabs>
      {setting.component()}
    </Layout>
  );
};
export default Page;
