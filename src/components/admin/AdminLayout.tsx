import { Outlet, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardEdit,
  UserCog,
  BarChart3,
  Settings,
  MessageSquare,
  ChevronLeft,
  Menu,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import InsanoLogo from "@/components/InsanoLogo";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { title: "Usuários", path: "/admin/usuarios", icon: Users },
  { title: "Importar Alunos", path: "/admin/importar", icon: UserPlus },
  { title: "Planos", path: "/admin/planos", icon: ClipboardEdit },
  { title: "Especialistas", path: "/admin/especialistas", icon: UserCog },
  { title: "Comunicação", path: "/admin/comunicacao", icon: MessageSquare },
  { title: "Relatórios", path: "/admin/relatorios", icon: BarChart3 },
  { title: "Configurações", path: "/admin/config", icon: Settings },
];

const AdminLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-border bg-sidebar transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-60"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <InsanoLogo size={28} />
              <span className="font-cinzel text-sm font-bold text-gold">QUARTEL GENERAL</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md hover:bg-sidebar-accent text-muted-foreground"
          >
            {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                isActive(item.path)
                  ? "bg-primary/20 text-gold font-medium"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              )}
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground rounded-md hover:bg-sidebar-accent transition-colors"
          >
            <ChevronLeft size={14} />
            {!collapsed && <span>Voltar ao App</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          collapsed ? "ml-16" : "ml-60"
        )}
      >
        <div className="p-6 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
