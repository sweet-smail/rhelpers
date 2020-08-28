import typescript from '@rollup/plugin-typescript';
import path from 'path';
export default {
  input: path.resolve(__dirname, 'src/index.ts'),
  external: ['react'],
  output: [
    {
      file: 'lib/cjs.js',
      format: 'cjs', //commonjs node
    },
    {
      file: 'lib/esm.js',
      format: 'esm', //es6
    },
    {
      file: 'lib/umd.js',
      format: 'umd',
      name: 'rhelper',
    },
    {
      file: 'lib/amd.js',
      format: 'amd', //requirejs 定义得加载规范
    },
  ],
  plugins: [
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript'),
    }),
  ],
};
