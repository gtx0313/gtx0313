import { collection, onSnapshot, orderBy, query, doc, where } from 'firebase/firestore';
import create from 'zustand';
import { Announcement } from '../models/model.announcement';
import { AuthUser } from '../models/model.authuser';
import { Signal } from '../models/model.signal';
import { firestoreClient } from '../_firebase/firebase_client';
import { authClient } from '../_firebase/firebase_client';

type State = {
  signals: Signal[];
  announcements: Announcement[];
  authUsers: AuthUser[];
  authUser: AuthUser | null;
  authUserHasSubscriptions: boolean | null;
  subscriptions: any;

  streamAuthUser: () => void;
  streamSignalsSubscription: () => void;
  streamSignalsWithOutSubscription: () => void;
  streamAnnouncements: () => void;
  streamUsers: () => void;
  closeSubscriptions: () => void;
};

export const useFirestoreStore = create<State>((set, get) => ({
  subscriptions: {},
  signals: [],
  announcements: [],
  authUsers: [],
  authUser: null,
  authUserHasSubscriptions: null,

  streamSignalsSubscription: () => {
    const q = query(collection(firestoreClient, 'signals'), orderBy('timestampCreated', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const x = querySnapshot.docs.map((doc) => {
        return Signal.fromJson({
          ...doc.data(),
          id: doc.id,
          timestampCreated: doc.data()!.timestampCreated?.toDate(),
          timestampUpdated: doc.data()!.timestampUpdated?.toDate(),
          signalDate: doc.data()!.signalDate?.toDate(),
          signalTime: doc.data()!.signalTime?.toDate(),
          signalDatetime: doc.data()!.signalDatetime?.toDate()
        });
      });
      set((state) => {
        return { ...state, signals: x };
      });
    });

    set((state) => {
      return { ...state, subscriptions: { ...state.subscriptions, signals: unsubscribe } };
    });
  },

  streamSignalsWithOutSubscription: () => {
    const q = query(collection(firestoreClient, 'signals'), where('isFree', '==', true), orderBy('timestampCreated', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      const x = querySnapshot.docs.map((doc) => {
        return Signal.fromJson({
          ...doc.data(),
          id: doc.id,
          timestampCreated: doc.data()!.timestampCreated?.toDate(),
          timestampUpdated: doc.data()!.timestampUpdated?.toDate(),
          signalDate: doc.data()!.signalDate?.toDate(),
          signalTime: doc.data()!.signalTime?.toDate(),
          signalDatetime: doc.data()!.signalDatetime?.toDate()
        });
      });
      set((state) => {
        return { ...state, signals: x };
      });
    });
  },

  streamAnnouncements: () => {
    const q = query(collection(firestoreClient, 'announcements'), orderBy('timestampCreated', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const x = querySnapshot.docs.map((doc) => {
        return Announcement.fromJson({
          ...doc.data(),
          id: doc.id,
          timestampCreated: doc.data()!.timestampCreated?.toDate(),
          timestampUpdated: doc.data()!.timestampUpdated?.toDate()
        });
      });
      set((state) => {
        return { ...state, announcements: x };
      });
    });
    set((state) => {
      return { ...state, subscriptions: { ...state.subscriptions, announcements: unsubscribe } };
    });
  },

  streamUsers: () => {
    const q = query(collection(firestoreClient, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const x = querySnapshot.docs.map((doc) => {
        return AuthUser.fromJson({
          ...doc.data(),
          id: doc.id,
          timestampCreated: doc.data()!.timestampCreated?.toDate(),
          timestampUpdated: doc.data()!.timestampUpdated?.toDate(),
          timestampLastLogin: doc.data()!.lastLogin?.toDate()
        });
      });
      set((state) => {
        return { ...state, authUsers: x };
      });
    });

    set((state) => {
      return { ...state, subscriptions: { ...state.subscriptions, authUsers: unsubscribe } };
    });
  },

  closeSubscriptions: () => {
    Object.values(get().subscriptions).forEach((unsubscribe: any) => unsubscribe());
    set((state) => {
      return { ...state, authUserHasSubscriptions: null, subscriptions: {} };
    });
  },

  streamAuthUser: () => {
    const fbuser = authClient.currentUser;
    if (!fbuser) return get().closeSubscriptions();

    const unsubscribe = onSnapshot(doc(firestoreClient, 'users', fbuser.uid), (doc) => {
      const x = AuthUser.fromJson({
        ...doc.data(),
        id: doc.id,
        timestampCreated: doc.data()!.timestampCreated?.toDate(),
        timestampUpdated: doc.data()!.timestampUpdated?.toDate(),
        timestampLastLogin: doc.data()!.lastLogin?.toDate(),
        subStripeEnd: doc.data()!.subStripeEnd?.toDate(),
        subStripeStart: doc.data()!.subStripeStart?.toDate(),
        subRevenueCatOriginalPurchaseDate: doc.data()!.subRevenueCatOriginalPurchaseDate?.toDate(),
        subRevenueCatLatestPurchaseDate: doc.data()!.subRevenueCatLatestPurchaseDate?.toDate(),
        subRevenueCatExpirationDate: doc.data()!.subRevenueCatExpirationDate?.toDate(),
        subRevenueCatUnsubscribeDetectedAt: doc.data()!.subRevenueCatUnsubscribeDetectedAt?.toDate(),
        subRevenueCatBillingIssueDetectedAt: doc.data()!.subRevenueCatBillingIssueDetectedAt?.toDate()
      });

      if (get().authUserHasSubscriptions !== x.getHasSubscription) {
        get().closeSubscriptions();

        if (x.getHasSubscription) {
          get().streamSignalsSubscription();
          get().streamAnnouncements();
          get().streamUsers();
        }

        if (!x.getHasSubscription) {
          get().streamSignalsWithOutSubscription();
          get().streamAnnouncements();
          get().streamUsers();
        }
      }

      set((state) => {
        return { ...state, authUser: x, authUserHasSubscriptions: x.getHasSubscription };
      });
    });
  }
}));
