import { type MyClient } from './getClients';
import getHouseMessage from './getHouseMessage';

async function CreateHeal(client: MyClient) {
  const healMessage = await getHouseMessage(client);

  return async () => {
    if (healMessage.buttons)
      try {
        await healMessage.click(healMessage.buttons[0][1]);
        console.info(`${client.name} healed!`);
        return true;
      } catch (error) {
        console.error('Unable to heal.');
        console.error(error);
        return false;
      }
  };
}

export default CreateHeal;
