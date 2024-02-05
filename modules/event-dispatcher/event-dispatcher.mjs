import process from 'node:process';

import {
	COMMAND_WITH_ARGUMENTS_LIST,
	COMMAND_WITHOUT_ARGUMENTS_LIST,
	ERROR_INVALID_INPUT,
} from '../../constants/constants.js';
import { getUpPath } from './operations/get-up-path.mjs';
import { getFileHash } from './operations/get-file-hash.mjs';
import { OsDispatcher } from '../os-dispatcher/os-dispatcher.mjs';
import { ZlibDispatcher } from '../zlib-dispatcher/zlib-dispatcher.mjs';
import { getAbsolutePath } from './operations/get-absolute-path.mjs';
import { printListOfFiles } from './operations/print-list-of-files.mjs';
import { FilesOperationDispatcher } from '../files-operations-dispatcher/files-operations-dispatcher.mjs';

/**
 * @typedef FileManager
 * @property {() => void} printWorkingDirectory
 * @property {() => string} getWorkingDirectoryPath
 * @property {(path: string) => void} setWorkingDirectoryPath
 */

export class EventDispatcher {
	/**@type {FileManager} */
	fm = null;

	constructor(fm) { this.fm = fm; }

	/**
	 * @param {string} command
	 */
	async dispatch(command) {
		try {
			if (!this.isCommandAvailable(command)) {
				throw new Error(ERROR_INVALID_INPUT);
			}

			if (this.isCommandFromCommandsWithoutArgumentsList(command)) {
				await this.dispatchCommandWithoutArguments(command);
			} else {
				await this.dispatchCommandWithArguments(command);
			}
		} catch (error) {
			console.log(error.message);
		} finally {
			this.fm.printWorkingDirectory();
		}
	}

	/**
	 * @param {string} command
	 */
	isCommandAvailable = (command) =>
		this.isCommandFromCommandsWithArgumentsList(command)
		|| this.isCommandFromCommandsWithoutArgumentsList(command);

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
	 * @param {string} command
	 */
	dispatchCommandWithoutArguments = async (command) => {
		switch (command.trim()) {
			case '.exit': {
				process.exit();
			}
			case 'ls': {
				await printListOfFiles(this.fm.getWorkingDirectoryPath());
				break;
			}
			case 'up':
				const newWorkingDirectoryPath = await getUpPath(
					this.fm.getWorkingDirectoryPath(),
				);
				this.fm.setWorkingDirectoryPath(newWorkingDirectoryPath);
				break;
		}
	}

	/**
	 * @param {string} event
	 */
	dispatchCommandWithArguments = async (event) => {
		const [command] = event.trimStart().split(' ');
		const argsString = event.trimStart().replace(command, '').trimStart();
		switch (command) {
			case 'cd': {
				const newWorkingDirectoryPath = await getAbsolutePath(
					this.fm.getWorkingDirectoryPath(),
					argsString,
				);
				this.fm.setWorkingDirectoryPath(newWorkingDirectoryPath);
				break;
			}
			case 'os': {
				await OsDispatcher.dispatch(argsString);
				break;
			}
			case 'cat':
			case 'add':
			case 'rn':
			case 'cp':
			case 'mv':
			case 'rm': {
				await FilesOperationDispatcher.dispatch(
					command,
					argsString,
					this.fm.getWorkingDirectoryPath(),
				);
				break;
			}
			case 'hash': {
				await getFileHash(argsString, this.fm.getWorkingDirectoryPath());
				break;
			}
			case 'compress':
			case 'decompress': {
				await ZlibDispatcher.dispatch(
					command,
					argsString,
					this.fm.getWorkingDirectoryPath(),
				)
				break;
			}
		}
	}
}
