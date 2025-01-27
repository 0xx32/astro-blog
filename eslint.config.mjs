import antfu from '@antfu/eslint-config'
import perfectionist from 'eslint-plugin-perfectionist'

export default antfu(
  {
    vue: true,
    typescript: true,
    astro: true,
    stylistic: {
      quotes: 'single',
      useTabs: true,
    },
  },
  {
    rules: {
      'style/no-tabs': 'off',
      'style/no-mixed-spaces-and-tabs': 'off',
      'ts/ban-ts-comment': 'warn',
    },
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'type',
            ['builtin', 'external'],
            'internal-type',
            ['internal'],
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'style',
            'side-effect-style',
            'unknown',
          ],
          internalPattern: ['^~/.*', '^@/.*'],
          newlinesBetween: 'always',
          order: 'asc',
          type: 'natural',
        },
      ],
    },
  },
)
