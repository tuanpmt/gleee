import { readdir } from 'fs/promises';
import { join, relative } from 'path';

export async function generateTree(dir, prefix = '', ig = null, rootDir = dir) {
  const items = await readdir(dir, { withFileTypes: true });
  let result = '';
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const fullPath = join(dir, item.name);
    const relativePath = relative(rootDir, fullPath);
    
    if (ig && ig.ignores(relativePath)) continue;
    
    const isLast = i === items.length - 1;
    const connector = isLast ? '└─' : '├─';
    const childPrefix = isLast ? '  ' : '│ ';
    
    result += `${prefix}${connector} ${item.name}\n`;
    
    if (item.isDirectory()) {
      result += await generateTree(fullPath, prefix + childPrefix, ig, rootDir);
    }
  }
  
  return result;
}
