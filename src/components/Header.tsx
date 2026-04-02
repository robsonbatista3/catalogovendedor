import { LogOut, LayoutDashboard, Package, ShoppingCart, Users, Menu, X } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { Button } from './Button';

export function Header() {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = isAdmin 
    ? [
        { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { label: 'Produtos', path: '/admin/products', icon: Package },
        { label: 'Pedidos', path: '/admin/orders', icon: ShoppingCart },
        { label: 'Vendedores', path: '/admin/vendedores', icon: Users },
      ]
    : [
        { label: 'Catálogo', path: '/vendedor/catalog', icon: Package },
        { label: 'Meus Pedidos', path: '/vendedor/orders', icon: ShoppingCart },
      ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black text-white shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-800 rounded flex items-center justify-center font-black text-lg">
            CV
          </div>
          <span className="font-black text-xl tracking-tighter uppercase hidden sm:block">
            Catálogo <span className="text-red-600">Vendedor</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors hover:text-red-500",
                location.pathname === item.path ? "text-red-500" : "text-gray-300"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-bold uppercase tracking-tighter">{user?.name}</span>
            <span className="text-[10px] text-gray-400 uppercase">{user?.role}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={logout}
            className="text-white hover:bg-red-800"
            aria-label="Sair do sistema"
          >
            <LogOut className="w-5 h-5" />
          </Button>
          
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 p-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest p-2 hover:bg-gray-800 rounded"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
