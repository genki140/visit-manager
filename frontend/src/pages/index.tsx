import React from 'react';
import Link from 'next/link';
import Layout from '@/components/layout';
import Counter from '@/components/counter';
import Tasks from '@/components/Tasks';
import Map from '@/components/map';

const IndexPage = () => (
  <Layout title="地図表示">
    {/* <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    <Counter caption="aacああccab" />
    <Tasks /> */}
    <Map></Map>
  </Layout>
);
export default IndexPage;
