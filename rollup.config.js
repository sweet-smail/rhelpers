import typescript from '@rollup/plugin-typescript';
import path from 'path';
export default {
  input: path.resolve(__dirname, 'src/index.ts'),
  external: ['react'],
  output: [
    {
      file: 'lib/cjs.js',
      format: 'cjs',
    },
    {
      file: 'lib/esm.js',
      format: 'esm',
    },
    {
      file: 'lib/umd.js',
      format: 'umd',
      name: 'rhelper',
    },
    {
      file: 'lib/amd.js',
      format: 'amd',
    },
  ],
  plugins: [
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript'),
    }),
  ],
};
