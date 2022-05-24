import { defineConfig, splitVendorChunkPlugin } from 'vite';
import JSX from '@vitejs/plugin-react';
import Radar from 'vite-plugin-radar';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
	plugins: [
		splitVendorChunkPlugin(),
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