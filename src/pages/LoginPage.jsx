import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldCheck } from 'lucide-react';
import axios from 'axios';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState(''); // Bazaga qo'shgan loginimiz
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Backend API ga so'rov yuborish
      const response = await axios.post('https://ruatapi.uzautotrailer.uz/api/login', {
        username: username,
        password: password
      });

      if (response.data.success) {
        // App.jsx dagi onLogin funksiyasiga tokenni uzatamiz
        onLogin(response.data.token);
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login yoki parol xato!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 md:px-6">
      <div className="w-full max-w-[440px]">
        <div className="bg-white p-7 sm:p-10 md:p-14 rounded-[32px] md:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">

          <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-indigo-50 rounded-full -mr-12 -mt-12 md:-mr-16 md:-mt-16 opacity-50"></div>

          <div className="text-center mb-8 md:mb-12 relative z-10">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-600 rounded-[20px] md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl shadow-indigo-200">
              <ShieldCheck className="text-white" size={32} />
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 leading-tight">Вход в панель</h1>
            <p className="text-gray-400 text-xs md:text-sm mt-2 md:mt-3 font-medium">Для управления каталогом РуAuto ТРЕЙЛЕР</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 md:space-y-6 relative z-10">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 md:p-4 rounded-xl text-xs font-bold border border-red-100 text-center">
                {error}
              </div>
            )}

            <div className="space-y-1 md:space-y-2">
              <label className="text-[10px] md:text-[11px] font-black tracking-[0.2em] text-gray-400 ml-1">Логин</label>
              <div className="relative group">
                <User className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 pl-12 text-gray-900 font-bold text-xs md:text-sm outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1 md:space-y-2">
              <label className="text-[10px] md:text-[11px] font-black tracking-[0.2em] text-gray-400 ml-1">Пароль</label>
              <div className="relative group">
                <Lock className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input
                  type="password"
                  required
                  autoFocus
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 pl-12 focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-xs md:text-sm"
                  placeholder="Введите parol..."
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-gray-900 text-white py-4 md:py-5 rounded-xl font-black tracking-[0.2em] text-xs md:text-sm hover:bg-indigo-600 transition-all shadow-xl disabled:opacity-50"
            >
              {loading ? 'Вход...' : 'Войти в систему'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 md:mt-8 text-gray-400 text-[9px] md:text-[11px] font-bold tracking-widest px-4">
          © 2026 РуАвто ТРЕЙЛЕР • Secure Access
        </p>
      </div>
    </div>
  );
}