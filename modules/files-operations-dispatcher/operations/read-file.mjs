import { createReadStream } from 'node:fs';

import { getAbsolutePath } from '../../event-dispatcher/operations/get-absolute-path.mjs';
import { ERROR_OPERATION_FAILED } from '../../../constants/constants.js';

/**
 * @param {string} filename
 * @param {string} workingDirectoryPath
 */
export const readFile = async (filename, workingDirectoryPath) => {
	const path = await getAbsolutePath(workingDirectoryPath, filename);
	return new Promise(res => createReadStream(path, { encoding: 'utf-8' })
		.on('data', (data) => console.log(data))
		.on('error', () => {
			console.log(ERROR_OPERATION_FAILED);
			res();
		})
		.on('close', () => res()),
	);
}
