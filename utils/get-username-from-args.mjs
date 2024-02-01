import { argv } from 'node:process';

export const getUsernameFromArguments = () => {
	const ARGS_USERNAME_PREFIX = '--username=';
	const [, , ...args] = argv;
	const username = args
		.find((argumentString => argumentString.startsWith(ARGS_USERNAME_PREFIX)));
	if (!username) {
		return 'Unknown';
	}
	return username.slice(ARGS_USERNAME_PREFIX.length);
}
