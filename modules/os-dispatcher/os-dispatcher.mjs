import { EOL, homedir, cpus, userInfo, arch } from 'node:os';

import {
	ERROR_INVALID_INPUT,
	OS_COMMAND_LIST,
} from '../../constants/constants.js';

export class OsDispatcher {
	/**
	 * @param {string} args
	 */
	static dispatch = async (args) => {
		if (!args.startsWith('--')) {
			throw new Error(ERROR_INVALID_INPUT);
		}

		const command = args.substring(2).trim();

		if (!OS_COMMAND_LIST.includes(command)) {
			throw new Error(ERROR_INVALID_INPUT);
		}

		switch (command) {
			case 'EOL': {
				console.log(JSON.stringify(EOL));
				break;
			}
			case 'cpus': {
				const info = cpus()
					.map(({ model, speed }) => ({
						Model: model,
						'Frequency, GHz': speed / 1000,
					}));

				console.log(
					`${EOL}Host machine CPUs info:${
						EOL
					}Amount of cores - ${info.length};${
						EOL
					}Model - ${info[0].Model};${
						EOL
					}Details:`
				);
				console.table(info);
				break;
			}
			case 'homedir': {
				console.log(homedir());
				break;
			}
			case 'username': {
				console.log(userInfo().username);
				break;
			}
			case 'architecture': {
				console.log(arch());
				break;
			}
		}
	}
}
