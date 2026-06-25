import React, { useState } from 'react';
import { Plus, Trash2, Edit, X, Camera, Upload, Save, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Ixcham UI Komponentlar ---
const Input = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="space-y-1">
    <label className="text-[11px] font-bold text-slate-500  tracking-tight ml-1">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-4 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all" 
    />
  </div>
);

const Switch = ({ enabled, onChange, label }) => (
  <div className="flex items-center gap-3 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`${enabled ? 'bg-blue-600' : 'bg-slate-300'} relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200`}
    >
      <span className={`${enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200`} />
    </button>
    <span className="text-[12px] text-slate-600 font-bold ">{label}</span>
  </div>
);

export default function AdminProducts({ products, api, onUpdate }) {
  const [editingMode, setEditingMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  const initialForm = {
    name: '', category: '', brand: '', price: '', status: true, inStock: true, sequence: '0',
    image: '', banner: '', gallery: [], description: '',
    specifications: [{ id: Date.now(), key: '', val: '' }],
    axleSpecs: [], characteristicSpecs: [], equipment: []
  };

  const [formData, setFormData] = useState(initialForm);

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX = 1200;
          let w = img.width, h = img.height;
          if (w > h) { if (w > MAX) { h *= MAX / w; w = MAX; } }
          else { if (h > MAX) { w *= MAX / h; h = MAX; } }
          canvas.width = w; canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/webp', 0.8));
        };
      };
    });
  };

  const handleEdit = (prod) => {
    const preparedData = {
      ...initialForm,
      ...prod,
      inStock: prod.in_stock !== undefined ? prod.in_stock : (prod.inStock !== undefined ? prod.inStock : true),
      specifications: Array.isArray(prod.specifications) ? prod.specifications : [],
      axleSpecs: Array.isArray(prod.axle_specs || prod.axleSpecs) ? (prod.axle_specs || prod.axleSpecs) : [],
      characteristicSpecs: Array.isArray(prod.characteristic_specs || prod.characteristicSpecs) ? (prod.characteristic_specs || prod.characteristicSpecs) : [],
      equipment: Array.isArray(prod.equipment) ? prod.equipment : []
    };
    setFormData(preparedData);
    setEditingId(prod.id);
    setEditingMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) {
      alert("Заполните название, цену и добавьте фото!");
      return;
    }
    setIsLoading(true);
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, formData);
      } else {
        await api.post('/products', formData);
      }
      onUpdate();
      setEditingMode(false);
      setEditingId(null);
    } catch (error) {
      alert("Ошибка при сохранении!");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      await api.delete(`/products/${deleteModal.id}`);
      onUpdate();
      setDeleteModal({ show: false, id: null });
    } catch (error) {
      alert("Ошибка при удалении!");
    } finally {
      setIsLoading(false);
    }
  };

  if (editingMode) {
    return (
      <div className="w-full animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setEditingMode(false)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-all">
              <ArrowLeft size={20}/>
            </button>
            <h2 className="text-lg font-bold text-slate-800">{editingId ? 'Редактирование техники' : 'Новая техника'}</h2>
          </div>
          <button type="button" onClick={() => setEditingMode(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pb-28">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <div className="relative aspect-square bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center p-4">
                {formData.image ? <img src={formData.image} className="w-full h-full object-contain" alt="" /> : <Camera className="text-slate-300" size={40} />}
                <label className="absolute inset-0 bg-slate-900/60 opacity-0 hover:opacity-100 transition-all flex flex-col items-center justify-center cursor-pointer text-white text-[10px] font-bold  text-center">
                  <Upload size={24} className="mb-1 mx-auto" /> Загрузить фото
                  <input type="file" className="hidden" accept="image/*" onChange={async (e) => { if(e.target.files[0]) { const c = await compressImage(e.target.files[0]); setFormData(prev => ({...prev, image: c})); } }} />
                </label>
              </div>
            </div>

            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input label="Наименование" value={formData.name} onChange={v => setFormData(prev => ({...prev, name: v}))} />
              <Input label="Цена" value={formData.price} onChange={v => setFormData(prev => ({...prev, price: v}))} />
              <Input label="Категория" value={formData.category} onChange={v => setFormData(prev => ({...prev, category: v}))} />
              <Input label="Бренд" value={formData.brand} onChange={v => setFormData(prev => ({...prev, brand: v}))} />
              <Input label="Приоритет (№)" type="number" value={formData.sequence} onChange={v => setFormData(prev => ({...prev, sequence: v}))} />
              <div className="flex items-end gap-2 pb-1">
                <Switch enabled={formData.status} onChange={v => setFormData(prev => ({...prev, status: v}))} label="Активен" />
                <Switch enabled={formData.inStock} onChange={v => setFormData(prev => ({...prev, inStock: v}))} label="В наличии" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { id: 'specifications', title: 'Вес и Габариты', color: 'bg-indigo-500' },
              { id: 'axleSpecs', title: 'Оси и подвеска', color: 'bg-blue-500' },
              { id: 'characteristicSpecs', title: 'Тех. данные', color: 'bg-emerald-500' },
              { id: 'equipment', title: 'Комплектация', color: 'bg-orange-500' }
            ].map((sec) => (
              <div key={sec.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-[11px] font-bold text-slate-800 mb-4 flex items-center gap-2  tracking-wider">
                  <div className={`w-1.5 h-4 rounded-full ${sec.color}`}></div> {sec.title}
                </h3>
                <div className="space-y-3">
                  {(formData[sec.id] || []).map((spec) => (
                    <div key={spec.id} className="group relative bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <button type="button" onClick={() => setFormData(prev => ({...prev, [sec.id]: prev[sec.id].filter(s => s.id !== spec.id)}))} className="absolute -top-1.5 -right-1.5 bg-white text-red-500 p-1 rounded-full border border-slate-200 opacity-0 group-hover:opacity-100 transition-all shadow-sm"><X size={10}/></button>
                      <input className="w-full bg-transparent border-none p-0 text-[10px] font-bold text-slate-400 outline-none " value={spec.key} onChange={e => setFormData(prev => ({...prev, [sec.id]: prev[sec.id].map(s => s.id === spec.id ? {...s, key: e.target.value} : s)}))} placeholder="ПАРАМЕТР" />
                      <input className="w-full bg-transparent border-none p-0 text-xs font-bold text-slate-700 outline-none" value={spec.val} onChange={e => setFormData(prev => ({...prev, [sec.id]: prev[sec.id].map(s => s.id === spec.id ? {...s, val: e.target.value} : s)}))} placeholder="Значение" />
                    </div>
                  ))}
                  <button type="button" onClick={() => setFormData(prev => ({...prev, [sec.id]: [...(prev[sec.id] || []), { id: Date.now() + Math.random(), key: '', val: '' }]}))} className="w-full py-2 border border-dashed border-slate-200 rounded-lg text-slate-400 text-[10px] font-bold  hover:bg-slate-50 transition-all">+ Поле</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-6  tracking-widest">Галерея</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-4">
              {formData.gallery?.map((img, idx) => (
                <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-100">
                  <img src={img} className="w-full h-full object-cover" alt="" />
                  <button type="button" onClick={() => setFormData(prev => ({...prev, gallery: prev.gallery.filter((_, i) => i !== idx)}))} className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={20}/></button>
                </div>
              ))}
              <label className="aspect-square rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-50 hover:border-blue-300 transition-all">
                <Plus size={24} className="text-slate-300" />
                <input type="file" className="hidden" accept="image/*" onChange={async (e) => { if(e.target.files[0]) { const c = await compressImage(e.target.files[0]); setFormData(prev => ({...prev, gallery: [...(prev.gallery || []), c]})); } }} />
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <textarea className="w-full bg-slate-50 border border-slate-100 rounded-xl p-6 min-h-[250px] text-sm text-slate-600 leading-relaxed outline-none focus:bg-white focus:border-blue-500 transition-all" value={formData.description} onChange={e => setFormData(prev => ({...prev, description: e.target.value}))} placeholder="Описание техники..." />
          </div>

          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-10 py-5 rounded-2xl border border-slate-200 shadow-2xl z-50 flex items-center gap-8 min-w-[400px] justify-center">
            <button type="button" onClick={() => setEditingMode(false)} className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-all">Назад</button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-blue-600 text-white px-12 py-3 rounded-xl font-bold text-xs  tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {isLoading ? '...' : <><Save size={16}/> СОХРАНИТЬ</>}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <button onClick={() => { setEditingId(null); setFormData(initialForm); setEditingMode(true); }} className="aspect-[4/5] bg-white border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-blue-400 hover:bg-blue-50 transition-all group">
          <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all"><Plus size={20} /></div>
          <span className="text-[11px] font-bold text-slate-400  tracking-widest group-hover:text-blue-700 text-center px-4">Добавить технику</span>
        </button>

        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group">
            <div className="aspect-video bg-slate-50 flex items-center justify-center p-3 relative">
              <img src={product.image} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" alt="" />
              {!product.status && <div className="absolute top-2 left-2 bg-slate-800/80 text-white text-[8px] font-black px-2 py-0.5 rounded ">Черновик</div>}
            </div>
            <div className="p-3 flex-grow border-t border-slate-50">
              <h3 className="text-[12px] font-bold text-slate-800 line-clamp-2 h-8 leading-tight mb-1">{product.name}</h3>
              <p className="text-blue-600 font-black text-sm">{product.price}</p>
            </div>
            <div className="p-2 bg-slate-50/50 flex gap-1.5 border-t border-slate-100">
              <button type="button" onClick={() => handleEdit(product)} className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-center gap-1.5"><Edit size={12}/> ПРАВКА</button>
              <button type="button" onClick={() => setDeleteModal({ show: true, id: product.id })} className="px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-red-500 transition-all flex items-center justify-center"><Trash2 size={14}/></button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {deleteModal.show && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteModal({ show: false, id: null })} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl p-6 shadow-2xl relative w-full max-w-sm text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Удалить технику?</h3>
              <p className="text-slate-500 text-sm mb-8">Это действие нельзя будет отменить.</p>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setDeleteModal({ show: false, id: null })} className="py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs  hover:bg-slate-200 transition-all">Назад</button>
                <button 
                  type="button" 
                  onClick={confirmDelete} 
                  disabled={isLoading}
                  className="py-3 bg-red-500 text-white rounded-xl font-bold text-xs  hover:bg-red-600 shadow-lg shadow-red-100 transition-all disabled:opacity-50"
                >
                  {isLoading ? '...' : 'Да, удалить'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}