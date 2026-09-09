import React, { useState, useEffect } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { X, Crown, Shield, Check, Loader2, CreditCard, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { stripePromise } from '@/lib/stripe';
import { toast } from '@/components/ui/use-toast';

interface MembershipPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price_monthly: string;
  price_yearly: string;
  features: string[];
}

interface SubscriptionCheckoutProps {
  plan: MembershipPlan;
  billingCycle: 'monthly' | 'yearly';
  user: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const CheckoutForm: React.FC<{
  plan: MembershipPlan;
  billingCycle: 'monthly' | 'yearly';
  user: any;
  onSuccess: () => void;
  onCancel: () => void;
}> = ({ plan, billingCycle, user, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Trigger Stripe Validation
      const { error: submitError } = await elements.submit();
      if (submitError) throw new Error(submitError.message);

      // 2. Confirm Payment
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/membership-success`,
        },
        redirect: 'if_required'
      });

      if (confirmError) throw new Error(confirmError.message);

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // 3. Update Profile (Manual update as a backup to your DB triggers)
        const membershipTier = plan.slug === 'premium' ? 'premium' : plan.slug === 'pro' ? 'professional' : 'free';
        
        await supabase
          .from('user_profiles')
          .update({ 
            membership_tier: membershipTier,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        // 4. Create Subscription Record (Using your confirmed schema: user_id)
        //
        const { error: subError } = await supabase
          .from('user_subscriptions')
          .insert({
            user_id: user.id,
            plan_id: plan.id,
            status: 'active',
            billing_cycle: billingCycle,
            payment_intent_id: paymentIntent.id,
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(
              Date.now() + (billingCycle === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000
            ).toISOString(),
            cancel_at_period_end: false,
          });

        if (subError) {
          console.error('📝 Subscription record error:', subError);
          // We don't throw here because payment actually succeeded
          toast({
            title: 'Payment Successful',
            description: 'Your plan is active, but we had an issue saving the receipt. Contact support if needed.',
          });
        } else {
          toast({
            title: 'Welcome to Premium!',
            description: `Your ${plan.name} subscription is now active.`
          });
        }

        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed');
      toast({ title: 'Payment failed', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const price = parseFloat(billingCycle === 'yearly' ? plan.price_yearly : plan.price_monthly);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{plan.name} Membership</h4>
            <p className="text-sm text-gray-600 capitalize">{billingCycle} billing</p>
          </div>
        </div>
        <div className="border-t border-amber-200/50 pt-3 mt-3 flex justify-between items-center">
          <span className="text-gray-600">Total today</span>
          <span className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600"><CreditCard className="w-4 h-4" /><span>Payment Details</span></div>
        <div className="border border-gray-200 rounded-xl p-4 bg-white">
          <PaymentElement options={{ layout: 'tabs' }} />
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>}

      <div className="flex gap-3">
        <button onClick={onCancel} disabled={loading} className="flex-1 py-3 px-4 border border-gray-200 rounded-full font-medium hover:bg-gray-50 disabled:opacity-50">Cancel</button>
        <button onClick={handleSubmit} disabled={!stripe || !elements || loading} className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full font-medium disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
          {loading ? 'Processing...' : 'Subscribe Now'}
        </button>
      </div>
    </div>
  );
};

const SubscriptionCheckout: React.FC<SubscriptionCheckoutProps> = ({ plan, billingCycle, user, onSuccess, onCancel }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initSubscription = async () => {
      setLoading(true);
      try {
        const { data, error: funcError } = await supabase.functions.invoke('create-subscription-v2', {
          body: { planId: plan.id, billingCycle }
        });
        if (funcError || data?.error) throw new Error(funcError?.message || data?.error);
        setClientSecret(data.clientSecret);
      } catch (err: any) {
        setError(err.message || 'Failed to initialize payment');
      } finally {
        setLoading(false);
      }
    };
    initSubscription();
  }, [plan.id, billingCycle]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-rose-500 p-6 text-white rounded-t-2xl flex justify-between items-start">
          <div>
            <h3 className="text-xl font-serif">Subscribe to {plan.name}</h3>
            <p className="text-white/80 text-sm">${parseFloat(billingCycle === 'yearly' ? plan.price_yearly : plan.price_monthly).toFixed(2)}/{billingCycle === 'yearly' ? 'year' : 'month'}</p>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="py-12 flex flex-col items-center"><Loader2 className="w-8 h-8 animate-spin text-amber-500 mb-4" /><p>Setting up secure checkout...</p></div>
          ) : error ? (
            <div className="text-center py-8"><p className="text-red-500 mb-4">{error}</p><button onClick={onCancel} className="px-4 py-2 border rounded-full">Close</button></div>
          ) : clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe', variables: { colorPrimary: '#f59e0b', borderRadius: '12px' } } }}>
              <CheckoutForm plan={plan} billingCycle={billingCycle} user={user} onSuccess={onSuccess} onCancel={onCancel} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCheckout;