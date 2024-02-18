import { SyncHook } from 'tapable';
import debug from 'debug';

const NAME = 'SyncHook';
const log = debug(NAME);
const hook = new SyncHook();

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
  }
);

hook.call(null);
