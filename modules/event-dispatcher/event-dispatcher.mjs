import process from 'node:process';

import { getUpPath } from '../fs/get-up-path.mjs';
import { printListOfFiles } from '../fs/print-list-of-files.mjs';

const COMMAND_WITH_ARGUMENTS_LIST = [
	'cd',
	'os',
	'cat',
	'add',
	'rn',
	'cp',
	'mv',
	'rm',
	'hash',
	'compress',
	'decompress',
];

const COMMAND_WITHOUT_ARGUMENTS_LIST = [
	'.exit',
	'up',
	'ls',
];

export class EventDispatcher {
	fm = null;

	constructor(fm) { this.fm = fm; }

	/**
	 * @param {string} event
	 */
	async dispatch(event) {
		try {
			if (!this.isCommandAvailable(event)) {
				throw new Error('Invalid input');
			}

			if (this.isCommandFromCommandsWithoutArgumentsList(event)) {
				await this.dispatchCommandWithoutArguments(event);
			} else {
				await this.dispatchCommandWithArguments(event);
			}

			this.fm.printWorkingDirectory();
		} catch (error) {
			console.log(error.message);
		}
	}

	/**
	 * @param {string} event
	 */
	isCommandAvailable = (event) =>
		this.isCommandFromCommandsWithArgumentsList(event)
		|| this.isCommandFromCommandsWithoutArgumentsList(event);

	/**
	 * @param {string} event
	 */
	isCommandFromCommandsWithoutArgumentsList = (event) =>
		COMMAND_WITHOUT_ARGUMENTS_LIST.some(command => event.trim() === command);

	/**
	 * @param {string} event
	 */
	isCommandFromCommandsWithArgumentsList = (event) =>
		COMMAND_WITH_ARGUMENTS_LIST.some(command => event.trimStart().startsWith(`${command} `));

	/**
	 * @param {string} event
	 */
	dispatchCommandWithoutArguments = async (event) => {
		switch (event.trim()) {
			case '.exit': {
				process.exit();
			}
			case 'ls': {
				await printListOfFiles(this.fm.getWorkingDirectoryPath());
				break;
			}
			case 'up':
				const newWorkingDirectoryPath = getUpPath(this.fm.getWorkingDirectoryPath());
				this.fm.setWorkingDirectoryPath(newWorkingDirectoryPath);
				break;
		}
	}

	/**
	 * @param {string} event
	 */
	dispatchCommandWithArguments = async (event) => {}
}
