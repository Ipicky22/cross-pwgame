module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: "module",
	},
	env: {
		browser: true,
		es6: true,
		"jest/globals": true,
	},
	extends: ["plugin:@typescript-eslint/recommended", "prettier/@typescript-eslint", "plugin:prettier/recommended"],
	plugins: ["jest", "prettier"],
	rules: {
		"prettier/prettier": ["error", require("./prettier.config")],
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/no-explicit-any": "off",
	},
};
