module.exports = {
  mode: "production",
  devtool: 'source-map',
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'ts-loader'
    }]
  }
}