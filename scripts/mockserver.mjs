import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const command = process.argv[2];
const runtime = process.env.MOCKSERVER_RUNTIME ?? 'podman';
const containerName = 'jikan-mockserver-tests';
const image = 'mockserver/mockserver:7.4.0';
const repositoryDirectory = dirname(dirname(fileURLToPath(import.meta.url)));
const initializationDirectory = join(repositoryDirectory, 'tests', 'mockserver');
const readyUrl = 'http://127.0.0.1:1080';
const vitestEntrypoint = join(repositoryDirectory, 'node_modules', 'vitest', 'vitest.mjs');
const run = (executable, args, ignoreFailure = false) => new Promise((resolve, reject) => {
  const child = spawn(executable, args, { stdio: 'inherit' });
  child.once('error', reject);
  child.once('exit', code => code === 0 || ignoreFailure ? resolve() : reject(new Error(`${executable} exited with code ${code}`)));
});
const waitForReady = async () => {
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    try { if ((await fetch(`${readyUrl}/mockserver/ready`)).ok) return; } catch { /* not ready */ }
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error(`MockServer did not become ready at ${readyUrl}.`);
};
const start = async () => {
  await run(runtime, ['run', '--detach', '--rm', '--name', containerName, '--publish', '127.0.0.1:1080:1080', '--volume', `${initializationDirectory}:/config:ro`, '--env', 'MOCKSERVER_INITIALIZATION_JSON_PATH=/config/mockserverInitialization.json', '--env', 'MOCKSERVER_FAIL_ON_INITIALIZATION_ERROR=true', image]);
  try { await waitForReady(); } catch (error) { await run(runtime, ['logs', containerName], true); await run(runtime, ['stop', containerName], true); throw error; }
};
const stop = () => run(runtime, ['stop', containerName], true);
if (command === 'up') await start();
else if (command === 'down') await stop();
else if (command === 'test') { await start(); try { await run(process.execPath, [vitestEntrypoint, '--run']); } catch (error) { await run(runtime, ['logs', containerName], true); throw error; } finally { await stop(); } }
else throw new Error('Usage: node scripts/mockserver.mjs <up|down|test>');
