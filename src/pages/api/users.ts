import { NextApiRequest, NextApiResponse } from 'next/types';
import { getFirestoreUserWithSubsciption } from '../../models_helpers/user_helper.ts';

import { withAuth, withStripe } from '../../_firebase/firebase_admin_auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const userId = req.body.userId;
    const email = req.body.email;
    const isStripeKeyLive = req.body.isStripeKeyLive;

    try {
      let user = await getFirestoreUserWithSubsciption({ userId: userId, email, isStripeKeyLive });
      if (!user) return res.status(400).json({ error: 'User not found' });

      user.timestampCreated = user.timestampCreated?.toDate();
      user.timestampUpdated = user.timestampUpdated?.toDate();
      user.subStripeEnd = user.subStripeEnd?.toDate();
      user.subStripeStart = user.subStripeStart?.toDate();
      user.subRevenueCatOriginalPurchaseDate = user.subRevenueCatOriginalPurchaseDate?.toDate();
      user.subRevenueCatLatestPurchaseDate = user.subRevenueCatLatestPurchaseDate?.toDate();
      user.subRevenueCatExpirationDate = user.subRevenueCatExpirationDate?.toDate();
      user.subRevenueCatUnsubscribeDetectedAt = user.subRevenueCatUnsubscribeDetectedAt?.toDate();
      user.subRevenueCatBillingIssueDetectedAt = user.subRevenueCatBillingIssueDetectedAt?.toDate();

      res.json({ user: user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default withAuth(withStripe(handler));
