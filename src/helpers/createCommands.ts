import RAW_COMMANDS_ACTIONS from '../consts/rawCommandsActions';
import CreateHeal from './CreateHeal';
import sendMessage from './sendMessage';

// TODO: parse cooldown ??? reply.match(RegExp(/\d+/, 'g'))

type ICallFn = typeof call;
type IRepeater = typeof repeater;

export type ICommands = Record<
  RAW_COMMANDS_ACTIONS,
  {
    call_once: () => ReturnType<ICallFn>;
    call_repeated: () => ReturnType<IRepeater>;
    cooldown: number;
  }
>;

const heal = CreateHeal();

const call = async (command: string) => {
  await sendMessage(`/${command}`);
  (await heal)();
  return true;
};

const repeater = async (cb: ICallFn, cooldown: number) => {
  return setInterval(cb, (cooldown + 1) * 60 * 1000); // minutes + 1m to milliseconds
};

function createCommands() {
  const commands: ICommands = {} as any;

  // const _intervals: Partial<Record<ICommands, { id: number, stop: () => boolean}>> = {} as any;

  RAW_COMMANDS_ACTIONS.forEach((c) => {
    const [command, cooldown] = c;

    commands[command] = {
      call_once: async () => await call(command),
      call_repeated: () => repeater(() => call(command), cooldown),
      // TODO: stop. call_repeated -> intervalID -> clearInterval() ???
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
