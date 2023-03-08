const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

module.exports = {
  entry: {
    index: {
      import: path.join(__dirname, "src", "index.js"),
    },
    style: path.join(__dirname, "src", "style.scss"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[contenthash:8].js",
    assetModuleFilename: path.join("images", "[name].[contenthash][ext]"),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              ["svgo", { name: "preset-default" }],
            ],
          },
        },
      }),
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext][query]",
        },
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: path.join("icons", "[name].[contenthash][ext]"),
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html",
      chunks: ["index", "style"],
      inject: (entryPointName) =>
        entryPointName === "index" || entryPointName === "style"
          ? "head"
          : "body",
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "differ.html"),
      filename: "differ.html",
      chunks: ["style"],
      inject: (entryPointName) =>
        entryPointName === "style" ? "head" : "body",
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "catering.html"),
      filename: "catering.html",
      chunks: ["style"],
      inject: (entryPointName) =>
        entryPointName === "style" ? "head" : "body",
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "home-order.html"),
      filename: "home-order.html",
      chunks: ["style"],
      inject: (entryPointName) =>
        entryPointName === "style" ? "head" : "body",
    }),
    // new HtmlWebpackIncludeAssetsPlugin({
    //   assets: ["path/to/chunked/html/file.html"],
    //   append: false,
    // }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ["dist"],
        },
        onEnd: {
          copy: [
            {
              source: path.join("src", "static"),
              destination: "dist",
            },
          ],
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, "src"),
    port: 8080,
  },
};
