import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.app.json'],
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['react', 'react-hooks', 'import', 'prettier'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: { project: './tsconfig.app.json' },
      alias: { map: [['@', './src']], extensions: ['.ts', '.tsx', '.js', '.jsx'] }
    }
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }],
    'prettier/prettier': ['error'],
  },
}
