import chalk from "chalk";
export const Colors = (text: string, color: number) => {
  if (color === 1) {
    console.log(chalk.black(text));
  } else if (color === 2) {
    console.log(chalk.red(text));
  } else if (color === 3) {
    console.log(chalk.green(text));
  } else if (color === 4) {
    console.log(chalk.yellow(text));
  } else if (color === 5) {
    console.log(chalk.blue(text));
  } else if (color === 6) {
    console.log(chalk.magenta(text));
  } else if (color === 7) {
    console.log(chalk.cyan(text));
  } else if (color === 8) {
    console.log(chalk.white(text));
  } else if (color === 9) {
    console.log(chalk.blackBright(text));
  } else if (color === 10) {
    console.log(chalk.redBright(text));
  } else if (color === 11) {
    console.log(chalk.greenBright(text));
  } else if (color === 12) {
    console.log(chalk.yellowBright(text));
  } else if (color === 13) {
    console.log(chalk.blueBright(text));
  } else if (color === 14) {
    console.log(chalk.magentaBright(text));
  } else if (color === 15) {
    console.log(chalk.cyanBright(text));
  } else if (color === 16) {
    console.log(chalk.whiteBright(text));
  } else if (color === 17) {
    console.log(chalk.bgBlack(text));
  } else if (color === 18) {
    console.log(chalk.bgRed(text));
  } else if (color === 19) {
    console.log(chalk.bgGreen(text));
  } else if (color === 20) {
    console.log(chalk.bgYellow(text));
  } else if (color === 21) {
    console.log(chalk.bgBlue(text));
  } else if (color === 22) {
    console.log(chalk.bgMagenta(text));
  } else if (color === 23) {
    console.log(chalk.bgCyan(text));
  } else if (color === 24) {
    console.log(chalk.bgWhite(text));
  } else if (color === 25) {
    console.log(chalk.bgBlackBright(text));
  } else if (color === 26) {
    console.log(chalk.bgRedBright(text));
  } else if (color === 27) {
    console.log(chalk.bgGreenBright(text));
  } else if (color === 28) {
    console.log(chalk.bgYellowBright(text));
  } else if (color === 29) {
    console.log(chalk.bgBlueBright(text));
  } else if (color === 30) {
    console.log(chalk.bgMagentaBright(text));
  } else if (color === 31) {
    console.log(chalk.bgCyanBright(text));
  } else if (color === 32) {
    console.log(chalk.bgWhiteBright(text));
  } else {
    return;
  }
};
