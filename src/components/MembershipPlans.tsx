import React, { useState, useEffect } from 'react';
import { Crown, Check, Sparkles, Zap, Star, ArrowRight, Shield, Users, Palette, Camera, Calendar, Gift, Download, Headphones, Scissors, Home, Gem, BookOpen, Shirt, LayoutGrid } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import SubscriptionCheckout from './SubscriptionCheckout';
interface MembershipPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price_monthly: string;
  price_yearly: string;
  features: string | string[];
  is_popular: boolean;
  is_active: boolean;
}
interface UserSubscription {
  id: string;
  status: string;
  plan_id: string;
  billing_cycle: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}
interface MembershipPlansProps {
  user: any;
  onAuthRequired: () => void;
  currentSubscription?: UserSubscription | null;
  onSubscriptionChange?: () => void;
  onOpenGift?: () => void;
}
const planIcons: Record<string, React.ReactNode> = {
  'Free': <Star className="w-8 h-8" />,
  'Discovery': <Crown className="w-8 h-8" />,
  'Premium': <Crown className="w-8 h-8" />,
  'Expression': <Zap className="w-8 h-8" />,
  'Pro': <Zap className="w-8 h-8" />,
  'Professional': <Zap className="w-8 h-8" />
};
const planColors: Record<string, {
  gradient: string;
  badge: string;
  button: string;
}> = {
  'Free': {
    gradient: 'from-gray-100 to-gray-200',
    badge: 'bg-gray-200 text-gray-700',
    button: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
  },
  'Discovery': {
    gradient: 'from-amber-400 via-amber-500 to-orange-500',
    badge: 'bg-gradient-to-r from-amber-400 to-orange-500 text-white',
    button: 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600'
  },
  'Premium': {
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    badge: 'bg-gradient-to-r from-amber-500 to-rose-500 text-white',
    button: 'bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:from-amber-600 hover:to-rose-600'
  },
  'Expression': {
    gradient: 'from-violet-500 via-purple-500 to-indigo-600',
    badge: 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white',
    button: 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white hover:from-violet-600 hover:to-indigo-700'
  },
  'Pro': {
    gradient: 'from-violet-500 via-purple-500 to-indigo-600',
    badge: 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white',
    button: 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white hover:from-violet-600 hover:to-indigo-700'
  },
  'Professional': {
    gradient: 'from-violet-500 via-purple-500 to-indigo-600',
    badge: 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white',
    button: 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white hover:from-violet-600 hover:to-indigo-700'
  }
};
const featureIcons: Record<string, React.ReactNode> = {
  'Take the elemental type quiz': <Palette className="w-4 h-4" />,
  'View your color palette': <Palette className="w-4 h-4" />,
  'wardrobe analyzer': <Camera className="w-4 h-4" />,
  'Browse color classes': <Calendar className="w-4 h-4" />,
  'camera color analyzer': <Camera className="w-4 h-4" />,
  'Unlimited': <Sparkles className="w-4 h-4" />,
  'Advanced': <Zap className="w-4 h-4" />,
  'Priority': <Star className="w-4 h-4" />,
  'discount': <Gift className="w-4 h-4" />,
  'member-only': <Shield className="w-4 h-4" />,
  'Personalized': <Users className="w-4 h-4" />,
  'Download': <Download className="w-4 h-4" />,
  'Exclusive': <Crown className="w-4 h-4" />,
  'Ad-free': <Shield className="w-4 h-4" />,
  'Client': <Users className="w-4 h-4" />,
  'White-label': <Star className="w-4 h-4" />,
  'API': <Zap className="w-4 h-4" />,
  'support': <Headphones className="w-4 h-4" />,
  'Custom': <Palette className="w-4 h-4" />,
  'Bulk': <Users className="w-4 h-4" />,
  'Team': <Users className="w-4 h-4" />,
  'analytics': <Zap className="w-4 h-4" />,
  'Hair': <Scissors className="w-4 h-4" />,
  'Decor': <Home className="w-4 h-4" />,
  'Environment': <Home className="w-4 h-4" />,
  'Jewelry': <Gem className="w-4 h-4" />,
  'Accessories': <Gem className="w-4 h-4" />
};
const getFeatureIcon = (feature: string) => {
  for (const [key, icon] of Object.entries(featureIcons)) {
    if (feature.toLowerCase().includes(key.toLowerCase())) {
      return icon;
    }
  }
  return <Check className="w-4 h-4" />;
};

/** Aligns legacy DB copy ("Premium" middle tier) with current Discovery naming. */
const displayPlanFeature = (feature: string) =>
  feature.replace(/\bEverything in Premium\b/gi, 'Everything in Discovery');
