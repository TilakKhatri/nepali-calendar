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
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
        inlineSources: true,
      }),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        include: ['src/**/*', 'node_modules/**'],
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                ie: '11'
              },
              modules: false,
            },
          ],
          '@babel/preset-react'
        ],
        plugins: ['@babel/plugin-transform-class-properties'],
      }),
    ],
    external: ['react', 'react-dom'],
  },
  // jQuery build
  {
    input: './src/jquery/index.ts',
    output: [
      {
        file: 'dist/jquery.esm.js',
        format: 'esm',
        sourcemap: true,
        name: 'NepaliDatePicker',
      },
      {
        file: 'dist/jquery.js',
        format: 'umd',
        sourcemap: true,
        name: 'NepaliDatePicker',
        globals: {
          jquery: '$',
          react: 'React',
          'react-dom': 'ReactDOM'
        },
      },
    ],
    plugins: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
        inlineSources: true,
      }),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        include: ['src/**/*', 'node_modules/**'],
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                ie: '11'
              },
              modules: false,
            },
          ],
          '@babel/preset-react'
        ],
        plugins: ['@babel/plugin-transform-class-properties'],
      }),
    ],
    external: ['react', 'react-dom', 'jquery'],
  },

];
