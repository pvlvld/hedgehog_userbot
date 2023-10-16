import client from './client';

const TARGET_BOT_ID = process.env.TARGET_BOT_ID;

async function getBotEntity() {
  if (!Number(TARGET_BOT_ID))
    throw new Error('Bad TARGET_BOT_ID. Check .env file.');

  await (await client).getDialogs();

  const botEntity = (await client).getInputEntity(Number(TARGET_BOT_ID));

  return botEntity;
}

export default getBotEntity;
