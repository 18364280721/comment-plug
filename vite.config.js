import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './viteEnv',
  server: {
    port: 8090,
    strictPort: true
  },
  plugins: [vue()]
})
