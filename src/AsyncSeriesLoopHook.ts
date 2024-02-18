import { AsyncSeriesLoopHook } from 'tapable';
import debug from 'debug';
import { sleep } from './utils';

const NAME = 'AsyncSeriesLoopHook';
const log = debug(NAME);
const hook = new AsyncSeriesLoopHook();

let count = 0;

hook.tap(
  NAME,
  () => {
    log(1, count++);
  }
);

hook.tapPromise(
  NAME,
  async () => {
    await sleep(1);
    log(2, count++);
    return count > 6 ? undefined : null;
  }
);

hook.tapAsync(
  NAME,
  async (cbk: Function) => {
    await sleep(2);
    log(3, count++);
    cbk(null, count > 10 ? undefined : null);
  }
);

(async () => {
  await hook.promise(null);
})();

