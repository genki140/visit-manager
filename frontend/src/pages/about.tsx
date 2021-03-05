import Link from 'next/link';
import Counter from '@/components/counter';

const AboutPage = () => (
  <>
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home Test!!!</a>
      </Link>
    </p>
    <Counter caption="aacああccab" />
  </>
);
export default AboutPage;
