import React from 'react';
import { Button, Tab, Tabs } from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import MainSettings from '@/components/settings/main';
import UserSettings from '@/components/settings/users';
import ErrorPage from 'next/error';
import Link from 'next/link';

const IndexPage = () => {
  const router = useRouter();
  const organizationName = (router.query.organizationName ?? '').toString();
  return (
    <Layout title={organizationName}>
      <div>ここは組織のルートページ。 自分が保持している区域の一覧を表示する。</div>

      <Link href={'/' + organizationName + '/A-1'}>
        <Button variant="contained" color="primary">
          A-1
        </Button>
      </Link>
      <Link href={'/' + organizationName + '/A-2'}>
        <Button variant="contained" color="primary">
          A-2
        </Button>
      </Link>

      <Link href={'/' + organizationName + '/settings'}>組織設定</Link>
    </Layout>
  );
};
export default IndexPage;
