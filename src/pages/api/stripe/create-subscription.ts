import { NextApiRequest, NextApiResponse } from 'next/types';
import Stripe from 'stripe';
import { getStripeCustomerId } from '../../../models_helpers/stripe_helper';
import { withAuth, withStripe } from '../../../_firebase/firebase_admin_auth';

const stripeTestkey = process.env.STRIPE_TEST_KEY as string;
const stripeLivekey = process.env.STRIPE_LIVE_KEY as string;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const userId = req.body.userId;
    const email = req.body.email;
    const isStripeKeyLive = req.body.isStripeKeyLive;
    const productId = req.body.productId;
    const successUrl = req.body.successUrl;
    const cancelUrl = req.body.cancelUrl;
    if (productId == null || successUrl == null || cancelUrl == null) {
      return res.status(400).json({ error: 'Missing productId, successUrl, cancelUrl' });
    }

    try {
      const customerId = await getStripeCustomerId({ userId: userId, email, isStripeKeyLive });
      if (customerId == null) return res.status(400).json({ error: 'CustomerId not found' });

      const stripe = new Stripe(isStripeKeyLive ? stripeLivekey : stripeTestkey, { apiVersion: '2022-08-01' });
      const subscriptions = await stripe.subscriptions.list({ customer: customerId });
      if (subscriptions.data.length > 0) {
        const subscription = subscriptions.data[0];
        const active = subscription.status === 'active';
        if (active) return res.status(400).json({ message: 'Subscription already active' });
      }

      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: 'subscription',
        line_items: [{ price: productId, quantity: 1 }]
      });

      return res.json({ url: session.url });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default withAuth(withStripe(handler));
