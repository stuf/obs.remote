// const fs = require('fs');
const execSync = require('child_process').execSync;
const debug = require('debug')('obs.remote:build');

const exec = (cmd, env) =>
  execSync(cmd, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, env)
  });

debug('Building CJS modules...');
exec('babel src -d build/cjs --ignore test.js', {
  BABEL_ENV: 'cjs'
});

debug('Building ES modules...');
exec('babel src -d build/es --ignore test.js', {
  BABEL_ENV: 'es'
});

debug('Building `obs.remote`...');
exec('rollup -c -f umd -o dist/obs.remote.js -i build/cjs/index.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'production'
});

exec('rollup -c -f umd -o dist/obs.remote.min.js -i build/cjs/index.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'production'
});
