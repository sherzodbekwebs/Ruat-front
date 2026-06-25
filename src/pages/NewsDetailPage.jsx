import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, Share2, Check, Loader2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = 'https://ruatapi.uzautotrailer.uz/api';

export default function NewsDetailPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchDetail = async () => {
            try {
                const res = await axios.get(`${API_URL}/news/${id}`);
                setPost(res.data);
                // Ko'rishlar sonini oshirish
                await axios.patch(`${API_URL}/news/${id}/views`);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
    );

    if (!post) return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 uppercase">Новость не найдена</h2>
            <Link to="/" className="text-blue-600 font-bold uppercase tracking-widest text-[10px] hover:underline">
                Вернуться на главную
            </Link>
        </div>
    );

    return (
        <div className="pt-24 md:pt-32 pb-32 bg-white min-h-screen font-inter">
            <article className="max-w-5xl mx-auto px-6 lg:px-8">

                {/* 1. Навигация (Breadcrumbs) */}
                <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-10"
                >
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-bold uppercase text-[10px] tracking-[0.2em] group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Назад к списку
                    </Link>
                </motion.div>

                {/* 2. Главное изображение */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-sm mb-12 bg-slate-50 border border-slate-100"
                >
                    <img
                        src={post.image}
                        className="w-full h-full object-cover"
                        alt={post.title_ru}
                    />
                </motion.div>

                {/* 3. Инфо-панель (Дата, Просмотры, Поделиться) */}
                <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-6 md:gap-8">
                        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                            <Calendar size={14} className="text-blue-600 opacity-70" />
                            {post.date ? new Date(post.date).toLocaleDateString('ru-RU') : '---'}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                            <Eye size={16} className="text-blue-600 opacity-70" />
                            {post.views}
                        </div>
                    </div>

                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-100/50"
                    >
                        {copied ? (
                            <><Check size={14} className="text-green-600" /> <span>Скопировано</span></>
                        ) : (
                            <><Share2 size={14} /> <span>Поделиться</span></>
                        )}
                    </button>
                </div>

                {/* 4. Заголовок новости */}
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl md:text-[40px] font-bold text-[#1a2e44] leading-[1.2] tracking-tight mb-12"
                >
                    {post.title_ru}
                </motion.h1>

                {/* 5. Основной текст новости */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[#475569] text-lg md:text-[20px] leading-[1.8] font-normal max-w-4xl"
                >
                    <div className="whitespace-pre-wrap space-y-8">
                        {post.content_ru}
                    </div>
                </motion.div>

                {/* 6. Нижний разделитель/футер статьи (Optional) */}
                <div className="mt-24 pt-12 border-t border-slate-100 flex justify-center">
                    <Link 
                        to="/" 
                        className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
                    >
                        Смотреть каталог техники
                    </Link>
                </div>

            </article>
        </div>
    );
}