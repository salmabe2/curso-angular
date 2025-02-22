import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.{js,mjs,cjs,ts}', '*.html'] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			'no-unused-vars': 'error',
			'prettier/prettier': ['error', { parser: 'angular' }],
			'@angular-eslint/template/prefer-self-closing-tags': ['error']
		},
		extends: [
			'plugin:@angular-eslint/template/recommended',
			'plugin:prettier/recommended'
		]
	}
];
