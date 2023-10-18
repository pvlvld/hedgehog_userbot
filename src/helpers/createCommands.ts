import { type MyClient } from './getClients';
import RAW_COMMANDS_ACTIONS from '../consts/rawCommandsActions';
import CreateHeal from './CreateHeal';
import sendMessage from './sendMessage';

// TODO: parse cooldown ??? reply.match(RegExp(/\d+/, 'g'))

type ICallFn = Awaited<ReturnType<typeof CreateCall>>;
type IRepeater = typeof repeater;

export type ICommands = Record<
  RAW_COMMANDS_ACTIONS,
  {
    call_once: () => ReturnType<ICallFn>;
    call_repeated: () => ReturnType<IRepeater>;
    cooldown: number;
  }
>;

const repeater = async (cb: ICallFn, cooldown: number) => {
  return setInterval(cb, (cooldown + 1) * 60 * 1000); // minutes + 1m to milliseconds
};

async function createCommands(client: MyClient) {
  const commands: ICommands = {} as any;

  const call = await CreateCall(client);

  RAW_COMMANDS_ACTIONS.forEach((c) => {
    const [command, cooldown] = c;

    commands[command] = {
      call_once: async () => await call(command),
      call_repeated: () => repeater(() => call(command), cooldown),
      cooldown,
    };
  });

  return commands;
}

async function CreateCall(client: MyClient) {
  const heal = await CreateHeal(client);

  return async (command: string) => {
    await sendMessage(client, `/${command}`);
    await heal();
    return true;
  };
}

export default createCommands;
