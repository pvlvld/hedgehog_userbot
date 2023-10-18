import { MyClient } from './getClients';

const hedgehogBot = 6074059719;

async function getBotEntity(client: MyClient) {
  await client.getDialogs();

  const botEntity = client.getInputEntity(hedgehogBot);

  return botEntity;
}

export default getBotEntity;
