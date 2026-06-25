import { useState, useEffect } from 'react';
import { Plus, Trash2, X, Camera, Upload, Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminSlider({ api }) {
  const [slides, setSlides] = useState([]);
  const [editingMode, setEditingMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  const initialForm = { image: '', title: '', subtitle: '', sequence: '0' };
  const [formData, setFormData] = useState(initialForm);

  const fetchSlides = async () => {
    try {
      const res = await api.get('/slider');
      setSlides(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchSlides(); }, []);

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX = 1920; // Slayder uchun kattaroq sifat
          let w = img.width, h = img.height;
          if (w > MAX) { h *= MAX / w; w = MAX; }
          canvas.width = w; canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/webp', 0.8));
        };
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return alert("Загрузите изображение!");
    setIsLoading(true);
    try {
      await api.post('/slider', formData);
      fetchSlides();
      setEditingMode(false);
      setFormData(initialForm);
    } catch (err) { alert("Ошибка!"); } finally { setIsLoading(false); }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/slider/${deleteModal.id}`);
      fetchSlides();
      setDeleteModal({ show: false, id: null });
    } catch (err) { alert("Ошибка!"); }
  };

  if (editingMode) {
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-4">
            <button onClick={() => setEditingMode(false)} className="p-2 hover:bg-slate-100 rounded-lg"><ArrowLeft size={20}/></button>
            <h2 className="text-lg font-bold text-slate-800">Добавить новый слайд</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
               <div className="relative aspect-[16/9] bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center p-2">
                  {formData.image ? <img src={formData.image} className="w-full h-full object-cover rounded-lg" alt="" /> : <ImageIcon className="text-slate-300" size={48} />}
                  <label className="absolute inset-0 bg-slate-900/60 opacity-0 hover:opacity-100 transition-all flex flex-col items-center justify-center cursor-pointer text-white">
                    <Upload size={24} className="mb-2" />
                    <span className="text-[10px] font-bold ">Загрузить rasm</span>
                    <input type="file" className="hidden" accept="image/*" onChange={async (e) => { if(e.target.files[0]) { const c = await compressImage(e.target.files[0]); setFormData({...formData, image: c}); } }} />
                  </label>
               </div>
               <p className="text-[10px] text-slate-400 font-bold text-center  tracking-widest">Рекомендуется: 1920x1080px</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-500  ml-1">Заголовок (Title)</label>
                <input className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm font-bold outline-none focus:bg-white focus:border-blue-500 transition-all" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Напр: МОЩЬ В КАЖДОМ РЕЙСЕ" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500  ml-1">Подзаголовок (Subtitle)</label>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm font-medium outline-none focus:bg-white focus:border-blue-500 transition-all h-24" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} placeholder="Краткое описание для слайда..." />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500  ml-1">Приоритет (Порядок)</label>
                <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm font-bold outline-none focus:bg-white focus:border-blue-500 transition-all" value={formData.sequence} onChange={e => setFormData({...formData, sequence: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={() => setEditingMode(false)} className="px-6 py-2.5 text-sm font-bold text-slate-500">Отмена</button>
            <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-10 py-2.5 rounded-lg font-bold text-xs  tracking-widest shadow-lg shadow-blue-100 flex items-center gap-2">
              <Save size={16}/> {isLoading ? '...' : 'Сохранить слайд'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button onClick={() => setEditingMode(true)} className="aspect-[16/10] bg-white border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-blue-400 hover:bg-blue-50 transition-all group">
            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all"><Plus size={20} /></div>
            <span className="text-[11px] font-bold text-slate-400  tracking-widest">Добавить слайд</span>
        </button>

        {slides.map(slide => (
          <div key={slide.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="aspect-[16/9] bg-slate-100 relative">
              <img src={slide.image} className="w-full h-full object-cover" alt="" />
              <button onClick={() => setDeleteModal({ show: true, id: slide.id })} className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur text-red-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm">
                <Trash2 size={16}/>
              </button>
              <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">Порядок: {slide.sequence}</div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-slate-800 truncate">{slide.title || 'Без заголовка'}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">{slide.subtitle || 'Нет описания'}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- DELETE MODAL --- */}
      <AnimatePresence>
        {deleteModal.show && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteModal({ show: false, id: null })} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl p-6 shadow-2xl relative w-full max-w-sm text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 size={32} /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Удалить слайд?</h3>
              <p className="text-slate-500 text-sm mb-8">Это изображение больше не будет отображаться на главной странице.</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setDeleteModal({ show: false, id: null })} className="py-2.5 bg-slate-100 text-slate-600 rounded-lg font-bold text-xs ">Назад</button>
                <button onClick={confirmDelete} className="py-2.5 bg-red-500 text-white rounded-lg font-bold text-xs  shadow-lg shadow-red-100">Удалить</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}