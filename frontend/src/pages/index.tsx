import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Counter from '@/components/counter';
import Tasks from '@/components/Tasks';

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    <Counter caption="aacああccab" />
    <Tasks />
  </Layout>
);
export default IndexPage;
