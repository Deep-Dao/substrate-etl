

import { logger } from '@polkadot/util';
import pRetry from 'p-retry';

import { nodeWatcher } from './nodeWatcher';
import getEnvVars from './util/getEnvVars';

const l = logger('main');

async function main(): Promise<void> {

  const envVars = getEnvVars();
  console.log('Using envs:', JSON.stringify(envVars,null,2));

  await pRetry(nodeWatcher, {
    onFailedAttempt: error => {
      console.log(
        `${error.message} - Retry attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`
      );
    },
    retries: 10,
  });
}

main().catch(e => {
  l.error(e);
  process.exit(1);
});
