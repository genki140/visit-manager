import React from 'react';
import Layout from '@/components/layout';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();
  return (
    <Layout title="ページが見つかりません">
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          router.back();
        }}
      >
        前の画面に戻る
      </Button>
    </Layout>
  );
};
export default Custom404;
