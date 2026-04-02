import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { formatCurrency, cn } from '../lib/utils';
import { Button } from '../components/Button';
import { Star, ChevronLeft, ChevronRight, ShoppingCart, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const unsubscribe = onSnapshot(doc(db, 'products', id), (doc) => {
      if (doc.exists()) {
        setProduct({ ...doc.data(), id: doc.id } as Product);
      } else {
        setProduct(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-800 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold uppercase">Produto não encontrado</h2>
        <Button onClick={() => navigate(-1)} className="mt-4">Voltar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Voltar ao Catálogo
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            
            {product.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setActiveImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="p-2 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setActiveImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="p-2 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={cn(
                  "relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0",
                  activeImage === idx ? "border-red-800 scale-105 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-red-800 text-white text-[10px] font-black uppercase tracking-widest rounded">
                  {tag}
                </span>
              ))}
              <span className="px-2 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl font-black text-black uppercase tracking-tighter leading-none">
              {product.name}
            </h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    )} 
                  />
                ))}
                <span className="ml-2 text-sm font-bold">{product.rating}</span>
              </div>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                ({product.reviewCount} avaliações)
              </span>
            </div>

            <div className="text-3xl font-black text-red-800">
              {formatCurrency(product.price)}
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-gray-100">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-red-800" />
              <div className="text-[10px] font-bold uppercase tracking-widest">
                Entrega <br /> <span className="text-gray-500">Rápida</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-red-800" />
              <div className="text-[10px] font-bold uppercase tracking-widest">
                Garantia <br /> <span className="text-gray-500">Premium</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCcw className="w-5 h-5 text-red-800" />
              <div className="text-[10px] font-bold uppercase tracking-widest">
                Troca <br /> <span className="text-gray-500">Facilitada</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest border-b-2 border-black inline-block pb-1">
              Especificações Técnicas
            </h3>
            <div className="grid grid-cols-1 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
              {product.specifications.map((spec, idx) => (
                <div key={idx} className="grid grid-cols-2 bg-white">
                  <div className="p-3 text-[10px] font-black uppercase tracking-widest bg-gray-50 text-gray-500 border-r border-gray-100">
                    {spec.key}
                  </div>
                  <div className="p-3 text-xs font-bold text-black">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Button 
              size="lg" 
              className="w-full h-14 text-lg font-black uppercase tracking-widest"
              onClick={() => navigate(`/vendedor/order/${product.id}`)}
            >
              <ShoppingCart className="w-5 h-5 mr-3" />
              Fazer Pedido para Cliente
            </Button>
            <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-4">
              Estoque disponível: {product.stock} unidades
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
