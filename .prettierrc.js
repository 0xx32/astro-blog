/** @type {import("prettier").Config} */
export default {
	plugins: ['prettier-plugin-astro'],
	trailingComma: 'es5',
	tabWidth: 2,
	semi: false,
	singleQuote: true,
	jsxSingleQuote: false,
	bracketSpacing: true,
	useTabs: true,
	printWidth: 100,
	endOfLine: 'lf',
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
}
