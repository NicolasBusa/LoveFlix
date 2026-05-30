import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables.');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-04-22.dahlia' as any, // Always use a specific version
  appInfo: {
    name: 'LoveFlix & Base Projects Platform',
    version: '1.0.0',
  },
});
