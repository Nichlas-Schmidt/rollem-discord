const path = require('path')
const { IgnorePlugin } = require('webpack');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'node',
  node: {
    global: true,
    __filename: false,
    __dirname: false,
  },
  plugins: [
    new IgnorePlugin({ resourceRegExp: /^pg-native$/}),
    new FilterWarningsPlugin({
      exclude: [/hdb-pool/, /@sap\/hana-client/, /mongodb/, /mssql/, /mysql/, /mysql2/, /oracledb/, /pg/, /pg-query-stream/, /react-native-sqlite-storage/, /redis/, /sqlite3/, /sql.js/, /typeorm-aurora-data-api-driver/]
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: "**/*", to: "" },
    //   ],
    // }),
  ],
  output: {
    path: path.resolve(__dirname, '../dist/umd'),
    filename: 'index.js',
    library: 'exampleTypescriptPackage',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.ts(x*)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'config/tsconfig.umd.json',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
}