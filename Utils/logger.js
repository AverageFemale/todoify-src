const chalk = require("chalk");

module.exports = class Logger {
	static log (content, type = "log") {
		switch (type) {
	
		case "log": {
			return console.log(`${chalk.black.bgBlue(`[${type.toUpperCase()}]`)}${chalk.bgBlack.bold(` ${content}`)}`);
		}
		case "warn": {
			return console.log(`${chalk.black.bgYellow(`[${type.toUpperCase()}]`)}${chalk.bgBlack.bold(` ${content}`)}`);
		}
		case "error": {
			return console.log(`${chalk.black.bgRed(`[${type.toUpperCase()}]`)}${chalk.bgBlack.bold(` ${content}`)}`);
		}
		case "debug": {
			return console.log(`${chalk.black.bgMagenta(`[${type.toUpperCase()}]`)}${chalk.bgBlack.bold(` ${content}`)}`);
		}
		case "cmd": {
			return console.log(`${chalk.black.bgYellowBright(`[${type.toUpperCase()}]`)}${chalk.bgBlack.bold(` ${content}`)}`);
		}
		case "event": {
			return console.log(`${chalk.black.bgMagentaBright(`[${type.toUpperCase()}]`)}${chalk.bgBlack.bold(` ${content}`)}`);
		}
		case "ready": {
			return console.log(`${chalk.black.bgGreenBright(`[${type.toUpperCase()}]`)}${chalk.bgBlack.bold(` ${content}`)}`);
		} 
        case 'success': {
            return console.log(`${chalk.bold.black.bgGreen(`[${type.toUpperCase()}]`)}${chalk.bgBlack.bold(` ${content}`)}`)
        }
		default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd, error or success.");
		}
	}
};
