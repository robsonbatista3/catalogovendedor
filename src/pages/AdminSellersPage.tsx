import React, { useState } from 'react';
import { mockUsers as initialMockUsers, mockOrders } from '../data/mockData';
import { formatDate, formatCurrency, cn } from '../lib/utils';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { UserPlus, Search, Mail, Trash2, Key, User as UserIcon, Lock, CheckCircle2, Phone, Eye, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

export function AdminSellersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sellers, setSellers] = useState(initialMockUsers.filter(u => u.role === 'vendedor'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [sellerToDelete, setSellerToDelete] = useState<any>(null);
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const filteredSellers = sellers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateSeller = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newSeller = {
        id: `u${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: 'vendedor' as const,
        createdAt: new Date().toISOString(),
      };

      setSellers([newSeller, ...sellers]);
      setIsLoading(false);
      setIsSuccess(true);
      
      // Reset form and close modal after a delay
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '', password: '' });
      }, 2000);
    }, 1500);
  };

  const handleDeleteSeller = () => {
    if (!sellerToDelete) return;
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSellers(sellers.filter(s => s.id !== sellerToDelete.id));
      setIsLoading(false);
      setIsDeleteModalOpen(false);
      setSellerToDelete(null);
    }, 1000);
  };

  const getSellerOrders = (sellerId: string) => {
    return mockOrders.filter(o => o.vendedorId === sellerId);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-black uppercase tracking-tighter">
            Equipe de <span className="text-red-800">Vendedores</span>
          </h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Gerenciamento de acessos e performance</p>
        </div>
        <Button 
          className="h-12 uppercase font-black tracking-widest"
          onClick={() => setIsModalOpen(true)}
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Novo Vendedor
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Buscar por nome ou e-mail..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Vendedor</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">E-mail</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Data de Cadastro</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredSellers.map((seller) => (
                <tr key={seller.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-50 text-red-800 rounded-full flex items-center justify-center font-black text-xs">
                        {seller.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <p className="text-sm font-bold text-black">{seller.name}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <Mail className="w-3 h-3" />
                        {seller.email}
                      </div>
                      {seller.phone && (
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                          <Phone className="w-2.5 h-2.5" />
                          {seller.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-xs font-bold text-gray-500 uppercase">
                    {formatDate(seller.createdAt)}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded">
                      Ativo
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:text-black" 
                        title="Ver Detalhes"
                        onClick={() => {
                          setSelectedSeller(seller);
                          setIsDetailModalOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-red-800" title="Resetar Senha">
                        <Key className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:text-red-600" 
                        title="Excluir Conta"
                        onClick={() => {
                          setSellerToDelete(seller);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Seller Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => !isLoading && setIsModalOpen(false)}
        title="Criar Novo Vendedor"
      >
        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full"
            >
              <CheckCircle2 className="w-8 h-8" />
            </motion.div>
            <div className="space-y-1">
              <h3 className="text-lg font-black uppercase tracking-tighter">Vendedor Criado!</h3>
              <p className="text-sm text-gray-500">A conta foi configurada com sucesso.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCreateSeller} className="space-y-6">
            <div className="space-y-4">
              <Input
                label="Nome Completo"
                placeholder="ex: João da Silva"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isLoading}
              />
              <Input
                label="E-mail Corporativo"
                type="email"
                placeholder="ex: joao@catalogo.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
              />
              <Input
                label="Telefone / WhatsApp"
                placeholder="ex: (11) 99999-9999"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                disabled={isLoading}
              />
              <Input
                label="Senha Temporária"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 uppercase font-black tracking-widest"
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 uppercase font-black tracking-widest"
                isLoading={isLoading}
              >
                Criar Conta
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Seller Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Detalhes do Vendedor"
        className="max-w-3xl"
      >
        {selectedSeller && (
          <div className="space-y-8">
            <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-20 h-20 bg-red-800 text-white rounded-full flex items-center justify-center font-black text-2xl shadow-lg">
                {selectedSeller.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-black">{selectedSeller.name}</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-bold">
                    <Mail className="w-4 h-4 text-red-800" />
                    {selectedSeller.email}
                  </div>
                  {selectedSeller.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-bold">
                      <Phone className="w-4 h-4 text-red-800" />
                      {selectedSeller.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-bold">
                    <UserPlus className="w-4 h-4 text-red-800" />
                    Desde {formatDate(selectedSeller.createdAt)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-red-800" />
                  Vendas Realizadas
                </h4>
                <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase rounded-full">
                  {getSellerOrders(selectedSeller.id).length} Pedidos
                </span>
              </div>

              <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="p-3 text-[10px] font-black uppercase tracking-widest text-gray-500">ID Pedido</th>
                      <th className="p-3 text-[10px] font-black uppercase tracking-widest text-gray-500">Cliente</th>
                      <th className="p-3 text-[10px] font-black uppercase tracking-widest text-gray-500">Produto</th>
                      <th className="p-3 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSellerOrders(selectedSeller.id).length > 0 ? (
                      getSellerOrders(selectedSeller.id).map((order) => (
                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="p-3 text-[10px] font-bold text-gray-500 uppercase">#{order.id.toUpperCase()}</td>
                          <td className="p-3 text-xs font-bold text-black">{order.clientName}</td>
                          <td className="p-3 text-xs font-medium text-gray-600">{order.productName}</td>
                          <td className="p-3 text-xs font-black text-red-800 text-right">{formatCurrency(order.totalAmount)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                          Nenhuma venda registrada ainda
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                variant="outline" 
                className="uppercase font-black tracking-widest"
                onClick={() => setIsDetailModalOpen(false)}
              >
                Fechar
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => !isLoading && setIsDeleteModalOpen(false)}
        title="Confirmar Exclusão"
      >
        <div className="space-y-6">
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-4">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black uppercase tracking-tighter text-red-900">Atenção!</h4>
              <p className="text-xs text-red-700 font-medium">
                Você está prestes a excluir permanentemente a conta de <span className="font-bold">{sellerToDelete?.name}</span>. 
                Esta ação não pode ser desfeita.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 uppercase font-black tracking-widest"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              className="flex-1 uppercase font-black tracking-widest"
              onClick={handleDeleteSeller}
              isLoading={isLoading}
            >
              Confirmar Exclusão
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
