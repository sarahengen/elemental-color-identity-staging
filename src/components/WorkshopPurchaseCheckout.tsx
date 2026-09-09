import React, { useEffect, useMemo, useState } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import type { StripePaymentElementOptions } from '@stripe/stripe-js';
import { X, Crown, Loader2, Lock, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { stripePromise } from '@/lib/stripe';
import { toast } from '@/components/ui/use-toast';
import { getWorkshopPriceUsd } from '@/lib/workshopAccess';
import { useIsMobile } from '@/hooks/use-mobile';

interface WorkshopPurchaseCheckoutProps {
  user: { id: string; email?: string | null; user_metadata?: { full_name?: string } };
  onSuccess: () => void;
  onCancel: () => void;
}

const CheckoutForm: React.FC<{
  user: WorkshopPurchaseCheckoutProps['user'];
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}> = ({ user, amount, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const paymentElementOptions = useMemo<StripePaymentElementOptions>(
    () => ({
      layout: isMobile
        ? { type: 'accordion', defaultCollapsed: false, spacedAccordionItems: true }
        : { type: 'tabs', defaultCollapsed: false },
      wallets: { link: 'never' },
    }),
    [isMobile],
  );

  const finalizePurchase = async (paymentIntentId: string) => {
    const { data, error: confirmError } = await supabase.functions.invoke('confirm-workshop-purchase', {
      body: {
        paymentIntentId,
        userId: user.id,
      },
    });

    if (confirmError || data?.error) {
      throw new Error(confirmError?.message || data?.error || 'Purchase confirmation failed');
    }

    const { error: profileError } = await supabase
      .from('user_profiles')
      .update({
        workshop_unlocked: true,
        workshop_purchased_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (profileError) {
      console.error('Workshop unlock update failed:', profileError);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw new Error(submitError.message);

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/elemental-color-workshop?workshop-purchase=success`,
          receipt_email: user.email || undefined,
        },
        redirect: 'if_required',
      });

      if (confirmError) throw new Error(confirmError.message);

      if (paymentIntent?.status === 'succeeded') {
        await finalizePurchase(paymentIntent.id);
        setSucceeded(true);
        toast({
          title: 'You\u2019re in!',
          description: 'Check your email to choose your workshop date.',
        });
        onSuccess();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Payment failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (succeeded) {
    return (
      <div className="text-center py-6 sm:py-8 px-1">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />
        </div>
        <h3 className="text-lg sm:text-xl font-serif text-gray-900 mb-2">You&apos;re all set!</h3>
        <p className="text-sm sm:text-base text-gray-600">The full Elemental Color Workshop is unlocked.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-hide pb-2">
        <div className="profile-checkout-payment min-w-0 w-full">
          <PaymentElement key={isMobile ? 'mobile' : 'desktop'} options={paymentElementOptions} />
        </div>
        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
      </div>

      <div className="profile-checkout-footer shrink-0 border-t border-gray-100 bg-white pt-4 mt-3 -mx-4 px-4 sm:-mx-6 sm:px-6 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-gray-400 text-center mb-4">
          <Lock className="w-3.5 h-3.5 shrink-0" />
          <span className="leading-snug">Secure one-time payment · ${amount.toFixed(2)} USD</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-full min-h-[48px] py-3 border border-gray-200 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full min-h-[48px] py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 inline-flex items-center justify-center"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing…
              </span>
            ) : (
              'Buy'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

const WorkshopPurchaseCheckout: React.FC<WorkshopPurchaseCheckoutProps> = ({
  user,
  onSuccess,
  onCancel,
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const amount = getWorkshopPriceUsd();

  useEffect(() => {
    const initPayment = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fnError } = await supabase.functions.invoke('create-workshop-payment', {
          body: {
            userId: user.id,
            customerEmail: user.email,
            customerName: user.user_metadata?.full_name || user.email,
            amount,
            currency: 'usd',
          },
        });

        if (fnError || data?.error) {
          throw new Error(fnError?.message || data?.error || 'Failed to initialize payment');
        }
        if (!data?.clientSecret) {
          throw new Error('Failed to create payment session');
        }
        setClientSecret(data.clientSecret);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to initialize payment';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    initPayment();
  }, [user.id, user.email, amount]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full min-w-0 max-h-[min(90dvh,90vh)] flex flex-col overflow-hidden shadow-2xl">
        <div className="shrink-0 bg-gradient-to-r from-amber-500 to-rose-500 p-4 sm:p-6 text-white rounded-t-xl sm:rounded-t-2xl flex justify-between items-start gap-3">
          <div className="min-w-0 pr-1">
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-5 h-5 shrink-0" />
              <h3 className="text-lg sm:text-xl font-serif leading-tight">Elemental Color Workshop</h3>
            </div>
            <p className="text-white/90 text-sm truncate">Everything — guides, gallery, tools &amp; the live workshop</p>
            <p className="text-white font-semibold mt-2 text-sm sm:text-base">${amount.toFixed(2)} one-time</p>
          </div>
          <button
            onClick={onCancel}
            type="button"
            className="p-2 -mr-1 shrink-0 hover:bg-white/10 rounded-full"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col flex-1 min-h-0 p-4 sm:p-6 pt-4 sm:pt-5">
          {loading ? (
            <div className="py-12 flex flex-col items-center flex-1">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500 mb-4" />
              <p className="text-gray-500">Setting up secure checkout…</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 flex-1">
              <p className="text-red-600 mb-4 text-sm">{error}</p>
              <p className="text-gray-500 text-xs mb-4">
                Ensure the <code className="bg-gray-100 px-1 rounded">create-workshop-payment</code> edge function is deployed in Supabase.
              </p>
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border rounded-full text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          ) : clientSecret ? (
            <div className="flex flex-col flex-1 min-h-0">
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                    variables: { colorPrimary: '#f59e0b', borderRadius: '12px' },
                  },
                }}
              >
                <CheckoutForm
                  user={user}
                  amount={amount}
                  onSuccess={onSuccess}
                  onCancel={onCancel}
                />
              </Elements>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default WorkshopPurchaseCheckout;
