import client from './client';
import getBotEntity from './getBotEntity';

async function getLastMessage() {
  return (
    await (await client).getMessages(await getBotEntity(), { limit: 1 })
  )[0];
}

export default getLastMessage;
