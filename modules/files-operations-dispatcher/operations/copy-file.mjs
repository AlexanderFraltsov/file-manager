import { realpath, rm } from 'node:fs/promises';
import { join, resolve, basename } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';

import { parseTwoPathArguments } from '../utils/parse-two-path-arguments.mjs';
import { ERROR_OPERATION_FAILED } from '../../../constants/constants.js';

/**
 * @param {string} args
 * @param {string} workingDirectoryPath
 */
export const copyFile = async (args, workingDirectoryPath, shouldDelete = false) => {
	const [pathToFile, pathToNewDirectory] = parseTwoPathArguments(args);

	try {
		const path1 = resolve(workingDirectoryPath, pathToFile);
		const path2 = resolve(workingDirectoryPath, pathToNewDirectory);
		const filename = basename(path1);
		await realpath(path1);
		await realpath(path2);
		return new Promise(res => {
			const errorFunction = () => {
				console.log(ERROR_OPERATION_FAILED);
				res();
			}
			const streamOptions = { encoding: 'utf-8' };
			const readStream = createReadStream(path1, streamOptions)
				.on('error', errorFunction);
			const writeStream = createWriteStream(join(path2, filename), streamOptions)
				.on('error', errorFunction);

			readStream.pipe(writeStream).on('close', async () => {
				if (shouldDelete) {
					await rm(join(workingDirectoryPath, pathToFile));
				}
				res();
			});
		});
	} catch (error) {
		throw new Error(ERROR_OPERATION_FAILED);
	}
}
