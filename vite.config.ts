import path from 'node:path';
import url from 'node:url';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig, type UserConfigExport } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

const directoryName = path.dirname(url.fileURLToPath(import.meta.url));

const configuration: UserConfigExport = {
	build: {
		outDir: path.resolve(path.join(directoryName, 'build')),
		emptyOutDir: true,
	},

	plugins: [svelte(), tsConfigPaths()],

	server: {
		port: 8080,
	},
};

export default defineConfig(configuration);
