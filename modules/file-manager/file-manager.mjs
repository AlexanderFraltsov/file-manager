import process from 'node:process';
import { homedir } from 'node:os';
import { createInterface } from 'node:readline/promises';

import { EventDispatcher } from '../event-dispatcher/event-dispatcher.mjs';
import { getUsernameFromArguments } from '../../utils/get-username-from-args.mjs';

export class FileManager {
	username = '';

	workingDirectoryPath = '';

	init = () => {
		const eventDispatcher = new EventDispatcher(this);
		this.username = getUsernameFromArguments();
		this.workingDirectoryPath = homedir();

		createInterface({
			input: process.stdin,
			output: process.stdout,
		})
		.on('line', (command) => eventDispatcher.dispatch(command));

		this.printGreatingMessage();
		this.printWorkingDirectory();

		process.on('exit', () => this.printGoodbyeMessage());
	}

	/**
	 * @param {string} path
	 */
	setWorkingDirectoryPath = (path) => {
		this.workingDirectoryPath = path;
	}

	getWorkingDirectoryPath = () => this.workingDirectoryPath;

	printGreatingMessage = () =>
		console.log(`Welcome to the File Manager, ${this.username}!`);

	printGoodbyeMessage = () =>
		console.log(`Thank you for using File Manager, ${this.username}, goodbye!`);

	printWorkingDirectory = () =>
		console.log(`You are currently in ${this.workingDirectoryPath}`);
}
