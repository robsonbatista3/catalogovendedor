import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import { formatCurrency } from '../lib/utils';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import React, { useState } from 'react';
import { CheckCircle2, ChevronLeft, CreditCard, MapPin, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../lib/auth';
import { Order } from '../types';

export function OrderFormPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const product = mockProducts.find(p => p.id === productId);

  const [formData, setFormData] = useState({
    clientName: '',
    clientAddress: '',
    clientPhone: '',
    quantity: 1,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsLoading(true);

    // Create the order object with seller info
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 100000)}`,
      clientId: `c${Date.now()}`,
      clientName: formData.clientName,
      clientAddress: formData.clientAddress,
      clientPhone: formData.clientPhone,
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      quantity: formData.quantity,
      totalAmount: product.price * formData.quantity,
      vendedorId: user.id,
      vendedorName: user.name,
      orderDate: new Date().toISOString(),
      status: 'pending',
    };

    console.log('Pedido realizado:', newOrder);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-black uppercase tracking-tighter">
            Pedido <span className="text-red-800">Confirmado!</span>
          </h1>
          <p className="text-gray-600 font-medium">
            O pedido #ORD-{Math.floor(Math.random() * 100000)} foi realizado com sucesso para <span className="font-bold text-black">{formData.clientName}</span>.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button variant="outline" onClick={() => navigate('/vendedor/catalog')}>
            Voltar ao Catálogo
          </Button>
          <Button onClick={() => navigate('/vendedor/orders')}>
            Ver Meus Pedidos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Voltar ao Produto
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-black uppercase tracking-tighter">
              Finalizar <span className="text-red-800">Pedido</span>
            </h1>
            <p className="text-gray-500 font-medium">Preencha os dados do cliente para concluir a venda.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <UserIcon className="w-4 h-4 text-red-800" />
                <h3 className="text-xs font-black uppercase tracking-widest">Dados do Cliente</h3>
              </div>
              <Input
                label="Nome Completo"
                placeholder="Nome do cliente final"
                value={formData.clientName}
                onChange={e => setFormData({...formData, clientName: e.target.value})}
                required
              />
              <Input
                label="Telefone de Contato"
                placeholder="(00) 00000-0000"
                value={formData.clientPhone}
                onChange={e => setFormData({...formData, clientPhone: e.target.value})}
                required
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <MapPin className="w-4 h-4 text-red-800" />
                <h3 className="text-xs font-black uppercase tracking-widest">Endereço de Entrega</h3>
              </div>
              <Input
                label="Endereço Completo"
                placeholder="Rua, número, bairro, cidade - UF"
                value={formData.clientAddress}
                onChange={e => setFormData({...formData, clientAddress: e.target.value})}
                required
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <CreditCard className="w-4 h-4 text-red-800" />
                <h3 className="text-xs font-black uppercase tracking-widest">Opções do Pedido</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Quantidade"
                  type="number"
                  min="1"
                  max={product.stock}
                  value={formData.quantity}
                  onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-black uppercase tracking-widest"
              isLoading={isLoading}
            >
              Confirmar Pedido
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-black text-white p-6 rounded-2xl shadow-xl space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-red-500">Resumo do Pedido</h3>
            
            <div className="flex gap-4">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-16 h-16 object-cover rounded-lg bg-gray-800"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <h4 className="text-sm font-bold line-clamp-1">{product.name}</h4>
                <p className="text-xs text-gray-400 uppercase tracking-tighter">{product.category}</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-800">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Preço Unitário</span>
                <span className="font-bold">{formatCurrency(product.price)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Quantidade</span>
                <span className="font-bold">x {formData.quantity}</span>
              </div>
              <div className="flex justify-between text-lg pt-3 border-t border-gray-800">
                <span className="font-black uppercase tracking-tighter">Total</span>
                <span className="font-black text-red-500">{formatCurrency(product.price * formData.quantity)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Informações Importantes</h4>
            <ul className="space-y-2">
              <li className="text-[10px] font-bold text-gray-600 uppercase leading-tight">• O prazo de entrega é calculado após a confirmação.</li>
              <li className="text-[10px] font-bold text-gray-600 uppercase leading-tight">• Verifique os dados do cliente antes de confirmar.</li>
              <li className="text-[10px] font-bold text-gray-600 uppercase leading-tight">• Este pedido será vinculado ao seu perfil de vendedor.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
