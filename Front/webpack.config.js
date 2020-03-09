const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: "babel-loader",
				},
				exclude: /node_modules/,
			},
			{
				test: /\.html$/,
				use: {
					loader: "html-loader",
				},
				resolve: {
					extensions: [".js", ".jsx"],
				},
			},
		],
	},
	plugins: [
		new HtmlPlugin({
			template: "src/index.html",
			filename: "index.output.html",
		}),
	],
};
