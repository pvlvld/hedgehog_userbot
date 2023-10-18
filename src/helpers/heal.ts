import getHouseMessage from './getHouseMessage';

async function heal() {
  const healMessage = await getHouseMessage();
  if (healMessage.buttons) await healMessage.click(healMessage.buttons[0][1]);
}

export default heal;
