import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sahifa o'zgarganda menyuni yopish
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Menyuda ochiqligida skrollni to'xtatish
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Каталог', path: '/' },
    // { name: 'Руководитель', path: '/leadership' },
    { name: 'Контакты', path: '/contacts' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-20 md:h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 z-[100] flex items-center transition-all duration-300">
      <div className="max-w-[1500px] mx-auto w-full px-4 md:px-10 flex items-center justify-between">

        {/* --- LOGO --- */}
        <div className="flex items-center gap-4 lg:gap-14">
          <Link to="/" className="relative group flex items-center gap-3 active:scale-95 transition-transform">
              <img
                src="/ruat_logo.png"
                alt="РУАВТО ТРЕЙЛЕР"
                className="h-11 md:h-11 w-auto object-contain"
              />
            <div className="hidden sm:block h-8 w-px bg-slate-200 mx-1"></div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 py-2 ${pathname === item.path ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {item.name}
                {pathname === item.path && (
                  <motion.span layoutId="nav-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* --- O'NG TOMON --- */}
        <div className="flex items-center gap-2 md:gap-8">

          {/* Manzil (Faqat Desktop) */}
          <div className="hidden xl:flex items-center gap-3 pr-8 border-r border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-600">
              <MapPin size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase leading-tight">Завод в РФ</span>
              <span className="text-xs font-black text-slate-900 tracking-tight">г. Вязники</span>
            </div>
          </div>

          {/* Telefon va Qo'ng'iroq (Hamma uchun) */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="text-right hidden sm:flex flex-col justify-center mr-1">
              <a href="tel:+74924427007" className="text-sm md:text-lg font-black text-slate-900 hover:text-blue-600 transition-colors leading-none">
                +7 (492) 442-70-07
              </a>
              <div className="flex items-center justify-end gap-1.5 mt-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[8px] font-bold text-slate-500 tracking-widest uppercase">Приёмная</span>
              </div>
            </div>
          </div>

          {/* CTA Button (Tablet va Desktop) */}
          <Link
            to="/contacts"
            className="hidden md:flex items-center justify-center gap-2 bg-blue-600 text-white px-5 h-12 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-slate-900 transition-all"
          >
            Заказать
            <ArrowUpRight size={14} className="opacity-70" />
          </Link>

          {/* MOBILE MENU TOGGLE (Faqat Mobil) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-900 active:scale-90 transition-all border border-slate-100"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE OVERLAY MENU --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-0 right-0 bg-white border-b border-slate-100 shadow-2xl p-6 lg:hidden flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-lg font-black uppercase tracking-widest ${pathname === item.path ? 'text-blue-600' : 'text-slate-900'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="h-px w-full bg-slate-100"></div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-600">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase">Завод в РФ</p>
                  <p className="text-sm font-black text-slate-900 uppercase">г. Вязники</p>
                </div>
              </div>

              <Link
                to="/contacts"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest"
              >
                Оставить заявку
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}