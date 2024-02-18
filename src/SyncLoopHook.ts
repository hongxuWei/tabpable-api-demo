import { SyncLoopHook } from 'tapable';
import debug from 'debug';

const NAME = 'SyncLoopHook';
const log = debug(NAME);
const hook = new SyncLoopHook();

let count = 0;

hook.tap(
  NAME,
  () => {
    log(1, count++);
  }
);

hook.tap(
  NAME,
  () => {
    log(2, count++);
    return count > 6 ? undefined : null;
  }
);

hook.tap(
  NAME,
  () => {
    log(3, count++);
    return count > 10 ? undefined : null;
  }
);

hook.call(null);
