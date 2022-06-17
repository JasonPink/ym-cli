#!/usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const ora = require("ora");
const figlet = require("figlet");
// const spawn = require("cross-spawn");

const spinner = ora("Loading");

// const dependencies = ["vue", "vuex", "vue-router"];

// // 执行安装
// const child = spawn("npm", ["install", "-D"].concat(dependencies), {
//   stdio: "inherit",
// });
// // 监听执行结果
// child.on("close", function (code) {
//   // 执行失败
//   if (code !== 0) {
//     console.log(chalk.red("Error occurred while installing dependencies!"));
//     process.exit(1);
//   }
//   // 执行成功
//   else {
//     console.log(chalk.cyan("Install finished"));
//   }
// });

program
  .command("create <project-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exist") // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .action((name, options) => {
    require("../lib/create")(name, options);
  });

// 配置 config 命令
program
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <path>", "get value from option")
  .option("-s, --set <path> <value>")
  .option("-d, --delete <path>", "delete option from config")
  .action((value, options) => {
    console.log(value, options);
  });

// 配置 ui 命令
program
  .command("ui")
  .description("start add open roc-cli ui")
  .option("-p, --port <port>", "Port used for the UI Server")
  .action((option) => {
    console.log(option);
  });

program
  .version(`v${require("../package.json").version}`)
  .usage("<command> [option]");

program.on("--help", () => {
  // 新增说明信息
  console.log(
    "\r\n" +
      figlet.textSync("yemeng", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
  );
  console.log(
    `\r\nRun ${chalk.cyan(
      `ym <command> --help`
    )} for detailed usage of given command\r\n`
  );
});

program.parse(process.argv);
