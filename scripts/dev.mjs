// Accept standard Next flags and the managed preview's Vite-style flags.
import { spawn } from 'node:child_process';
const production = process.argv.includes('--production');
const args = process.argv.slice(2).filter(arg => arg !== '--strictPort' && arg !== '--production').map(arg => arg === '--host' ? '--hostname' : arg);
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', ...(production ? ['start'] : ['dev']), ...args], { stdio: 'inherit' });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('exit', code => process.exit(code ?? 0));
