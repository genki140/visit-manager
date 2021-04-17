import React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import Map from '@/components/map';
import ErrorPage from 'next/error';
import Link from 'next/link';

// 地図ページ。設定画面と兼用

const IndexPage = () => {
  const router = useRouter();
  const organizationName = (router.query.organizationName ?? '').toString();
  const organizationPath = '/' + organizationName;
  const areaName = (router.query.areaName ?? '').toString();
  const areaPath = (organizationName === '' ? '' : '/' + organizationName) + (areaName === '' ? '' : '/' + areaName);

  // この区域がユーザーに配られていなければ404を表示する
  if (router.query.id == null) {
    // 通常モード
  } else if (router.query.ids[0] === 'settings') {
    // 設定モード
    // 設定モードでは、保存とキャンセルの操作を下に表示？
  } else {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout title="山の下の区域地図" fillContent={true}>
      <Map />
      {/* 
      <div>ここは区域地図のルートページ。</div>
      {router.query.areaName} */}
    </Layout>
  );
};
export default IndexPage;
