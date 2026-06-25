import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Truck, Settings, Package, History, Loader2 } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import SEO from '../components/SEO.jsx';

// Xususiyatlar bo'limi komponenti
const SpecSection = ({ title, icon: Icon, specs, color }) => {
  if (!specs || specs.length === 0) return null;
  return (
    <div className="bg-white rounded-3xl p-5 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-xl bg-${color}-50 text-${color}-500`}>
          <Icon size={18} />
        </div>
        <h3 className="font-black text-[10px] md:text-xs tracking-wider text-gray-900 uppercase">{title}</h3>
      </div>
      <div className="space-y-4">
        {specs.map((spec, idx) => (
          <div key={idx} className="flex justify-between items-end gap-2 md:gap-4 text-[11px] md:text-sm group">
            <span className="text-gray-400 font-medium group-hover:text-gray-600 transition-colors shrink-0">{spec.key}</span>
            <div className="flex-grow border-b border-dotted border-gray-200 mb-1"></div>
            <span className="text-gray-900 font-bold text-right">{spec.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ProductPage({ products }) {
  const { slug } = useParams();
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(null);
  }, [slug]);

  const product = useMemo(() => {
    if (!products) return null;
    return products.find(p => p.slug === slug);
  }, [products, slug]);

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center px-6 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-black text-gray-900 mb-4 uppercase">Техника не найдена</h2>
        <Link to="/" className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-colors">
          Вернуться на главную
        </Link>
      </div>
    );
  }

  const currentImage = activeImage || product.image;
  const gallery = [product.image, ...(product.gallery || [])];

  return (
    <div className="min-h-screen bg-white font-inter pt-20">
      <SEO
        title={product.name}
        description={product.description?.substring(0, 160)}
        image={product.image}
      />
      
      {product.banner && (
        <div className="w-full h-32 md:h-64 overflow-hidden relative">
          <img src={product.banner} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        </div>
      )}

      <div className="max-w-[1500px] mx-auto px-6 md:px-10 py-8 md:py-20">
        
        <Link to="/" className="inline-flex items-center gap-2 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 mb-8 transition-all group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Назад в каталог
        </Link>

        {/* Product Title - Mobilda kichraytirildi */}
        <div className="mb-8 md:mb-16">
          <span className="text-blue-600 font-black text-[9px] md:text-xs tracking-[0.3em] mb-3 block">
            {product.brand || 'Vollkraft Official'}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 leading-tight max-w-4xl tracking-tighter uppercase">
            {product.name}
          </h1>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 mb-16 md:mb-32">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl shadow-gray-100 bg-gray-50 aspect-[4/3] border border-gray-100 flex items-center justify-center p-4 md:p-12"
            >
              <img 
                src={currentImage} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700" 
              />
            </motion.div>

            {/* Galereya - Mobilda kichikroq rasmlar */}
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center lg:justify-start">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-14 md:w-24 md:h-24 rounded-xl md:rounded-2xl overflow-hidden bg-gray-50 border-2 transition-all ${currentImage === img ? 'border-blue-600 scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* O'ng tomon */}
          <div className="flex flex-col justify-center">
            {/* Mobilda text-base qilib kichraytirildi */}
            <p className="text-gray-600 text-sm md:text-xl leading-relaxed mb-8 md:mb-10 font-medium">
              {product.description}
            </p>

            {/* Narx bloki - Mobilda ixchamroq */}
            <div className="bg-gray-50 p-6 md:p-12 rounded-[30px] md:rounded-[40px] flex flex-col sm:flex-row items-center justify-between border border-gray-100 mb-6 gap-6">
              <div className="text-center sm:text-left">
                <p className="text-[9px] md:text-[10px] font-black text-gray-400 tracking-[0.2em] mb-1 uppercase">Стоимость модели</p>
                <p className="text-2xl md:text-5xl font-black text-blue-600 tracking-tighter">{product.price}</p>
              </div>
              <a href="tel:+74924427007" className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-600 transition-all font-black tracking-widest text-[10px] md:text-xs uppercase">
                <Phone size={16} />
                Связаться
              </a>
            </div>

            <Link to="/contacts" className="w-full bg-blue-600 text-white py-4 md:py-6 rounded-2xl md:rounded-[2rem] font-black tracking-[0.2em] text-[10px] md:text-sm hover:bg-gray-900 transition-all shadow-xl text-center uppercase">
              Оставить заявку
            </Link>
          </div>
        </div>

        {/* Texnik xarakteristikalar */}
        <div className="space-y-8 md:space-y-16">
          <div className="flex items-center gap-4 md:gap-6">
             <h2 className="text-lg md:text-5xl font-black text-gray-900 tracking-tighter uppercase whitespace-nowrap">
               Технические данные
             </h2>
             <div className="flex-grow h-0.5 bg-gray-100"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
            <SpecSection title="Весовые параметры" icon={History} specs={product.specifications} color="indigo" />
            <SpecSection title="Оси и подвеска" icon={Truck} specs={product.axle_specs || product.axleSpecs} color="blue" />
            <SpecSection title="Основные характеристики" icon={Settings} specs={product.characteristic_specs || product.characteristicSpecs} color="emerald" />
            <SpecSection title="Комплектация" icon={Package} specs={product.equipment} color="orange" />
          </div>
        </div>

        {/* Batafsil tavsif */}
        {product.description?.length > 500 && (
          <div className="mt-16 md:mt-32 max-w-4xl p-6 md:p-10 bg-slate-50/50 rounded-3xl md:rounded-[3rem] border border-gray-100">
            <h3 className="text-lg md:text-2xl font-black text-gray-900 tracking-tight mb-6 uppercase">Подробный обзор</h3>
            <div className="text-gray-600 text-sm md:text-lg leading-relaxed whitespace-pre-wrap font-medium">
              {product.description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}