import path from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@entities': path.resolve(__dirname, './src/entities'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@src': path.resolve(__dirname, './src'),
			'@widgets': path.resolve(__dirname, './src/widgets'),
			'@features': path.resolve(__dirname, './src/features'),
			'@shared': path.resolve(__dirname, './src/shared'),
			'@styles': path.resolve(__dirname, './src/shared/styles/index.scss'),
			'@app': path.resolve(__dirname, './src/app'),
			'@globalTypes': path.resolve(__dirname, './types')
		}
	}
})
