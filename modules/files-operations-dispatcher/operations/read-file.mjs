import { resolve } from 'node:path';
import { realpath } from 'node:fs/promises';
import { createReadStream } from 'node:fs';

import { ERROR_OPERATION_FAILED } from '../../../constants/constants.js';

/**
 * @param {string} filename
 * @param {string} workingDirectoryPath
 */
export const readFile = async (filename, workingDirectoryPath) => {
	try {
		const path = resolve(workingDirectoryPath, filename);
		await realpath(path);
		return new Promise(res => createReadStream(path, { encoding: 'utf-8' })
			.on('data', (data) => console.log(data))
			.on('error', () => {
				console.log(ERROR_OPERATION_FAILED);
				res();
			})
			.on('close', () => res()),
		);
	} catch {
		throw new Error(ERROR_OPERATION_FAILED);
	}
}
