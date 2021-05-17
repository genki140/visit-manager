// loaderはjsで書く必要があるのか。

const matter = require('gray-matter');
const stringifyObject = require('stringify-object');

module.exports = async function (src) {
  const callback = this.async();
  const { content, data } = matter(src);
  const title = data.title == null ? '' : data.title;

  // default以外のexportがあるとFast Refreshが効かなくなるので、レイアウトなどは全部ここで突っ込む

  return callback(
    null,
    `
${content}

import { Layout } from '@/components/layouts';
export default ({ children }) => <Layout title="${title}">{children}</Layout>;
    `,
  );
};
