const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

function config(project) {
  return {
    mode: 'production',
    entry: `./projects/${project}`,
    module: {
      rules: [
        {
          test: /\.ts?$/,
          exclude: [/node_modules/],
          loader: "ts-loader",
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, './tsconfig.json') }),
      ],
    },
  }
}

// ENGINE
const engine = {
  ...config('engine'),
  output: {
    path: path.resolve(__dirname, 'projects/engine/dist'),
    filename: 'index.js',
    library: 'pluginEngine',
    libraryTarget: 'umd',
  },
}

// CLIENT
const client = {
  ...config('client'),
  output: {
    path: path.resolve(__dirname, 'projects/client/dist'),
    filename: 'index.js',
    library: 'remixPlugin',
    libraryTarget: 'umd',
  }
}

// Websocket client
const wsClient = {
  ...config('client-ws'),
  output: {
    path: path.resolve(__dirname, 'projects/client-ws/dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  target: 'node'
}

// Websocket client
const iframeClient = {
  ...config('client-iframe'),
  output: {
    path: path.resolve(__dirname, 'projects/client-iframe/dist'),
    filename: 'index.js',
    library: 'iframePlugin',
    libraryTarget: 'umd',
  }
}

module.exports = [engine, client, wsClient, iframeClient]
