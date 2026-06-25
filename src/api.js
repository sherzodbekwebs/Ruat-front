import axios from 'axios';

// HTTPS ishlatish tavsiya etiladi
const API_URL = 'https://ruatapi.uzautotrailer.uz/api';

export const api = axios.create({
    baseURL: API_URL
});

// Admin so'rovlari uchun tokenni avtomatik qo'shish
api.interceptors.request.use((config) => {
    // App.jsx da ishlatgan nomimiz bilan bir xil bo'lishi kerak
    const token = sessionStorage.getItem('admin_token'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});