import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, Share2, Check, Loader2, ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://ruatapi.uzautotrailer.uz/api';

// --- SKELETON COMPONENT (Yuklanayotgan paytda chiqadigan shakl) ---
const NewsSkeleton = () => (
    <div className="max-w-[1500px] mx-auto px-6 lg:px-8 animate-pulse pt-24 md:pt-32">
        <div className="h-4 bg-gray-100 rounded-md w-32 mb-8" /> {/* Breadcrumb */}
        <div className="h-12 bg-gray-100 rounded-xl w-3/4 mb-8" /> {/* Title */}
        <div className="flex gap-6 mb-10 pb-6 border-b border-gray-100">
            <div className="h-4 bg-gray-50 rounded w-24" />
            <div className="h-4 bg-gray-50 rounded w-20" />
        </div>
        <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-[30%] aspect-[4/5] bg-gray-100 rounded-[3rem]" /> {/* Image */}
            <div className="flex-1 space-y-4">
                <div className="h-4 bg-gray-50 rounded w-full" />
                <div className="h-4 bg-gray-50 rounded w-full" />
                <div className="h-4 bg-gray-50 rounded w-5/6" />
                <div className="h-4 bg-gray-50 rounded w-full" />
            </div>
        </div>
    </div>
);

export default function NewsDetailPage() {
    const { id } = useParams();
    const [copied, setCopied] = useState(false);
    const [isImageOpen, setIsImageOpen] = useState(false);

    // 1. React Query orqali kesh bilan yuklash
    const { data: post, isLoading, isError } = useQuery({
        queryKey: ['news', id],
        queryFn: async () => {
            const res = await axios.get(`${API_URL}/news/${id}`);
            return res.data;
        },
        staleTime: 1000 * 60 * 20, // 20 daqiqa keshda saqlaydi
    });

    // 2. Scroll va Views orqa fonda
    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            axios.patch(`${API_URL}/news/${id}/views`).catch(() => {});
        }
    }, [id]);

    const handleShare = async () => {
        const shareData = {
            title: post?.title_ru,
            text: post?.content_ru?.substring(0, 100) + '...',
            url: window.location.href,
        };
        if (navigator.share) {
            try { await navigator.share(shareData); } catch { 
                navigator.clipboard.writeText(shareData.url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } else {
            navigator.clipboard.writeText(shareData.url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Yuklanish paytida Skeleton ko'rsatiladi
    if (isLoading) return <NewsSkeleton />;

    if (isError || !post) return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 uppercase">Новость не найдена</h2>
            <Link to="/" className="text-blue-600 font-bold uppercase tracking-widest text-[10px]">Вернуться на главную</Link>
        </div>
    );

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="pt-24 md:pt-32 pb-32 bg-white min-h-screen font-inter"
        >
            <article className="max-w-[1500px] mx-auto px-6 lg:px-8">
                
                {/* Breadcrumbs */}
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-bold uppercase text-[10px] tracking-[0.2em] group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Назад к списку
                    </Link>
                </div>

                {/* Sarlavha */}
                <h1 className="text-3xl md:text-[44px] font-black text-[#1a2e44] leading-[1.1] tracking-tight mb-8">
                    {post.title_ru}
                </h1>

                {/* Info Bar */}
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-6 md:gap-8">
                        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                            <Calendar size={14} className="text-blue-600 opacity-70" />
                            {post.createdAt ? new Date(post.createdAt).toLocaleDateString('ru-RU') : '---'}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                            <Eye size={16} className="text-blue-600 opacity-70" />
                            {post.views}
                        </div>
                    </div>

                    <button onClick={handleShare} className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-100/50">
                        {copied ? <Check size={14} className="text-green-600" /> : <Share2 size={14} />}
                        <span>{copied ? 'Скопировано' : 'Поделиться'}</span>
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-10">
                    {/* RASM */}
                    <div className="w-full md:w-[35%] shrink-0">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setIsImageOpen(true)}
                            className="rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl shadow-slate-200 cursor-zoom-in"
                        >
                            <img src={post.image} className="w-full h-full object-cover" alt={post.title_ru} />
                        </motion.div>
                    </div>

                    {/* MATN */}
                    <div className="flex-1 text-[#475569] text-lg md:text-[20px] leading-[1.8] font-medium">
                        <div className="whitespace-pre-wrap">{post.content_ru}</div>
                    </div>
                </div>

                {/* Footer button */}
                <div className="mt-20 pt-12 border-t border-slate-100">
                    <Link to="/" className="bg-[#1a2e44] text-white px-10 py-5 rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-blue-600 transition-all shadow-xl inline-block">
                        Смотреть каталог техники
                    </Link>
                </div>

                {/* MODAL IMAGE */}
                <AnimatePresence>
                    {isImageOpen && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsImageOpen(false)}
                            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                        >
                            <button className="absolute top-8 right-8 text-white/70 hover:text-white"><X size={44} /></button>
                            <motion.img 
                                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                src={post.image} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </article>
        </motion.div>
    );
}