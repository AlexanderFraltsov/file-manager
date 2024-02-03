import { getNewPath } from './get-new-path.mjs';

/**
 * @param {string} dir
 */
export const getUpPath = async (dir) => getNewPath(dir, '..');
