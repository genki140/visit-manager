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
  return (
    <Layout title="山の下の区域地図">
      <div>ここは区域地図のルートページ。</div>
      {router.query.areaName}
    </Layout>
  );
};
export default IndexPage;
