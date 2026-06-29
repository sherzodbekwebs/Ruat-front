import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'; // 1. React Query importlari

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ContactsPage from './pages/ContactsPage.jsx';
import NewsDetailPage from './pages/NewsDetailPage.jsx';
import LeadershipPage from './pages/LeadershipPage';

const API_BASE_URL = 'https://ruatapi.uzautotrailer.uz/api';

// 2. Query Client yaratish (Keshlash sozlamalari bilan)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 daqiqa davomida ma'lumot "yangi" hisoblanadi (qayta fetch qilinmaydi)
      gcTime: 1000 * 60 * 60,    // 1 soat davomida keshda saqlanadi
      refetchOnWindowFocus: false, // Boshqa oynaga o'tib qaytganda qayta fetch qilmaslik uchun
    },
  },
});

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    }
  }, [pathname, hash]);
  return null;
}

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

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isAdminPage = location.pathname.startsWith('/admin');
  const hideHeaderFooter = isLoginPage || isAdminPage;

  // 3. useQuery yordamida fetch qilish (useEffect va useState o'rniga)
  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products'], // Kesh kaliti
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data;
    },
  });

  const login = (token) => sessionStorage.setItem('admin_token', token);
  const logout = () => {
    sessionStorage.removeItem('admin_token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {!hideHeaderFooter && <Header />}
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/product/:slug" element={<ProductPage products={products} />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/news" element={<Navigate to="/" replace />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute loading={isLoading}>
                <AdminPage products={products} onUpdate={refetch} onLogout={logout} />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage onLogin={login} />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    // 4. QueryClientProvider bilan o'rash
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppContent />
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  );
}