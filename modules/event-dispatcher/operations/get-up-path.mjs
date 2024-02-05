import { getAbsolutePath } from './get-absolute-path.mjs';

/**
 * @param {string} dir
 */
export const getUpPath = async (dir) => getAbsolutePath(dir, '..');
