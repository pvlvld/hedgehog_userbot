import client from './client';
import getBotEntity from './getBotEntity';
import sleep from './sleep';

const SENDING_COOLDOWN = 3333;

let isCooldown = false;

async function sendMessage(message: string) {
  const botEntity = await getBotEntity();

  if (isCooldown) {
    await sleep(SENDING_COOLDOWN);
    return sendMessage(message);
  }

  try {
    return Boolean(await (await client).sendMessage(botEntity, { message }));
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
