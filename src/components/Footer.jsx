import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-slate-900 pt-20 pb-10 px-6 md:px-12 border-t border-slate-100">
      <div className="max-w-[1600px] mx-auto">

        {/* --- ASOSIY GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">

          {/* 1. Brend va Tavsif */}
          <div className="space-y-6">
            <Link to="/" className="inline-block transition-transform active:scale-95">
              <img src="/ruat_logo.png" alt="РуАуто ТРЕЙЛЕР" className="h-10 md:h-12" style={{ borderRadius: '8px' }} />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium">
              Ведущий поставщик высококачественной прицепной техники в России. Официальный дилер с гарантией качества.
            </p>
            <div className="flex gap-3">
              {/* Ijtimoiy tarmoqlar */}
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Send size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* 2. Navigatsiya */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">Навигация</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-bold flex items-center gap-2 group">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"></div>
                  Каталог техники
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-bold flex items-center gap-2 group">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"></div>
                  Контакты
                </Link>
              </li>
              <li>
                <a href="#products" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-bold flex items-center gap-2 group">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"></div>
                  Популярные модели
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Kontaktlar */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">Связь</h4>
            <div className="space-y-5">
              <a href="tel:+74924427007" className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm border border-blue-100/50">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-widest leading-none mb-1">Приёмная</span>
                  <span className="text-base font-black tracking-tight text-slate-900">+7 (492) 442-70-07</span>
                </div>
              </a>
              <a href="mailto:ruautotrailer@bk.ru" className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border border-slate-100">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-widest leading-none mb-1">Электронная почта</span>
                  <span className="text-base font-black tracking-tight text-slate-900">info@ruautotrailer.ru</span>
                </div>
              </a>
            </div>
          </div>

          {/* 4. Manzil */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">Локация</h4>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                <MapPin size={18} />
              </div>
              <p className="text-sm text-slate-600 font-bold leading-relaxed tracking-tight">
                Владимирская обл., <br />
                г. Вязники, ул. Железнодорожная, <br />
                д. 13
              </p>
            </div>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <p>© 2026 РуАуто ТРЕЙЛЕР</p>
            <span className="hidden md:block w-1 h-1 bg-slate-200 rounded-full"></span>
            <p>Все права защищены</p>
          </div>

          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
              Условия использования
            </a>
          </div>

          <div className="text-slate-300 font-black text-[10px] uppercase tracking-[0.2em] select-none">
            Premium Trailers Russia
          </div>
        </div>
      </div>
    </footer>
  );
}