const MembershipPlans: React.FC<MembershipPlansProps> = ({
  user,
  onAuthRequired,
  currentSubscription,
  onSubscriptionChange,
  onOpenGift
}) => {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [managingSubscription, setManagingSubscription] = useState(false);
  useEffect(() => {
    fetchPlans();
  }, []);
  const fetchPlans = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('membership_plans').select('*').eq('is_active', true).order('price_monthly', {
        ascending: true
      });
      if (error) throw error;

      // Parse features from JSON string to array
      const parsedPlans = (data || []).map(plan => ({
        ...plan,
        features: typeof plan.features === 'string' ? JSON.parse(plan.features) : plan.features
      }));
      setPlans(parsedPlans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast({
        title: 'Error',
        description: 'Failed to load membership plans',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSelectPlan = async (plan: MembershipPlan) => {
    if (!user) {
      onAuthRequired();
      return;
    }
    if (plan.slug === 'free') {
      toast({
        title: 'Free Plan',
        description: 'You already have access to the free plan!'
      });
      return;
    }

    // Check if user already has this plan
    if (currentSubscription?.plan_id === plan.id && currentSubscription?.status === 'active') {
      toast({
        title: 'Already subscribed',
        description: 'You are already subscribed to this plan'
      });
      return;
    }

    // ✨ Check if user has free access
    try {
      const {
        data: profile
      } = await supabase.from('user_profiles').select('has_free_access').eq('id', user.id).single();
      if (profile?.has_free_access) {
        // Grant them the plan directly without payment
        const {
          data,
          error
        } = await supabase.functions.invoke('grant-free-membership', {
          body: {
            userId: user.id,
            planId: plan.id,
            billingCycle: billingCycle
          }
        });
        if (error) {
          toast({
            title: 'Error',
            description: 'Failed to activate membership',
            variant: 'destructive'
          });
          return;
        }

        // Update profile membership tier
        const membershipTier = plan.slug === 'discovery' ? 'discovery' : plan.slug === 'premium' ? 'premium' : plan.slug === 'expression' ? 'expression' : plan.slug === 'pro' ? 'professional' : 'free';
        await supabase.from('user_profiles').update({
          membership_tier: membershipTier,
          updated_at: new Date().toISOString()
        }).eq('id', user.id);
        toast({
          title: 'Membership Activated!',
          description: `Your ${plan.name} membership is now active for free!`
        });
        onSubscriptionChange?.();
        return;
      }
    } catch (error: any) {
      console.error('Error checking free access:', error);
      // Continue to normal payment flow if check fails
    }

    // Normal payment flow
    setSelectedPlan(plan);
    setShowCheckout(true);
  };
  const handleCancelSubscription = async () => {
    if (!currentSubscription) return;
    setManagingSubscription(true);
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('manage-subscription', {
        body: {
          action: 'cancel'
        }
      });
      if (error) throw error;
      toast({
        title: 'Subscription cancelled',
        description: data.message
      });
      onSubscriptionChange?.();
    } catch (error: any) {
      console.error('Error cancelling subscription:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to cancel subscription',
        variant: 'destructive'
      });
    } finally {
      setManagingSubscription(false);
    }
  };
  const handleReactivateSubscription = async () => {
    if (!currentSubscription) return;
    setManagingSubscription(true);
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('manage-subscription', {
        body: {
          action: 'reactivate'
        }
      });
      if (error) throw error;
      toast({
        title: 'Subscription reactivated',
        description: data.message
      });
      onSubscriptionChange?.();
    } catch (error: any) {
      console.error('Error reactivating subscription:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to reactivate subscription',
        variant: 'destructive'
      });
    } finally {
      setManagingSubscription(false);
    }
  };
  const handleSubscriptionSuccess = () => {
    setShowCheckout(false);
    setSelectedPlan(null);
    onSubscriptionChange?.();
  };
  const yearlySavings = (monthly: string, yearly: string) => {
    const monthlyNum = parseFloat(monthly) || 0;
    const yearlyNum = parseFloat(yearly) || 0;
    const monthlyTotal = monthlyNum * 12;
    const savings = monthlyTotal - yearlyNum;
    const percentage = monthlyTotal > 0 ? Math.round(savings / monthlyTotal * 100) : 0;
    return {
      savings,
      percentage
    };
  };
  const getPlanTier = (slug: string) => {
    if (slug === 'free') return 0;
    if (slug === 'discovery' || slug === 'premium') return 1;
    if (slug === 'expression' || slug === 'pro' || slug === 'professional') return 2;
    return 0;
  };
  if (loading) {
    return <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>;
  }
  return <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-rose-100 rounded-full text-amber-800 text-sm font-medium mb-4">
          <Crown className="w-4 h-4" />
          Membership Plans
        </div>


        <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-3">
          Unlock Your Full Color Potential
        </h2>
        <p className="text-gray-600">Get unlimited access to advanced color analysis tools, elemental guides, priority booking, exclusive workshops, and member-only discounts.</p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
          <button onClick={() => setBillingCycle('monthly')} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
            Monthly
          </button>
          <button onClick={() => setBillingCycle('yearly')} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
            Yearly
            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
              Save 17%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map(plan => {
        const colors = planColors[plan.name] || (plan.slug === 'discovery' ? planColors['Discovery'] : plan.slug === 'expression' || plan.slug === 'pro' || plan.slug === 'professional' ? planColors['Expression'] : plan.slug === 'premium' ? planColors['Premium'] : planColors['Free']);
        const isCurrentPlan = currentSubscription?.plan_id === plan.id && currentSubscription?.status === 'active';

        const priceRaw = billingCycle === 'yearly' ? plan.price_yearly : plan.price_monthly;
        const price = parseFloat(priceRaw) || 0;
        const savings = yearlySavings(plan.price_monthly, plan.price_yearly);
        const tier = getPlanTier(plan.slug);
        return <div key={plan.id} className={`relative bg-white rounded-2xl overflow-hidden border-2 transition-all ${plan.is_popular ? 'border-amber-400 shadow-xl shadow-amber-100 scale-105 z-10' : 'border-gray-100 hover:border-gray-200 hover:shadow-lg'} ${isCurrentPlan ? 'ring-2 ring-green-500' : ''}`}>
              {/* Popular Badge */}
              {plan.is_popular && <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>}

              {/* Current Plan Badge */}
              {isCurrentPlan && <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-br-lg">
                  CURRENT PLAN
                </div>}

              {/* Header */}
              <div className={`p-6 bg-gradient-to-br ${colors.gradient} ${tier > 0 ? 'text-white' : 'text-gray-900'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-xl ${tier > 0 ? 'bg-white/20' : 'bg-gray-300/50'}`}>
                    {planIcons[plan.name] || <Star className="w-8 h-8" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className={`text-sm ${tier > 0 ? 'text-white/80' : 'text-gray-600'}`}>
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    ${price.toFixed(2)}
                  </span>
                  <span className={`text-sm ${tier > 0 ? 'text-white/70' : 'text-gray-500'}`}>
                    /{billingCycle === 'yearly' ? 'year' : 'month'}
                  </span>
                </div>

                {billingCycle === 'yearly' && parseFloat(plan.price_monthly) > 0 && <p className={`text-sm mt-1 ${tier > 0 ? 'text-white/70' : 'text-gray-500'}`}>
                    Save ${savings.savings.toFixed(2)}/year ({savings.percentage}% off)
                  </p>}

              </div>

              {/* Features */}
              <div className="p-6">
                <ul className="space-y-3 mb-6">

                  {plan.features.map((feature: string, idx: number) => <li key={idx} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${tier > 0 ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-500'}`}>
                        {getFeatureIcon(feature)}
                      </div>
                      <span className="text-sm text-gray-700">{displayPlanFeature(feature)}</span>
                    </li>)}
                </ul>

                {/* CTA Buttons */}
                {isCurrentPlan ? <div className="space-y-2">
                    <button disabled className="w-full py-3 px-4 rounded-full font-medium bg-green-100 text-green-700 flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      Current Plan
                    </button>
                    {currentSubscription?.cancel_at_period_end ? <button onClick={handleReactivateSubscription} disabled={managingSubscription} className="w-full py-2 px-4 text-sm text-green-600 hover:text-green-700 font-medium">
                        {managingSubscription ? 'Processing...' : 'Reactivate Subscription'}
                      </button> : <button onClick={handleCancelSubscription} disabled={managingSubscription} className="w-full py-2 px-4 text-sm text-gray-500 hover:text-red-500 font-medium">
                        {managingSubscription ? 'Processing...' : 'Cancel Subscription'}
                      </button>}
                    {currentSubscription?.cancel_at_period_end && <p className="text-xs text-center text-amber-600">

                        Cancels on {new Date(currentSubscription.current_period_end).toLocaleDateString()}
                      </p>}
                  </div> : <div className="space-y-2">
                    <button onClick={() => handleSelectPlan(plan)} className={`w-full py-3 px-4 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${colors.button}`}>
                    {plan.slug === 'free' ? 'Current Plan' : <>
                        Get {plan.name}
                        <ArrowRight className="w-4 h-4" />
                      </>}
                    </button>
                    {plan.slug !== 'free' && onOpenGift && <button onClick={onOpenGift} className="w-full py-2 px-4 rounded-full text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center justify-center gap-2">
                        <Gift className="w-4 h-4" />
                        Gift This Plan
                      </button>}
                  </div>}
              </div>
            </div>;
      })}
      </div>

      {/* Gift a Membership Banner */}
      {onOpenGift && <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-rose-500 p-8 md:p-10">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
              <svg viewBox="0 0 200 200" fill="white">
                <circle cx="150" cy="50" r="80" />
                <circle cx="100" cy="100" r="40" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10">
              <svg viewBox="0 0 200 200" fill="white">
                <circle cx="50" cy="150" r="60" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <Gift className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                  Gift a Membership
                </h3>
                <p className="text-white/80 text-sm md:text-base max-w-lg">
                  Share the gift of color discovery with someone special. Purchase a Discovery or Expression
                  membership for a friend, family member, or loved one with a personalized gift card.
                </p>
              </div>
              <div className="flex-shrink-0">
                <button onClick={onOpenGift} className="px-8 py-3.5 bg-white text-purple-700 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2 text-sm md:text-base">
                  <Gift className="w-5 h-5" />
                  Send a Gift
                </button>
              </div>
            </div>
          </div>
        </div>}


      {/* Benefits Section - Styled like ProElementGuides */}
      <div className="space-y-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-100 to-rose-100 rounded-full shadow-sm mb-6">
            <Crown className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-semibold text-amber-800">Subscriber Benefits</span>
            <Star className="w-4 h-4 text-amber-500" />
          </div>
          <h3 className="text-4xl font-serif text-gray-900 mb-4">Everything You Get with Discovery plan</h3>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Unlock unlimited access to advanced tools, exclusive guides, priority booking, 
            and member-only content designed to elevate your elemental journey.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[{
          label: 'Exclusive Guides',
          value: '7',
          icon: <BookOpen className="w-4 h-4" />
        }, {
          label: 'Unlimited Analysis',
          value: <Camera className="w-5 h-5" />,
          icon: <Sparkles className="w-4 h-4" />
        }, {
          label: 'Priority Booking',
          value: <Calendar className="w-5 h-5" />,
          icon: <Star className="w-4 h-4" />
        }, {
          label: 'Member Discount',
          value: '10%',
          icon: <Gift className="w-4 h-4" />
        }].map((stat, idx) => <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
              <div className="flex items-center justify-center gap-1.5 text-amber-600 mb-1">
                {stat.icon}
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
            </div>)}
        </div>

        {/* Expression plan — same visual rhythm as Discovery */}
        <div className="text-center max-w-3xl mx-auto pt-6 border-t border-gray-100">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-100 to-indigo-100 rounded-full shadow-sm mb-6">
            <Zap className="w-5 h-5 text-violet-600" />
            <span className="text-sm font-semibold text-violet-900">Expression Benefits</span>
            <Sparkles className="w-4 h-4 text-violet-500" />
          </div>
          <h3 className="text-4xl font-serif text-gray-900 mb-4">Everything You Get with Expression plan</h3>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Everything in Discovery, plus the full elemental library—wardrobe review, every guide across style and life
            themes, and our full suite of AI and interactive tools.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[{
            label: 'Elemental guides',
            value: '33',
            icon: <BookOpen className="w-4 h-4" />
          }, {
            label: 'Wardrobe review',
            value: <Shirt className="w-5 h-5 text-violet-600" />,
            icon: <Sparkles className="w-4 h-4" />
          }, {
            label: 'AI tools',
            value: '6',
            icon: <Zap className="w-4 h-4" />
          }, {
            label: 'Interactive tools',
            value: '8',
            icon: <LayoutGrid className="w-4 h-4" />
          }].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
              <div className="flex items-center justify-center gap-1.5 text-violet-600 mb-1">
                {stat.icon}
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-serif text-center text-gray-900 mb-6">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {[{
          q: 'Can I cancel anytime?',
          a: 'Yes! You can cancel your subscription at any time. Your benefits will continue until the end of your billing period.'
        }, {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards, debit cards, and digital wallets through our secure Stripe payment system.'
        }, {
          q: 'Is there a free trial?',
          a: 'New members get full access to free features. Upgrade anytime to unlock Discovery or Expression benefits.'
        }, {
          q: 'Can I switch plans?',
          a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.'
        }].map((faq, idx) => <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="font-medium text-gray-900 mb-2">{faq.q}</h4>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>)}
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && selectedPlan && user && <SubscriptionCheckout plan={selectedPlan} billingCycle={billingCycle} user={user} onSuccess={handleSubscriptionSuccess} onCancel={() => {
      setShowCheckout(false);
      setSelectedPlan(null);
    }} />}
    </div>;
};
export default MembershipPlans;