import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Loader2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import SEO from '../components/SEO.jsx';

export default function ContactsPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://ruatapi.uzautotrailer.uz/api/messages', formData);
      setSent(true);
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      alert("Ошибка при отправке. Пожалуйста, свяжитесь по телефону.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#fcfdfe] min-h-screen pb-16 pt-24 md:pt-36">
      <SEO
        title="Контакты | RuAuto Trailer"
        description="Свяжитесь с отделом продаж RuAuto Trailer. Наш завод находится в г. Вязники. Телефон: +7 (492) 442-70-07."
      />

      <div className="max-w-[1500px] mx-auto px-6 md:px-10">

        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 md:mb-16 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="h-[2px] w-6 md:w-12 bg-blue-600"></span>
            <span className="text-blue-600 font-black tracking-[0.2em] text-[10px] uppercase">
              Связь с заводом
            </span>
            <span className="h-[2px] w-6 md:w-12 bg-blue-600"></span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight uppercase">
            Наши <span className="text-blue-600">контакты</span>
          </h1>
          <p className="mt-4 text-slate-500 font-medium max-w-xl mx-auto text-sm md:text-base italic">
            Мы всегда готовы ответить на ваши вопросы и обсудить детали сотрудничества
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">

          {/* --- LEFT SIDE: INFO CARDS --- */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Phone Card */}
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5">
                <Phone size={20} />
              </div>
              <h3 className="text-[9px] font-black tracking-widest text-slate-400 mb-1 uppercase">Приёмная</h3>
              <a href="tel:+74924427007" className="text-xl md:text-2xl font-black text-slate-900 hover:text-blue-600 transition-colors tracking-tight">
                +7 (492) 442-70-07
              </a>
            </motion.div>

            {/* Email Card */}
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-11 h-11 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-5">
                <Mail size={20} />
              </div>
              <h3 className="text-[9px] font-black tracking-widest text-slate-400 mb-1 uppercase">Электронная почта</h3>
              <a href="mailto:info@ruautotrailer.ru" className="text-lg md:text-xl font-black text-slate-900 hover:text-blue-600 transition-colors tracking-tight break-all">
                info@ruautotrailer.ru
              </a>
            </motion.div>

            {/* Address Card */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-11 h-11 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-5">
                <MapPin size={20} />
              </div>
              <h3 className="text-[9px] font-black tracking-widest text-slate-400 mb-1 uppercase">Адрес завода</h3>
              <p className="text-sm font-bold text-slate-900 leading-relaxed tracking-tight">
                Владимирская область, г. Вязники, ул. Железнодорожная, д. 13
              </p>
            </div>

            {/* Working Hours */}
            <div className="bg-slate-900 p-6 md:p-8 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-blue-900/10 mt-auto">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase">Режим работы</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Пн - Пт</span>
                    <span className="text-xs font-black uppercase tracking-widest">9:00 - 18:00</span>
                  </div>
                </div>
              </div>
              <Clock className="absolute -right-4 -bottom-4 text-white/5" size={100} />
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTACT FORM --- */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
              <h2 className="text-2xl md:text-2xl font-black tracking-tight text-slate-900 mb-8 uppercase">
                Оставить <span className="text-blue-600">запрос</span>
              </h2>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center bg-emerald-50/40 rounded-3xl border border-emerald-100"
                  >
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-emerald-200">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Запрос принят!</h3>
                    <p className="text-slate-500 text-sm font-medium">Менеджер свяжется с вами в ближайшее время.</p>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Ваше имя</label>
                        <input
                          required
                          type="text"
                          placeholder="Имя"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Телефон</label>
                        <input
                          required
                          type="tel"
                          placeholder="+7 (___) ___"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Сообщение</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Опишите ваш вопрос..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all resize-none"
                      ></textarea>
                    </div>

                    <button
                      disabled={loading}
                      type="submit"
                      className="group w-full md:w-auto bg-blue-600 text-white px-10 py-4.5 rounded-xl font-black tracking-widest text-[11px] hover:bg-slate-900 transition-all duration-300 shadow-xl shadow-blue-500/10 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 uppercase"
                    >
                      {loading ? <Loader2 className="animate-spin" size={18} /> : (
                        <>
                          <span>Отправить запрос</span>
                          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* --- MAP --- */}
        <div className="mt-10 md:mt-16">
          <div className="bg-white p-1 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm h-[350px] md:h-[500px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2217.6588866484085!2d42.11796726850893!3d56.232129454557686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414e7f7b00000001%3A0x6ac8c7510adb593a!2z0J_QkNCeINCe0KHQktCQ0KA!5e0!3m2!1sru!2s!4v1782197012447!5m2!1sru!2s"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '1.4rem' }}
              allowFullScreen=""
              loading="lazy"
              title="RuAuto TRAILER Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}