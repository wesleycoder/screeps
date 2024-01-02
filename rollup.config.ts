import type { RollupOptions } from 'rollup'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const config: RollupOptions = {
  input: ['src/main.ts'],
  output: {
    name: 'main',
    format: 'cjs',
    compact: true,
    file: `${process.env.SCREEPS_DIST_DIR ?? 'dist'}/main.js`,
    strict: false,
  },
  plugins: [
    nodeResolve(),
    typescript({ tsconfig: './tsconfig.json' }),
    commonjs(),
    babel({ babelHelpers: 'bundled', extensions: ['.ts', '.js'] }),
    terser(),
  ],
}

export default config
