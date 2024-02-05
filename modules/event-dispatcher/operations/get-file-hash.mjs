import { resolve } from 'node:path';
import { pipeline } from 'node:stream';
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
		return new Promise(res => {
			pipeline(
				createReadStream(path),
				createHash('sha256'),
				(error) => {
					if (error) {
						console.log(ERROR_OPERATION_FAILED);
						res();
					}
				}
			)
			.setEncoding('hex')
			.on('data', (data) => console.log(data))
			.on('close', () => res());
		});
	} catch {
		throw new Error(ERROR_OPERATION_FAILED);
	}
}
