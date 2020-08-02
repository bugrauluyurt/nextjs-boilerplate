/* eslint-disable */
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer");
const { isProdEnv, isBundleAnalyzerEnabled } = require("./src/utils/env");

const nextConfig = {
    assetPrefix: isProdEnv() ? process.env.CDN_PATH : "",
    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY,
        STATIC_PATH: process.env.STATIC_PATH,
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
