import { MyClient } from './getClients';

const TARGET_BOT_ID = process.env.TARGET_BOT_ID;

async function getBotEntity(client: MyClient) {
  if (!Number(TARGET_BOT_ID))
    throw new Error('Bad TARGET_BOT_ID. Check .env file.');

  await client.getDialogs();

  const botEntity = client.getInputEntity(Number(TARGET_BOT_ID));

  return botEntity;
}

export default getBotEntity;
