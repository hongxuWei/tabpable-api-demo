import { SyncWaterfallHook } from 'tapable';
import debug from 'debug';

const NAME = 'SyncWaterfallHook';
const log = debug(NAME);
const hook = new SyncWaterfallHook(['argv1']);

hook.tap(
  NAME,
  (prev) => {
    log(1, `prev value: ${prev}`);
    return true
  }
);

hook.tap(
  NAME,
  (prev) => {
    log(2, `prev value: ${prev}`)
  }
);

hook.call(null);
