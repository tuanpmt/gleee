import { writeFile } from 'fs/promises';
import { resolve, extname } from 'path';
import { loadGitignore } from './utils/gitignore.js';
import { generateTree } from './generators/tree.js';
import { generateJson } from './generators/json.js';

const showHelp = () => {
  console.log(`
Gleee - Directory Structure Generator

Usage: gleee [directory] [output-file]

Arguments:
  directory    Directory to analyze (default: current directory)
  output-file  Output file name (default: dir.md or dir.json)

Examples:
  gleee                     # Generate tree for current directory
  gleee /path/to/dir       # Generate tree for specific directory
  gleee . output.json      # Generate JSON structure
  gleee . project.md       # Generate markdown tree structure
`);
}

export default async function main() {
  const targetDir = process.argv[2] || '.';
  
  if (targetDir === '--help' || targetDir === '-h') {
    showHelp();
    return;
  }

  const outputFile = process.argv[3] || 'dir.md';
  const format = extname(outputFile).toLowerCase();
  
  try {
    const resolvedPath = resolve(targetDir);
    const ig = await loadGitignore(resolvedPath);
    let content;

    if (format === '.json') {
      const data = {
        rootPath: resolvedPath,
        timestamp: new Date().toISOString(),
        structure: await generateJson(resolvedPath, ig)
      };
      content = JSON.stringify(data, null, 2);
    } else {
      content = `# Directory Listing for ${resolvedPath}\n\n${await generateTree(resolvedPath, '', ig)}`;
    }

    await writeFile(outputFile, content);
    console.log(`Directory listing saved to ${outputFile}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}
