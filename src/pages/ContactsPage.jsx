import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

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
    <div className="w-full bg-[#fcfdfe] min-h-screen pb-20 pt-28 md:pt-40">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* --- HEADER QISMI (MARKAZLASHTIRILGAN) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[2px] w-8 md:w-12 bg-blue-600"></span>
            <span className="text-blue-600 font-black tracking-[0.3em] text-[10px] md:text-xs ">
              Связаться с нами
            </span>
            <span className="h-[2px] w-8 md:w-12 bg-blue-600"></span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.9]">
            Наши <span className="text-blue-600">контакты</span>
          </h1>
          <p className="mt-6 text-slate-500 font-medium max-w-xl mx-auto text-sm md:text-base italic">
            Мы всегда готовы ответить на ваши вопросы и обсудить детали сотрудничества
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

          {/* --- CONTACT INFO CARDS (Left Side) --- */}
          <div className="lg:col-span-4 space-y-4">
            {/* Phone Card */}
            <motion.div whileHover={{ x: 5 }} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Phone size={22} />
              </div>
              <h3 className="text-[10px] font-black tracking-widest text-slate-400 mb-2 ">Отдел продаж</h3>
              <a href="tel:+74924427007" className="text-xl md:text-2xl font-black text-slate-900 hover:text-blue-600 transition-colors tracking-tight">
                +7 (492) 442-70-07
              </a>
              <p className="text-[11px] text-slate-500 mt-2 font-bold opacity-70">Бесплатно по всей России</p>
            </motion.div>

            {/* Email Card */}
            <motion.div whileHover={{ x: 5 }} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Mail size={22} />
              </div>
              <h3 className="text-[10px] font-black tracking-widest text-slate-400 mb-2 ">Электронная почта</h3>
              <a href="mailto:info@ruautotrailer.ru" className="text-xl font-black text-slate-900 hover:text-blue-600 transition-colors tracking-tight">
                info@ruautotrailer.ru
              </a>
            </motion.div>

            {/* Address Card */}
            <motion.div whileHover={{ x: 5 }} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all">
                <MapPin size={22} />
              </div>
              <h3 className="text-[10px] font-black tracking-widest text-slate-400 mb-2 ">Адрес завода</h3>
              <p className="text-sm font-bold text-slate-900 leading-relaxed tracking-tight">
                601446, Владимирская область, г. Вязники, ул. Железнодорожная, д. 13
              </p>
            </motion.div>

            {/* Working Hours */}
            <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden group shadow-2xl shadow-blue-900/20">
               <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 ">Режим работы</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold border-b border-white/10 pb-3">
                    <span className="text-slate-400">Пн - Пт</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold pt-1">
                    <span className="text-slate-400">Суббота</span>
                    <span>10:00 - 15:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- CONTACT FORM (Right Side) --- */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-10">
                Оставить <span className="text-blue-600">запрос</span>
              </h2>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center bg-emerald-50/30 rounded-3xl border border-emerald-100"
                  >
                    <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-xl shadow-emerald-200 rotate-12">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Спасибо!</h3>
                    <p className="text-slate-500 text-sm font-medium">Менеджер свяжется с вами в ближайшее время.</p>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400  tracking-widest ml-1">Ваше имя</label>
                        <input
                          required
                          type="text"
                          placeholder="Иван Иванов"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400  tracking-widest ml-1">Телефон</label>
                        <input
                          required
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400  tracking-widest ml-1">Ваш вопрос</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Опишите, что вас интересует..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-6 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600 transition-all resize-none"
                      ></textarea>
                    </div>
                    <button
                      disabled={loading}
                      type="submit"
                      className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black tracking-[0.2em] text-[11px] hover:bg-blue-600 transition-all duration-500 flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-50 group"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                      ОТПРАВИТЬ ЗАПРОС
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* --- MAP SECTION --- */}
        <div className="mt-16">
          <div className="bg-white p-3 rounded-[2.5rem] border border-slate-100 shadow-sm h-[500px] relative overflow-hidden">
             <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2217.6588866484085!2d42.11796726850893!3d56.232129454557686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414e7f7b00000001%3A0x6ac8c7510adb593a!2z0J_QkNCeINCe0KHQktCQ0KA!5e0!3m2!1sru!2s!4v1782197012447!5m2!1sru!2s"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '1.5rem' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}