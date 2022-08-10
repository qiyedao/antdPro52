import { defineConfig } from 'umi';
import { setFontSize } from './headScripts';
import routes from './routes';

export default defineConfig({
  favicon: '/assets/favicon.svg',
  plugins: [
    './plugins/favicon/customFavicon.ts',
    './plugins/tailwind/index.ts',
  ],
  tailwindcss: {
    // tailwindCssFilePath: '@/tailwind.css',//指定后需手动创建文件
    tailwindConfigFilePath: 'tailwind.config.js', // 默认取值 tailwindConfigFilePath || join(process.env.APP_ROOT || api.cwd, 'tailwind.config.js'),,
  },
  ssr: {},
  hash: true,
  exportStatic: {},
  nodeModulesTransform: {
    type: 'none',
  },
  metas: [
    {
      name: 'App-Config',
      content: 'fullscreen=yes,useHistoryState=yes,transition=yes',
    },
    { name: 'yes', content: 'apple-mobile-web-app-capable' },
    { name: 'yes', content: 'apple-touch-fullscreen' },
    { name: 'aplus-waiting', content: 'MAN' },
    {
      name: 'viewport',
      content:
        'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover',
    },
  ],
  dynamicImport: {
    loading: '@/components/Loading',
  },
  extraBabelPresets: [
    [
      '@emotion/babel-preset-css-prop',
      {
        autoLabel: 'dev-only',
        labelFormat: '[local]',
      },
    ],
  ],
  dva: {},
  antdMobile: {},
  // locale: {
  //   // default zh-CN
  //   default: 'zh-CN',
  //   antd: true,
  //   // default true, when it is true, will use `navigator.language` overwrite default
  //   baseNavigator: true,
  // },
  history: { type: 'browser' },
  routes,
  fastRefresh: {},
  headScripts: [{ src: '/jweixin-1.6.0.js' }, setFontSize],
  terserOptions: {
    compress: {
      drop_console: true,
    },
  },
  chainWebpack: function (config, { webpack }) {
    // config.plugin('antd-dayjs-webpack-plugin').use(AntdDayjsWebpackPlugin);
  },
});
