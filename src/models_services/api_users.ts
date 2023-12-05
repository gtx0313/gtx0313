import axios from 'axios';
import { AuthUser } from '../models/model.authuser';
import { authClient } from '../_firebase/firebase_client';

export async function getAuthUser(): Promise<AuthUser> {
  try {
    const jsonWebToken = await authClient.currentUser?.getIdToken(true);
    const userId = authClient.currentUser?.uid;

    const query = await axios.post(`/api/users`, {
      userId: userId,
      jsonWebToken: jsonWebToken,
      isStripeKeyLive: false
    });

    let data = query.data.user;
    data = AuthUser.fromJson({ ...data });
    console.log('getAuthUser', data);
    return data;
  } catch (error: any) {
    console.log(error);
    console.log(error?.response?.data?.message);
    throw error;
  }
}
