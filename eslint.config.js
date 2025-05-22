import defineEslintConfig from '@antfu/eslint-config';

export default defineEslintConfig({
  stylistic: {
    semi: true,
    overrides: {
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    },
  },
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'type'],
    },
  },
  vue: {
    overrides: {
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
      'vue/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    },
  },
  jsx: false,
});
