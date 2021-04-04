// 本ファイルはvscodeの拡張 Apollo GraphQLによる、コード上のgql``を補完するための設定。
// 本来frontendディレクトリ内からの相対パスで指定したいが、拡張がその様な設定に対応していないのでこのようにしている。(codegenと共通化したいところ。)

module.exports = {
  client: {
    name: "client",
    includes: ["./frontend/src/**/*.tsx"],
    service: {
      name: "server",
      localSchemaFile: "./backend/schema.graphql",
    },
  },
};
