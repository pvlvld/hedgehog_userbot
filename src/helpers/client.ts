import { TelegramClient } from 'telegram';
//@ts-expect-error
import input from 'input';
import { StringSession } from 'telegram/sessions';

const { API_ID, API_HASH, PHONE, SESSION } = process.env;

async function getClient() {
  if (!Number(API_ID) || !API_HASH || !PHONE) {
    throw new Error('Bad .env file');
  }

  const client = new TelegramClient(
    new StringSession(SESSION),
    Number(API_ID),
    API_HASH,
    {
      connectionRetries: 2,
    }
  );

  await client.start({
    phoneNumber: PHONE,
    password: async () => await input.text('Please enter your password: '),
    phoneCode: async () =>
      await input.text('Please enter the code you received: '),
    onError: (err: any) => console.log(err),
  });
  console.log('You should now be connected.');
  console.log(`Session: ${client.session.save()}`);

  return client;
}

let client: Promise<TelegramClient> = getClient();

export default client;
