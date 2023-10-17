import { sleep } from 'telegram/Helpers';
import createCommands, { ICommands } from './helpers/createCommands';

const commands = createCommands();

async function startFarming(commands: ICommands) {
  for (const [name, command] of Object.entries(commands)) {
    command.call_repeated();
    await sleep(3333); // 3s sleep
  }
}

startFarming(commands);
