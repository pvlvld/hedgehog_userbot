import { type MyClient } from './getClients';
import { sleep } from 'telegram/Helpers';
import getBotEntity from './getBotEntity';

const SENDING_COOLDOWN = 3333;

let isCooldown = false;

async function sendMessage(
  client: MyClient,
  message: string
): Promise<boolean> {
  const botEntity = await getBotEntity(client);

  if (isCooldown) {
    await sleep(SENDING_COOLDOWN);
    return sendMessage(client, message);
  }

  try {
    await client.sendMessage(botEntity, { message });
    console.info(`${client.name} used ${message}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    isCooldown = true;
    setTimeout(() => {
      isCooldown = false;
    }, SENDING_COOLDOWN);
  }
}

export default sendMessage;
