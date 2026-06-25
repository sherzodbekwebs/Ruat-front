import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Truck, Settings, Package, History, Loader2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import SEO from '../components/SEO.jsx';

// Xususiyatlar bo'limi komponenti
const SpecSection = ({ title, icon: Icon, specs, color }) => {
  if (!specs || specs.length === 0) return null;
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-xl bg-${color}-50 text-${color}-500`}>
          <Icon size={20} />
        </div>
        <h3 className="font-black text-xs tracking-wider text-gray-900">{title}</h3>
      </div>
      <div className="space-y-4">
        {specs.map((spec, idx) => (
          <div key={idx} className="flex justify-between items-end gap-2 md:gap-4 text-xs md:text-sm group">
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
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(null);

  // 1. Mahsulotni topish (id tipidan qat'i nazar: string yoki number)
  const product = useMemo(() => {
    if (!products) return null;
    return products.find(p => String(p.id) === String(id));
  }, [products, id]);

  // Yuklanish holati
  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-accent-blue" />
      </div>
    );
  }

  // Mahsulot topilmagan holati
  if (!product) {
    return (
      <div className="py-20 text-center px-6 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-black text-gray-900 mb-4">Продукт не найден</h2>
        <Link to="/" className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-accent-blue transition-colors">
          Вернуться на главную
        </Link>
      </div>
    );
  }

  const currentImage = activeImage || product.image;
  const gallery = [product.image, ...(product.gallery || [])];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={product.name}
        description={product.description?.substring(0, 160) + "..."}
        image={product.image}
      />
      
      {/* Banner qismi */}
      {product.banner && (
        <div className="w-full h-32 md:h-64 overflow-hidden relative">
          <img src={product.banner} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-8 md:py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-accent-blue mb-8 md:mb-10 transition-all hover:-translate-x-1">
          <ArrowLeft size={16} />
          Назад в каталог
        </Link>

        {/* Product Title */}
        <div className="mb-8 md:mb-12">
          <span className="text-accent-blue font-black text-[10px] md:text-xs tracking-[0.2em] mb-3 md:mb-4 block">
            {product.brand || 'Официальный дилер'}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 leading-tight max-w-4xl tracking-tighter">
            {product.name}
          </h1>
        </div>

        {/* Hero Section: Rasm va Asosiy ma'lumotlar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 mb-16 md:mb-24">
          <div className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl shadow-gray-100 bg-gray-50 aspect-[4/3] border border-gray-100 flex items-center justify-center p-4 md:p-8"
            >
              <img 
                src={currentImage} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-700" 
              />
            </motion.div>

            {/* Galereya */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 md:gap-4">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`rounded-xl md:rounded-2xl overflow-hidden bg-gray-50 aspect-square border-2 transition-all ${currentImage === img ? 'border-accent-blue scale-95 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* O'ng tomon: Tavsif va Tugmalar */}
          <div className="flex flex-col justify-center">
            <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 md:mb-10 font-medium">
              {product.description}
            </p>

            <div className="bg-gray-50 p-6 md:p-10 rounded-[30px] md:rounded-[40px] flex flex-col sm:flex-row items-center justify-between border border-gray-100 mb-6 md:mb-10 gap-6 md:gap-8">
              <div className="text-center sm:text-left">
                <p className="text-[10px] font-black text-gray-400 tracking-widest mb-2">Ориентировочная стоимость</p>
                <p className="text-3xl md:text-4xl font-black text-accent-blue tracking-tight">{product.price}</p>
              </div>
              <a href="tel:+79014010001" className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 md:py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-accent-blue transition-all shadow-xl group font-black tracking-widest text-xs">
                <Phone size={18} className="group-hover:rotate-12 transition-transform" />
                Связаться
              </a>
            </div>

            <button className="w-full bg-[#FF7F3F] text-white py-5 md:py-6 rounded-2xl md:rounded-[32px] font-black tracking-[0.2em] text-xs md:text-sm hover:bg-[#E56F35] transition-all shadow-2xl shadow-orange-100">
              Оставить заявку
            </button>
          </div>
        </div>

        {/* Texnik xarakteristikalar */}
        <div className="space-y-8 md:space-y-12">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-4">
            Технические данные
            <div className="flex-grow h-px bg-gray-100"></div>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <SpecSection
              title="Весовые параметры"
              icon={History}
              specs={product.specifications}
              color="indigo"
            />
            <SpecSection
              title="Оси и подвеска"
              icon={Truck}
              // SQL'dan axle_specs bo'lib keladi
              specs={product.axle_specs || product.axleSpecs}
              color="blue"
            />
            <SpecSection
              title="Основные характеристики"
              icon={Settings}
              // SQL'dan characteristic_specs bo'lib keladi
              specs={product.characteristic_specs || product.characteristicSpecs}
              color="emerald"
            />
            <SpecSection
              title="Комплектация"
              icon={Package}
              specs={product.equipment}
              color="orange"
            />
          </div>
        </div>

        {/* Batafsil tavsif */}
        {product.description?.length > 500 && (
          <div className="mt-16 md:mt-24 max-w-4xl p-8 bg-gray-50 rounded-[40px] border border-gray-100">
            <h3 className="text-lg md:text-xl font-black text-gray-900 tracking-tight mb-6">Подробное описание</h3>
            <div className="prose prose-gray max-w-none text-gray-500 font-medium leading-relaxed whitespace-pre-wrap">
              {product.description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}