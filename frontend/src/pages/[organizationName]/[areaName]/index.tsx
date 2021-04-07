import React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import MainSettings from '@/components/settings/main';
import UserSettings from '@/components/settings/users';
import ErrorPage from 'next/error';
import Link from 'next/link';

const IndexPage = () => {
  const router = useRouter();
  const organizationName = (router.query.organizationName ?? '').toString();
  const organizationPath = '/' + organizationName;
  const areaName = (router.query.areaName ?? '').toString();
  const areaPath = (organizationName === '' ? '' : '/' + organizationName) + (areaName === '' ? '' : '/' + areaName);

  // この区域がユーザーに配られていなければ404を表示する

  return (
    <Layout title="山の下の区域地図">
      <div>ここは区域地図のルートページ。</div>
      {router.query.areaName}
    </Layout>
  );
};
export default IndexPage;
