#!/usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");

program
  .command("create <project-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exist") // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .action((name, options) => {
    require("../lib/create")(name, options);
  });

program
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <path>", "get value from option")
  .option("-s, --set <path> <value>")
  .option("-d, --delete <path>", "delete option from config")
  .action((value, options) => {
    console.log(value, options);
  });

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
