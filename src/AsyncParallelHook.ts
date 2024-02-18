import { AsyncParallelHook } from 'tapable';
import debug from 'debug';
import { sleep } from './utils';

const NAME = 'AsyncParallelHook';
const log = debug(NAME);
const hook = new AsyncParallelHook();

hook.tapPromise(
  NAME,
  async () => {
    await sleep(1);
    log('tapPromise', 1);
  }
);

hook.tap(
  NAME,
  async () => {
    await sleep(1);
    log('tap', 1);
  }
);


hook.tapAsync(
  NAME,
  async (cbk: Function) => {
    await sleep(1);
    log('tapAsync', 1);
    cbk();
  }
);

/**
 * 并行执行，下方没有 sleep 的先输出
 */
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
