import chainWebpack from "./chainWebpack.config";
import routes from './router.config'
const cwd = process.cwd();

 const slash = input => {
    const isExtendedLengthPath = /^\\\\\?\\/.test(input);
  
    if (isExtendedLengthPath) {
      return input;
    }
  
    return input.replace(/\\/g, '/');
  };

export default {
  history: 'hash',
  outputPath: `../../dist/renderer`,
  publicPath: './',
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: true,
        title: 'umi-electron-typescript',
        dll: true,
        routes: {
          exclude: [],
        },
        hardSource: false,
        routes: {
          exclude: [/components/],
        },
      },
    ],
  ],
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const cbPath = match[1].replace('.less', '');
        const arr = slash(cbPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `lcb${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  routes,
  chainWebpack,
};
