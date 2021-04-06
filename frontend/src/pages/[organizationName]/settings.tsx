import React, { useEffect } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import MainSettings from '@/components/settings/main';
import UserSettings from '@/components/settings/users';
import ErrorPage from 'next/error';
import Link from 'next/link';

const SettingsPage = () => {
  const router = useRouter();
  const organizationName = (router.query.organizationName ?? '').toString();
  return (
    <Layout title="山の下の区域-設定">
      <div>ここは組織の設定ページ。 権限によって表示内容は異なる</div>
      {organizationName}
      <Link href={'/' + organizationName}>組織トップへ</Link>
    </Layout>
  );
};
export default SettingsPage;
