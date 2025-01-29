import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import ignore from 'ignore';

export async function loadGitignore(dir) {
  const gitignorePath = join(dir, '.gitignore');
  const ig = ignore();
  
  ig.add(['.git/', '.git/**']);
  
  if (existsSync(gitignorePath)) {
    const gitignoreContent = await readFile(gitignorePath, 'utf8');
    ig.add(gitignoreContent);
  }
  
  return ig;
}
