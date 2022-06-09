import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'
import { viteMockServe } from 'vite-plugin-mock'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 设置相对路径
  envDir: './viteEnv',
  server: {
    cors: true, // 默认启用并允许任何源
    open: true, // 运行自动打开浏览器
    host: true, // 指定服务器主机名 服务暴露在网络中 '0.0.0.0' or true
    port: 8090, // 端口号
    strictPort: true, // 若8090端口被占用,直接结束项目
    proxy: { // 跨域代理配置及反向代理配置，注意rewrite写法
      '/api': {
        target: 'http://192.168.99.223:3000', // 代理接口
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
  //     }
  //   }
  // },
  optimizeDeps: { // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
    include: ['axios'], // 强制预构建的依赖项
    exclude: [] // 在预构建中强制排除的依赖项
  },
  // 打包配置
  build: {
    target: 'modules',
    outDir: 'dist', // 指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    terserOptions: { // 生产环境取消 console
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: { // 会打包出 css js 等文件夹 目录显得清晰
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    eslintPlugin({ // 配置需要使用的插件列表，这里将vue添加进去
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    }),
    viteMockServe({
      supportTs: false, // 是否读取ts文件模块，设置为true时不能读取js文件
      logger: false, // 是否在控制台显示请求日志
      mockPath: './src/mock/' // 设置模拟数据的存储文件夹，如果不是index.js需要写明完整路径
      // ignore: RegExp | ((fileName: string) => boolean);--读取文件时忽略指定格式的文件
      // watchFiles: boolean;--是否监视mockPath文件夹内文件的修改
      // localEnabled: boolean;--设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
      // ignoreFiles: string[]; --读取文件时忽略的文件
      // configPath: string;--设置模拟读取的数据条目。 当文件存在并且位于项目根目录中时，将首先读取并使用该文件。 配置文件返回一个数组
      // prodEnabled: boolean;--设置打包是否启用 mock 功能
      // injectFile: string;--如果生产环境开启了 mock 功能,即prodEnabled=true.则该代码会被注入到injectFile对应的文件的底部。默认为main.{ts,js}。这样做的好处是,可以动态控制生产环境是否开启 mock 且在没有开启的时候 mock.js 不会被打包。如果代码直接写在main.ts内，则不管有没有开启,最终的打包都会包含mock.js
      // injectCode: string;--injectCode代码注入的文件,默认为项目根目录下src/main.{ts,js}
    })
  ]
})

// .env                # 所有情况下都会加载
// .env.local          # 所有情况下都会加载，但会被 git 忽略
// .env.[mode]         # 只在指定模式下加载
// .env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
