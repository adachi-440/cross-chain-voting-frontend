module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    // TypeScriptでチェックされる項目をLintから除外する設定
    'plugin:@typescript-eslint/recommended',
    // prettierのextendsは他のextendsより後に記述する
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import', 'unused-imports'],
  // ESLintでTypescriptを解析する
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    // TypeScriptのLint時に参照するconfigファイルを指定
    project: './tsconfig.json',
  },
  // 上位ディレクトリにある親のeslintrcを参照しないようにする
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': 'off', // or "no-unused-vars"
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    'import/order': [
      'error',
      {
        // グループごとの並び順
        groups: [
          'builtin', // 1. fsや path などの node "builtin" のモジュール
          'external', // 2. npm install したパッケージ
          'internal', // 3. webpack などでパス設定したモジュール
          ['parent', 'sibling'], // 4. 親階層と小階層のファイル
          'object', // object"-imports
          'type', // 型だけをインポートする type imports
          'index', // 同階層のファイル
        ],
      },
    ],
  },
}