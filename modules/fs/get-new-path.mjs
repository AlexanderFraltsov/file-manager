import { resolve } from 'node:path';
import { realpath } from 'node:fs/promises';

import { ERROR_INVALID_INPUT } from '../../constants/constants.js';

/**
 * @param {string} dir
 * @param {string} newPath
 */
export const getNewPath = async (dir, newPath) => {
	try {
		const result = resolve(dir, newPath);
		await realpath(result);
		return result;
	} catch {
		throw new Error(ERROR_INVALID_INPUT);
	}
};
