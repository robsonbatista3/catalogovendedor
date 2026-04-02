import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './lib/auth';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { SellerCatalog } from './pages/SellerCatalog';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { OrderFormPage } from './pages/OrderFormPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProductsPage } from './pages/AdminProductsPage';
import { AdminOrdersPage } from './pages/AdminOrdersPage';
import { AdminSellersPage } from './pages/AdminSellersPage';
import { SellerOrdersPage } from './pages/SellerOrdersPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/vendedor/catalog" replace />} />
            
            {/* Vendedor Routes */}
            <Route path="/vendedor/catalog" element={<SellerCatalog />} />
            <Route path="/vendedor/catalog/:id" element={<ProductDetailPage />} />
            <Route path="/vendedor/order/:productId" element={<OrderFormPage />} />
            <Route path="/vendedor/orders" element={<SellerOrdersPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/vendedores" element={<AdminSellersPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
