import { rename } from 'node:fs/promises';
import { join, dirname } from 'node:path';

import { parseTwoPathArguments } from '../utils/parse-two-path-arguments.mjs';
import { ERROR_OPERATION_FAILED } from '../../../constants/constants.js';

/**
 * @param {string} args
 * @param {string} workingDirectoryPath
 */
export const renameFile = async (args, workingDirectoryPath) => {
	const [pathToFile, newFilename] = parseTwoPathArguments(args);
	try {
		const dir = dirname(pathToFile);
		await rename(
			join(workingDirectoryPath, pathToFile),
			join(workingDirectoryPath, dir, newFilename)
		);
	} catch {
		throw new Error(ERROR_OPERATION_FAILED);
	}
}
