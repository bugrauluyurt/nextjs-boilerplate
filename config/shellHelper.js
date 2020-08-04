/* eslint-disable */
const { exec } = require("child_process");
const chalk = require("chalk");

// execute a single shell command where "cmd" is a string
exports.exec = function(cmd, cb){
    // this would be way easier on a shell/bash script :P
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(chalk.red(`Error: ${error.message}`));
            return cb && cb(error);
        }
        if (stderr) {
            console.log(chalk.red(`Stderr: ${stderr}`));
            return cb && cb(stderr);
        }
        console.log(chalk.green(stdout));
        return cb && cb();
    })
};

// execute multiple commands in series
// this could be replaced by any flow control lib
exports.series = function(cmds, cb){
    var execNext = function(){
        exports.exec(cmds.shift(), function(err){
            if (err) {
                cb(err);
            } else {
                if (cmds.length) execNext();
                else cb(null);
            }
        });
    };
    execNext();
};
/* eslint-enable */
