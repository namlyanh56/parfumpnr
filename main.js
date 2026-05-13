/* =========================================================
   aura. Perfumery — main.js
   ========================================================= */

const DEFAULT_DATA = {
  brand: {
    name: "aura.",
    announcement: "FREE shipping above IDR 700.000 — Clean & Natural Fragrances",
    about: "aura. is dedicated to bring the highest quality, clean, and natural perfume to you.",
    email: "hello@aura-perfumery.com"
  },
  hero: {
    title: "Smell Like You Mean It.",
    subtitle: "Fragrances crafted for your story.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=1200&q=80",
    cta: "Explore Collection"
  },
  sections: {
    featuredTitle: "Play with Fragrance",
    featuredDesc: "Our fragrances can be worn individually or layered — that's what makes us special.",
    tryTitle: "Try First, Commit Later",
    tryDesc: "Try our Scent Designer Kit before committing to a full bottle. 7 travel-size samples, one designer case.",
    press: ["VOGUE", "FIMELA", "COSMOPOLITAN", "ELLE"],
    shopHeroTitle: "Discover Our Collection",
    shopHeroSub: "Our fragrances are completely genderless — wear what speaks to you.",
    shopHeroImage: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=1200&q=80"
  },
  products: [
    { id: 1, name: "Floraison", price: 401000, originalPrice: 0, category: "feminine", badge: "", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&q=80", description: "Modern yet timeless. This classic bouquet states romance and beauty with modern boldness.", notes: ["Peony", "Rose Otto", "Lychee", "Pink Pepper", "White Musk", "Patchouli"], vibe: "Vacation oasis near the ocean.", tune: "El Shaddai - Dylan Sin", stock: true },
    { id: 2, name: "Lucid Dreams", price: 401000, originalPrice: 0, category: "feminine", badge: "Sold out", image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=600&q=80", description: "A dreamy, ethereal scent for those who wander between reality and fantasy.", notes: ["Iris", "Violet", "Sandalwood", "Ambergris", "Bergamot", "Cashmere"], vibe: "A midnight walk through a moonlit garden.", tune: "Lucid Dreams - Juice WRLD", stock: false },
    { id: 3, name: "Old Money", price: 450000, originalPrice: 0, category: "masculine", badge: "NEW", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80", description: "Rich and commanding. The scent of polished leather and oak.", notes: ["Vetiver", "Oakmoss", "Leather", "Tobacco", "Amber", "Cedar"], vibe: "A boardroom that smells like legacy.", tune: "Money Trees - Kendrick Lamar", stock: true },
    { id: 4, name: "Dusk Reverie", price: 401000, originalPrice: 0, category: "masculine", badge: "", image: "https://images.unsplash.com/photo-1547887538-047f814a8854?w=600&q=80", description: "Warm and smoky, like the last light of a summer evening.", notes: ["Oud", "Cardamom", "Saffron", "Vanilla", "Incense", "Musk"], vibe: "Golden hour, forever.", tune: "Sunset Lover - Petit Biscuit", stock: true },
    { id: 5, name: "Layering Bundle", price: 495000, originalPrice: 560000, category: "all", badge: "BEST VALUE", image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=600&q=80", description: "7 travel-size scents in a designer case. Mix and match your signature.", notes: ["All 7 scents included"], vibe: "Your scent, your rules.", tune: "Various", stock: true }
  ],
  testimonials: [
    { name: "Annisa R.", rating: 5, text: "Wanginya mewah banget hampir semua variant saya suka!", date: "March 2025" },
    { name: "Budi S.", rating: 5, text: "Old Money is bold yet sophisticated. Got so many compliments!", date: "April 2025" },
    { name: "Sari W.", rating: 5, text: "Packaging-nya cantik banget, pas banget buat gift!", date: "May 2025" }
  ]
};

/* ===== DATA MANAGER ===== */
const DataManager = {
  get() {
    try {
      const s = localStorage.getItem('aura_data');
      return s ? JSON.parse(s) : JSON.parse(JSON.stringify(DEFAULT_DATA));
    } catch { return JSON.parse(JSON.stringify(DEFAULT_DATA)); }
  },
  save(d) { localStorage.setItem('aura_data', JSON.stringify(d)); },
  reset() { localStorage.removeItem('aura_data'); return JSON.parse(JSON.stringify(DEFAULT_DATA)); }
};

/* ===== CART ===== */
const Cart = {
  get() {
    try { return JSON.parse(localStorage.getItem('aura_cart') || '[]'); } catch { return []; }
  },
  save(c) { localStorage.setItem('aura_cart', JSON.stringify(c)); },
  add(id, qty = 1) {
    const p = DataManager.get().products.find(p => p.id === id);
    if (!p || !p.stock) return false;
    const c = this.get();
    const ex = c.find(i => i.id === id);
    if (ex) ex.qty += qty; else c.push({ id, qty });
    this.save(c);
    this.badge();
    return true;
  },
  remove(id) { this.save(this.get().filter(i => i.id !== id)); this.badge(); },
  updateQty(id, qty) {
    const c = this.get();
    const item = c.find(i => i.id === id);
    if (item) { item.qty = Math.max(1, qty); this.save(c); this.badge(); }
  },
  clear() { localStorage.removeItem('aura_cart'); this.badge(); },
  count() { return this.get().reduce((s, i) => s + i.qty, 0); },
  subtotal() {
    const d = DataManager.get();
    return this.get().reduce((s, i) => {
      const p = d.products.find(p => p.id === i.id);
      return s + (p ? p.price * i.qty : 0);
    }, 0);
  },
  total() {
    const sub = this.subtotal();
    const shipping = sub >= 700000 ? 0 : 25000;
    return sub + shipping;
  },
  badge() {
    const b = document.getElementById('cart-count');
    if (!b) return;
    const n = this.count();
    b.textContent = n;
    b.style.display = n > 0 ? 'flex' : 'none';
  }
};

/* ===== UTILS ===== */
const fmt = n => n.toLocaleString('id-ID');

/* ===== CART PANEL ===== */
function renderCartPanel() {
  const el = document.getElementById('cart-items');
  const tot = document.getElementById('cart-total');
  if (!el) return;
  const d = DataManager.get();
  const c = Cart.get();
  if (c.length === 0) {
    el.innerHTML = `<div class="cart-empty">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
      <p>Your cart is empty</p>
      <a href="shop.html" class="btn btn-dark" style="margin-top:1rem;display:inline-block">Shop Now</a>
    </div>`;
  } else {
    el.innerHTML = c.map(item => {
      const p = d.products.find(p => p.id === item.id);
      if (!p) return '';
      return `<div class="cart-item">
        <img src="${p.image}" alt="${p.name}">
        <div class="ci-info">
          <strong>${p.name}</strong>
          <span>IDR ${fmt(p.price)} × ${item.qty}</span>
        </div>
        <button class="ci-remove" onclick="Cart.remove(${p.id});renderCartPanel()" title="Remove">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>`;
    }).join('');
  }
  if (tot) tot.textContent = fmt(Cart.subtotal());
}

function addToCart(id, qty = 1) {
  if (Cart.add(id, qty)) {
    showToast('Added to cart');
    renderCartPanel();
    document.getElementById('cart-sidebar')?.classList.add('open');
    document.getElementById('cart-overlay')?.classList.add('open');
  } else {
    showToast('Item is sold out', 'error');
  }
}

function showToast(msg, t = 'ok') {
  const el = document.createElement('div');
  el.className = 'toast' + (t === 'error' ? ' toast-error' : '');
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.classList.add('show'), 10);
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300); }, 2500);
}

