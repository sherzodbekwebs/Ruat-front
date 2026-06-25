import { Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, ArrowUpRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 h-20 md:h-24 bg-white/70 backdrop-blur-md border-b border-slate-100 z-[100] flex items-center transition-all duration-300">
      <div className="max-w-[1500px] mx-auto w-full px-6 md:px-10 flex items-center justify-between">

        {/* --- LOGO VA NAVIGATSIYA --- */}
        <div className="flex items-center gap-10 lg:gap-14">
          <Link to="/" className="relative group flex items-center gap-3 active:scale-95 transition-transform">
            <div className="overflow-hidden rounded-xl shadow-sm border border-slate-100">
              <img
                src="/ruat_logo.png"
                alt="РУАВТО ТРЕЙЛЕР"
                className="h-9 md:h-11 w-auto object-contain"
              />
            </div>
            {/* Logo yonidagi vertikal chiziq va nom (ixtiyoriy, agar logo kichik bo'lsa) */}
            <div className="hidden sm:block h-8 w-px bg-slate-200 mx-2"></div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {[
              { name: 'Каталог', path: '/' },
              { name: 'Контакты', path: '/contacts' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 py-2 group ${
                  pathname === item.path ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.name}
                {/* Active Indicator (Nafis nuqta) */}
                {pathname === item.path && (
                  <motion.span 
                    layoutId="nav-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* --- O'NG TOMON: ALOQA VA CTA --- */}
        <div className="flex items-center gap-4 md:gap-8">

          {/* Manzil (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 pr-8 border-r border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-600 group hover:bg-blue-600 hover:text-white transition-all duration-300">
              <MapPin size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase">Завод в РФ</span>
              <span className="text-xs font-black text-slate-900 tracking-tight">г. Вязники</span>
            </div>
          </div>

          {/* Telefon va Status */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:flex flex-col justify-center">
              <a
                href="tel:+74924427007"
                className="text-lg font-black text-slate-900 hover:text-blue-600 transition-colors tracking-tighter leading-none"
              >
                +7 (492) 442-70-07
              </a>
              <div className="flex items-center justify-end gap-2 mt-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">
                  Отдел продаж
                </span>
              </div>
            </div>

            {/* Call Button (Interactive Icon) */}
            <a
              href="tel:+74924427007"
              className="w-11 h-11 md:w-12 md:h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-blue-500/30 group active:scale-90"
            >
              <Phone size={18} className="group-hover:rotate-12 transition-transform duration-300" />
            </a>
          </div>

          {/* CTA Button (Ixchamroq va professional) */}
          <Link
            to="/contacts"
            className="hidden md:flex items-center justify-center gap-2 bg-blue-600 text-white px-6 h-12 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-slate-900 hover:shadow-slate-900/20 transition-all duration-300"
          >
            Заказать
            <ArrowUpRight size={14} className="opacity-70" />
          </Link>

        </div>
      </div>
    </header>
  );
}