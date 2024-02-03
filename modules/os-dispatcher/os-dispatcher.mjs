import {
	ERROR_INVALID_INPUT,
	OS_COMMAND_LIST,
} from '../../constants/constants.js';
import { printEOL } from './operations/print-eol.mjs';
import { printCpuInfo } from './operations/print-cpu-info.mjs';
import { printHomedir } from './operations/print-homedir.mjs';
import { printUsername } from './operations/print-username.mjs';
import { printArchitecture } from './operations/print-architecture.mjs';



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
				printEOL();
				break;
			}
			case 'cpus': {
				printCpuInfo();
				break;
			}
			case 'homedir': {
				printHomedir();
				break;
			}
			case 'username': {
				printUsername();
				break;
			}
			case 'architecture': {
				printArchitecture();
				break;
			}
		}
	}
}
