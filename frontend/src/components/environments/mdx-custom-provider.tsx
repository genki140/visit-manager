import { MDXProvider } from '@mdx-js/react';

// ここでしか使わないのでここに定義
export const CustomLink = (props: { children: string; href: string }) => {
  return <div>{props.href}</div>;
};

const mdComponents = {
  a: CustomLink,
};

export const MdxCustomProvider = (props: { children: any }) => {
  return <MDXProvider components={mdComponents}>{props.children}</MDXProvider>;
};
