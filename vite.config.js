const { defineConfig, splitVendorChunkPlugin } = require('vite');
const { VitePWA } = require('vite-plugin-pwa');
const JSX = require('@vitejs/plugin-react');
const compress = require('vite-plugin-compress');

module.exports = defineConfig({
	plugins: [
		splitVendorChunkPlugin(),
		VitePWA(),
		JSX(),
		compress(),
	],
});