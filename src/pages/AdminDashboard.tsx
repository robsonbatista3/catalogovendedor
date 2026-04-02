import { Package, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Order, Product, User } from '../types';

export function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sellers, setSellers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Order)));
    });
    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product)));
    });
    const unsubSellers = onSnapshot(collection(db, 'users'), (snapshot) => {
      setSellers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as User)).filter(u => u.role === 'vendedor'));
      setIsLoading(false);
    });

    return () => {
      unsubOrders();
      unsubProducts();
      unsubSellers();
    };
  }, []);

  const totalSales = orders.filter(o => o.status === 'completed').reduce((acc, curr) => acc + curr.totalAmount, 0);
  const sellersCount = sellers.length;

  const stats = [
    { label: 'Total em Vendas', value: formatCurrency(totalSales), icon: TrendingUp, trend: '+12.5%', trendUp: true },
    { label: 'Pedidos Realizados', value: orders.length, icon: ShoppingCart, trend: '+5.2%', trendUp: true },
    { label: 'Produtos Ativos', value: products.length, icon: Package, trend: 'Estável', trendUp: true },
    { label: 'Vendedores', value: sellersCount, icon: Users, trend: '+2', trendUp: true },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-black uppercase tracking-tighter">
          Dashboard <span className="text-red-800">Administrativo</span>
        </h1>
        <p className="text-gray-500 font-medium uppercase text-xs tracking-widest">
          Visão geral do desempenho da plataforma
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-gray-50 rounded-xl text-red-800">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                stat.trendUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
              )}>
                {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-black">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black uppercase tracking-tighter">Pedidos Recentes</h3>
            <button className="text-xs font-bold text-red-800 uppercase hover:underline">Ver todos</button>
          </div>
          <div className="space-y-4">
            {orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()).slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold text-xs">
                    #{order.id.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black">{order.clientName}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">{order.productName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-black">{formatCurrency(order.totalAmount)}</p>
                  <p className={cn(
                    "text-[10px] font-bold uppercase",
                    order.status === 'completed' ? "text-green-600" : "text-yellow-600"
                  )}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black uppercase tracking-tighter">Produtos em Destaque</h3>
            <button className="text-xs font-bold text-red-800 uppercase hover:underline">Gerenciar</button>
          </div>
          <div className="space-y-4">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <img src={product.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg" referrerPolicy="no-referrer" />
                  <div>
                    <p className="text-sm font-bold text-black">{product.name}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-black">{formatCurrency(product.price)}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Estoque: {product.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
