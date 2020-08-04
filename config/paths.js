// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

const paths = {
    dotenv: resolvePath(".env"),
    src: resolvePath("src"),
    pages: resolvePath("pages"),
    locales: resolvePath("public/static/locales"),
    publicPath: "public",
};

module.exports = paths;
