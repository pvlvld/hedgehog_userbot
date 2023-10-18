import { Api, TelegramClient } from 'telegram';
//@ts-expect-error
import input from 'input';
import { StringSession } from 'telegram/sessions';
import { sleep } from 'telegram/Helpers';

export type MyClient = TelegramClient & {
  name: string;
};

const { API_ID, API_HASH, SESSIONS } = process.env;

async function getClients() {
  if (!Number(API_ID) || !API_HASH || SESSIONS === undefined)
    throw new Error('Bad .env');

  const clients: MyClient[] = [];
  const sessionsArray = SESSIONS.split(',');

  if (sessionsArray.length > 0) {
    console.info('Start creating clients.');

    for (const session of sessionsArray) {
      clients.push(await CreateClient(Number(API_ID), API_HASH, session));
      sleep(1000);
    }

    console.info('Successfully created clients!');
  } else {
    throw new Error('Invalid sessions.');
  }

  return clients;
}

async function CreateClient(
  apiId: number,
  apiHash: string,
  session: string
): Promise<MyClient> {
  const client = new TelegramClient(
    new StringSession(session),
    apiId,
    apiHash,
    {
      connectionRetries: 3,
    }
  ) as MyClient;

  await client.start({
    phoneNumber: async () => await input.text('Please enter your number: '),
    password: async () => await input.text('Please enter your password: '),
    phoneCode: async () =>
      await input.text('Please enter the code you received: '),
    onError: (err: any) => console.log(err),
  });

  const clientName = ((await client.getMe()) as Api.User).firstName as string;
  client.name = clientName;

  console.info(`Client ${client.name} created!`);
  console.info(`Session: ${client.session.save()}`);

  return client;
}

export default getClients;
