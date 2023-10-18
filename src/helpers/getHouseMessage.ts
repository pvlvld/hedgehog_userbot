import { sleep } from 'telegram/Helpers';
import sendMessage from './sendMessage';
import getLastMessage from './getLastMessage';

async function getHouseMessage(attempt = 1) {
  console.info(`Getting house message. Attempt: ${attempt}...`);

  await sendMessage('/house');

  await sleep(1000);

  const house = await getLastMessage();

  if (house.text !== '🇺🇦 Оберіть дію 👀') return getHouseMessage(attempt++);

  console.info('House message successfully received!');

  return house;
}

export default getHouseMessage;
