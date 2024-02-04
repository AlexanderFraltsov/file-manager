import { rm } from 'node:fs/promises';
import { join } from 'node:path';

import { ERROR_OPERATION_FAILED } from '../../../constants/constants.js';

/**
 * @param {string} filename
 * @param {string} workingDirectoryPath
 */
export const deleteFile = async (filename, workingDirectoryPath) => {
	try {
		await rm(join(workingDirectoryPath, filename));
	} catch {
		throw new Error(ERROR_OPERATION_FAILED);
	}
}
