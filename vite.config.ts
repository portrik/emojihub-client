import path from 'node:path';
import url from 'node:url';

import { defineConfig, type UserConfigExport } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';

const directoryName = path.dirname(url.fileURLToPath(import.meta.url));

const configuration: UserConfigExport = {
	build: {
		outDir: path.resolve(path.join(directoryName, 'build')),
		emptyOutDir: true,
	},

	plugins: [tsConfigPaths(), react()],

	server: {
		port: 8080,
	},
};

export default defineConfig(configuration);
