const isDevEnv = () => process.env.NODE_ENV === "development";
const isProdEnv = () => process.env.NODE_ENV === "production";
const isTestEnv = () => process.env.NODE_ENV === "test";
const isBundleAnalyzerEnabled = () => process.env.ANALYZE === "true";

module.exports = {
    isDevEnv,
    isProdEnv,
    isTestEnv,
    isBundleAnalyzerEnabled,
};
