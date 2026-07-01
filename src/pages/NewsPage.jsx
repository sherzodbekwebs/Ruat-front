import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Calendar } from 'lucide-react';
import SEO from '../components/SEO.jsx';

const API_URL = 'https://ruatapi.uzautotrailer.uz/api';

export default function NewsPage() {
    // Yangiliklarni fetch qilish
    const { data: news = [], isLoading } = useQuery({
        queryKey: ['all-news'],
        queryFn: async () => {
            const res = await axios.get(`${API_URL}/news`);
            return res.data;
        },
        staleTime: 1000 * 60 * 10, // 10 daqiqa keshda saqlaydi
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <SEO
                title="Новости | RuAuto TRAILER"
                description="Последние новости и события компании RuAuto Trailer и бренда Vollkraft."
            />

            <div className="max-w-[1500px] mx-auto px-6 md:px-10">
                {/* Sarlavha qismi */}
                <div className="mb-16 text-center">
                    <span className="text-blue-600 font-black text-[10px] tracking-[0.3em] mb-4 block uppercase">
                        Пресс-центр
                    </span>
                    <h1 className="text-4xl md:text-4xl font-black text-slate-900 tracking-tighter">
                        Новости <span className="text-blue-600">компании</span>
                    </h1>
                </div>

                {/* Yangiliklar Gridi */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col h-full"
                        >
                            <Link to={`/news/${item.id}`} className="block aspect-[16/10] overflow-hidden relative">
                                <img
                                    src={item.image}
                                    alt={item.title_ru}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>

                            <div className="p-8 flex flex-col flex-grow">
                                {/* Agar API'dan sana kelsa, bu yerda ko'rsatish mumkin */}
                                <div className="flex items-center gap-2 mb-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                    <Calendar size={12} />
                                    <span>Новости</span>
                                </div>

                                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {item.title_ru}
                                </h3>

                                <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                                    {item.content_ru}
                                </p>

                                <div className="mt-auto">
                                    <Link
                                        to={`/news/${item.id}`}
                                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-900 hover:text-blue-600 transition-all group/btn"
                                    >
                                        Подробнее
                                        <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}