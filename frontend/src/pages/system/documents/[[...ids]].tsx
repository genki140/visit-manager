import fs from 'fs';
import path from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/layouts';
import Enumerable from 'linq';
import dynamic from 'next/dynamic';
import { TypeUtil } from '@/utils/type-helper';
import matter from 'gray-matter';

// markdown変換は、@next/mdxは使用せずに実装している（細かい制御がしずらいため）
// 参考資料：https://zenn.dev/thiragi/articles/ce13a4be4110c0

// posts はビルド時に getStaticProps() によって生成されます。
const Blog = (props: {
  frontmatter: { [key: string]: any };
  html: string;
  path: string;
  filePath: string;
  locale: string;
}) => {
  // const filePath = 'src/' + props.filePath;
  // console.log(filePath);
  // // ホットリロードのために読み込む
  // const filePath = '/home/project/frontend/src/documents/dir/index.ja.mdx';
  // const Mdx = dynamic(() => import(`${filePath}`), {});

  return (
    <Layout title="ドキュメント">
      {/* <Mdx /> */}
      <div>{props.path}</div>
      <div>{props.filePath}</div>
      <div>{props.locale}</div>
      <div>{props.frontmatter?.title}</div>
      <div>{props.html}</div>
    </Layout>
  );
};
export default Blog;

// すべてのパス情報を取得。(特定の言語にしかないドキュメントは別の言語でもその言語を使用する)
export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const pathGroups = getDocuments();
  const pathes: Array<{ params: { ids: string[] }; locale?: string }> = [];
  for (const pathGroup of pathGroups) {
    for (const locale of locales ?? []) {
      pathes.push({ params: { ids: pathGroup.key() === '' ? [] : pathGroup.key().split('/') }, locale });
    }
  }

  return {
    paths: pathes,
    fallback: false, // 開発時はtrueが良いかもしれない
  };
};

// ページ情報生成
export const getStaticProps: GetStaticProps = async (context) => {
  const jointIds = TypeUtil.toArray(context.params?.ids ?? []).join('/');
  const pathGroup = TypeUtil.toNonNullable(getDocuments().find((x) => x.key() === jointIds)).toArray();

  // pathGroupには [ja] 等用意されているものが入る。context.localesは、必要な全言語 [ja,en] 等が入る。
  // context.localeがpathGroupにあればそれを、なければcontext.localesの順に最初にあったものを採用。
  const locales = (context.locale != null ? [context.locale] : []).concat(context.locales ?? []);
  const pathInfo = TypeUtil.toNonNullableItems(locales.map((locale) => pathGroup.find((x) => x.locale === locale)))[0];
  const markdown = matter(fs.readFileSync(pathInfo.fullPath).toString());

  // HTML化
  const html = (await markdownToHtml(markdown.content)).toString();

  // console.log(pathInfo.fullPath);
  // const Mdx = dynamic(() => import(pathInfo.fullPath), {});
  // console.log(Mdx);

  const srcDir = path.join(process.cwd(), 'src/');

  return {
    props: {
      frontmatter: markdown.data,
      html: html,
      path: pathInfo.path,
      filePath: pathInfo.fullPath.substr(srcDir.length),
      fullPath: pathInfo.fullPath,
      locale: pathInfo.locale,
    },
  };
};

import unified from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

export const markdownToHtml = async (markdown: string) =>
  unified() // unifiedライブラリの処理をまとめる
    .use(remarkParse) // Markdownをmdast(Markdownの抽象構文木)に変換
    .use(remarkRehype) // mdastをhast(HTMLの抽象構文木)に変換
    // .use(rehypeShiki, {
    //   highlighter: await shiki.getHighlighter({
    //     theme: 'nord',
    //   }),
    // }) // shikiハイライターでコードブロックをハイライト
    .use(rehypeStringify) // hastをHTMLに変換
    .processSync(markdown); // 上記の処理を行うデータをここで受け取る

import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { fileURLToPath } from 'url';

const getDocuments = () => {
  const readdirRecursively = (dir: string, files: string[] = []) => {
    const paths = fs.readdirSync(dir);
    const dirs = [];
    for (const path of paths) {
      const stats = fs.statSync(`${dir}/${path}`);
      if (stats.isDirectory()) {
        dirs.push(`${dir}/${path}`);
      } else {
        files.push(`${dir}/${path}`);
      }
    }
    for (const d of dirs) {
      files = readdirRecursively(d, files);
    }
    return files;
  };

  // すべてのmdxファイルを取得(拡張子を除き、言語を取得)
  const postDir = path.join(process.cwd(), 'src/documents');

  const pathGroups = Enumerable.from(readdirRecursively(postDir))
    .where((x) => path.extname(x) === '.mdx') // .mdxのみ
    .select((x) => {
      // 拡張子と親パスを除外
      let path = x.substr(postDir.length + 1, x.lastIndexOf('.') - (postDir.length + 1));
      // locale取得
      let locale = path.lastIndexOf('.') === -1 ? '' : path.substr(path.lastIndexOf('.') + 1);
      if (locale !== '') {
        path = path.substr(0, path.length - (locale.length + 1));
      } else {
        locale = 'en';
      }
      // index はディレクトリ名を採用
      path = path.endsWith('/index') ? path.slice(0, -'/index'.length) : path;
      // ルートのindexも処理
      path = path === 'index' ? '' : path;

      return { fullPath: x, path, locale: locale };
      // const pathes = path === 'index' ? [] : path.split('/');
    })
    .groupBy((x) => x.path)
    .toArray();
  return pathGroups;
};

// // [...id].tsx
// import React from 'react';
// import { GetStaticPaths, GetStaticProps } from 'next';
// import dynamic from 'next/dynamic';
// import Layout from '@/components/layouts';

// interface Props {
//   resourceId: string;
//   frontMatter: any; //FrontMatter;
// }

// const Post: React.FC<Props> = (props: Props) => {
//   const { resourceId, frontMatter } = props;
//   // MDX ファイルを dynamic import してコンテンツとして埋め込む
//   const MDX = dynamic(() => import(`@/posts/${resourceId}.mdx`));
//   return (
//     <Layout frontMatter={frontMatter}>
//       <MDX />
//     </Layout>
//   );
// };

// // 全ての.mdxのファイル名の配列を返す
// import fs from 'fs';
// import path from 'path';

// // <root>/posts/docs/配下の.mdxファイルを指定。
// const postDir = path.join(process.cwd(), 'posts/docs/');

// export const getMarkdownPostsPaths = async () => {
//   const postList = fs.readdirSync(postDir).map((path) => path.split(/\.mdx/)[0]);
//   return postList;
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const mdxPaths = await getMarkdownPostsPaths();
//   const paths = mdxPaths.map((path) => ({ params: { post: path } }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const resourceId = (params.id as string[]).join('/');
//   // 各パスに対応する MDX ファイルのメタ情報とパス情報を Props として渡す
//   const post = await mdxUtil.getPostByResourcePath(resourceId);
//   return {
//     props: {
//       resourceId,
//       frontMatter: post.frontMatter,
//     },
//   };
// };
