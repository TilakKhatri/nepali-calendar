import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: false, // Disable source maps for smaller bundle
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: false, // Disable source maps for smaller bundle
    },
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: false, // Disable source maps
      inlineSources: false,
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      include: ['src/**/*'],
      exclude: ['node_modules/**'], // Exclude node_modules from bundling
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
            },
            modules: false,
          },
        ],
        '@babel/preset-react'
      ],
      plugins: ['@babel/plugin-transform-class-properties'],
    }),
  ],
  external: ['react', 'react-dom', 'date-fns', '@popperjs/core'],
};
