const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
  },
  devServer: {
    host: "localhost",
    port: "8888",
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)/,
        loader: "babel-loader",
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      // {
      //   test: /\.css$/i,
      //   use: ["style-loader", "css-loader"],
      // },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader",'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new InterpolateHtmlPlugin({PUBLIC_URL: '' }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: "./",
          globOptions: {
            ignore: ["**/index.html", "**/.DS_Store"],
          },
        },
      ],
    }),
  ],
};
