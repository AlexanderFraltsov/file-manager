import { resolve } from 'node:path';
import { realpath } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
const {
	createHash,
} = await import('node:crypto');

import { ERROR_OPERATION_FAILED } from '../../../constants/constants.js';

/**
 * @param {string} pathToFile
 * @param {string} workingDirectoryPath
 */
export const getFileHash = async (pathToFile, workingDirectoryPath) => {
	try {
		const path = resolve(workingDirectoryPath, pathToFile);
		await realpath(path);
		return new Promise(res => createReadStream(path)
			.pipe(createHash('sha256'))
			.setEncoding('hex')
			.on('error', () => {
				console.log(ERROR_OPERATION_FAILED);
				res();
			})
			.on('data', (data) => console.log(data))
			.on('close', () => res()),
		);
	} catch {
		throw new Error(ERROR_OPERATION_FAILED);
	}
}
