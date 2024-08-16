const chalk= require("chalk");
const validator=require("validator")

console.log(chalk.bold.green("hello abhi"));
const res=validator.isEmail('foo@bar.com');
console.log(res? chalk.green(res): chalk.red(res));