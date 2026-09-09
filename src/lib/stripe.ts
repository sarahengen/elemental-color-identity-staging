import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ??
  'pk_live_51OJhJBHdGQpsHqInIzu7c6PzGPSH0yImD4xfpofvxvFZs0VFhPRXZCyEgYkkhOtBOXFWvssYASs851mflwQvjnrl00T6DbUwWZ';

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
