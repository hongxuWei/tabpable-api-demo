import { AsyncSeriesWaterfallHook } from 'tapable';
import debug from 'debug';
import { sleep } from './utils';

const NAME = 'AsyncSeriesWaterfallHook';
const log = debug(NAME);
const hook = new AsyncSeriesWaterfallHook(['argv1']);

hook.tap(
  NAME,
  (prev) => {
    log(1, `prev value: ${prev}`);
    return true
  }
);

hook.tapPromise(
  NAME,
  async (prev): Promise<any> => {
    await sleep(1);
    log(2, `prev value: ${prev}`);
    return false;
  }
);


hook.tapAsync(
  NAME,
  async (prev, cbk: Function) => {
    await sleep(1);
    log(3, `prev value: ${prev}`);
    cbk(null, true);
  }
);


(async () => {
  const result = await hook.promise(null);
  log('result', result);
})();
