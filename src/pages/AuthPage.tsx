import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Mail, Lock, Eye, EyeOff, ArrowLeft, User, Loader2 } from "lucide-react";
import InsanoLogo from "@/components/InsanoLogo";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import authBg from "@/assets/auth-bg.jpg";

type AuthView = "landing" | "login" | "register";

const AuthPage = () => {
  const { signIn, signUp } = useAuth();
  const [view, setView] = useState<AuthView>("landing");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error(error === "Invalid login credentials" ? "Email ou senha incorretos" : error);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, name);
    setLoading(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Conta criada! Verifique seu email para confirmar.");
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-end overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={authBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
      </div>

      <AnimatePresence mode="wait">
        {/* LANDING VIEW */}
        {view === "landing" && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="relative z-10 w-full max-w-md px-6 pb-12 pt-20 flex flex-col items-center">
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="mb-6">
              <InsanoLogo size={88} className="mx-auto gold-shadow" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-cinzel text-4xl md:text-5xl font-bold text-foreground text-center tracking-wide mb-2">
              <span className="gold-text-gradient">SHAPE INSANO</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="font-cinzel text-sm text-muted-foreground tracking-[0.3em] uppercase mb-2">
              Forja Tua Lenda
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent mb-8" />
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-muted-foreground text-center text-sm mb-10 max-w-xs leading-relaxed">
              Treine como um gladiador. Evolua como um imperador. A arena te espera.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }} className="w-full space-y-3">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setView("register")} className="w-full py-4 gold-gradient text-accent-foreground font-cinzel font-bold rounded-xl gold-shadow tracking-wider text-sm">
                CRIAR CONTA
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setView("login")} className="w-full py-4 bg-card/80 backdrop-blur-sm border border-border text-foreground font-cinzel font-semibold rounded-xl tracking-wider text-sm hover:border-accent/30 transition-colors">
                JÁ TENHO CONTA
              </motion.button>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-muted-foreground/50 text-xs text-center mt-8 font-cinzel tracking-wider">
              "A força não vem da capacidade física.<br />Vem de uma vontade indomável."
            </motion.p>
          </motion.div>
        )}

        {/* LOGIN VIEW */}
        {view === "login" && (
          <motion.div key="login" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }} className="relative z-10 w-full max-w-md px-6 pb-12 pt-20 flex flex-col items-center">
            <button onClick={() => setView("landing")} className="absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={24} />
            </button>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="mb-6">
              <InsanoLogo size={64} className="mx-auto" />
            </motion.div>
            <h2 className="font-cinzel text-2xl font-bold text-foreground mb-1">
              Retorno à <span className="gold-text-gradient">Arena</span>
            </h2>
            <p className="text-muted-foreground text-sm mb-8">A legião te aguarda, guerreiro.</p>
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 py-6 bg-card/80 backdrop-blur-sm border-border text-foreground rounded-xl" required />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input type={showPassword ? "text" : "password"} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 py-6 bg-card/80 backdrop-blur-sm border-border text-foreground rounded-xl" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full py-4 crimson-gradient text-foreground font-cinzel font-bold rounded-xl crimson-shadow tracking-wider text-sm disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <><Loader2 size={18} className="animate-spin" /> ENTRANDO...</> : "ENTRAR"}
              </motion.button>
            </form>
            <p className="text-muted-foreground text-xs mt-6">
              Não tem conta?{" "}
              <button onClick={() => setView("register")} className="text-accent font-semibold hover:underline">Criar conta</button>
            </p>
          </motion.div>
        )}

        {/* REGISTER VIEW */}
        {view === "register" && (
          <motion.div key="register" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }} className="relative z-10 w-full max-w-md px-6 pb-12 pt-20 flex flex-col items-center">
            <button onClick={() => setView("landing")} className="absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={24} />
            </button>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="mb-6">
              <InsanoLogo size={64} className="mx-auto" />
            </motion.div>
            <h2 className="font-cinzel text-2xl font-bold text-foreground mb-1">
              Alistar-se na <span className="gold-text-gradient">Legião</span>
            </h2>
            <p className="text-muted-foreground text-sm mb-8">Tua jornada para a glória começa aqui.</p>
            <form onSubmit={handleRegister} className="w-full space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input type="text" placeholder="Nome completo" value={name} onChange={(e) => setName(e.target.value)} className="pl-10 py-6 bg-card/80 backdrop-blur-sm border-border text-foreground rounded-xl" required />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 py-6 bg-card/80 backdrop-blur-sm border-border text-foreground rounded-xl" required />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input type={showPassword ? "text" : "password"} placeholder="Criar senha (mín. 6 caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 py-6 bg-card/80 backdrop-blur-sm border-border text-foreground rounded-xl" required minLength={6} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full py-4 crimson-gradient text-foreground font-cinzel font-bold rounded-xl crimson-shadow tracking-wider text-sm disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <><Loader2 size={18} className="animate-spin" /> CRIANDO...</> : "CRIAR CONTA"}
              </motion.button>
            </form>
            <p className="text-muted-foreground text-xs mt-6">
              Já tem conta?{" "}
              <button onClick={() => setView("login")} className="text-accent font-semibold hover:underline">Entrar</button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
