import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import JSX from '@vitejs/plugin-react';
import Radar from 'vite-plugin-radar';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
	plugins: [
		splitVendorChunkPlugin(),
		VitePWA(),
		JSX(),
		Radar({
			analytics: {
				id: 'G-K2RVE6WEXM',
			},
		}),
		createHtmlPlugin({
			minify: true,
		}),
	],
});