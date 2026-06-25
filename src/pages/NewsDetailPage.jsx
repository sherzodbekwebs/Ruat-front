import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, Share2, Check, Loader2, ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API_URL = 'https://ruatapi.uzautotrailer.uz/api';

export default function NewsDetailPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [isImageOpen, setIsImageOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchDetail = async () => {
            try {
                const res = await axios.get(`${API_URL}/news/${id}`);
                setPost(res.data);
                await axios.patch(`${API_URL}/news/${id}/views`);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    // 🚀 SHARE FUNKSIYASI YANGILANDI
    const handleShare = async () => {
        const shareData = {
            title: post.title_ru,
            text: post.content_ru.substring(0, 100) + '...', // Qisqa matn
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                // Muvaffaqiyatli share bo'lsa, "Скопировано" holatini ko'rsatmaymiz
            } catch (err) {
                console.error("Ошибка при попытке поделиться:", err);
                // Agar Web Share API ishlamasa, clipboardga nusxalaymiz
                navigator.clipboard.writeText(shareData.url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } else {
            // Web Share API qo'llab-quvvatlanmasa, linkni clipboardga nusxalaymiz
            navigator.clipboard.writeText(shareData.url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
    );

    if (!post) return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 uppercase">Новость не найдена</h2>
            <Link to="/#news-section" className="text-blue-600 font-bold uppercase tracking-widest text-[10px] hover:underline">
                Вернуться на главную
            </Link>
        </div>
    );

    return (
        <div className="pt-24 md:pt-32 pb-32 bg-white min-h-screen font-inter">
            <article className="max-w-[1500px] mx-auto px-6 lg:px-8">

                {/* Breadcrumbs */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-bold uppercase text-[10px] tracking-[0.2em] group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Назад к списку
                    </Link>
                </motion.div>

                {/* Sarlavha */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-[44px] font-black text-[#1a2e44] leading-[1.1] tracking-tight mb-8"
                >
                    {post.title_ru}
                </motion.h1>

                {/* Info Bar */}
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
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
                        {copied ? <Check size={14} className="text-green-600" /> : <Share2 size={14} />}
                        <span>{copied ? 'Скопировано' : 'Поделиться'}</span>
                    </button>
                </div>

                <div className="block overflow-hidden">
                    {/* RASM: Klik qilish funksiyasi va kursor qo'shildi */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => setIsImageOpen(true)}
                        className="float-none md:float-left w-full md:w-[25%] lg:w-[30%] md:mr-10 mb-8 md:mb-6 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-md border border-slate-100 bg-slate-50 cursor-zoom-in"
                    >
                        <img
                            src={post.image}
                            className="w-full h-full object-cover"
                            alt={post.title_ru}
                        />
                    </motion.div>

                    {/* MATN */}
                    <div className="text-[#475569] text-lg md:text-[18px] leading-[1.8] font-normal">
                        <div className="whitespace-pre-wrap">
                            {post.content_ru}
                        </div>
                    </div>
                </div>

                {/* Footer tugmasi */}
                <div className="mt-20 pt-12 border-t border-slate-100 flex justify-start">
                    <Link
                        to="/"
                        className="bg-[#1a2e44] text-white px-10 py-4.5 rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-blue-600 transition-all shadow-xl active:scale-95"
                    >
                        Смотреть каталог техники
                    </Link>
                </div>

                {/* RASMNI KATTA QILIB KO'RSATADIGAN MODAL */}
                <AnimatePresence>
                    {isImageOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsImageOpen(false)}
                            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                        >
                            <button
                                onClick={() => setIsImageOpen(false)}
                                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                            >
                                <X size={40} />
                            </button>
                            <motion.img
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                src={post.image}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                alt="Full size"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

            </article>
        </div>
    );
}