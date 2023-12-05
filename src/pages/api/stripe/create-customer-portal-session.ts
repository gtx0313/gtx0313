import { NextApiRequest, NextApiResponse } from 'next/types';
import { getStripeCustomerId } from '../../../models_helpers/stripe_helper';
import { getFirestoreUserWithSubsciption } from '../../../models_helpers/user_helper.ts';
import { withAuth, withStripe } from '../../../_firebase/firebase_admin_auth';
import Stripe from 'stripe';

const stripeTestkey = process.env.STRIPE_TEST_KEY as string;
const stripeLivekey = process.env.STRIPE_LIVE_KEY as string;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const userId = req.body.userId;
    const email = req.body.email;
    const isStripeKeyLive = req.body.isStripeKeyLive;
    const returnUrl = req.body.returnUrl;
    if (returnUrl == null) return res.status(400).json({ error: 'Missing returnUrl' });

    try {
      const customerId = await getStripeCustomerId({ userId: userId, email, isStripeKeyLive });
      if (!customerId) return res.status(400).json({ error: 'Invalid customerId' });

      const stripe = new Stripe(isStripeKeyLive ? stripeLivekey : stripeTestkey, { apiVersion: '2022-08-01' });
      const session = await stripe.billingPortal.sessions.create({ customer: customerId, return_url: returnUrl });
      return res.json({ url: session.url });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default withAuth(withStripe(handler));
