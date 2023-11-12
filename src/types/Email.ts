export interface Status {
  unsubscribe: boolean;
}

export type SubscriptionStatus = 'unsubscribe' | 'subscribe' | 'subscribed';
