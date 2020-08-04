/* eslint-disable */
require("./registerDotEnvFiles");
const paths = require("./paths");
const chalk = require("chalk");
const localeSubPaths = require("./localeSubPaths");
const shell = require('./shellHelper');

const apiKey = process.env.LOCIZE_API_KEY;
const projectId = process.env.LOCIZE_PROJECTID;
const version = process.env.LOCIZE_VERSION;

const getLanguageCommand = (lang) => {
    return `cd ${paths.locales} && locize download --api-key ${apiKey} --project-id ${projectId} --ver ${version} --language ${lang} --path ${paths.locales}/${lang}`
};

const pullTranslations = () => {
    console.log(chalk.green("Translation pull started..."));
    const languages = Object.keys(localeSubPaths);
    const commands = languages.map((language) => {
        return getLanguageCommand(language);
    });
    console.log("Executing i18n:pull =>", commands);
    shell.series(commands, function(err) {
        console.log(chalk.green("Translation push finished..."));
    });
};
pullTranslations();
/* eslint-enable */
