import { ERROR_INVALID_INPUT } from '../../../constants/constants.js';

/**
 * @param {string} args
 * @returns {[
*   pathToFile: string;
*   newFilename: string;
* ]}
*/
export const parseTwoPathArguments = (args) => {
	const SEPARATOR = '\"';
	const segments = args
		.split(args.includes(SEPARATOR) ? SEPARATOR : ' ')
		.map(segment => segment.trimStart().trimEnd())
		.filter(segment => Boolean(segment))
	if (segments.length > 2) {
		throw new Error(ERROR_INVALID_INPUT);
	}
	return segments;
}
