import React from 'react';
import Layout from '@/components/layout';
import Map from '@/components/map';
import { Button } from '@material-ui/core';
import Link from 'next/link';

const IndexPage = () => {
  return (
    <Layout title="訪問管理">
      <div>ここはユーザーのルートページ。</div>
      <div>所属している組織の表示、招待されている組織への参加承認、新規組織の作成等を行う。</div>

      <Link href="山の下会衆">
        <Button variant="contained" color="primary">
          山の下会衆の区域
        </Button>
      </Link>

      <Button variant="contained" color="primary">
        新規組織の作成
      </Button>
    </Layout>
  );
  // <Map></Map>
};
export default IndexPage;
