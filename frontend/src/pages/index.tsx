import React from 'react';
import Layout from '@/components/layout';
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
