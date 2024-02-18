import { AsyncSeriesBailHook } from 'tapable';
import debug from 'debug';
import { sleep } from './utils';

const NAME = 'AsyncSeriesBailHook';
const log = debug(NAME);
const tapHook = new AsyncSeriesBailHook();
const tapAsyncHook = new AsyncSeriesBailHook();
const tapPromiseHook = new AsyncSeriesBailHook();
const multiHook = new AsyncSeriesBailHook();

tapHook.tap(
  NAME,
  () => {
    log('tap', 1);
  }
);

tapHook.tap(
  NAME,
  // tap 方法注册的，其返回值为判定为 Promise<undefined> 不等于 undefined，会在 2 这里停止
  async () => {
    log('tap', 2);
  }
);

tapHook.tap(
  NAME,
  () => {
    log('tap', 3);
  }
);

tapAsyncHook.tapAsync(
  NAME,
  async (cbk: Function) => {
    log('tapAsync', 1);
    cbk();
  }
);


tapAsyncHook.tapAsync(
  NAME,
  async (cbk: Function) => {
    await sleep(2);
    log('tapAsync', 'sleep 2s', 2);
    cbk(null, 1);
  }
);

tapAsyncHook.tapAsync(
  NAME,
  async (cbk: Function) => {
    await sleep(1);
    log('tapAsync', 'sleep 1s', 3);
    cbk();
  }
);

tapPromiseHook.tapPromise(
  NAME,
  async () => {
    log('tapPromise', 1);
  }
);

tapPromiseHook.tapPromise(
  NAME,
  async () => {
    await sleep(2);
    log('tapPromise', 'sleep 2s', 2);
  }
);

tapPromiseHook.tapPromise(
  NAME,
  async () => {
    await sleep(1);
    log('tapPromise', 'sleep 1s', 3);
    return 1;
  }
);

multiHook.tap(
  NAME,
  () => {
    log('multi tap', 1);
  }
);

multiHook.tapPromise(
  NAME,
  async () => {
    sleep(1);
    log('multi tapPromise', 'sleep 1s', 2);
    return 1;
  }
);

multiHook.tapAsync(
  NAME,
  async (cbk: Function) => {
    sleep(1);
    log('multi tapAsync', 'sleep 1s', 3);
    cbk();
  }
);

(async () => {
  await tapHook.promise(null);
  log('tapHook finish');

  await tapAsyncHook.promise(null);

  await tapPromiseHook.promise(null);
  log('tapPromiseHook finish');

  await multiHook.promise(null);
})();
