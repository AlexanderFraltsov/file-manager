import { readFile } from './operations/read-file.mjs';
import { createFile } from './operations/create-file.mjs';
import { deleteFile } from './operations/delete-file.mjs';

export class FilesOperationDispatcher {
	/**
	 * @param {string} command
	 * @param {string} args
	 */
	static dispatch = async (command, args, workingDirectoryPath) => {
		switch (command) {
			case 'cat': {
				await readFile(args, workingDirectoryPath);
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
				await deleteFile(args, workingDirectoryPath);
				break;
			}
		}
	}
}
