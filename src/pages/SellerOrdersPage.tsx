import { useAuth } from '../lib/auth';
import { mockOrders } from '../data/mockData';
import { formatCurrency, formatDate, cn } from '../lib/utils';
import { ShoppingBag, Clock, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export function SellerOrdersPage() {
  const { user } = useAuth();
  
  // Filter orders for the logged-in seller
  const myOrders = mockOrders.filter(o => o.vendedorId === user?.id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-700 border-green-100';
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-black uppercase tracking-tighter">
          Meus <span className="text-red-800">Pedidos</span>
        </h1>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Acompanhe suas vendas e status de entrega</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {myOrders.length > 0 ? (
          myOrders.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group"
            >
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-red-800">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">#{order.id.toUpperCase()}</span>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[9px] font-black uppercase border",
                        getStatusClass(order.status)
                      )}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-black uppercase tracking-tight">{order.productName}</h3>
                    <p className="text-xs text-gray-500 font-medium">Cliente: <span className="text-black font-bold">{order.clientName}</span></p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-8 md:gap-12">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Data</p>
                    <p className="text-xs font-bold text-black">{formatDate(order.orderDate)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Quantidade</p>
                    <p className="text-xs font-bold text-black">{order.quantity} un</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total</p>
                    <p className="text-sm font-black text-red-800">{formatCurrency(order.totalAmount)}</p>
                  </div>
                  <div className="hidden md:block">
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-20 text-center space-y-4 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 text-gray-400 rounded-full">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black uppercase tracking-tighter">Nenhum pedido encontrado</h3>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">Você ainda não realizou nenhuma venda.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
