import * as admin from 'firebase-admin';
import { firestoreAdmin } from '../_firebase/firebase_admin';

export async function sendNotificationsToUsers({ title, body, databaseCall }: { title: string; body: string; databaseCall?: string }) {
  let tokens: string[] = [];
  try {
    const users = await firestoreAdmin.collection('users').get();
    for (const user of users.docs) {
      const _tokens = user.data().devTokens;
      if (_tokens instanceof Array) tokens = [...tokens, ..._tokens];
    }
    await sendNotification({ title, body, tokens, databaseCall });
  } catch (error: any) {}
}

export async function sendNotification({
  title,
  body,
  tokens,
  databaseCall
}: {
  title: string;
  body: string;
  tokens: string[] | string;
  databaseCall?: string;
}) {
  if (!tokens) throw new Error('Tokens must not be less than 1');
  let devTokens = [];
  if (typeof tokens === 'string') devTokens.push(tokens);
  if (tokens instanceof Array) devTokens.push(...tokens);

  const fcm = admin.messaging();

  devTokens = devTokens.filter((to) => typeof to === 'string');
  devTokens = devTokens.filter((token) => token != '');

  const payload: admin.messaging.MessagingPayload = {
    notification: {
      title: `${title}`,
      body: `${body}`,
      sound: 'default',
      priority: 'high',
      id: generateRandomString(5),
      databaseCall: `${databaseCall}`
    },

    data: {
      title: `${title}`,
      message: `${body}`,
      sound: 'default',
      priority: 'high',
      click_action: 'FLUTTER_NOTIFICATION_CLICK',
      id: generateRandomString(5),
      databaseCall: `${databaseCall}`
    }
  };

  try {
    await fcm.sendToDevice(devTokens, payload);
  } catch (error: any) {
    throw new Error(error);
  }
}

//generate random string for notification id length 5
export function generateRandomString(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
