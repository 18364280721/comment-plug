import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // 设置相对路径
  envDir: './viteEnv',
  server: {
    cors: true, // 默认启用并允许任何源
    open: true, // 运行自动打开浏览器
    host: true, // 指定服务器主机名 服务暴露在网络中 '0.0.0.0' or true
    port: 8090, // 端口号
    strictPort: true, // 若8090端口被占用,直接结束项目
    proxy: { // 跨域代理配置及反向代理配置，注意rewrite写法
      '/api': {
        target: 'http://192.168.99.223:3000',   //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  // 配置文件别名 vite1.0是/@/  2.0改为/@
  // 这里是将src目录配置别名为 /@ 方便在项目中导入src目录下的文件
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // css: { // 样式相关规则
  //   preprocessorOptions: {
  //     scss: {
  //       // 加载全局样式
  //       additionalData: `@use './src/assets/styles/var.scss';
  //                      @use './src/assets/styles/common.scss';`,
  //     },
  //   },
  // },
  optimizeDeps: { // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
    include: ['axios'], // 强制预构建的依赖项
    exclude: [] // 在预构建中强制排除的依赖项
  },
  // 打包配置
  build: {
    target: 'modules',
    outDir: 'dist', //指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    terserOptions: { // 生产环境取消 console
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    },
     rollupOptions: { //会打包出 css js 等文件夹 目录显得清晰
      output: {
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "[ext]/[name]-[hash].[ext]",
      }
    }
  },
  plugins: [vue()] // 配置需要使用的插件列表，这里将vue添加进去
})


// .env                # 所有情况下都会加载
// .env.local          # 所有情况下都会加载，但会被 git 忽略
// .env.[mode]         # 只在指定模式下加载
// .env.[mode].local   # 只在指定模式下加载，但会被 git 忽略