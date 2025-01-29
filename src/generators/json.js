import { readdir } from 'fs/promises';
import { join, relative } from 'path';

export async function generateJson(dir, ig = null, rootDir = dir) {
  const items = await readdir(dir, { withFileTypes: true });
  const result = [];

  for (const item of items) {
    const fullPath = join(dir, item.name);
    const relativePath = relative(rootDir, fullPath);
    
    if (ig && ig.ignores(relativePath)) continue;
    
    const entry = {
      name: item.name,
      type: item.isDirectory() ? 'directory' : 'file',
      path: fullPath
    };

    if (item.isDirectory()) {
      entry.children = await generateJson(fullPath, ig, rootDir);
    }

    result.push(entry);
  }

  return result;
}
