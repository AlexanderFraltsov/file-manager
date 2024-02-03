import { createWriteStream } from 'node:fs';
import { join } from 'node:path';

import { ERROR_OPERATION_FAILED } from '../../../constants/constants.js';

/**
 * @param {string} filename
 * @param {string} workingDirectoryPath
 */
export const createFile = (filename, workingDirectoryPath) => new Promise((res) => {
	createWriteStream(
		join(workingDirectoryPath, filename),
		{ encoding: 'utf-8' },
	)
	.on('error', () => {
		console.log(ERROR_OPERATION_FAILED);
		res();
	})
	.on('finish', () => res())
	.end();
});
