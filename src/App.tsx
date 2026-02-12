import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AppLayout from "./components/AppLayout";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Mentores from "./pages/Mentores";
import Coliseu from "./pages/Coliseu";
import Perfil from "./pages/Perfil";
import BattleMode from "./pages/BattleMode";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [onboarded, setOnboarded] = useState(false);
  const [dishonorMode, setDishonorMode] = useState(false);

  if (!onboarded) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Onboarding onComplete={() => setOnboarded(true)} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className={dishonorMode ? "grayscale-mode" : ""}>
            <Routes>
              <Route element={<AppLayout dishonorMode={dishonorMode} setDishonorMode={setDishonorMode} />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/mentores" element={<Mentores />} />
                <Route path="/coliseu" element={<Coliseu />} />
                <Route path="/perfil" element={<Perfil />} />
              </Route>
              <Route path="/batalha" element={<BattleMode />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
