module.exports = {
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ["prettier"],
	rules: {
		"prettier/prettier": ["error", require("./prettier.config")],
	},
};
