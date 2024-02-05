import { pipeline } from 'node:stream';
import { realpath, rm } from 'node:fs/promises';
import { createBrotliDecompress } from 'node:zlib';
import { join, resolve, basename, extname } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';

import { parseTwoPathArguments } from '../../files-operations-dispatcher/utils/parse-two-path-arguments.mjs';
import { ERROR_OPERATION_FAILED } from '../../../constants/constants.js';

/**
 * @param {string} args
 * @param {string} workingDirectoryPath
 */
export const decompressFile = async (args, workingDirectoryPath) => {
	const [pathToFile, pathToDestination] = parseTwoPathArguments(args);
	try {
		const path1 = resolve(workingDirectoryPath, pathToFile);
		const path2 = resolve(workingDirectoryPath, pathToDestination);
		const filename = basename(path1);
		await realpath(path1);
		await realpath(path2);
		return new Promise(res => {
			const resultFilePath = join(path2, filename.replace(extname(filename), ''))
			pipeline(
				createReadStream(path1),
				createBrotliDecompress(),
				createWriteStream(resultFilePath),
				(err) => {
					if (err) {
						rm(resultFilePath);
						console.log(ERROR_OPERATION_FAILED);
						res();
					}
				}
			).on('close', () => res());
		});
	} catch {
		throw new Error(ERROR_OPERATION_FAILED);
	}
}
