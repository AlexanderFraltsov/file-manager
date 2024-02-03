import { createFile } from "./operations/create-file.mjs";

export class FilesOperationDispatcher {
	/**
	 * @param {string} command
	 * @param {string} args
	 */
	static dispatch = async (command, args, workingDirectoryPath) => {
		// console.log(args);
		switch (command) {
			case 'cat': {

				break;
			}
			case 'add': {
				await createFile(args, workingDirectoryPath);
				break;
			}
			case 'rn': {

				break;
			}
			case 'cp': {

				break;
			}
			case 'mv': {

				break;
			}
			case 'rm': {

				break;
			}
		}
	}
}
