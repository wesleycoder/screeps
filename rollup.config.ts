import type { RollupOptions } from 'rollup';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const config: RollupOptions = {
  input: ['src/main.ts'],
  output: {
    name: 'main',
    format: 'commonjs',
    compact: true,
    file: `${process.env.SCREEPS_DIST_DIR ?? 'dist'}/main.js`,
  },
  plugins: [
    nodeResolve(),
    typescript(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
  ],
};
export default config;
