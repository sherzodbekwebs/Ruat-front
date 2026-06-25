import { useState } from 'react';
import { Mail, Phone, MessageSquare, Clock, CheckCircle, Circle, Trash2, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminMessages({ messages, api, onUpdate }) {
  const [modal, setModal] = useState({
    show: false,
    type: '', // 'delete' yoki 'status'
    id: null,
    status: false,
    loading: false
  });

  // Modalni ochish funksiyasi
  const openModal = (type, id, currentStatus = false) => {
    setModal({
      show: true,
      type,
      id,
      status: currentStatus,
      loading: false
    });
  };

  // Modalni yopish
  const closeModal = () => {
    setModal({ ...modal, show: false });
  };

  // Harakatni tasdiqlash (Delete yoki Status update)
  const handleConfirm = async () => {
    setModal({ ...modal, loading: true });
    try {
      if (modal.type === 'status') {
        await api.put(`/messages/${modal.id}/status`, { status: !modal.status });
      } else if (modal.type === 'delete') {
        await api.delete(`/messages/${modal.id}`);
      }
      onUpdate();
      closeModal();
    } catch (err) {
      alert("Произошла ошибка при выполнении операции");
      setModal({ ...modal, loading: false });
    }
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Xabarlar ro'yxati */}
      {messages.map(msg => (
        <div 
          key={msg.id} 
          className={`bg-white p-5 rounded-xl border transition-all flex flex-col md:flex-row justify-between items-center gap-4 ${msg.status ? 'border-slate-100 opacity-70' : 'border-blue-100 shadow-sm shadow-blue-50 bg-white'}`}
        >
          <div className="flex gap-4 items-center flex-1 w-full">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${msg.status ? 'bg-slate-100 text-slate-400' : 'bg-blue-50 text-blue-600'}`}>
              <MessageSquare size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-slate-900 truncate">{msg.name}</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-0.5">
                <a href={`tel:${msg.phone}`} className="text-blue-600 font-semibold text-xs flex items-center gap-1 hover:underline">
                  <Phone size={12}/> {msg.phone}
                </a>
                <span className="text-slate-400 text-xs flex items-center gap-1">
                  <Clock size={12}/> {new Date(msg.created_at).toLocaleString('ru-RU')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full md:w-auto bg-slate-50 p-3 rounded-lg text-slate-600 text-sm line-clamp-2 italic">
            "{msg.message}"
          </div>

          <div className="flex gap-2 w-full md:w-auto justify-end">
            <button 
              onClick={() => openModal('status', msg.id, msg.status)} 
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-bold text-[10px]  tracking-wider flex items-center justify-center gap-2 transition-all ${msg.status ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-600 text-white shadow-md shadow-blue-100 hover:bg-blue-700'}`}
            >
              {msg.status ? <><CheckCircle size={14}/> Обработано</> : <><Circle size={14}/> В очереди</>}
            </button>
            <button 
              onClick={() => openModal('delete', msg.id)} 
              className="p-2 bg-white border border-slate-200 text-slate-400 rounded-lg hover:text-red-500 hover:border-red-200 transition-all"
            >
              <Trash2 size={18}/>
            </button>
          </div>
        </div>
      ))}

      {messages.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-400 font-bold  text-xs tracking-widest">Новых заявок пока нет</p>
        </div>
      )}

      {/* --- TASDIQLASH MODAL OYNASI --- */}
      <AnimatePresence>
        {modal.show && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl p-6 shadow-2xl relative w-full max-w-sm overflow-hidden"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${modal.type === 'delete' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-600'}`}>
                  {modal.type === 'delete' ? <Trash2 size={32} /> : <AlertCircle size={32} />}
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {modal.type === 'delete' ? 'Удалить заявку?' : 'Изменить статус?'}
                </h3>
                <p className="text-slate-500 text-sm mb-8">
                  {modal.type === 'delete' 
                    ? 'Вы уверены, что хотите безвозвратно удалить эту заявку из системы?' 
                    : 'Вы хотите отметить эту заявку как ' + (modal.status ? '"В очереди"' : '"Обработано"') + '?'}
                </p>

                <div className="grid grid-cols-2 gap-3 w-full">
                  <button 
                    onClick={closeModal}
                    className="py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs  tracking-widest hover:bg-slate-200 transition-all"
                  >
                    Назад
                  </button>
                  <button 
                    onClick={handleConfirm}
                    disabled={modal.loading}
                    className={`py-3 text-white rounded-xl font-bold text-xs  tracking-widest transition-all shadow-lg ${modal.type === 'delete' ? 'bg-red-500 hover:bg-red-600 shadow-red-100' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'} disabled:opacity-50`}
                  >
                    {modal.loading ? '...' : 'Подтвердить'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}