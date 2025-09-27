import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PhishingIntro from "./pages/PhishingIntro";
import PhishingGame from "./pages/PhishingGame";
import LeastPrivilegeIntro from "./pages/LeastPrivilegeIntro";
import LeastPrivilegeGame from "./pages/LeastPrivilegeGame";
import LeastPrivilegeIncident from "./pages/LeastPrivilegeIncident";
import SecurityQuizIntro from "./pages/SecurityQuizIntro";
import SecurityQuizGame from "./pages/SecurityQuizGame";
import SecurityQuizResults from "./pages/SecurityQuizResults";
import EncryptionIntro from "./pages/EncryptionIntro";
import EncryptionGame from "./pages/EncryptionGame";
import EncryptionResults from "./pages/EncryptionResults";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/phishing-intro" element={<PhishingIntro />} />
          <Route path="/phishing-game" element={<PhishingGame />} />
          <Route path="/least-privilege-intro" element={<LeastPrivilegeIntro />} />
          <Route path="/least-privilege-game" element={<LeastPrivilegeGame />} />
          <Route path="/least-privilege-incident" element={<LeastPrivilegeIncident />} />
          <Route path="/security-quiz-intro" element={<SecurityQuizIntro />} />
          <Route path="/security-quiz-game" element={<SecurityQuizGame />} />
          <Route path="/security-quiz-results" element={<SecurityQuizResults />} />
          <Route path="/encryption-intro" element={<EncryptionIntro />} />
          <Route path="/encryption-game" element={<EncryptionGame />} />
          <Route path="/encryption-results" element={<EncryptionResults />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
