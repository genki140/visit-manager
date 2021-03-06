import Link from 'next/link';
import Layout from '@/components/Layout';
import Counter from '@/components/counter';

const AboutPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home Test!!!</a>
      </Link>
    </p>
    <Counter caption="aacああccab" />
  </Layout>
);
export default AboutPage;
