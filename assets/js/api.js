const BASE_URL = 'https://pleonasmo.vercel.app/api';

// ─── UTILITÁRIOS ─────────────────────────────────────────────
export function formatPrice(value) {
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// ─── HELPER FETCH PÚBLICO ────────────────────────────────────
async function apiFetch(url, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    const res = await fetch(url, { ...options, headers });
    return res;
}

// ─── PRODUTOS (PÚBLICO) ──────────────────────────────────────
export async function getProducts({ page = 1, limit = 12, category = '', search = '', active = 'true' } = {}) {
    const params = new URLSearchParams({ page, limit, active });
    if (category) params.set('category', category);
    if (search)   params.set('search', search);
    const res = await apiFetch(`${BASE_URL}/products?${params}`);
    return res.ok ? res.json() : null;
}

export async function getProductBySlug(slug) {
    const res = await apiFetch(`${BASE_URL}/products/slug/${slug}`);
    return res.ok ? res.json() : null;
}

// ─── CATEGORIAS (PÚBLICO) ────────────────────────────────────
export async function getCategories() {
    const res = await apiFetch(`${BASE_URL}/categories`);
    return res.ok ? res.json() : [];
}

// ─── COMPONENTES UI ──────────────────────────────────────────
export function productCardSkeleton() {
    return `<div class="bg-white border border-gray-300 rounded-lg p-5 relative animate-pulse">
        <div class="w-full aspect-square bg-gray-200 rounded mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
    </div>`;
}
