/* Import modules */
const path = require('path');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withPlugins = require('next-compose-plugins');

/* Configuration */
const NextAppConfig = {
    // distDir: 'build',
    webpack: (config, options) => {
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            '@styles': path.join(__dirname, 'assets/styles'),
            '@layout': path.join(__dirname, 'layout'),
            '@images': path.join(__dirname, 'static/images'),
            '@': path.join(__dirname, 'components'),
        }
        config.module.rules = [
            ...config.module.rules,
            ...[{
                test: /\.(png|woff|woff2|eot|ttf|gif|jpg|ico|svg)$/,
                loader: 'file-loader',
                options: {
                name: '[name]_[hash].[ext]',
                publicPath: `/_next/static/files`,
                outputPath: 'static/files'
                }
            }]
        ]
        return config;
    },
};


/* Export declaration */
module.exports = withPlugins([ 
  [ withCSS ],
  [ withSass ],
], NextAppConfig );