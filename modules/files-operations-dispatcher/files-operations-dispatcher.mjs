import { readFile } from './operations/read-file.mjs';
import { copyFile } from './operations/copy-file.mjs';
import { createFile } from './operations/create-file.mjs';
import { deleteFile } from './operations/delete-file.mjs';
import { renameFile } from './operations/rename-file.mjs';

export class FilesOperationDispatcher {
	/**
	 * @param {string} command
	 * @param {string} args
	 * @param {string} workingDirectoryPath
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
				await renameFile(args, workingDirectoryPath);
				break;
			}
			case 'cp': {
				await copyFile(args, workingDirectoryPath);
				break;
			}
			case 'mv': {
				await copyFile(args, workingDirectoryPath, true);
				break;
			}
			case 'rm': {
				await deleteFile(args, workingDirectoryPath);
				break;
			}
		}
	}
}
