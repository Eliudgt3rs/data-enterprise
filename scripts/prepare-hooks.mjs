import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repositoryRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], {
  cwd: projectDirectory,
  encoding: 'utf8',
}).trim();
const hooksDirectory = path.relative(repositoryRoot, path.join(projectDirectory, '.husky'));
const huskyCli = path.join(projectDirectory, 'node_modules', 'husky', 'bin.js');

execFileSync(process.execPath, [huskyCli, hooksDirectory], {
  cwd: repositoryRoot,
  stdio: 'inherit',
});
