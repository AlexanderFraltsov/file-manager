import { pipeline } from 'node:stream';
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
			const streamOptions = { encoding: 'utf-8' };
			pipeline(
				createReadStream(path1, streamOptions),
				createWriteStream(join(path2, filename), streamOptions),
				(err) => {
					if (err) {
						console.log(ERROR_OPERATION_FAILED);
						res();
					}
				},
			).on('close', async () => {
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
