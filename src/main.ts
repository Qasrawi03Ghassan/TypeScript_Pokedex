import {startREPL} from './utils/repl.js';
import {initState} from './models/state.js';

function main() {
  let state = initState();
  startREPL(state);
}

main();