import typescript from '@rollup/plugin-typescript';

export default {
  input: '',
  external: ['react'],
  output: [
    {
      file: 'lib/cjs.js',
      format: 'cjs',
    },
    {
      file: 'lib/m.js',
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
  plugins: [typescript()],
};
