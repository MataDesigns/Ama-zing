module.exports = {
    mode: "production",
    devtool: 'source-map',
    entry: './src/index.ts',
    output: {
      filename: 'bundle.js',
      format: 'cjs'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        { test: /\.ts$/, loader: 'ts-loader' }
      ]
    }
  }