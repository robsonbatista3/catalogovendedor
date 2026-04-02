import { useState } from 'react';
import { mockOrders } from '../data/mockData';
import { formatCurrency, formatDate, cn } from '../lib/utils';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Search, Eye, Download, Filter, Calendar } from 'lucide-react';

export function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = mockOrders.filter(o => 
    o.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.vendedorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-black uppercase tracking-tighter">
            Gestão de <span className="text-red-800">Pedidos</span>
          </h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Acompanhamento de vendas em tempo real</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-12 uppercase font-black tracking-widest">
            <Download className="w-5 h-5 mr-2" />
            Relatório Mensal
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Buscar por cliente, produto ou vendedor..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="uppercase text-[10px] font-black">
              <Calendar className="w-3 h-3 mr-2" />
              Período
            </Button>
            <Button variant="outline" size="sm" className="uppercase text-[10px] font-black">
              <Filter className="w-3 h-3 mr-2" />
              Status
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">ID / Data</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Cliente</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Produto</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Vendedor</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Total</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-black">#{order.id.toUpperCase()}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{formatDate(order.orderDate)}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-black">{order.clientName}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{order.clientPhone}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-black">{order.productName}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Qtd: {order.quantity}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-tighter">
                      {order.vendedorName}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-black text-black">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "px-2 py-1 text-[10px] font-black uppercase rounded",
                      order.status === 'completed' ? "bg-green-50 text-green-600" : 
                      order.status === 'pending' ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-600"
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="icon" className="hover:text-red-800">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
