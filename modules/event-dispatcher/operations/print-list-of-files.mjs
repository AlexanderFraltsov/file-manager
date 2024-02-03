import fs from 'node:fs/promises';
import { resolve } from 'node:path';

const TYPES = {
	FILE: 'file',
	DIRECTORY: 'directory',
}

/**
 * @param {string} dir
 */
const getOverallList = async (dir) => fs.readdir(resolve(dir), { withFileTypes: true });

/**
 * @param {string} dir
 */
export const printListOfFiles = async (dir) => {
	const list = (await getOverallList(dir))
		.map((entity => ({
			Name: entity.name,
			Type: entity.isDirectory() ? TYPES.DIRECTORY : TYPES.FILE,
		})))
		.sort((entity1, entity2) => {
			if (entity1.Type === entity2.Type) {
				return entity1.Name.toLowerCase() - entity2.Name.toLowerCase();
			} else {
				return entity1.Type === TYPES.DIRECTORY ? -1 : 1;
			}
		});

	console.table(list);
}
