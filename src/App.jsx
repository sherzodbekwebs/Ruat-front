import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ContactsPage from './pages/ContactsPage.jsx';
import NewsDetailPage from './pages/NewsDetailPage.jsx'; // 1. Yangi sahifani import qildik

// API manzili
const API_BASE_URL = 'https://ruatapi.uzautotrailer.uz/api';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// Himoyalangan yo'nalish (Token borligini tekshiradi)
const ProtectedRoute = ({ children, loading }) => {
  const token = sessionStorage.getItem('admin_token');
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!token) return <Navigate to="/login" replace />;
  return children;
};

function AppContent({ products, loading, onLogin, onLogout, refreshProducts }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isAdminPage = location.pathname.startsWith('/admin');
  const hideHeaderFooter = isLoginPage || isAdminPage;

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {!hideHeaderFooter && <Header />}
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/product/:id" element={<ProductPage products={products} />} />
          
          {/* 2. Yangiliklar tafsiloti uchun dinamik route qo'shildi */}
          <Route path="/news/:id" element={<NewsDetailPage />} />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute loading={loading}>
                <AdminPage products={products} onUpdate={refreshProducts} onLogout={onLogout} />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ma'lumotlarni API'dan olish funksiyasi
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Mahsulotlarni yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Login funksiyasi (Tokenni saqlaydi)
  const login = (token) => {
    sessionStorage.setItem('admin_token', token);
  };

  // Logout funksiyasi (Tokenni o'chiradi)
  const logout = () => {
    sessionStorage.removeItem('admin_token');
    window.location.href = '/login';
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent 
          products={products} 
          loading={loading} 
          onLogin={login}
          onLogout={logout}
          refreshProducts={fetchProducts} 
        />
      </BrowserRouter>
    </HelmetProvider>
  );
}