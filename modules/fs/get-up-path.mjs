import { resolve } from 'node:path';

/**
 * @param {string} dir
 */
export const getUpPath = (dir) => resolve(dir, '..');
