import CreateHedgehogsArmy from './helpers/CreateHedgehogsArmy';

async function runner() {
  const hedgehogArmy = await CreateHedgehogsArmy();

  hedgehogArmy.startFarming();
}

runner();
