import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, Award, Zap, ShieldCheck, ChevronRight, MessageSquare, Calendar, Eye } from 'lucide-react';
import axios from 'axios'; // axios qo'shildi
import SEO from '../components/SEO.jsx';

const API_URL = 'https://ruatapi.uzautotrailer.uz/api';

export default function HomePage({ products, lang }) { // lang prop qo'shildi
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

  // --- YANGILIKLARNI YUKLASH ---
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${API_URL}/news`);
        setNews(res.data.slice(0, 3)); // Faqat oxirgi 3 ta yangilikni ko'rsatamiz
      } catch (err) {
        console.error("Yangiliklarni yuklashda xato:", err);
      } finally {
        setNewsLoading(false);
      }
    };
    fetchNews();
  }, []);

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
      {/* FAQAT SHU YERGA SEO MA'LUMOTLARI QO'SHILDI */}
      <SEO
        title="RuAuto TRAILER | Продажа полуприцепов в России"
        description="RuAuto TRAILER - официальный производитель полуприцепной техники Vollkraft. Широкий ассортимент шторных полуприцепов, контейнеровозов и спецтехники в наличии."
        keywords="полуприцепы, Vollkraft, RuAuto TRAILER, шторный полуприцеп, купить прицеп, контейнеровоз, спецтехника Россия"
      />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center pt-24 overflow-hidden bg-[#fcfdfe]">

        {/* Fon bezagi */}
        <div className="absolute top-0 right-0 w-[45%] h-full bg-slate-100/50 skew-x-[-12deg] translate-x-24 -z-10 border-l border-slate-200/50" />
        <div className="absolute top-1/2 left-10 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] text-[18vw] font-black text-slate-900 leading-none -z-10">
          TRAILER
        </div>

        <div className="max-w-[1500px] mx-auto w-full px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* STATIC TEXT CONTENT (O'zgarmas qism) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >

              <h1 className="text-4xl md:text-6xl font-black leading-[0.95] tracking-tighter text-slate-900 mb-8 ">
                НАДЕЖНАЯ   ПРИЦЕПНАЯ <br />
                <span className="text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                  ТЕХНИКА ДЛЯ БИЗНЕСА
                </span>
              </h1>

              <p className="text-slate-500 text-base md:text-lg max-w-lg mb-10 leading-relaxed font-medium">
                Широкий ассортимент полуприцепов: от шторных до низкорамных тралов. Прямые поставки, заводская гарантия и полный сервис по всей России.
              </p>

              <div className="flex items-center gap-8">
                <a href="#products" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest hover:bg-blue-600 transition-all shadow-xl hover:-translate-y-1 active:scale-95 uppercase flex items-center gap-3 group">
                  Смотреть каталог
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </a>

                {/* Slayder indikatorlari */}
                <div className="flex gap-2">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1 rounded-full transition-all duration-500 ${currentSlide === idx ? 'w-10 bg-blue-600' : 'w-3 bg-slate-300'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* SLIDING IMAGES (Faqat rasm almashadi) */}
            <div className="relative h-[400px] md:h-[550px] flex items-center justify-center">
              {/* Orqa fondagi "TRAILER" yozuvi o'zgarmas turishi kerak */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] text-[15vw] font-black text-slate-900 z-0">
                RUAUTO
              </div>

              {/* mode="wait" OIB TASHLANDI - bu silliq o'tishni ta'minlaydi */}
              <AnimatePresence>
                {heroImages.length > 0 ? (
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }} // O'ngdan kirib keladi
                    animate={{ opacity: 1, x: 0 }}   // Markazga keladi
                    exit={{ opacity: 0, x: -100 }}   // Chapga chiqib ketadi
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    // 🚀 MUHIM: Rasmlar ustma-ust tushishi uchun absolute ishlatamiz
                    className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
                  >
                    <img
                      src={heroImages[currentSlide]?.image}
                      alt={heroImages[currentSlide]?.name}
                      className="w-full h-full object-contain drop-shadow-[0_40px_70px_rgba(0,0,0,0.1)] relative z-10"
                    />

                    {/* Model Badge ham har bir rasm bilan birga chiqadi */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute bottom-10 right-0 bg-white/80 backdrop-blur-md border border-slate-100 p-5 rounded-[1.5rem] shadow-xl hidden md:block"
                    >
                      <span className="text-[10px] font-black text-slate-400 block mb-1 uppercase tracking-widest">Модель</span>
                      <span className="text-slate-900 font-black text-sm uppercase">{heroImages[currentSlide]?.name}</span>
                    </motion.div>
                  </motion.div>
                ) : (
                  <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-[1500px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: ShieldCheck, title: "Заводская гарантия", desc: "Полное сопровождение и гарантия до 3-х лет" },
            { icon: Award, title: "Лизинг и кредит", desc: "Выгодные программы от ведущих банков" },
            { icon: Zap, title: "Сервисная сеть", desc: "Обслуживание техники в любой точке РФ" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-slate-50 text-blue-600 rounded-2xl flex items-center justify-center transition-all group-hover:bg-blue-600 group-hover:text-white shrink-0">
                <item.icon size={26} />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-base mb-1 uppercase tracking-tight">{item.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CATALOG --- */}
      <section id="products" className="py-20 max-w-[1500px] mx-auto px-6">
        {/* Sarlavha bloki - Border-b olib tashlandi yoki noziklashtirildi */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 pb-8 border-b border-slate-100/60">
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">В наличии на складе</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none uppercase">
              Каталог <span className="text-blue-600">техники</span>
            </h2>
          </div>

        </div>

        {/* Kartalar setkasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7">
          {sortedProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              /* Radius rounded-3xl (24px) qilib qisqartirildi */
              className="group bg-white rounded-2xl border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full relative overflow-hidden"
            >
              {/* Rasm qismi - Radius rasmga moslab kichraytirildi */}
              <Link to={`/product/${product.slug}`} className="relative aspect-[4/3] p-8 overflow-hidden bg-slate-50/50 rounded-t-3xl flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
                  <div className="bg-blue-600 text-white p-2 rounded-lg shadow-lg">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>

              {/* Ma'lumot qismi */}
              <div className="p-7 flex flex-col flex-grow">
                <div className="mb-6 flex-grow">
                  <h3 className="text-base md:text-lg font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    Гарантия завода
                  </div>
                </div>

                <div className="mt-auto pt-5 border-t border-slate-50 flex items-end justify-between">
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Стоимость</p>
                    <p className="text-xl font-black text-slate-900 tracking-tight">
                      {product.price}
                    </p>
                  </div>
                  <Link
                    to={`/product/${product.slug}`}
                    className="text-[9px] font-black text-blue-600 hover:text-slate-900 uppercase tracking-widest flex items-center gap-1 transition-colors"
                  >
                    Детали
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-8 px-6"> {/* py-12 dan py-8 ga tushirildi */}
        <div className="max-w-[1500px] mx-auto bg-white rounded-[2rem] p-6 md:py-10 md:px-12 relative overflow-hidden text-center border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.03)]">
          {/* Balandlikni kamaytirish uchun p-8 md:p-16 dan p-6 md:py-10 ga tushirildi */}

          {/* Dekorativ orqa fon elementlari (Yana ham nozikroq va kichikroq) */}
          <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-blue-50/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/4 h-full bg-gradient-to-r from-blue-50/20 to-transparent pointer-events-none" />

          <div className="relative z-10">
            {/* Badge (mb-6 dan mb-4 ga kamaytirildi) */}
            <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full mb-4 border border-blue-100/50">
              <MessageSquare size={12} className="text-blue-600" />
              <span className="text-[8px] font-black text-blue-700 uppercase tracking-widest">Консультация</span>
            </div>

            {/* Sarlavha (text-5xl dan text-4xl ga, mb-8 dan mb-6 ga tushirildi) */}
            <h2 className="text-xl md:text-4xl font-black text-slate-900 mb-6 tracking-tighter leading-tight uppercase max-w-2xl mx-auto">
              Нужна помощь <br />
              <span className="text-blue-600 font-black">в выборе техники?</span>
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-5">
              {/* Tugma (px-10 py-4.5 dan px-8 py-3.5 ga kichraytirildi) */}
              <Link
                to="/contacts"
                className="group relative inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-3.5 rounded-xl font-black text-[10px] tracking-widest hover:bg-blue-600 transition-all duration-300 shadow-lg active:scale-95 uppercase"
              >
                Связаться с нами
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Info qismi (pl-6 dan pl-5 ga, gap-3 dan gap-2 ga) */}
              <div className="hidden md:flex items-center gap-2 text-left border-l border-slate-200 pl-5">
                <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <p className="text-slate-900 font-black text-[9px] uppercase tracking-wider">Бесплатно</p>
                  <p className="text-slate-400 text-[8px] font-bold uppercase tracking-widest leading-none">Ответ за 15 минут</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-24 bg-slate-50/50" id="news-section">
        <div className="max-w-[1500px] mx-auto px-6">

          {/* Sarlavha bloki */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Бортовой журнал</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none uppercase">
                Новости <span className="text-blue-600">компании</span>
              </h2>
            </div>

          </div>

          {newsLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500"
                >
                  {/* Rasm qismi */}
                  <Link to={`/news/${item.id}`} className="block aspect-[16/10] overflow-hidden relative bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title_ru}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-100 flex items-center gap-2 shadow-sm">
                      <Calendar size={12} className="text-blue-600" />
                      <span className="text-[9px] font-black text-slate-900 uppercase tracking-tight">
                        {new Date(item.date).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </Link>

                  {/* Matn qismi */}
                  <div className="p-8">
                    <h3 className="text-lg font-black text-slate-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors uppercase line-clamp-2">
                      {item.title_ru}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                      {item.content_ru}
                    </p>

                    {/* Pastki qism: Ko'rishlar va link */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Eye size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          {item.views || 0} просмотров
                        </span>
                      </div>
                      <Link to={`/news/${item.id}`} className="text-[10px] font-black text-blue-600 uppercase tracking-[0.15em] flex items-center gap-1.5 hover:gap-3 transition-all">
                        Читать <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}