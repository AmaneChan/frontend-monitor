module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'linebreak-style': ['error', 'windows'],
		'no-var': 'error',
		'comma-style': ['error', 'last'],
		'no-unused-vars': 'warn',
	}
}
