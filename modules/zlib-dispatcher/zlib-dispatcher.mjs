import { compressFile  } from './operations/compress-file.mjs';
import { decompressFile  } from './operations/decompress-file.mjs';

export class ZlibDispatcher {
	/**
	 * @param {string} command
	 * @param {string} args
	 * @param {string} workingDirectoryPath
	 */
	static dispatch = async (command, args, workingDirectoryPath) => {
		switch (command) {
			case 'compress': {
				await compressFile(args, workingDirectoryPath);
				break;
			}
			case 'decompress': {
				await decompressFile(args, workingDirectoryPath);
				break;
			}
		}
	}
}
