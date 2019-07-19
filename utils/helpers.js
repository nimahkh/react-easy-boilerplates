const inquirer = require('inquirer');
const CURR_DIR = process.cwd();
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
const {spawn} = require('child_process')
const fs = require('fs-extra')
const chalk = require('chalk');

const Questions = [
    {
        type: 'input',
        name: 'project_name',
        message: 'what is your project name',
        validate: function (input) {
            if (fs.existsSync(input)) {
                return "project with this name exists"
            }
            if (/^([a-z\-\_\d])+$/.test(input)) return true;
            else return 'Project name may only include letters(lowercase), numbers, underscores and hashes.';
        }
    },
    {
        type: 'list',
        name: 'css',
        message: 'choose your css library',
        choices: [
            {
                name:'jss',
            },
            new inquirer.Separator(),
            {
                name: disable('material-ui'),
                disabled: warning("Coming soon")
            },
            new inquirer.Separator(),
            {
                name: disable('postcss'),
                disabled: warning("Coming soon")
            },
            new inquirer.Separator(),
            {
                name: disable('ant design'),
                disabled: warning("Coming soon")
            },
        ]
    },
    {
        type: 'list',
        name: 'state',
        message: 'choose your state management',
        choices: [
            'Redux',
            new inquirer.Separator(),
            {
                name: disable('Context API'),
                disabled: warning('Coming soon')
            },

        ],
        filter: function (value) {
            return value.toLowerCase()
        }
    }
];


function warning(text) {
    return chalk.yellow(text)
}

function disable(text){
    return chalk.grey(text)
}

function createDirectoryContents(templatePath, newProjectPath, projectName) {
    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;

        // get stats about the current file
        const stats = fs.statSync(origFilePath);

        if (stats.isFile()) {
            let contents = fs.readFileSync(origFilePath, 'utf8');
            if (file === "package.json") {
                contents = JSON.parse(contents);
                contents.name = projectName
                contents = JSON.stringify(contents, null, 2)
            }
            const writePath = `${newProjectPath}/${file}`;
            fs.writeFileSync(writePath, contents, 'utf8');
        }

        if (stats.isDirectory()) {
            fs.copy(templatePath, newProjectPath, error => {
                return true;
            }) // copies file
        }
    });
}

async function getVersion() {
    const {stdout} = await execFile('node', ['--version']);
    return stdout;
}

function changeDirectory(directory) {
    process.chdir(directory);
}

async function installDependencies(project_name) {
    changeDirectory(project_name);
    const { stdout } = await execFile('npm', ['install']);

    return stdout
}

module.exports = {
    createDirectoryContents,
    CURR_DIR,
    getVersion,
    installDependencies,
    changeDirectory,
    Questions
}
