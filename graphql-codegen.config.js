module.exports = {
  schema: 'schema.graphql',
  documents: 'packages/web-app/src/**/*.graphql',
  generates: {
    'packages/web-app/src/services/graphql/types.codegen.ts': {
      plugins: ['typescript'],
    },
    'packages/web-app/src/': {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: 'services/graphql/types.codegen.ts',
        extension: '.codegen.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
    },
  },
};
