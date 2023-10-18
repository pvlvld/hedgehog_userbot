import { sleep } from 'telegram/Helpers';
import { ICommands } from './createCommands';

async function startFarming(commands: ICommands) {
  for (const [, command] of Object.entries(commands)) {
    command.call_repeated();
    await sleep(3333); // 3s sleep
  }
}

export default startFarming;
