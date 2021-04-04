module.exports = {
  client: {
    name: "My Client Project",
    includes: ["./frontend/src/**/*.tsx"],
    service: {
      name: "schemafile",
      localSchemaFile: "./backend/schema.graphql",
    },
  },
};
