const inquirer = require('inquirer');
const fs = require('fs');
const {installDependencies, firstRun, createDirectoryContents, CURR_DIR, Questions} = require('./utils/helpers')
const _cliProgress = require('cli-progress');
const _colors = require('colors');

const bar = new _cliProgress.Bar({
    fps: 5,
    format: _colors.blue('installing [{bar}] {percentage}% '),
    stream: process.stdout,
    barsize: 100,
    position: 'center',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591'
}, _cliProgress.Presets.shades_grey);

function run () {
    firstRun();
    inquirer
        .prompt(Questions)
        .then(answers => {
            const {css, state, project_name} = answers
            const projectPath = `${CURR_DIR}/${project_name}`

            const templatePath = `${__dirname}/skeleton/${state}/${css}`;

            fs.mkdirSync(projectPath);

            createDirectoryContents(templatePath, projectPath, project_name);

            // start the progress bar with a total value of 200 and start value of 0
            bar.start(100, 0);

            // update the current value in your application..
            bar.update(50);
            installDependencies(projectPath).then(() => {
                bar.update(100);
                // stop the progress bar
                bar.stop();
            }).catch(error => {
                bar.stop();
                console.log(error);
            });

        });
}

module.exports = {
    run
}


