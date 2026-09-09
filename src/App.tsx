import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CommunityForumPage from "./pages/CommunityForumPage";
import ElementalGalleryPage from "./pages/ElementalGalleryPage";
import GuideCategoryPage from "./pages/GuideCategoryPage";
import ElementalTypesPageRoute from "./pages/ElementalTypesPageRoute";
import ElementalColorWorkshopPageRoute from "./pages/ElementalColorWorkshopPageRoute";
import ColorToolsPageRoute from "./pages/ColorToolsPageRoute";
import PressPageRoute from "./pages/PressPageRoute";

import { debugSession } from './lib/supabase';
import { isDevMode } from './lib/env';

const queryClient = new QueryClient();
//

const App = () => {
  useEffect(() => {
    if (isDevMode()) {
      debugSession();
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/elemental-types" element={<ElementalTypesPageRoute />} />
              <Route path="/elemental-color-workshop" element={<ElementalColorWorkshopPageRoute />} />
              <Route path="/color-tools" element={<ColorToolsPageRoute />} />
              <Route path="/press" element={<PressPageRoute />} />
              <Route path="/community-forum/roots/assessment" element={<Navigate to="/community-forum/roots" replace />} />
              <Route path="/community-forum/roots" element={<CommunityForumPage />} />
              <Route path="/community-forum" element={<CommunityForumPage />} />
              <Route path="/elemental-gallery" element={<ElementalGalleryPage />} />
              <Route path="/guides/:category" element={<GuideCategoryPage />} />
              <Route path="*" element={<NotFound />} />

            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;