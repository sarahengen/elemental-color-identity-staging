import React, { useState, useEffect } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { X, Gift, Crown, ArrowRight, ArrowLeft, Check, Loader2, CreditCard, Shield, Mail, User, MessageSquare, Sparkles, Copy, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { stripePromise } from '@/lib/stripe';
import { toast } from '@/components/ui/use-toast';
import GiftCardPreview from './GiftCardPreview';
import { giftCardThemeOptions } from '@/lib/giftCardThemes';
import { GIFT_VALIDITY_LABEL } from '@/lib/giftConfig';


interface MembershipPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price_monthly: string;
  price_yearly: string;
  features: string | string[];
}

interface GiftMembershipProps {
  user: any;
  profile?: any;
  plans: MembershipPlan[];
  onClose: () => void;
  onAuthRequired: () => void;
}

// Payment form sub-component
const GiftPaymentForm: React.FC<{
  onSuccess: (giftCode: string) => void;
  onCancel: () => void;
  amount: number;
  planName: string;
}> = ({ onSuccess, onCancel, amount, planName }) => {
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
      const { error: submitError } = await elements.submit();
      if (submitError) throw new Error(submitError.message);

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/gift-success`,
        },
        redirect: 'if_required'
      });

      if (confirmError) throw new Error(confirmError.message);

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Update gift record status to paid
        onSuccess(paymentIntent.id);
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Gift: {planName} Membership</h4>
            <p className="text-sm text-gray-600">One-time gift purchase</p>
          </div>
        </div>
        <div className="border-t border-amber-200/50 pt-3 mt-3 flex justify-between items-center">
          <span className="text-gray-600">Total</span>
          <span className="text-2xl font-bold text-gray-900">${amount.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CreditCard className="w-4 h-4" />
          <span>Payment Details</span>
        </div>
        <div className="border border-gray-200 rounded-xl p-4 bg-white">
          <PaymentElement options={{ layout: 'tabs' }} />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Shield className="w-3.5 h-3.5" />
        <span>Secure payment powered by Stripe</span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={loading}
          className="flex-1 py-3 px-4 border border-gray-200 rounded-full font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!stripe || !elements || loading}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full font-medium disabled:opacity-50 flex items-center justify-center gap-2 hover:from-amber-600 hover:to-rose-600 transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Gift className="w-4 h-4" />}
          {loading ? 'Processing...' : 'Send Gift'}
        </button>
      </div>
    </div>
  );
};

const GiftMembership: React.FC<GiftMembershipProps> = ({
  user,
  profile,
  plans,
  onClose,
  onAuthRequired
}) => {
  // Steps: 'plan' | 'details' | 'preview' | 'payment' | 'success'
  const [step, setStep] = useState<string>('plan');
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [elementalType, setElementalType] = useState<string | null>(profile?.elemental_type || null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [giftCode, setGiftCode] = useState<string>('');
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const senderName = profile?.full_name || user?.email?.split('@')[0] || 'A Friend';

  // Filter to only paid plans
  const giftablePlans = plans.filter(p => p.slug !== 'free' && parseFloat(p.price_monthly) > 0);

  const getPrice = () => {
    if (!selectedPlan) return 0;
    return billingCycle === 'yearly'
      ? parseFloat(selectedPlan.price_yearly) || 0
      : parseFloat(selectedPlan.price_monthly) || 0;
  };

  const handleSelectPlan = (plan: MembershipPlan) => {
    setSelectedPlan(plan);
    setStep('details');
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !recipientEmail.trim()) {
      setError('Please fill in recipient name and email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    setError(null);
    setStep('preview');
  };

  const handleProceedToPayment = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    if (!selectedPlan) return;

    setLoadingPayment(true);
    setError(null);

    try {
      const { data, error: funcError } = await supabase.functions.invoke('create-gift-payment', {
        body: {
          planId: selectedPlan.id,
          billingCycle,
          recipientName: recipientName.trim(),
          recipientEmail: recipientEmail.trim(),
          personalMessage: personalMessage.trim(),
          elementalType
        }
      });

      if (funcError || data?.error) {
        throw new Error(funcError?.message || data?.error || 'Failed to create gift payment');
      }

      setClientSecret(data.clientSecret);
      setGiftCode(data.giftCode);
      setStep('payment');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      toast({
        title: 'Error',
        description: err.message || 'Failed to initialize gift payment',
        variant: 'destructive'
      });
    } finally {
      setLoadingPayment(false);
    }
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    // Update gift record to paid status
    if (giftCode) {
      supabase
        .from('gift_memberships')
        .update({ status: 'paid', updated_at: new Date().toISOString() })
        .eq('gift_code', giftCode)
        .then(() => {});
    }

    toast({
      title: 'Gift Sent Successfully!',
      description: `A gift membership has been purchased for ${recipientName}.`
    });
    setStep('success');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(giftCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    toast({ title: 'Copied!', description: 'Gift code copied to clipboard' });
  };

  const planColors: Record<string, string> = {
    'Discovery': 'from-amber-400 to-orange-500',
    'Premium': 'from-amber-500 to-rose-500',
    'Expression': 'from-violet-500 to-indigo-600',
    'Pro': 'from-violet-500 to-indigo-600',
    'Professional': 'from-violet-500 to-indigo-600'
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'plan', label: 'Plan' },
      { key: 'details', label: 'Recipient' },
      { key: 'preview', label: 'Preview' },
      { key: 'payment', label: 'Payment' }
    ];
    const currentIdx = steps.findIndex(s => s.key === step);

    return (
      <div className="flex items-center justify-center gap-1 mb-6">
        {steps.map((s, idx) => (
          <React.Fragment key={s.key}>
            <div className={`flex items-center gap-1.5 ${idx <= currentIdx ? 'text-gray-900' : 'text-gray-300'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                idx < currentIdx ? 'bg-green-500 text-white' :
                idx === currentIdx ? 'bg-gray-900 text-white' :
                'bg-gray-200 text-gray-400'
              }`}>
                {idx < currentIdx ? <Check className="w-3.5 h-3.5" /> : idx + 1}
              </div>
              <span className="text-xs font-medium hidden sm:block">{s.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-6 sm:w-10 h-0.5 ${idx < currentIdx ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-500 via-rose-500 to-violet-500 p-5 text-white rounded-t-2xl flex justify-between items-start z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif">Gift a Membership</h3>
              <p className="text-white/80 text-sm">Share the gift of color discovery</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {step !== 'success' && renderStepIndicator()}

          {/* Step 1: Select Plan */}
          {step === 'plan' && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Choose a Plan to Gift</h4>
                <p className="text-sm text-gray-500">Select the membership tier you'd like to gift</p>
              </div>

              {/* Billing Toggle */}
              <div className="flex justify-center mb-4">
                <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      billingCycle === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                      billingCycle === 'yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    Yearly
                    <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full">Save</span>
                  </button>
                </div>
              </div>

              {giftablePlans.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  <p>Loading plans...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {giftablePlans.map(plan => {
                    const price = billingCycle === 'yearly'
                      ? parseFloat(plan.price_yearly) || 0
                      : parseFloat(plan.price_monthly) || 0;
                    const gradient = planColors[plan.name] || 'from-gray-400 to-gray-500';
                    const features = typeof plan.features === 'string' ? JSON.parse(plan.features) : plan.features;

                    return (
                      <button
                        key={plan.id}
                        onClick={() => handleSelectPlan(plan)}
                        className="w-full text-left bg-white border-2 border-gray-100 hover:border-gray-300 rounded-xl p-4 transition-all hover:shadow-md group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-sm`}>
                              <Crown className="w-5 h-5" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900">{plan.name}</h5>
                              <p className="text-xs text-gray-500">{plan.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">${price.toFixed(2)}</p>
                            <p className="text-xs text-gray-400">/{billingCycle === 'yearly' ? 'year' : 'month'}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {(features as string[]).slice(0, 3).map((f: string, i: number) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                              {f.length > 35 ? f.substring(0, 35) + '...' : f}
                            </span>
                          ))}
                          {(features as string[]).length > 3 && (
                            <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                              +{(features as string[]).length - 3} more
                            </span>
                          )}
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-sm font-medium text-amber-600 group-hover:text-amber-700">
                          <span>Select this plan</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Recipient Details */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-5">
              <div className="text-center mb-2">
                <h4 className="text-lg font-semibold text-gray-900">Recipient Details</h4>
                <p className="text-sm text-gray-500">Who are you gifting this to?</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <User className="w-4 h-4 text-gray-400" />
                    Recipient's Name
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Enter their name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <Mail className="w-4 h-4 text-gray-400" />
                    Recipient's Email
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="Enter their email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    Personal Message <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    placeholder="Write a heartfelt message..."
                    rows={3}
                    maxLength={200}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">{personalMessage.length}/200</p>
                </div>

                {/* Elemental Type Selector for Card Branding */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <Sparkles className="w-4 h-4 text-gray-400" />
                    Card Theme <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {giftCardThemeOptions.map(el => (
                      <button
                        key={el.label}
                        type="button"
                        onClick={() => setElementalType(el.id)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${
                          elementalType === el.id
                            ? 'border-gray-900 shadow-md'
                            : 'border-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ background: el.swatch }}
                        />
                        <span className="text-[10px] font-medium text-gray-600">{el.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('plan')}
                  className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gray-900 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                >
                  Preview Gift Card
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Gift Card Preview */}
          {step === 'preview' && selectedPlan && (
            <div className="space-y-5">
              <div className="text-center mb-2">
                <h4 className="text-lg font-semibold text-gray-900">Gift Card Preview</h4>
                <p className="text-sm text-gray-500">Here's what your gift card will look like</p>
              </div>

              <GiftCardPreview
                recipientName={recipientName}
                senderName={senderName}
                personalMessage={personalMessage}
                planName={selectedPlan.name}
                elementalType={elementalType}
              />

              {/* Gift Summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Plan</span>
                  <span className="font-medium text-gray-900">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Billing</span>
                  <span className="font-medium text-gray-900 capitalize">{billingCycle}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Recipient</span>
                  <span className="font-medium text-gray-900">{recipientName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium text-gray-900">{recipientEmail}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                  <span className="font-medium text-gray-700">Total</span>
                  <span className="text-xl font-bold text-gray-900">${getPrice().toFixed(2)}</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('details')}
                  disabled={loadingPayment}
                  className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-full font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={handleProceedToPayment}
                  disabled={loadingPayment}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:from-amber-600 hover:to-rose-600 disabled:opacity-50 transition-colors"
                >
                  {loadingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Setting up payment...
                    </>
                  ) : (
                    <>
                      Proceed to Payment
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 'payment' && clientSecret && selectedPlan && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#f59e0b',
                    borderRadius: '12px'
                  }
                }
              }}
            >
              <GiftPaymentForm
                onSuccess={handlePaymentSuccess}
                onCancel={() => setStep('preview')}
                amount={getPrice()}
                planName={selectedPlan.name}
              />
            </Elements>
          )}

          {/* Step 5: Success */}
          {step === 'success' && selectedPlan && (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>

              <div>
                <h4 className="text-xl font-serif text-gray-900 mb-2">Gift Sent Successfully!</h4>
                <p className="text-gray-600 text-sm">
                  Your {selectedPlan.name} membership gift for <strong>{recipientName}</strong> has been purchased.
                </p>
              </div>

              <GiftCardPreview
                recipientName={recipientName}
                senderName={senderName}
                personalMessage={personalMessage}
                planName={selectedPlan.name}
                elementalType={elementalType}
                giftCode={giftCode}
              />

              {/* Gift Code */}
              {giftCode && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Gift Code</p>
                  <div className="flex items-center justify-center gap-2">
                    <code className="text-lg font-mono font-bold text-gray-900 tracking-wider">
                      {giftCode}
                    </code>
                    <button
                      onClick={handleCopyCode}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Copy gift code"
                    >
                      {copiedCode ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Share this code with {recipientName} to redeem their membership
                  </p>
                </div>
              )}

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left">
                <h5 className="font-medium text-amber-800 text-sm mb-1">What happens next?</h5>
                <ul className="text-xs text-amber-700 space-y-1">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>An email notification will be sent to {recipientEmail}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>They can use the gift code to activate their membership</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>The gift includes full access to all {selectedPlan.name} features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>The gift code is valid for {GIFT_VALIDITY_LABEL} from the date of purchase</span>
                  </li>

                </ul>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 px-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftMembership;
