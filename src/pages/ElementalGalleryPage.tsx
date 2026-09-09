import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Crown } from 'lucide-react';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppProvider } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import Quiz from '@/components/Quiz';
import ElementalGallerySections from '@/components/ElementalGallerySections';
import PageAnchorNav from '@/components/PageAnchorNav';
import CompactDiscoveryHubLinks from '@/components/CompactDiscoveryHubLinks';
import { GALLERY_PAGE_ANCHORS } from '@/lib/guideCategoryRoutes';
import { toast } from '@/components/ui/use-toast';
import { navigateFromDetachedPage, navigateToElementOnTypesPage } from '@/lib/detachedPageNavigation';

const ADMIN_EMAILS = ['sarahjengen@gmail.com', 'beymustcode@gmail.com'];

const ElementalGalleryPageInner: React.FC = () => {
  const {
    user,
    profile,
    signIn,
    signUp,
    saveElementalType,
    refreshProfile,
    isPremiumMember,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userElement, setUserElement] = useState<string | null>(null);
  const [userSubtype, setUserSubtype] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Elemental Gallery | Elemental Color Identity';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (profile?.elemental_type) setUserElement(profile.elemental_type);
    if (profile?.elemental_subtype) setUserSubtype(profile.elemental_subtype);
  }, [profile]);

  useEffect(() => {
    if (!user) {
      const e = localStorage.getItem('userElement');
      const s = localStorage.getItem('userSubtype');
      if (e) setUserElement(e);
      if (s) setUserSubtype(s);
    }
  }, [user]);

  useEffect(() => {
    const hash = location.hash.replace(/^#/, '');
    if (!hash) return;
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
    return () => clearTimeout(t);
  }, [location.hash]);

  const handleNavigate = useCallback(
    (section: string) => {
      navigateFromDetachedPage(navigate, section);
    },
    [navigate]
  );

  const handleUpgrade = useCallback(() => {
    handleNavigate('membership');
  }, [handleNavigate]);

  const handleSignIn = async (email: string, password: string) => {
    await signIn(email, password);
    const pendingType = localStorage.getItem('pendingElementalType');
    const pendingSubtype = localStorage.getItem('pendingSubtype');
    const pendingQuizMode = localStorage.getItem('pendingQuizMode') || 'full';
    if (pendingType) {
      try {
        await saveElementalType(pendingType, pendingSubtype || undefined, pendingQuizMode as 'full' | 'subtype');
        localStorage.removeItem('pendingElementalType');
        localStorage.removeItem('pendingSubtype');
        localStorage.removeItem('pendingQuizMode');
        localStorage.removeItem('userElement');
        localStorage.removeItem('userSubtype');
        toast({ title: 'Results Saved!', description: 'Your quiz results have been saved to your account.' });
      } catch (e) {
        console.error(e);
      }
    }
    await refreshProfile();
  };

  const handleSignUp = async (email: string, password: string, fullName: string) => {
    await signUp(email, password, fullName);
    const pendingType = localStorage.getItem('pendingElementalType');
    const pendingSubtype = localStorage.getItem('pendingSubtype');
    const pendingQuizMode = localStorage.getItem('pendingQuizMode') || 'full';
    if (pendingType) {
      setTimeout(async () => {
        try {
          await saveElementalType(pendingType, pendingSubtype || undefined, pendingQuizMode as 'full' | 'subtype');
          localStorage.removeItem('pendingElementalType');
          localStorage.removeItem('pendingSubtype');
          localStorage.removeItem('pendingQuizMode');
          localStorage.removeItem('userElement');
          localStorage.removeItem('userSubtype');
        } catch (e) {
          console.error(e);
        }
      }, 1000);
    }
  };

  const handleQuizComplete = async (element: string, subtype?: string) => {
    setUserElement(element);
    if (subtype) setUserSubtype(subtype);
    if (user) {
      try {
        await saveElementalType(element, subtype, 'full');
        await refreshProfile();
        toast({
          title: 'Results Saved!',
          description: 'Your elemental color type has been saved to your profile and quiz history.',
        });
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error Saving Results',
          description: 'Your results are shown but could not be saved. Please try again.',
          variant: 'destructive',
        });
      }
    } else {
      localStorage.setItem('userElement', element);
      if (subtype) localStorage.setItem('userSubtype', subtype);
      localStorage.setItem('pendingElementalType', element);
      localStorage.setItem('pendingQuizMode', 'full');
      if (subtype) localStorage.setItem('pendingSubtype', subtype);
      toast({
        title: 'Results Ready!',
        description: 'Sign in to save your results permanently and track your quiz history.',
      });
    }
  };

  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  return (
    <div className="min-h-screen bg-white">
      <Header
        onOpenQuiz={() => setShowQuiz(true)}
        activeSection="elemental-gallery"
        onNavigate={handleNavigate}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        user={user}
        profile={profile}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenProfile={() => (user ? navigate('/') : setShowAuthModal(true))}
        isAdmin={!!isAdmin}
        onOpenAdmin={() => {
          navigate('/');
          window.setTimeout(() => {
            document.getElementById('admin')?.scrollIntoView({ behavior: 'smooth' });
          }, 200);
        }}
      />

      <div className="pt-4 pb-6 px-6 max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-amber-100 mb-4">
            <Crown className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-800">Workshop members</span>
            <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-white">
              Workshop
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-2">Elemental Gallery</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Dominant element quiz, famous faces, comparisons, your color palette, and the color
            compass—all in one place for Workshop members. Use the pills to jump to a section.
          </p>
        </div>
      </div>

      <PageAnchorNav items={GALLERY_PAGE_ANCHORS} ariaLabel="Gallery sections" />

      <CompactDiscoveryHubLinks
        className="py-6 mb-2"
        omitTitles={['Compare types', 'Famous faces']}
      />

      <ElementalGallerySections
        isPremiumMember={isPremiumMember}
        userElement={userElement}
        userSubtype={userSubtype}
        onStartFullQuiz={() => setShowQuiz(true)}
        onStartSubtypeQuiz={() => setShowQuiz(true)}
        onSelectType={(type) => navigateToElementOnTypesPage(navigate, type.id)}
        onUpgrade={handleUpgrade}
      />

      <Footer
        onNavigate={handleNavigate}
        onSelectType={(elementId) => navigateToElementOnTypesPage(navigate, elementId)}
      />

      {showQuiz && (
        <Quiz
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
          user={user}
          onOpenAuth={() => setShowAuthModal(true)}
          onSaveResult={async (element, subtype) => {
            await saveElementalType(element, subtype, 'full');
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
    </div>
  );
};

const ElementalGalleryPage: React.FC = () => (
  <AuthProvider>
    <AppProvider>
      <ElementalGalleryPageInner />
    </AppProvider>
  </AuthProvider>
);

export default ElementalGalleryPage;
