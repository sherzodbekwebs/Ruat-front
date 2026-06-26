import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Award, ShieldCheck, Users } from 'lucide-react';

const LeadershipPage = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-[1500px] mx-auto px-4 md:px-10">
        
        {/* Sarlavha qismi */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 mb-4">
            Руководство <span className="text-blue-600">компании</span>
          </h1>
          <div className="w-20 h-1.5 bg-blue-600"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Rasm qismi */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100 shadow-2xl relative z-10">
              <img 
                src="/director.jpg" // Shu yerga rahbar rasmini yuklang
                alt="Руководитель" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            {/* Bezak elementlari */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -z-0"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -z-0"></div>
          </motion.div>

          {/* Ma'lumot qismi */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Иванов Иван Иванович</h2>
              <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">Генеральный директор RUAUTO TRAILER</p>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed italic">
                "Мы не просто производим прицепы, мы создаем надежные решения для вашего бизнеса. 
                Наш приоритет — это качество, проверенное временем, и доверие каждого клиента. 
                Каждый выпускаемый нами трейлер — это результат многолетнего опыта и инженерной точности."
              </p>
            </div>

            {/* Yutuqlar/Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900 leading-none">15+</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Лет опыта</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900 leading-none">100%</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Гарантия качества</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900 leading-none">5000+</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Клиентов</p>
                </div>
              </div>
            </div>

            {/* Aloqa */}
            <div className="flex flex-wrap gap-4">
              <a href="mailto:info@ruauto.ru" className="flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all">
                <Mail size={18} />
                Связаться напрямую
              </a>
              <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl font-bold text-slate-900">
                <Phone size={18} className="text-blue-600" />
                +7 (492) 442-70-07
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LeadershipPage;