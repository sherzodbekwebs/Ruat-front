import { useState, useEffect } from 'react';
import { LogOut, ExternalLink, X, AlertCircle, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import AdminProducts from './AdminProducts';
import AdminMessages from './AdminMessages';
import AdminSlider from './AdminSlider';
import AdminNews from './AdminNews'; // Yangi komponentni import qildik

// API sozlamalari
const API_BASE_URL = 'https://ruatapi.uzautotrailer.uz/api';
const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function AdminPage({ products, onUpdate, onLogout }) {
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'slider', 'news', 'messages'
  const [messages, setMessages] = useState([]);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Arizalarni yuklash funksiyasi
  const fetchMessages = async () => {
    try {
      const res = await api.get('/messages');
      setMessages(res.data);
    } catch (err) {
      console.error("Ошибка при загрузке сообщений:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Yangi (o'qilmagan) xabarlar soni
  const unreadCount = messages.filter(m => !m.status).length;

  return (
    <div className="w-full min-h-screen bg-slate-50/50 font-inter">
      {/* --- НАВИГАЦИЯ (TOP BAR) --- */}
      <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-[100] shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex justify-between items-center">

          <div className="flex items-center gap-8">
            <h1 className="text-lg font-black text-slate-900 tracking-tight">
              RuAuto <span className="text-blue-600 font-medium">ADMIN</span>
            </h1>

            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'products' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                ТЕХНИКА
              </button>

              <button
                onClick={() => setActiveTab('slider')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'slider' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                СЛАЙДЕР
              </button>

              {/* YANGILIKLAR TUGMASI */}
              <button
                onClick={() => setActiveTab('news')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'news' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                НОВОСТИ
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'messages' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                ЗАЯВКИ
                {unreadCount > 0 && (
                  <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="hidden md:flex items-center gap-1.5 text-[10px] font-black text-slate-400 hover:text-blue-600 transition-all tracking-widest uppercase"
            >
              <ExternalLink size={14} /> Перейти на сайт
            </a>
            <div className="hidden md:block h-4 w-px bg-slate-200 mx-2"></div>
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              title="Выйти из системы"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- ОСНОВНОЙ КОНТЕНТ --- */}
      <main className="max-w-[1600px] mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'products' ? (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AdminProducts products={products} api={api} onUpdate={onUpdate} />
            </motion.div>
          ) : activeTab === 'slider' ? (
            <motion.div
              key="slider"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AdminSlider api={api} />
            </motion.div>
          ) : activeTab === 'news' ? (
            <motion.div
              key="news"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AdminNews api={api} />
            </motion.div>
          ) : (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AdminMessages messages={messages} api={api} onUpdate={fetchMessages} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* --- МОДАЛЬНОЕ ОКНО ВЫХОДА --- */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl p-8 shadow-2xl relative w-full max-w-sm text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase">Выйти из системы?</h3>
              <p className="text-slate-500 text-sm mb-8 font-medium">
                Вы уверены, что хотите завершить текущую сессию?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-slate-200 transition-all"
                >
                  Отмена
                </button>
                <button
                  onClick={onLogout}
                  className="py-3 bg-red-500 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-red-600 shadow-lg shadow-red-100 transition-all"
                >
                  Да, выйти
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}