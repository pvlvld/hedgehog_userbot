import { type MyClient } from './getClients';
import getBotEntity from './getBotEntity';

async function getLastMessage(client: MyClient) {
  return (
    await client.getMessages(await getBotEntity(client), { limit: 1 })
  )[0];
}

export default getLastMessage;
