import client from './client';
import getBotEntity from './getBotEntity';

async function heal() {
  const healMessage = (
    await (
      await client
    ).getMessages(await getBotEntity(), {
      ids: 90962,
    })
  )[0];
  if (healMessage.buttons) {
    await healMessage.click(healMessage.buttons[0][1]);
  }
}

export default heal;
