import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ElementalColorWorkshopPageContent from '@/components/ElementalColorWorkshopPageContent';
import WorkshopPurchaseCheckout from '@/components/WorkshopPurchaseCheckout';
import AuthModal from '@/components/AuthModal';
import Quiz from '@/components/Quiz';
import { ElementalType } from '@/data/elementalTypes';
import { navigateFromDetachedPage, navigateToElementOnTypesPage } from '@/lib/detachedPageNavigation';
import { hasWorkshopAccess } from '@/lib/workshopAccess';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

const ADMIN_EMAILS = ['sarahjengen@gmail.com', 'beymustcode@gmail.com'];

const ElementalColorWorkshopPageInner: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    profile,
    signIn,
    signUp,
    saveElementalType,
    refreshProfile,
    isPremiumMember,
  } = useAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showSubtypeQuiz, setShowSubtypeQuiz] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWorkshopCheckout, setShowWorkshopCheckout] = useState(false);
  const workshopRedirectHandled = useRef(false);

  const userElement = profile?.elemental_type ?? null;
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());
  const workshopUnlocked = hasWorkshopAccess(profile);

  useEffect(() => {
    document.title = 'Elemental Color Workshop | Elemental Color Identity';

    const hash = window.location.hash.replace('#', '');
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // Target section (e.g. #book-consultation) may render after async data
    // loads, so retry until the element exists before scrolling to it.
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (attempts++ < 20) {
        window.setTimeout(tryScroll, 250);
      }
    };
    tryScroll();
  }, []);

  const handleGetWorkshopAccess = useCallback(() => {
    if (workshopUnlocked) {
      navigate('/elemental-types');
      return;
    }
    if (!user) {
      localStorage.setItem('pendingWorkshopPurchase', 'true');
      setShowAuthModal(true);
      return;
    }
    setShowWorkshopCheckout(true);
  }, [workshopUnlocked, user, navigate]);

  const handleWorkshopPurchaseSuccess = useCallback(async () => {
    setShowWorkshopCheckout(false);
    await refreshProfile();
    toast({
      title: 'You\u2019re in!',
      description: 'Check your email to choose your workshop date.',
    });
    navigate('/elemental-types');
  }, [refreshProfile, navigate]);

  // Stripe redirect return (3DS / wallet flows) — confirm payment server-side.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('workshop-purchase') !== 'success' || workshopRedirectHandled.current) return;
    if (!user) return;

    const paymentIntentId = params.get('payment_intent');
    const redirectStatus = params.get('redirect_status');
    workshopRedirectHandled.current = true;
    window.history.replaceState({}, '', window.location.pathname);

    void (async () => {
      if (redirectStatus && redirectStatus !== 'succeeded') {
        toast({
          title: 'Payment not completed',
          description: 'Your workshop purchase was not finished. You can try again when ready.',
          variant: 'destructive',
        });
        return;
      }

      try {
        if (paymentIntentId) {
          const { error } = await supabase.functions.invoke('confirm-workshop-purchase', {
            body: { paymentIntentId, userId: user.id },
          });
          if (error) throw error;
        }
        await refreshProfile();
        toast({
          title: 'You\u2019re in!',
          description: 'Check your email to choose your workshop date.',
        });
        navigate('/elemental-types');
      } catch (err) {
        console.error('Workshop redirect confirmation failed:', err);
        toast({
          title: 'Purchase received',
          description: 'Your payment may have succeeded — refresh the page or contact support if access is missing.',
        });
      }
    })();
  }, [user, refreshProfile, navigate]);

  // Resume checkout after a magic-link / password login that was triggered by
  // the buy button while signed out.
  useEffect(() => {
    if (!user) return;
    if (localStorage.getItem('pendingWorkshopPurchase') !== 'true') return;
    localStorage.removeItem('pendingWorkshopPurchase');
    if (!workshopUnlocked) setShowWorkshopCheckout(true);
  }, [user, workshopUnlocked]);

  const handleNavigate = useCallback(
    (section: string) => {
      if (section === 'elemental-workshop') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      navigateFromDetachedPage(navigate, section);
    },
    [navigate]
  );

  const handleSelectType = (type: ElementalType) => {
    navigate(`/elemental-types?element=${type.id}`);
  };

  const handleSignIn = async (email: string, password: string) => {
    await signIn(email, password);
    await refreshProfile();
  };

  const handleSignUp = async (email: string, password: string, fullName: string) => {
    await signUp(email, password, fullName);
    await refreshProfile();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        onOpenQuiz={() => setShowQuiz(true)}
        activeSection="elemental-workshop"
        onNavigate={handleNavigate}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        user={user}
        profile={profile}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenProfile={() => (user ? navigate('/') : setShowAuthModal(true))}
        isAdmin={!!isAdmin}
        onOpenAdmin={() => navigateFromDetachedPage(navigate, 'admin')}
      />

      <div className="flex-1">
        <ElementalColorWorkshopPageContent
          onSelectType={handleSelectType}
          onStartQuiz={() => setShowQuiz(true)}
          user={user}
          onAuthRequired={() => setShowAuthModal(true)}
          hasWorkshopAccess={workshopUnlocked}
          onGetWorkshopAccess={handleGetWorkshopAccess}
          onExploreWorkshop={() => navigate('/elemental-types')}
        />
      </div>

      <Footer
        onSelectType={(elementId) => navigateToElementOnTypesPage(navigate, elementId)}
        onNavigate={handleNavigate}
      />

      {showQuiz && (
        <Quiz
          onComplete={async (element, subtype) => {
            if (user) {
              await saveElementalType(element, subtype, 'full');
              await refreshProfile();
            } else {
              localStorage.setItem('userElement', element);
              if (subtype) localStorage.setItem('userSubtype', subtype);
            }
          }}
          onClose={() => setShowQuiz(false)}
          user={user}
          onOpenAuth={() => setShowAuthModal(true)}
          onSaveResult={async (element, subtype) => {
            await saveElementalType(element, subtype, 'full');
            await refreshProfile();
          }}
        />
      )}

      {showSubtypeQuiz && userElement && (
        <Quiz
          onComplete={async (element, subtype) => {
            if (user) {
              await saveElementalType(element, subtype, 'subtype');
              await refreshProfile();
            }
          }}
          onClose={() => setShowSubtypeQuiz(false)}
          initialElement={userElement}
          user={user}
          onOpenAuth={() => setShowAuthModal(true)}
          onSaveResult={async (element, subtype) => {
            await saveElementalType(element, subtype, 'subtype');
            await refreshProfile();
          }}
        />
      )}

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSignIn={handleSignIn}
          onSignUp={handleSignUp}
        />
      )}

      {showWorkshopCheckout && user && (
        <WorkshopPurchaseCheckout
          user={user}
          onSuccess={handleWorkshopPurchaseSuccess}
          onCancel={() => setShowWorkshopCheckout(false)}
        />
      )}
    </div>
  );
};

const ElementalColorWorkshopPageRoute: React.FC = () => (
  <AuthProvider>
    <ElementalColorWorkshopPageInner />
  </AuthProvider>
);

export default ElementalColorWorkshopPageRoute;
