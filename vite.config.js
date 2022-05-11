const { defineConfig, splitVendorChunkPlugin } = require('vite');

module.exports = defineConfig({
	plugins: [
		splitVendorChunkPlugin(),
	],
});