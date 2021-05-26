import Link from 'next/link';
import Image from 'next/image';
import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import { Typography } from '@material-ui/core';

// <a></a>リンクを必要に応じて next/link にするカスタムリンク。ここでしか使わないのでここに定義

// 本コンポーネントはmdx専用なのでAPPには置かず、ローダー内で動的に配置している。

const CustomLink = (props: { children: string; href: string }) =>
  props.href.startsWith('http://') === false && props.href.startsWith('https://') === false ? (
    <Link href={'/system/documents/' + props.href}>
      <a>{props.children}</a>
    </Link>
  ) : (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );

const CustomImage = (props: { src: string; width: number; height: number }) => {
  return (
    <div style={{ marginTop: 10, marginBottom: 10 }}>
      <Image src={props.src} width={props.width} height={props.height} />
    </div>
  );
};

// リンク、画像、見出し系を差し替える
const mdComponents = {
  a: CustomLink,
  img: CustomImage,
  h2: (props: { children: any }) => <Typography variant="h2">{props.children}</Typography>,
  h3: (props: { children: any }) => <Typography variant="h3">{props.children}</Typography>,
  h4: (props: { children: any }) => <Typography variant="h4">{props.children}</Typography>,
  h5: (props: { children: any }) => <Typography variant="h5">{props.children}</Typography>,
  h6: (props: { children: any }) => <Typography variant="h6">{props.children}</Typography>,
};

export const MdxCustomProvider = (props: { children: any }) => {
  return <MDXProvider components={mdComponents}>{props.children}</MDXProvider>;
};
