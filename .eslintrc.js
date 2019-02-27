module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/script-indent': [
      'error',
      2,
      {
        'baseIndent': 1,
        'ignores': [
          '[value.type="ObjectExpression"]:not(:matches(ExportDefaultDeclaration, [left.property.name="exports"]) > * > [value.type="ObjectExpression"])',
          '[value.type="ArrayExpression"]'
        ]
      }
    ]
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
