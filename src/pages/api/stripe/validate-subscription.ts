import { NextApiRequest, NextApiResponse } from 'next/types';
import { getStripeCustomerId } from '../../../models_helpers/stripe_helper';
import { getFirestoreUserWithSubsciption } from '../../../models_helpers/user_helper.ts';
import { withAuth, withStripe } from '../../../_firebase/firebase_admin_auth';
import Stripe from 'stripe';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST' && req.body.type === 'validate-subscription') {
    const userId = req.body.userId;
    const email = req.body.email;
    const isStripeKeyLive = req.body.isStripeKeyLive;

    try {
      const user = await getFirestoreUserWithSubsciption({ userId: userId, email, isStripeKeyLive });
      if (!user) return res.status(400).json({ error: 'User not found' });
      if (user.subStripeStatus !== 'active') return res.json({ error: 'No active subscription' });
      return res.json({ message: 'Subscription active', user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default withAuth(withStripe(handler));
