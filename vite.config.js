import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import JSX from '@vitejs/plugin-react';
import compress from 'vite-plugin-compress';

export default defineConfig({
	plugins: [
		splitVendorChunkPlugin(),
		VitePWA(),
		JSX(),
		compress(),
	],
});