import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, X, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function AdminNews({ api }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // Faqat rus tili uchun state
  const [form, setForm] = useState({
    title_ru: '',
    content_ru: '',
    image: '',
    date: new Date().toISOString().split('T')[0]
  });

  const fetchNews = async () => {
    try {
      const res = await api.get('/news');
      setNews(res.data);
    } catch (err) {
      console.error("Новости yuklashda xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`/news/${currentId}`, form);
      } else {
        await api.post('/news', form);
      }
      fetchNews();
      closeModal();
    } catch (err) {
      alert("Xatolik yuz berdi");
    }
  };

  const handleEdit = (item) => {
    setForm({
      title_ru: item.title_ru,
      content_ru: item.content_ru,
      image: item.image,
      date: item.date ? item.date.split('T')[0] : ''
    });
    setCurrentId(item.id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить эту новость?")) return;
    try {
      await api.delete(`/news/${id}`);
      fetchNews();
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setCurrentId(null);
    setForm({ 
      title_ru: '', 
      content_ru: '', 
      image: '', 
      date: new Date().toISOString().split('T')[0] 
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Управление новостями</h2>
          <p className="text-slate-400 text-[9px] font-bold tracking-widest mt-1 uppercase">Публикации и события компании</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-100"
        >
          <Plus size={18} /> Добавить новость
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div key={item.id} className="group border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all">
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                {item.image && <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 bg-white text-slate-900 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Edit size={18}/></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 bg-white text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18}/></button>
                </div>
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{item.date ? item.date.split('T')[0] : ''}</span>
                <h3 className="font-bold text-slate-900 mt-2 line-clamp-2 uppercase text-sm leading-tight">{item.title_ru}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL WINDOW */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 md:p-12 relative shadow-2xl">
            <button onClick={closeModal} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors"><X size={24} /></button>
            <h2 className="text-2xl font-black mb-10 uppercase tracking-tight text-slate-900">
              {editMode ? 'Редактировать новость' : 'Создать новость'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Заголовок новости</label>
                <input 
                  required 
                  value={form.title_ru} 
                  onChange={e => setForm({...form, title_ru: e.target.value})} 
                  className="w-full bg-slate-50 border-transparent border-2 focus:border-blue-600 rounded-xl p-4 text-sm font-bold transition-all outline-none" 
                  placeholder="Введите название..." 
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Текст новости</label>
                <textarea 
                  required 
                  rows={8} 
                  value={form.content_ru} 
                  onChange={e => setForm({...form, content_ru: e.target.value})} 
                  className="w-full bg-slate-50 border-transparent border-2 focus:border-blue-600 rounded-xl p-4 text-sm font-bold transition-all outline-none resize-none" 
                  placeholder="О чем эта новость?" 
                />
              </div>

              {/* Date and Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Дата публикации</label>
                  <input 
                    type="date" 
                    required 
                    value={form.date} 
                    onChange={e => setForm({...form, date: e.target.value})} 
                    className="w-full bg-slate-50 border-transparent border-2 focus:border-blue-600 rounded-xl p-4 text-sm font-bold outline-none" 
                  />
                </div>
                <div className="relative group">
                  <input type="file" id="news-img" className="hidden" onChange={handleImageChange} accept="image/*" />
                  <label htmlFor="news-img" className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4.5 rounded-xl cursor-pointer transition-all font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600">
                    <ImageIcon size={18}/> {form.image ? 'Фото выбрано' : 'Загрузить обложку'}
                  </label>
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase hover:bg-slate-900 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-100 mt-4">
                <Save size={20}/> Сохранить изменения
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}