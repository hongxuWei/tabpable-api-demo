import { SyncBailHook } from 'tapable';
import debug from 'debug';

const NAME = 'SyncBailHook';
const log = debug(NAME);
const hook = new SyncBailHook();

hook.tap(
  NAME,
  () => {
    log(1);
  }
);

hook.tap(
  NAME,
  () => {
    log(2)
    return null;
  }
);

// 不会执行，因为上一步注册的函数已经有返回值了
hook.tap(
  NAME,
  () => {
    log(3)
  }
);

hook.call(null);
