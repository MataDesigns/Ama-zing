module.exports = {
    mode: "production",
    devtool: 'source-map',
    entry: './src/index.ts',
    output: {
      filename: 'bundle.js'
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