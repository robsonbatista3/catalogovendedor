import React, { useState } from 'react';
import { useAuth } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { LogIn, ShieldCheck, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'vendedor'>('vendedor');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(email, role);
      navigate(role === 'admin' ? '/admin' : '/vendedor/catalog');
    } catch (err) {
      setError('Credenciais inválidas ou usuário não encontrado.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-800 rounded-2xl shadow-lg mb-4">
            <span className="text-white font-black text-3xl">CV</span>
          </div>
          <h1 className="text-3xl font-black text-black uppercase tracking-tighter">
            Catálogo <span className="text-red-800">Vendedor</span>
          </h1>
          <p className="text-gray-500 font-medium uppercase text-xs tracking-widest mt-2">
            Plataforma Corporativa de Gestão
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
          <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setRole('vendedor')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${
                role === 'vendedor' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              Vendedor
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${
                role === 'admin' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="E-mail Corporativo"
              type="email"
              placeholder="ex: joao@catalogo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="space-y-1">
              <Input
                label="Senha"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-end">
                <button type="button" className="text-[10px] font-bold text-red-800 uppercase hover:underline">
                  Esqueceu a senha?
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs font-bold uppercase text-center">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 text-sm uppercase tracking-widest font-black"
              isLoading={isLoading}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Acessar Plataforma
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Acesso restrito a colaboradores autorizados
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
