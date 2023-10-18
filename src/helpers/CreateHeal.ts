import getHouseMessage from './getHouseMessage';

async function CreateHeal() {
  const healMessage = await getHouseMessage();

  return async () => {
    if (healMessage.buttons)
      try {
        await healMessage.click(healMessage.buttons[0][1]);
        console.info('Healed!');
        return true;
      } catch (error) {
        console.error('Unable to heal.');
        console.error(error);
        return false;
      }
  };
}

export default CreateHeal;
