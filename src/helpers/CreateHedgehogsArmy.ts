import getClients from './getClients';
import createCommands, { type ICommands } from './createCommands';
import startFarming from './startFarming';

type IHedgehogsArmy = {
  hedgehogs: ICommands[];
  startFarming: () => void;
};

async function CreateHedgehogsArmy() {
  console.info('Creating hedgehogs army.');

  const clients = await getClients();

  const hedgehogsArmy: IHedgehogsArmy = {
    hedgehogs: [] as ICommands[],
  } as any;

  for (const client of clients) {
    hedgehogsArmy.hedgehogs.push(await createCommands(client));
  }

  hedgehogsArmy.startFarming = () => {
    for (const hedgehog of hedgehogsArmy.hedgehogs) {
      startFarming(hedgehog);
    }
  };

  console.info('Hedgehogs army was created!');

  return hedgehogsArmy;
}

export default CreateHedgehogsArmy;
