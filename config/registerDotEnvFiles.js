/* eslint-disable */
const fs = require("fs");
const paths = require("./paths");
/* eslint-enable */

delete require.cache[require.resolve("./paths")];

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const registerDotEnvFiles = () => {
    if (!process.env.NODE_ENV) {
        throw new Error(
            "The process.env.NODE_ENV environment variable is required but was not specified."
        );
    }
    const dotenvFiles = [
        `${paths.dotenv}.${process.env.NODE_ENV}.local`,
        `${paths.dotenv}.${process.env.NODE_ENV}`,
        process.env.NODE_ENV !== "test" && `${paths.dotenv}.local`,
        paths.dotenv,
    ].filter(Boolean);

    dotenvFiles.forEach(dotenvFile => {
        if (fs.existsSync(dotenvFile)) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies,global-require
            require("dotenv").config({
                path: dotenvFile,
            });
        }
    });
};
registerDotEnvFiles();
