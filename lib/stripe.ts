import Stripe from "stripe";

// Lazy singleton — prevents build crash when STRIPE_SECRET_KEY is a placeholder
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-04-22.dahlia",
    });
  }
  return _stripe;
}

// Keep named export for backwards compat — initialised on first call, not at import
export const stripe = new Proxy({} as Stripe, {
  get(_t, prop) {
    return (getStripe() as unknown as Record<string, unknown>)[prop as string];
  },
});

export const PREMIUM_PRICE_ID_MONTHLY = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID ?? process.env.STRIPE_PRICE_ID_MONTHLY ?? "";
export const PREMIUM_PRICE_ID_YEARLY  = process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID  ?? process.env.STRIPE_PRICE_ID_YEARLY  ?? "";
