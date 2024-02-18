import { AsyncSeriesHook } from 'tapable';
import debug from 'debug';
import { sleep } from './utils';

const NAME = 'AsyncSeriesHook';
const log = debug(NAME);
const hook = new AsyncSeriesHook();

hook.tapPromise(
  NAME,
  async () => {
    await sleep(1);
    log('tapPromise', 'sleep 1s', 1);
  }
);

hook.tap(
  NAME,
  async () => {
    await sleep(1);
    log('tap', 'sleep 1s', 1);
  }
);


hook.tapAsync(
  NAME,
  async (cbk: Function) => {
    await sleep(1);
    log('tapAsync', 'sleep 1s', 1);
    cbk();
  }
);

hook.tapAsync(
  NAME,
  async (cbk: Function) => {
    log('tapAsync', 2);
    cbk();
  }
);

hook.tap(
  NAME,
  async () => {
    log('tap', 2);
  }
);


hook.tapPromise(
  NAME,
  async () => {
    log('tapPromise', 2);
  }
);

(async () => {
  await hook.promise(null);
})();

