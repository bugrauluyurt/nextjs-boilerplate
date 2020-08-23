/* eslint-disable */
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer");
const withTM = require("next-transpile-modules");
const { isProdEnv, isBundleAnalyzerEnabled } = require("./src/utils/env");
const { nextI18NextRewrites } = require("next-i18next/rewrites");
const localeSubpaths = require("./config/localeSubPaths");
const path = require("path");

const nextConfig = {
    assetPrefix: isProdEnv() ? process.env.CDN_PATH : "",
    rewrites: async () => nextI18NextRewrites(localeSubpaths),
    sassOptions: {
        includePaths: [
            path.join(__dirname, "styles"),
            path.join(__dirname, "pages"),
            path.join(__dirname, "src/components")
        ],
    },
    // INFO: To get configurations inside the modules:
    // import getConfig from 'next/config'
    // const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
    serverRuntimeConfig: {
        // Will only be available on the server side
        API_TOKEN: process.env.API_TOKEN, // Pass through env variables
    },
    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY,
        SOCKET_API_URL: process.env.SOCKET_API_URL,
        STATIC_PATH: process.env.STATIC_PATH,
        localeSubpaths,
    },
};

// Plugins - start
const plugInBundleAnalyzer = [
    withBundleAnalyzer,
    { enabled: isBundleAnalyzerEnabled()  }
]
const plugInTranspileModules = withTM(["lodash-es"]);
// Plugins - end

module.exports = withPlugins([
    plugInBundleAnalyzer,
    plugInTranspileModules,
], nextConfig);
/* eslint-enable */
