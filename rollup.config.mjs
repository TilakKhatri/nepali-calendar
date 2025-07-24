import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
      }),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        // Remove exclude to allow transpiling dependencies
        presets: [
          [
            '@babel/preset-env',
            {
              targets: '>0.25%, not dead',
              modules: false,
            },
          ],
          '@babel/preset-react'
        ],
        plugins: ['@babel/plugin-transform-class-properties'],
      }),
    ],
  },
];
