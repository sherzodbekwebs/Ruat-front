import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, Award, Zap, ShieldCheck, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query'; // useQueryClient qo'shildi
import SEO from '../components/SEO.jsx';

const API_URL = 'https://ruatapi.uzautotrailer.uz/api';

export default function HomePage({ products }) {
  const queryClient = useQueryClient(); // Prefetching uchun client

  // 1. Yangiliklar ro'yxatini fetch qilish
  const { data: news = [], isLoading: newsLoading } = useQuery({
    queryKey: ['news-home'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/news`);
      return res.data.slice(0, 3);
    },
    staleTime: 1000 * 60 * 15,
  });

  // 2. Prefetching Funksiyasi (Sichqoncha kelganda ishlaydi)
  const handlePrefetchNews = (id) => {
    queryClient.prefetchQuery({
      queryKey: ['news', String(id)], // Detail sahifasi bilan bir xil key bo'lishi shart
      queryFn: async () => {
        const res = await axios.get(`${API_URL}/news/${id}`);
        return res.data;
      },
      staleTime: 1000 * 60 * 20, // 20 daqiqa davomida yangi deb hisoblanadi
    });
  };

  const sortedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...products].sort((a, b) => (Number(a.sequence) || 0) - (Number(b.sequence) || 0));
  }, [products]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = useMemo(() => {
    return sortedProducts.length > 0 ? sortedProducts.slice(0, 5) : [];
  }, [sortedProducts]);

  useEffect(() => {
    if (heroImages.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [heroImages.length]);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-600 selection:text-white">
      <SEO
        title="RuAuto TRAILER | РУАВТО ТРЕЙЛЕР | РУ АВТО ТРЕЙЛЕР"
        description="RuAuto Trailer (РУАВТО ТРЕЙЛЕР) — официальный производитель полуприцепной техники Vollkraft в России. РУ АВТО ТРЕЙЛЕР предлагает широкий ассортимент шторных и бортовых полуприцепов."
        keywords="ruauto trailer,руавто трейлер, ру авто трейлер, полуприцепы воллкрафт, vollkraft trailer"
      />
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-fit lg:min-h-[90vh] flex items-center pt-24 lg:pt-32 pb-10 lg:pb-0 overflow-hidden bg-[#fcfdfe]">
        <div className="absolute top-0 right-0 w-full lg:w-[45%] h-full bg-slate-100/50 lg:skew-x-[-12deg] lg:translate-x-24 -z-10 border-l border-slate-200/50" />

        <div className="max-w-[1500px] mx-auto w-full px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
            <div className="relative w-full h-[220px] sm:h-[350px] lg:h-[550px] flex items-center justify-center order-1 lg:order-2">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.04] text-[20vw] lg:text-[15vw] font-black text-slate-900 z-0 uppercase">
                RuAuto
              </div>

              <AnimatePresence mode="wait">
                {heroImages.length > 0 ? (
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -10 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <img
                      src={heroImages[currentSlide]?.image}
                      alt={heroImages[currentSlide]?.name}
                      className="max-w-full max-h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)] relative z-10"
                    />
                  </motion.div>
                ) : (
                  <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1"
            >
              <h1 className="text-[28px] sm:text-4xl md:text-6xl font-black leading-[1.1] lg:leading-[0.95] tracking-tighter text-slate-900 mb-4">
                НАДЕЖНАЯ ПРИЦЕПНАЯ <br className="hidden lg:block" />
                <span className="text-[22px] sm:text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                  ТЕХНИКА ДЛЯ БИЗНЕСА
                </span>
              </h1>
              <p className="text-slate-500 text-sm md:text-lg max-w-lg mx-auto lg:mx-0 mb-6 leading-relaxed font-medium">
                Широкий ассортимент полуприцепов: от шторных до низкорамных тралов. Прямые поставки и заводская гарантия.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a href="#products" className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-[11px] tracking-widest uppercase flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg">
                  Смотреть каталог <ArrowRight size={16} />
                </a>
                <div className="flex gap-2">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section className="py-12 lg:py-20 bg-white border-y border-slate-100">
        <div className="max-w-[1500px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {[
            { icon: ShieldCheck, title: "Заводская гарантия", desc: "Полное сопровождение и гарантия до 3-х лет" },
            { icon: Award, title: "Лизинг и кредит", desc: "Выгодные программы от ведущих банков" },
            { icon: Zap, title: "Сервисная сеть", desc: "Обслуживание техники в любой точке РФ" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-5 group">
              <div className="w-12 h-12 bg-slate-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <item.icon size={24} />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm mb-1 uppercase tracking-tight">{item.title}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CATALOG --- */}
      <section id="products" className="py-12 lg:py-20 max-w-[1500px] mx-auto px-6">
        <div className="mb-10 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">В наличии</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 ">
            Каталог <span className="text-blue-600">техники</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden"
            >
              <Link to={`/product/${product.slug}`} className="relative aspect-[4/3] p-6 bg-slate-50/50 flex items-center justify-center">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
              </Link>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-sm md:text-base font-black text-slate-900 mb-4 uppercase line-clamp-2">{product.name}</h3>
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">Цена</p>
                    <p className="text-lg font-black text-slate-900">{product.price}</p>
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">Детали →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CONSULTATION --- */}
      <section className="py-12 px-6">
        <div className="max-w-[1500px] mx-auto bg-white rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-center border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-16 translate-x-16 blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-50 rounded-full translate-y-16 -translate-x-16 blur-3xl opacity-50" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full mb-6 border border-blue-100">
              <MessageSquare size={14} className="text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-700">Консультация</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black mb-6 uppercase leading-tight text-slate-900 tracking-tighter">
              Нужна помощь <br className="hidden md:block" />
              <span className="text-blue-600">в выборе техники?</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/contacts" className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
                Связаться с нами
              </Link>
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-slate-900 font-black text-[10px] uppercase leading-none mb-1">Ответ за 15 минут</p>
                  <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest leading-none">Бесплатная помощь</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEWS SECTION --- */}
      <section className="py-16 lg:py-24 bg-slate-50/50" id="news-section">
        <div className="max-w-[1500px] mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900  ">
              Новости <span className="text-blue-600">компании</span>
            </h2>
          </div>

          {newsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((item) => (
                <div key={item.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  {/* Rasm qismi (onMouseEnter qo'shildi) */}
                  <Link
                    to={`/news/${item.id}`}
                    onMouseEnter={() => handlePrefetchNews(item.id)} // Prefetch boshlandi
                    className="block aspect-video overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.title_ru}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-black text-slate-900  mb-3 line-clamp-2 text-sm md:text-base leading-tight group-hover:text-blue-600 transition-colors">
                      {item.title_ru}
                    </h3>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                      {item.content_ru}
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-50">
                      {/* Tugmaga ham onMouseEnter qo'shildi */}
                      <Link
                        to={`/news/${item.id}`}
                        onMouseEnter={() => handlePrefetchNews(item.id)} // Prefetch boshlandi
                        className="text-blue-600 text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 hover:gap-3 transition-all"
                      >
                        Читать далее <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}