/* eslint-disable */
require("./registerDotEnvFiles");
const paths = require("./paths");
const chalk = require("chalk");
const shell = require('./shellHelper');

const apiKey = process.env.LOCIZE_API_KEY;
const projectId = process.env.LOCIZE_PROJECTID;
const command = `cd ${paths.locales} && locize sync --api-key ${apiKey} --project-id ${projectId} --format json`;

const pushTranslations = () => {
    console.log(chalk.green("Translation push started..."));
    console.log("Executing i18n:push =>", command);
    shell.exec(command, function(err) {
        console.log(chalk.green("Translation push finished..."));
    });
};
pushTranslations();
/* eslint-enable */
