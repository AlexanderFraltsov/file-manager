import { rm } from 'node:fs/promises';
import { join } from 'node:path';

import { ERROR_OPERATION_FAILED } from '../../../constants/constants.js';

/**
 * @param {string} pathToFile
 * @param {string} workingDirectoryPath
 */
export const deleteFile = async (pathToFile, workingDirectoryPath) => {
	try {
		await rm(join(workingDirectoryPath, pathToFile));
	} catch {
		throw new Error(ERROR_OPERATION_FAILED);
	}
}
