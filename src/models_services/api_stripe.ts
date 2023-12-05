import axios from 'axios';
import { AuthUser } from '../models/model.authuser';
import { USE_LIVE_STRIPE_API } from '../utils_constants/app_constants';
import { authClient } from '../_firebase/firebase_client';

export async function createSubsciption(productId: string): Promise<any> {
  try {
    const jsonWebToken = await authClient.currentUser?.getIdToken(true);

    const res = await axios.post(`/api/stripe/create-subscription`, {
      jsonWebToken,
      productId: productId,
      isStripeKeyLive: USE_LIVE_STRIPE_API,
      successUrl: `${window.location.origin}/your-account-subscription`,
      cancelUrl: `${window.location.origin}/your-account`,
      type: 'create-subscription'
    });

    window.location = res.data.url;

    console.log('window.location', window.location);
  } catch (error: any) {
    console.log('error', error.response.data.message);
    throw error;
  }
}

export async function validateSubscription(): Promise<AuthUser | null> {
  try {
    const jsonWebToken = await authClient.currentUser?.getIdToken(true);

    const res = await axios.post(`/api/stripe/validate-subscription`, {
      jsonWebToken,
      isStripeKeyLive: USE_LIVE_STRIPE_API,
      type: 'validate-subscription'
    });

    const data = res.data.user;
    return AuthUser.fromJson(data);
  } catch (error: any) {
    console.log(error?.response?.data?.message);
    return null;
  }
}

export async function goToCutomerPortal(): Promise<any> {
  const jsonWebToken = await authClient.currentUser?.getIdToken(true);

  try {
    const res = await axios.post(`/api/stripe/create-customer-portal-session`, {
      jsonWebToken,
      isStripeKeyLive: USE_LIVE_STRIPE_API,
      returnUrl: `${window.location.origin}/your-account`,
      type: 'create-customer-portal-session'
    });
    window.location = res.data.url;
  } catch (error: any) {
    console.log(error?.response?.data?.error);
    throw error;
  }
}
