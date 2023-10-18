import { type MyClient } from './getClients';
import sendMessage from './sendMessage';
import { sleep } from 'telegram/Helpers';
import getLastMessage from './getLastMessage';

async function getHouseMessage(client: MyClient, attempt = 1) {
  console.info(`Getting house message. Attempt: ${attempt}...`);

  await sendMessage(client, '/house');

  await sleep(1000);

  const house = await getLastMessage(client);

  if (house.text !== '🇺🇦 Оберіть дію 👀')
    return getHouseMessage(client, attempt++);

  console.info('House message successfully received!');

  return house;
}

export default getHouseMessage;