/* ===== ADMIN BAR (Inline Edit Mode) ===== */
const AdminBar = {
  _popover: null,
  _activeEl: null,
  _handlers: new WeakMap(),

  init() {
    // Don't show on admin page or in iframe
    if (location.pathname.endsWith('admin.html')) return;
    if (window.self !== window.top) return;
    if (sessionStorage.getItem('aura_admin') !== '1') return;
    this._inject();
    this._setupGlobalListeners();
  },

  _inject() {
    const bar = document.createElement('div');
    bar.id = 'aura-admin-bar';
    bar.innerHTML = `
      <div class="aab-inner">
        <div class="aab-left">
          <span class="aab-brand">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            aura. admin
          </span>
          <a href="admin.html" class="aab-link">Dashboard</a>
          <a href="admin.html#products" class="aab-link">Products</a>
          <span class="aab-sep">|</span>
          <a href="index.html" target="_blank" class="aab-link aab-viewsite">View Site ↗</a>
        </div>
        <div class="aab-right">
          <label class="aab-toggle" title="Click elements on page to edit them directly">
            <input type="checkbox" id="edit-mode-cb">
            <span class="aab-toggle-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit Mode
            </span>
          </label>
          <button class="aab-logout" onclick="AdminBar.logout()">Logout</button>
        </div>
      </div>
    `;
    document.body.prepend(bar);
    document.body.classList.add('has-admin-bar');

    document.getElementById('edit-mode-cb').addEventListener('change', e => {
      if (e.target.checked) this._enableEditMode();
      else this._disableEditMode();
    });
  },

  _enableEditMode() {
    document.body.classList.add('edit-mode-active');
    document.querySelectorAll('[data-ek]').forEach(el => {
      el.classList.add('editable-field');
      const handler = e => {
        if (!document.body.classList.contains('edit-mode-active')) return;
        e.preventDefault();
        e.stopPropagation();
        this.openPopover(el);
      };
      this._handlers.set(el, handler);
      el.addEventListener('click', handler);
    });
    showToast('Edit Mode on — click any highlighted text to edit');
  },

  _disableEditMode() {
    document.body.classList.remove('edit-mode-active');
    document.querySelectorAll('[data-ek]').forEach(el => {
      el.classList.remove('editable-field');
      const h = this._handlers.get(el);
      if (h) el.removeEventListener('click', h);
    });
    this.closePopover();
  },

  openPopover(el) {
    this.closePopover();
    this._activeEl = el;
    const key = el.dataset.ek;
    const d = DataManager.get();
    const val = key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : ''), d);
    const isLong = String(val).length > 80 || el.tagName === 'P' || el.tagName === 'SPAN';

    const pop = document.createElement('div');
    pop.id = 'aura-edit-pop';
    pop.innerHTML = `
      <div class="aep-key">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        ${key.replace(/\./g, ' › ')}
      </div>
      ${isLong
        ? `<textarea id="aep-val" class="aep-field" rows="3">${String(val).replace(/</g,'&lt;')}</textarea>`
        : `<input id="aep-val" type="text" class="aep-field" value="${String(val).replace(/"/g, '&quot;').replace(/</g, '&lt;')}">`
      }
      <div class="aep-hint">Press Enter to save, Esc to cancel</div>
      <div class="aep-btns">
        <button class="aep-cancel" onclick="AdminBar.closePopover()">Cancel</button>
        <button class="aep-save" onclick="AdminBar.save()">Save Changes</button>
      </div>
    `;
    document.body.appendChild(pop);
    this._popover = pop;

    // Position
    const rect = el.getBoundingClientRect();
    let top = rect.bottom + window.scrollY + 8;
    let left = rect.left + window.scrollX;
    const popW = 300;
    if (left + popW > window.innerWidth - 16) left = window.innerWidth - popW - 16;
    if (left < 8) left = 8;
    pop.style.top = top + 'px';
    pop.style.left = left + 'px';

    const inp = document.getElementById('aep-val');
    setTimeout(() => { inp?.focus(); inp?.select(); }, 30);

    inp?.addEventListener('keydown', e => {
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') { e.preventDefault(); this.save(); }
      if (e.key === 'Escape') this.closePopover();
    });
  },

  closePopover() {
    this._popover?.remove();
    this._popover = null;
    this._activeEl = null;
  },

  save() {
    const el = this._activeEl;
    if (!el) return;
    const key = el.dataset.ek;
    const val = document.getElementById('aep-val')?.value ?? '';
    const d = DataManager.get();
    // Set nested value by dot path
    const keys = key.split('.');
    let obj = d;
    for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
    obj[keys[keys.length - 1]] = val;
    DataManager.save(d);

    // Update DOM immediately
    el.textContent = val;

    // Special updates
    const specials = {
      'hero.image': () => { const bg = document.getElementById('hero-bg'); if (bg) bg.style.backgroundImage = `url('${val}')`; },
      'brand.announcement': () => document.querySelectorAll('[data-ann]').forEach(e => e.textContent = val),
      'brand.name': () => document.querySelectorAll('[data-brand]').forEach(e => e.textContent = val),
      'sections.shopHeroTitle': () => { const el = document.getElementById('shop-hero-title'); if (el) el.textContent = val; },
      'sections.shopHeroSub': () => { const el = document.getElementById('shop-hero-sub'); if (el) el.textContent = val; },
      'sections.shopHeroImage': () => { const el = document.getElementById('shop-hero-bg'); if (el) el.style.backgroundImage = `url('${val}')`; },
    };
    specials[key]?.();

    this.closePopover();
    showToast('Saved ✓');
  },

  logout() { sessionStorage.removeItem('aura_admin'); location.reload(); },

  _setupGlobalListeners() {
    document.addEventListener('click', e => {
      if (!this._popover) return;
      if (!this._popover.contains(e.target) && !e.target.closest('[data-ek]')) this.closePopover();
    });
  }
};

/* ===== DOM READY ===== */
document.addEventListener('DOMContentLoaded', () => {
  Cart.badge();
  const d = DataManager.get();
  document.querySelectorAll('[data-ann]').forEach(el => el.textContent = d.brand.announcement);
  document.querySelectorAll('[data-brand]').forEach(el => el.textContent = d.brand.name);

  // Hamburger
  document.getElementById('hamburger')?.addEventListener('click', () => document.getElementById('mobile-nav')?.classList.add('open'));
  document.getElementById('nav-close')?.addEventListener('click', () => document.getElementById('mobile-nav')?.classList.remove('open'));
  document.getElementById('mobile-nav')?.addEventListener('click', e => { if (e.target.id === 'mobile-nav') e.target.classList.remove('open'); });

  // Cart sidebar
  const openCart = () => { renderCartPanel(); document.getElementById('cart-sidebar')?.classList.add('open'); document.getElementById('cart-overlay')?.classList.add('open'); };
  const closeCart = () => { document.getElementById('cart-sidebar')?.classList.remove('open'); document.getElementById('cart-overlay')?.classList.remove('open'); };
  document.getElementById('cart-icon')?.addEventListener('click', openCart);
  document.getElementById('close-cart')?.addEventListener('click', closeCart);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);

  // Fade-in observer
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

  // Admin bar
  AdminBar.init();
});
