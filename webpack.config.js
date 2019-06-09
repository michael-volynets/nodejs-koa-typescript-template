const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
    const {
        NODE_ENV
    } = env;

    if (!NODE_ENV) {
        throw new Error("Environment variable is required.")
    }

    const baseConfiguration = {
        entry: path.resolve('./src/server.ts'),
        target: 'node',
        node: {
          __dirname: false,   
          __filename: false
        },
        mode: NODE_ENV,
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.ts', '.js', '.json']
        },
        plugins: [
          new CopyPlugin([
            { from: `./environments/.env.${NODE_ENV}`, to: '.env', toType: 'template' },
            { from: './src/static', to: './static' }
          ])  
        ],
        module: {
            rules: [
                {
                  enforce: 'pre',
                  test: /\.js$/,
                  use: 'source-map-loader'
                },
                {
                  enforce: 'pre',
                  test: /\.ts$/,
                  exclude: /node_modules/,
                  use: 'tslint-loader'
                },
                {
                  test: /\.ts$/,
                  use: [
                    'ts-loader',
                  ]
                }
              ]
        }
    };

    let config;

    switch (NODE_ENV) {
        case 'development':
          config = Object.assign(baseConfiguration, {
              devtool: 'source-map',
              externals: [nodeExternals()]
          });
          break;
        case 'production':
          // TODO: Production Build
          config = baseConfiguration;
        break;
        default: 
        throw new Error(`There is no such configuration (${NODE_ENV})`)
    }

    return config;
}