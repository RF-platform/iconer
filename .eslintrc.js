module.exports = {
  parserOptions: {
    project: ['./tsconfig.app.json'],
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.app.json',
      },
      alias: {
        map: [
          ['@', './src'],
          ['@app', './src/app'],
          ['@processes', './src/processes'],
          ['@pages', './src/pages'],
          ['@features', './src/features'],
          ['@entities', './src/entities'],
          ['@widgets', './src/widgets'],
          ['@shared', './src/shared'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      }
    }
  }
} 