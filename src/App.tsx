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
import EspecialistaLayout from "./components/especialista/EspecialistaLayout";
import EspecialistaDashboard from "./pages/especialista/EspecialistaDashboard";
import EspecialistaAlunos from "./pages/especialista/EspecialistaAlunos";
import EspecialistaPlanos from "./pages/especialista/EspecialistaPlanos";
import EspecialistaChat from "./pages/especialista/EspecialistaChat";
import EspecialistaPerfil from "./pages/especialista/EspecialistaPerfil";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const [onboarded, setOnboarded] = useState(false);
  const [dishonorMode, setDishonorMode] = useState(false);

  const isServiceRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/especialista");

  if (!onboarded && !isServiceRoute) {
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
        <Route element={<EspecialistaLayout />}>
          <Route path="/especialista" element={<EspecialistaDashboard />} />
          <Route path="/especialista/alunos" element={<EspecialistaAlunos />} />
          <Route path="/especialista/planos" element={<EspecialistaPlanos />} />
          <Route path="/especialista/chat" element={<EspecialistaChat />} />
          <Route path="/especialista/perfil" element={<EspecialistaPerfil />} />
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
