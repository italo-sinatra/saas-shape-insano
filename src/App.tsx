import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "./components/AppLayout";
import AuthPage from "./pages/AuthPage";
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
import InsanoLogo from "./components/InsanoLogo";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const LoadingScreen = () => {
  const [slow, setSlow] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setSlow(true), 3000);
    const t2 = setTimeout(() => setTimedOut(true), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <div className="animate-pulse">
        <InsanoLogo size={64} />
      </div>
      {slow && !timedOut && (
        <p className="text-muted-foreground text-sm animate-fade-in">
          Isso está demorando mais que o normal...
        </p>
      )}
      {timedOut && (
        <div className="flex flex-col items-center gap-2 animate-fade-in">
          <p className="text-muted-foreground text-sm">Problemas de conexão detectados.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
          >
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const { user, loading, onboarded, setOnboarded } = useAuth();

  const isServiceRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/especialista");

  if (loading) return <LoadingScreen />;

  if (!user && !isServiceRoute) {
    return <AuthPage />;
  }

  if (user && !onboarded && !isServiceRoute) {
    return <Onboarding onComplete={() => setOnboarded(true)} />;
  }

  return (
    <Routes>
      <Route element={<AppLayout dishonorMode={false} setDishonorMode={() => {}} />}>
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
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
