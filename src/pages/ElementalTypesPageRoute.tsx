import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ElementalTypesPageContent from '@/components/ElementalTypesPageContent';
import ElementalTypeDetail from '@/components/ElementalTypeDetail';
import AuthModal from '@/components/AuthModal';
import Quiz from '@/components/Quiz';
import { elementalTypes, ElementalType } from '@/data/elementalTypes';
import { navigateFromDetachedPage, navigateToElementOnTypesPage } from '@/lib/detachedPageNavigation';
import { hasWorkshopAccess } from '@/lib/workshopAccess';
import { canAccessSubtypeDetail, hasSubtypeProfileAccess } from '@/lib/subtypeProfileAccess';

const ADMIN_EMAILS = ['sarahjengen@gmail.com', 'beymustcode@gmail.com'];

const ElementalTypesPageInner: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
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
  const [selectedType, setSelectedType] = useState<ElementalType | null>(null);
  const [linkedSubtypeId, setLinkedSubtypeId] = useState<string | null>(null);

  const userElement = profile?.elemental_type ?? null;
  const userSubtype = profile?.elemental_subtype ?? null;
  const [localElement, setLocalElement] = useState<string | null>(null);
  const [localSubtype, setLocalSubtype] = useState<string | null>(null);

  const resolvedElement = userElement ?? localElement;
  const resolvedSubtype = userSubtype ?? localSubtype;
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  useEffect(() => {
    document.title = 'The Four Elements | Elemental Color Identity';
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      const e = localStorage.getItem('userElement');
      const s = localStorage.getItem('userSubtype');
      if (e) setLocalElement(e);
      if (s) setLocalSubtype(s);
    } else {
      setLocalElement(null);
      setLocalSubtype(null);
    }
  }, [user]);

  // Scroll to hash anchors (e.g. #color-wheel from Quick Nav)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
    return () => clearTimeout(t);
  }, []);

  // Open element detail (and optionally a subtype) when linked with
  // ?element=fire&subtype=fire-air (post-purchase / email deep links).
  useEffect(() => {
    const elementId = searchParams.get('element');
    if (!elementId) return;
    const type = elementalTypes.find((t) => t.id === elementId);
    if (type) {
      setSelectedType(type);
      const subtypeId = searchParams.get('subtype');
      setLinkedSubtypeId(subtypeId ?? null);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Deep-link into a subtype when the user is allowed to open it (workshop,
  // membership, or own purchased subtype profile).
  const linkedSubtypeAllowed =
    !!linkedSubtypeId &&
    !!selectedType &&
    canAccessSubtypeDetail({
      profile,
      userElement: resolvedElement,
      userSubtype: resolvedSubtype,
      typeId: selectedType.id,
      subtypeId: linkedSubtypeId,
    });
  const initialSubtypeId = linkedSubtypeAllowed ? linkedSubtypeId : null;

  const handleNavigate = useCallback(
    (section: string) => {
      if (section === 'types' || section === 'elemental-types') {
        setSelectedType(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      navigateFromDetachedPage(navigate, section);
    },
    [navigate]
  );

  const handleSelectType = (type: ElementalType) => {
    setSelectedType(type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignIn = async (email: string, password: string) => {
    await signIn(email, password);
    await refreshProfile();
  };

  const handleSignUp = async (email: string, password: string, fullName: string) => {
    await signUp(email, password, fullName);
    await refreshProfile();
  };

  const pageHeader = (
    <Header
      onOpenQuiz={() => setShowQuiz(true)}
      activeSection="types"
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
  );

  const pageFooter = (
    <Footer
      onSelectType={(elementId) => navigateToElementOnTypesPage(navigate, elementId)}
      onNavigate={handleNavigate}
    />
  );

  if (selectedType) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {pageHeader}
        <div className="flex-1">
          <ElementalTypeDetail
          type={selectedType}
          onBack={() => {
            setLinkedSubtypeId(null);
            setSelectedType(null);
          }}
          isPremium={isPremiumMember()}
          hasWorkshopAccess={hasWorkshopAccess(profile)}
          userElement={resolvedElement}
          userSubtype={resolvedSubtype}
          hasSubtypeProfileUnlocked={profile?.subtype_profile_unlocked === true}
          profile={profile}
          initialSubtypeId={initialSubtypeId}
          showColorToolsBanner={hasSubtypeProfileAccess(profile)}
          onOpenColorAnalyzer={() => navigate('/color-tools#analyzer')}
          onOpenWardrobeAnalyzer={() => navigate('/color-tools#wardrobe')}
          onOpenCommunityForum={() => navigate('/community-forum')}
          onUnlockWorkshop={() => {
            if (!user) {
              setShowAuthModal(true);
              return;
            }
            navigate('/elemental-color-workshop');
          }}
          onUpgradeToPremium={() => {
            setSelectedType(null);
            navigateFromDetachedPage(navigate, 'membership');
          }}
          onNavigate={(section) => {
            setSelectedType(null);
            window.setTimeout(() => handleNavigate(section), 100);
          }}
        />
        </div>
        {pageFooter}
        {showQuiz && (
          <Quiz
            onComplete={async (element, subtype) => {
              if (user) {
                await saveElementalType(element, subtype, 'full');
                await refreshProfile();
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
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {pageHeader}
      <div className="flex-1">
        <ElementalTypesPageContent
          userElement={resolvedElement}
          onSelectType={handleSelectType}
          hasWorkshopAccess={hasWorkshopAccess(profile)}
          onUnlockWorkshop={() => {
            if (!user) {
              setShowAuthModal(true);
              return;
            }
            navigate('/elemental-color-workshop');
          }}
        />
      </div>
      {pageFooter}

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
    </div>
  );
};

const ElementalTypesPageRoute: React.FC = () => (
  <AuthProvider>
    <ElementalTypesPageInner />
  </AuthProvider>
);

export default ElementalTypesPageRoute;
