import { Star } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  href: string;
}

export function ProductCard({ product, href }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Link to={href} className="block relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter rounded",
                tag === 'Mais Vendido' ? "bg-red-800 text-white" : "bg-black text-white"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>

        <Link to={href}>
          <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-red-800 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-black text-black">
            {formatCurrency(product.price)}
          </span>
          {product.stock < 10 && (
            <span className="text-[10px] font-bold text-red-600 uppercase">
              Apenas {product.stock} restam
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
