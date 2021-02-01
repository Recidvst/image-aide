import babel from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import { terser } from "rollup-plugin-terser";
const outputPath = 'dist';

export default {
  input: 'client.js',
  output: [
    {
      file: `${outputPath}/imgaide.cjs.js`,
      format: 'cjs'
    },
    {
      file: `${outputPath}/imgaide.esm.js`,
      format: 'esm'
    },
    {
      name: 'ImageAide',
      file: `${outputPath}/imgaide.umd.js`,
      format: 'umd'
    },
    {
      name: 'ImageAide',
      file: `${outputPath}/imgaide.iife.js`,
      format: 'iife'
    },
    {
      name: 'ImageAide',
      file: `${outputPath}/imgaide.min.js`,
      format: 'iife'
    }
  ],
  plugins: [
    eslint(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**'
    }),
    terser()
  ]
}