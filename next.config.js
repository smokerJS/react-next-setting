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
            '@': path.join(__dirname, 'components'),
        }
        return config;
    },
};


/* Export declaration */
module.exports = withPlugins([ 
  [ withCSS ],
  [ withSass ],
], NextAppConfig );