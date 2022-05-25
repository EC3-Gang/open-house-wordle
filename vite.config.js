import { defineConfig, splitVendorChunkPlugin } from 'vite';
import JSX from '@vitejs/plugin-react';
import Radar from 'vite-plugin-radar';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
	plugins: [
		splitVendorChunkPlugin(),
		JSX(),
		visualizer({
			template: 'network',
		}),
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