import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import AppLayout from "./components/AppLayout";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Mentores from "./pages/Mentores";
import Coliseu from "./pages/Coliseu";
import Perfil from "./pages/Perfil";
import BattleMode from "./pages/BattleMode";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminPlanos from "./pages/admin/AdminPlanos";
import AdminEspecialistas from "./pages/admin/AdminEspecialistas";
import AdminComunicacao from "./pages/admin/AdminComunicacao";
import AdminRelatorios from "./pages/admin/AdminRelatorios";
import AdminConfig from "./pages/admin/AdminConfig";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const [onboarded, setOnboarded] = useState(false);
  const [dishonorMode, setDishonorMode] = useState(false);

  const isAdmin = location.pathname.startsWith("/admin");

  if (!onboarded && !isAdmin) {
    return <Onboarding onComplete={() => setOnboarded(true)} />;
  }

  return (
    <div className={dishonorMode ? "grayscale-mode" : ""}>
      <Routes>
        <Route element={<AppLayout dishonorMode={dishonorMode} setDishonorMode={setDishonorMode} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mentores" element={<Mentores />} />
          <Route path="/coliseu" element={<Coliseu />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
        <Route path="/batalha" element={<BattleMode />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          <Route path="/admin/planos" element={<AdminPlanos />} />
          <Route path="/admin/especialistas" element={<AdminEspecialistas />} />
          <Route path="/admin/comunicacao" element={<AdminComunicacao />} />
          <Route path="/admin/relatorios" element={<AdminRelatorios />} />
          <Route path="/admin/config" element={<AdminConfig />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
