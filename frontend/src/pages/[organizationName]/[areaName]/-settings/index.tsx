import React from 'react';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout';
import Link from 'next/link';

const SettingsPage = () => {
  const router = useRouter();
  const organizationName = (router.query.organizationName ?? '').toString();
  const organizationPath = organizationName === '' ? '' : '/' + organizationName;
  const areaName = (router.query.areaName ?? '').toString();
  const areaPath = organizationPath + (areaName === '' ? '' : '/' + areaName);

  return (
    <Layout title={organizationName + '-' + areaName + '-設定'}>
      <div>ここは区域の設定ページ。 権限によって表示内容は異なる</div>
      {organizationName}
      <Link href={organizationPath}>
        <Button variant="contained" color="primary">
          組織トップへ
        </Button>
      </Link>
      <Link href={areaPath}>
        <Button variant="contained" color="primary">
          区域画面へ
        </Button>
      </Link>
    </Layout>
  );
};
export default SettingsPage;
