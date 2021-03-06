import Link from 'next/link';
import Layout from '@/components/Layout';
import Counter from '@/components/counter';

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    <Counter caption="aacああccab" />
  </Layout>
);
export default IndexPage;
