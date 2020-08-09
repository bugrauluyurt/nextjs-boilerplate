/* eslint-disable */
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer");
const { isProdEnv, isBundleAnalyzerEnabled } = require("./src/utils/env");
const { nextI18NextRewrites } = require('next-i18next/rewrites');
const localeSubpaths = require("./config/localeSubPaths");
const path = require('path');

const nextConfig = {
    assetPrefix: isProdEnv() ? process.env.CDN_PATH : "",
    rewrites: async () => nextI18NextRewrites(localeSubpaths),
    sassOptions: {
        includePaths: [
            path.join(__dirname, 'styles'),
            path.join(__dirname, 'pages'),
            path.join(__dirname, 'src/components')
        ],
    },
    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY,
        STATIC_PATH: process.env.STATIC_PATH,
        localeSubpaths,
    },
};

const bundleAnalyzer = [
    withBundleAnalyzer,
    { enabled: isBundleAnalyzerEnabled()  }
]

module.exports = withPlugins([
    bundleAnalyzer
], nextConfig);
/* eslint-enable */
