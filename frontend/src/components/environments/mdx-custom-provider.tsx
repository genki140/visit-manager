import Link from 'next/link';
import { MDXProvider } from '@mdx-js/react';

// <a></a>リンクを必要に応じて next/link にするカスタムリンク。ここでしか使わないのでここに定義

const CustomLink = ({ children, href }: { children: string; href: string }): JSX.Element =>
  href.startsWith('http://') === false && href.startsWith('https://') === false ? (
    <Link href={'/system/documents/' + href}>
      <a>{children}</a>
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );

const mdComponents = {
  a: CustomLink,
};

export const MdxCustomProvider = (props: { children: any }) => {
  return <MDXProvider components={mdComponents}>{props.children}</MDXProvider>;
};
