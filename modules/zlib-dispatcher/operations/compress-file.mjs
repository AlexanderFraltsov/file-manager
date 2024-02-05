import { pipeline } from 'node:stream';
import { realpath } from 'node:fs/promises';
import { createBrotliCompress } from 'node:zlib';
import { join, resolve, basename } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';

import { parseTwoPathArguments } from '../../files-operations-dispatcher/utils/parse-two-path-arguments.mjs';
import { ERROR_OPERATION_FAILED } from '../../../constants/constants.js';

/**
 * @param {string} args
 * @param {string} workingDirectoryPath
 */
export const compressFile = async (args, workingDirectoryPath) => {
	const [pathToFile, pathToDestination] = parseTwoPathArguments(args);
	try {
		const path1 = resolve(workingDirectoryPath, pathToFile);
		const path2 = resolve(workingDirectoryPath, pathToDestination);
		const filename = basename(path1);
		await realpath(path1);
		await realpath(path2);
		return new Promise(res => {
			pipeline(
				createReadStream(path1),
				createBrotliCompress(),
				createWriteStream(join(path2, `${filename}.br`)),
				(err) => {
					if (err) {
						console.log(ERROR_OPERATION_FAILED);
						res();
					}
				}
			).on('close', () => res());
		});
	} catch (error) {
		throw new Error(ERROR_OPERATION_FAILED);
	}
}
