const util = require("util");
const path = require("path");
const chalk = require("chalk");
const downloadGitRepo = require("download-git-repo");
const ora = require("ora");
const inquirer = require("inquirer");
const { getRepoList } = require("./http");

async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message);
  spinner.start();

  try {
    const result = await fn(...args);
    spinner.succeed();
    return result;
  } catch (error) {
    spinner.fail("Request failed, refetch...");
  }
}

class Generator {
  constructor(name, targetDir) {
    this.name = name;

    this.targetDir = targetDir;

    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async getRepo() {
    const repoList = await wrapLoading(getRepoList, "waiting fetch template");

    if (!repoList) return;
    const repos = repoList.filter((item) => item.name.includes("template"));

    const { repo } = await inquirer.prompt({
      name: "repo",
      type: "list",
      choices: repos,
      message: "Please choose a template to create project",
    });

    return repo;
  }

  async download(repo) {
    const requestUrl = `JasonPink/${repo}`;

    await wrapLoading(
      this.downloadGitRepo,
      "waiting download template",
      requestUrl,
      path.resolve(process.cwd(), this.targetDir)
    );
  }

  async create() {
    const repo = await this.getRepo();

    await this.download(repo);

    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log("  npm run dev\r\n");
  }
}

module.exports = Generator;
