const matter = require('gray-matter');
const path = require('path');
const sizeOf = require('image-size');

module.exports = async function (src) {
  const callback = this.async();
  let { content, data } = matter(src);
  const title = data.title == null ? '' : data.title;

  // 画像にサイズ情報を含める（本当は構造が出来てから操作した方がいいがとりあえず対応）
  content = content.replace(/!\[(.*?)]\((.*?)\)/g, function (match, p1, p2) {
    try {
      const imageDir = path.join(process.cwd(), 'public', p2);
      var d = sizeOf(imageDir);
      return `<div className="markdown-image-container"><img src="${p2}" alt="${p1}" width="${d.width}" height="${d.height}" /></div>`;
    } catch {
      return `<div className="markdown-image-container"><img src="${p2}" alt="${p1}" width="${50}" height="${50}" /></div>`;
    }
  });

  // default以外のexportがあるとFast Refreshが効かなくなるので、レイアウトなどは全部ここで突っ込む
  return callback(
    null,
    `
${content}

import { MdxCustomProvider } from '@/components/providers/mdx-custom-provider';
import { Image } from 'next/image';
import { Layout } from '@/components/layouts';
export default ({ children }) => (
  <Layout title="${title}">
    <MdxCustomProvider>
      {children}
    </MdxCustomProvider>
  </Layout>
);`,
  );
};
