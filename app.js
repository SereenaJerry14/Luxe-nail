// ==========================================================================
// LUXECLAWS NAIL ATELIER - APPLICATION CONTROLLER & LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const defaultPromos = {
    'GLAM15': 0.15,
    'CLAWSSAVE20': 0.20,
    'FREESHIP': 0.00
  };

  const state = {
    products: JSON.parse(localStorage.getItem('luxeclaws_products') || JSON.stringify(NAIL_PRODUCTS)),
    cart: JSON.parse(localStorage.getItem('luxeclaws_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('luxeclaws_wishlist') || '[]'),
    user: JSON.parse(localStorage.getItem('luxeclaws_user') || 'null'),
    appliedPromo: null,
    promoDiscounts: JSON.parse(localStorage.getItem('luxeclaws_promos') || JSON.stringify(defaultPromos)),
    userSizing: 'S',
    theme: localStorage.getItem('luxeclaws_theme') || 'dark',
    filter: {
      category: 'all',
      searchQuery: '',
      sortBy: 'featured'
    },
    checkout: {
      step: 1,
      shippingSpeed: 'standard',
      shippingCost: 4.95
    }
  };

  // If user has saved size preference, initialize with it
  if (state.user && state.user.size) {
    state.userSizing = state.user.size;
  }

  // Hidden Keyboard Shortcut for Admin Access: Ctrl + Shift + A
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      window.location.href = 'admin.html';
    }
  });

  // --------------------------------------------------------------------------
  // Theme Management
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('luxeclaws_theme', theme);
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
    }
  }
  
  applyTheme(state.theme);
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme(state.theme);
      showToast(`Switched to ${state.theme.toUpperCase()} mode`, 'ri-contrast-2-line');
    });
  }

  // --------------------------------------------------------------------------
  // Toast Notifications
  // --------------------------------------------------------------------------
  function showToast(message, icon = 'ri-checkbox-circle-fill') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="${icon}" style="color: var(--pink-accent); font-size: 1.1rem;"></i> <span>${message}</span>`;
    
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // User Authentication & Profile Logic (Login & Sign Up)
  // --------------------------------------------------------------------------
  const authModal = document.getElementById('auth-modal');
  const authCloseBtn = document.getElementById('auth-close-btn');
  const openAuthBtn = document.getElementById('open-auth-btn');
  const tabBtnLogin = document.getElementById('tab-btn-login');
  const tabBtnSignup = document.getElementById('tab-btn-signup');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const authModalTitle = document.getElementById('auth-modal-title');
  const authModalSubtitle = document.getElementById('auth-modal-subtitle');
  const switchToSignupLink = document.getElementById('switch-to-signup-link');
  const switchToLoginLink = document.getElementById('switch-to-login-link');
  const forgotPwdLink = document.getElementById('forgot-pwd-link');
  const navUserContainer = document.getElementById('nav-user-container');

  function openAuth(tab = 'login') {
    if (!authModal) return;
    setAuthTab(tab);
    authModal.classList.add('open');
  }

  function closeAuth() {
    if (authModal) authModal.classList.remove('open');
  }

  function setAuthTab(tab) {
    if (tab === 'login') {
      if (tabBtnLogin) tabBtnLogin.classList.add('active');
      if (tabBtnSignup) tabBtnSignup.classList.remove('active');
      if (loginForm) loginForm.classList.add('active');
      if (signupForm) signupForm.classList.remove('active');
      if (authModalTitle) authModalTitle.textContent = 'Welcome to LuxeClaws';
      if (authModalSubtitle) authModalSubtitle.textContent = 'Sign in to access your saved size profiles & order history';
    } else {
      if (tabBtnSignup) tabBtnSignup.classList.add('active');
      if (tabBtnLogin) tabBtnLogin.classList.remove('active');
      if (signupForm) signupForm.classList.add('active');
      if (loginForm) loginForm.classList.remove('active');
      if (authModalTitle) authModalTitle.textContent = 'Join The LuxeClaws Atelier';
      if (authModalSubtitle) authModalSubtitle.textContent = 'Create your account for 15% off and custom sizing calibration';
    }
  }

  if (authCloseBtn) authCloseBtn.addEventListener('click', closeAuth);
  if (tabBtnLogin) tabBtnLogin.addEventListener('click', () => setAuthTab('login'));
  if (tabBtnSignup) tabBtnSignup.addEventListener('click', () => setAuthTab('signup'));
  if (switchToSignupLink) {
    switchToSignupLink.addEventListener('click', (e) => {
      e.preventDefault();
      setAuthTab('signup');
    });
  }
  if (switchToLoginLink) {
    switchToLoginLink.addEventListener('click', (e) => {
      e.preventDefault();
      setAuthTab('login');
    });
  }
  if (forgotPwdLink) {
    forgotPwdLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Password reset link sent to your email address! ✉️', 'ri-mail-send-line');
    });
  }

  // Password Visibility Toggle
  window.togglePwdVisibility = function(inputId, btnEl) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      btnEl.innerHTML = '<i class="ri-eye-off-line"></i>';
    } else {
      input.type = 'password';
      btnEl.innerHTML = '<i class="ri-eye-line"></i>';
    }
  };

  // Social Auth Simulator
  window.simulateSocialAuth = function(provider) {
    state.user = {
      name: provider === 'Google' ? 'Elena Rostova' : 'Chloe Montrose',
      email: provider === 'Google' ? 'elena.rostova@gmail.com' : 'chloe.m@icloud.com',
      size: 'S',
      isVip: true
    };
    saveUser();
    renderNavUser();
    closeAuth();
    showToast(`Signed in with ${provider}! Welcome, ${state.user.name}! ✨`, 'ri-user-smile-line');
  };

  // Login Form Submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const name = email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());

      state.user = {
        name: name || 'Anastasia Vance',
        email: email,
        size: state.userSizing || 'S',
        isVip: true
      };

      saveUser();
      renderNavUser();
      closeAuth();
      showToast(`Welcome back, ${state.user.name}! ✨`, 'ri-user-smile-line');
    });
  }

  // Sign Up Form Submission
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const size = document.getElementById('signup-size').value;

      state.user = {
        name: name,
        email: email,
        size: size,
        isVip: true
      };
      state.userSizing = size;

      saveUser();
      renderNavUser();
      closeAuth();
      showToast(`Welcome to LuxeClaws, ${name}! Your size profile is saved as Size ${size}! 💖`, 'ri-sparkles-fill');
    });
  }

  function saveUser() {
    localStorage.setItem('luxeclaws_user', JSON.stringify(state.user));
    if (state.user && state.user.size) {
      state.userSizing = state.user.size;
      const checkoutSize = document.getElementById('checkout-size-profile');
      if (checkoutSize) checkoutSize.value = state.user.size;
    }
  }

  function renderNavUser() {
    if (!navUserContainer) return;

    if (state.user) {
      const initials = state.user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
      navUserContainer.innerHTML = `
        <div class="user-menu-wrapper">
          <button class="user-avatar-btn" id="user-menu-btn" title="My Account">
            <div class="user-avatar-circle">${initials}</div>
            <span>${state.user.name.split(' ')[0]}</span>
            <i class="ri-arrow-down-s-line"></i>
          </button>
          
          <div class="user-dropdown-menu" id="user-dropdown-menu">
            <div class="user-dropdown-header">
              <h5>${state.user.name}</h5>
              <span>✨ VIP Member • Size ${state.user.size}</span>
            </div>
            <a href="profile.html#overview" class="user-dropdown-item" style="text-decoration: none; color: inherit;">
              <i class="ri-dashboard-line"></i> VIP Portal Overview
            </a>
            <a href="profile.html#orders" class="user-dropdown-item" style="text-decoration: none; color: inherit;">
              <i class="ri-shopping-bag-3-line"></i> My Orders & Live Tracking
            </a>
            <a href="profile.html#profile" class="user-dropdown-item" style="text-decoration: none; color: inherit;">
              <i class="ri-user-settings-line"></i> Profile & Delivery Details
            </a>
            <a href="profile.html#sizing" class="user-dropdown-item" style="text-decoration: none; color: inherit;">
              <i class="ri-ruler-2-line"></i> Nail Sizing: <strong>${state.user.size}</strong>
            </a>
            <a href="profile.html#wishlist" class="user-dropdown-item" style="text-decoration: none; color: inherit;">
              <i class="ri-heart-line"></i> Saved Wishlist
            </a>
            <button class="user-dropdown-item" onclick="logoutUser()" style="color: var(--pink-accent); border-top: 1px solid var(--border-subtle); margin-top: 0.4rem; width: 100%; text-align: left; background: transparent; border-left: none; border-right: none; border-bottom: none; cursor: pointer;">
              <i class="ri-logout-box-r-line"></i> Sign Out
            </button>
          </div>
        </div>
      `;

      const userMenuBtn = document.getElementById('user-menu-btn');
      const dropdown = document.getElementById('user-dropdown-menu');
      if (userMenuBtn && dropdown) {
        userMenuBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          dropdown.classList.toggle('open');
        });
      }
    } else {
      navUserContainer.innerHTML = `
        <button class="btn-icon" id="open-auth-btn" title="Sign In or Register" aria-label="Sign In or Register">
          <i class="ri-user-3-line"></i>
        </button>
      `;
      const btn = document.getElementById('open-auth-btn');
      if (btn) btn.addEventListener('click', () => openAuth('login'));
    }
  }

  // Close dropdown on outside click
  document.addEventListener('click', () => {
    const dropdown = document.getElementById('user-dropdown-menu');
    if (dropdown) dropdown.classList.remove('open');
  });

  window.logoutUser = function() {
    state.user = null;
    localStorage.removeItem('luxeclaws_user');
    renderNavUser();
    showToast('Signed out successfully');
  };

  window.openSizingFromProfile = function() {
    window.location.href = 'profile.html#sizing';
  };

  window.openOrdersFromProfile = function() {
    window.location.href = 'profile.html#orders';
  };

  // Initial user nav render
  renderNavUser();

  // --------------------------------------------------------------------------
  // Product Catalog Rendering & Filtering
  // --------------------------------------------------------------------------
  const productsGrid = document.getElementById('products-grid');
  const categoryTabs = document.getElementById('category-tabs');
  const catalogSearch = document.getElementById('catalog-search');
  const catalogSort = document.getElementById('catalog-sort');

  function renderProducts() {
    if (!productsGrid) return;

    let filtered = [...state.products];

    // Filter by Category
    if (state.filter.category !== 'all') {
      filtered = filtered.filter(p => p.category === state.filter.category);
    }

    // Filter by Search Query
    if (state.filter.searchQuery.trim() !== '') {
      const q = state.filter.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Sort
    if (state.filter.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.filter.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (state.filter.sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <i class="ri-search-eye-line" style="font-size: 3rem; color: var(--gold-light);"></i>
          <h3 style="margin-top: 1rem; font-size: 1.2rem; color: var(--text-primary);">No sets found matching your search</h3>
          <p>Try clearing filters or search for another aesthetic.</p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered.map(product => {
      const isWishlisted = state.wishlist.includes(product.id);
      return `
        <div class="product-card" data-product-id="${product.id}">
          <div class="product-image-box" onclick="openQuickView('${product.id}')">
            ${product.badge ? `<span class="badge ${product.badge.includes('DROP') || product.badge.includes('LIMITED') ? 'badge-pink' : 'badge-gold'} product-badge-tag">${product.badge}</span>` : ''}
            
            <button class="wishlist-heart-btn ${isWishlisted ? 'active' : ''}" 
                    title="Add to Wishlist"
                    onclick="event.stopPropagation(); toggleWishlist('${product.id}')">
              <i class="${isWishlisted ? 'ri-heart-3-fill' : 'ri-heart-3-line'}"></i>
            </button>

            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <button class="quick-view-overlay-btn" onclick="event.stopPropagation(); openQuickView('${product.id}')">
              <i class="ri-eye-line"></i> Quick View
            </button>
          </div>

          <div class="product-info">
            <div class="product-rating-row">
              <span class="rating-stars">★★★★★</span>
              <span class="review-count">(${product.reviewsCount || 12})</span>
            </div>

            <h3 class="product-title" onclick="openQuickView('${product.id}')">${product.name}</h3>
            <p class="product-subtitle">${product.subtitle || 'Handcrafted Japanese Gel Sculpted Set'}</p>

            ${product.shapes && product.shapes.length > 1 ? `
              <div class="product-selectors-row">
                <div class="selector-field">
                  <label>Shape</label>
                  <select id="shape-sel-${product.id}">
                    ${product.shapes.map(s => `<option value="${s}" ${s === product.defaultShape ? 'selected' : ''}>${s}</option>`).join('')}
                  </select>
                </div>
                <div class="selector-field">
                  <label>Length</label>
                  <select id="length-sel-${product.id}">
                    ${(product.lengths || ['Short', 'Medium', 'Long']).map(l => `<option value="${l}" ${l === product.defaultLength ? 'selected' : ''}>${l}</option>`).join('')}
                  </select>
                </div>
              </div>
            ` : ''}

            <div class="product-card-bottom">
              <div class="product-price-box">
                <span class="current-price">$${product.price.toFixed(2)}</span>
                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
              </div>
              <button class="btn btn-gold" onclick="addProductToBag('${product.id}')" style="padding: 0.55rem 1.1rem; font-size: 0.82rem;">
                <i class="ri-shopping-bag-line"></i> Add
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Category Tab Click
  if (categoryTabs) {
    categoryTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;
      categoryTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filter.category = btn.getAttribute('data-category');
      renderProducts();
    });
  }

  // Search Input
  if (catalogSearch) {
    catalogSearch.addEventListener('input', (e) => {
      state.filter.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Sort Select
  if (catalogSort) {
    catalogSort.addEventListener('change', (e) => {
      state.filter.sortBy = e.target.value;
      renderProducts();
    });
  }

  // --------------------------------------------------------------------------
  // Precision Sizing Calculator Logic
  // --------------------------------------------------------------------------
  const calcThumb = document.getElementById('calc-thumb');
  const calcIndex = document.getElementById('calc-index');
  const calcMiddle = document.getElementById('calc-middle');
  const calcRing = document.getElementById('calc-ring');
  const calcPinky = document.getElementById('calc-pinky');
  const calcSizeName = document.getElementById('calc-size-name');
  const calcSizeDesc = document.getElementById('calc-size-desc');
  const applyCalculatedSizeBtn = document.getElementById('apply-calculated-size-btn');

  function calculateSizeMatch() {
    if (!calcThumb) return;
    const t = parseInt(calcThumb.value) || 15;
    const i = parseInt(calcIndex.value) || 12;
    const m = parseInt(calcMiddle.value) || 13;
    const r = parseInt(calcRing.value) || 11;
    const p = parseInt(calcPinky.value) || 9;

    let matchedSize = 'Custom';
    let matchDesc = `Custom millimeters: ${t}mm, ${i}mm, ${m}mm, ${r}mm, ${p}mm`;

    // Tolerance match with standard sizes
    if (t <= 14 && i <= 11 && m <= 12 && r <= 10 && p <= 8) {
      matchedSize = 'XS';
      matchDesc = 'Matches standard XS (Extra Small): 14mm, 11mm, 12mm, 10mm, 8mm';
    } else if (t <= 15 && i <= 12 && m <= 13 && r <= 11 && p <= 9) {
      matchedSize = 'S';
      matchDesc = 'Matches standard S (Small): 15mm, 12mm, 13mm, 11mm, 9mm';
    } else if (t <= 16 && i <= 13 && m <= 14 && r <= 12 && p <= 10) {
      matchedSize = 'M';
      matchDesc = 'Matches standard M (Medium): 16mm, 13mm, 14mm, 12mm, 10mm';
    } else if (t <= 18 && i <= 15 && m <= 16 && r <= 14 && p <= 12) {
      matchedSize = 'L';
      matchDesc = 'Matches standard L (Large): 18mm, 14mm, 15mm, 13mm, 11mm';
    }

    if (calcSizeName) calcSizeName.textContent = `Size ${matchedSize} ${matchedSize !== 'Custom' ? `(${matchedSize === 'XS' ? 'Extra Small' : matchedSize === 'S' ? 'Small' : matchedSize === 'M' ? 'Medium' : 'Large'})` : ''}`;
    if (calcSizeDesc) calcSizeDesc.textContent = matchDesc;
    state.userSizing = matchedSize;
  }

  [calcThumb, calcIndex, calcMiddle, calcRing, calcPinky].forEach(input => {
    if (input) {
      input.addEventListener('input', calculateSizeMatch);
    }
  });

  if (applyCalculatedSizeBtn) {
    applyCalculatedSizeBtn.addEventListener('click', () => {
      calculateSizeMatch();
      const checkoutSizeProfile = document.getElementById('checkout-size-profile');
      if (checkoutSizeProfile) {
        checkoutSizeProfile.value = state.userSizing;
      }
      if (state.user) {
        state.user.size = state.userSizing;
        saveUser();
        renderNavUser();
      }
      showToast(`Size profile saved as Size ${state.userSizing}! Applied to your orders.`, 'ri-check-double-line');
    });
  }

  // --------------------------------------------------------------------------
  // Bespoke Commission Form Handler
  // --------------------------------------------------------------------------
  const bespokeForm = document.getElementById('bespoke-commission-form');
  if (bespokeForm) {
    bespokeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('comm-name').value;
      const email = document.getElementById('comm-email').value;
      const shape = document.getElementById('comm-shape').value;
      const length = document.getElementById('comm-length').value;
      const notes = document.getElementById('comm-notes').value;

      // Save to commissions in localStorage for Admin visibility
      const existingComms = JSON.parse(localStorage.getItem('luxeclaws_commissions') || '[]');
      existingComms.unshift({
        id: `COMM-${Date.now().toString().slice(-4)}`,
        name: name,
        email: email,
        shape: shape,
        length: length,
        notes: notes,
        quote: '$75.00',
        status: 'Pending Review'
      });
      localStorage.setItem('luxeclaws_commissions', JSON.stringify(existingComms));

      showToast(`Thank you, ${name}! Your commission inquiry (${shape}, ${length}) has been queued in our master atelier. Check ${email} shortly!`, 'ri-sparkling-fill');
      bespokeForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // Community Reviews Rendering
  // --------------------------------------------------------------------------
  const reviewsGrid = document.getElementById('reviews-grid');
  function renderReviews() {
    if (!reviewsGrid) return;
    reviewsGrid.innerHTML = CUSTOMER_REVIEWS.map(r => `
      <div class="review-card">
        <div class="review-author-row">
          <img src="${r.avatar}" class="review-avatar" alt="${r.author}">
          <div class="review-author-info">
            <h4>${r.author}</h4>
            <span class="verified-tag"><i class="ri-checkbox-circle-fill"></i> Verified Collector</span>
          </div>
        </div>
        <div class="rating-stars">★★★★★</div>
        <h4 style="font-size: 0.98rem; color: var(--text-primary);">${r.title}</h4>
        <p>"${r.comment}"</p>
        <div class="review-product-tag">
          <i class="ri-sparkles-line"></i> Set: <strong>${r.productName}</strong> • ${r.date}
        </div>
      </div>
    `).join('');
  }

  // --------------------------------------------------------------------------
  // Wishlist Handling
  // --------------------------------------------------------------------------
  window.toggleWishlist = function(productId) {
    const idx = state.wishlist.indexOf(productId);
    if (idx > -1) {
      state.wishlist.splice(idx, 1);
      showToast('Removed from your Wishlist');
    } else {
      state.wishlist.push(productId);
      showToast('Added to your Wishlist! 💖', 'ri-heart-3-fill');
    }
    localStorage.setItem('luxeclaws_wishlist', JSON.stringify(state.wishlist));
    updateWishlistBadge();
    renderProducts();
  };

  function updateWishlistBadge() {
    const badge = document.getElementById('wishlist-count');
    if (badge) badge.textContent = state.wishlist.length;
  }

  // --------------------------------------------------------------------------
  // Shopping Cart Engine & Drawer
  // --------------------------------------------------------------------------
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartCountBadge = document.getElementById('cart-count');
  const cartDrawerCount = document.getElementById('cart-drawer-count');
  const cartSubtotalVal = document.getElementById('cart-subtotal-val');
  const cartDiscountRow = document.getElementById('cart-discount-row');
  const cartDiscountVal = document.getElementById('cart-discount-val');
  const cartTotalVal = document.getElementById('cart-total-val');
  const freeShippingCaption = document.getElementById('free-shipping-caption');
  const shippingProgressFill = document.getElementById('shipping-progress-fill');
  const applyPromoBtn = document.getElementById('apply-promo-btn');
  const promoInput = document.getElementById('promo-input');
  const promoStatusMsg = document.getElementById('promo-status-msg');
  const checkoutDrawerBtn = document.getElementById('checkout-drawer-btn');

  function openCartDrawer() {
    if (cartDrawerOverlay) cartDrawerOverlay.classList.add('open');
  }

  function closeCartDrawer() {
    if (cartDrawerOverlay) cartDrawerOverlay.classList.remove('open');
  }

  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCartDrawer);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);
  if (cartDrawerOverlay) {
    cartDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === cartDrawerOverlay) closeCartDrawer();
    });
  }

  window.addProductToBag = function(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const shapeEl = document.getElementById(`shape-sel-${productId}`);
    const lengthEl = document.getElementById(`length-sel-${productId}`);

    const selectedShape = shapeEl ? shapeEl.value : (product.defaultShape || 'Standard');
    const selectedLength = lengthEl ? lengthEl.value : (product.defaultLength || 'Universal');

    const itemKey = `${productId}-${selectedShape}-${selectedLength}-${state.userSizing}`;
    const existing = state.cart.find(item => item.cartItemId === itemKey);

    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({
        cartItemId: itemKey,
        id: product.id,
        name: product.name,
        shape: selectedShape,
        length: selectedLength,
        size: state.userSizing,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    saveCart();
    renderCart();
    openCartDrawer();
    showToast(`Added ${product.name} to Bag!`, 'ri-shopping-bag-3-fill');
  };

  window.quickAddToCart = function(productId) {
    addProductToBag(productId);
  };

  function saveCart() {
    localStorage.setItem('luxeclaws_cart', JSON.stringify(state.cart));
  }

  function renderCart() {
    const totalCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);
    if (cartCountBadge) cartCountBadge.textContent = totalCount;
    if (cartDrawerCount) cartDrawerCount.textContent = totalCount;

    if (!cartItemsList) return;

    if (state.cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <i class="ri-shopping-bag-3-line"></i>
          <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.4rem;">Your bag is empty</h4>
          <p style="font-size: 0.85rem;">Discover our sculpted nail sets and curate your dream collection.</p>
          <a href="#catalog" class="btn btn-gold" onclick="closeCartDrawer()" style="margin-top: 1.2rem; padding: 0.6rem 1.2rem; font-size: 0.82rem;">Explore Drops</a>
        </div>
      `;
      if (cartSubtotalVal) cartSubtotalVal.textContent = '$0.00';
      if (cartTotalVal) cartTotalVal.textContent = '$0.00';
      if (freeShippingCaption) freeShippingCaption.textContent = 'Add $50.00 more for Free Shipping!';
      if (shippingProgressFill) shippingProgressFill.style.width = '0%';
      return;
    }

    // Render Items
    cartItemsList.innerHTML = state.cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="cart-item-spec">${item.shape} • ${item.length} • Size ${item.size}</div>
          <div class="cart-qty-row">
            <button class="qty-btn" onclick="updateItemQty('${item.cartItemId}', -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateItemQty('${item.cartItemId}', 1)">+</button>
          </div>
        </div>
        <div class="cart-item-price-side">
          <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          <button class="remove-item-btn" onclick="removeItemFromCart('${item.cartItemId}')">
            <i class="ri-delete-bin-line"></i> Remove
          </button>
        </div>
      </div>
    `).join('');

    // Upsell recommendation in cart if prep kit isn't included
    const hasPrepKit = state.cart.some(item => item.id === 'prod-07');
    if (!hasPrepKit) {
      const upsellDiv = document.createElement('div');
      upsellDiv.style.cssText = 'background: rgba(212, 175, 55, 0.08); border: 1px dashed var(--border-gold); padding: 0.8rem; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;';
      upsellDiv.innerHTML = `
        <div style="font-size: 0.78rem;">
          <strong style="color: var(--gold-light);">Add Salon Prep & Care Kit</strong>
          <div style="color: var(--text-secondary);">$16.00 • Extra glue & buffer</div>
        </div>
        <button class="btn btn-secondary" onclick="quickAddToCart('prod-07')" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">+ Add</button>
      `;
      cartItemsList.appendChild(upsellDiv);
    }

    // Totals Calculation
    const subtotal = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let discount = 0;
    if (state.appliedPromo && state.promoDiscounts[state.appliedPromo]) {
      discount = subtotal * state.promoDiscounts[state.appliedPromo];
    }

    const freeShippingThreshold = 50.00;
    const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

    if (subtotal >= freeShippingThreshold) {
      if (freeShippingCaption) freeShippingCaption.innerHTML = '🎉 <strong style="color: var(--gold-light);">Congratulations! You unlocked FREE Insured Shipping</strong>';
      if (shippingProgressFill) {
        shippingProgressFill.style.width = '100%';
        shippingProgressFill.style.background = 'linear-gradient(90deg, #2ec4b6, #d4af37)';
      }
    } else {
      const needed = (freeShippingThreshold - subtotal).toFixed(2);
      if (freeShippingCaption) freeShippingCaption.textContent = `Add $${needed} more for Free Shipping!`;
      if (shippingProgressFill) {
        shippingProgressFill.style.width = `${progressPercent}%`;
        shippingProgressFill.style.background = 'var(--pink-gradient)';
      }
    }

    if (cartSubtotalVal) cartSubtotalVal.textContent = `$${subtotal.toFixed(2)}`;
    
    if (discount > 0) {
      if (cartDiscountRow) cartDiscountRow.style.display = 'flex';
      if (cartDiscountVal) cartDiscountVal.textContent = `-$${discount.toFixed(2)}`;
    } else {
      if (cartDiscountRow) cartDiscountRow.style.display = 'none';
    }

    const total = Math.max(0, subtotal - discount);
    if (cartTotalVal) cartTotalVal.textContent = `$${total.toFixed(2)}`;
  }

  window.updateItemQty = function(cartItemId, delta) {
    const item = state.cart.find(i => i.cartItemId === cartItemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      state.cart = state.cart.filter(i => i.cartItemId !== cartItemId);
    }
    saveCart();
    renderCart();
  };

  window.removeItemFromCart = function(cartItemId) {
    state.cart = state.cart.filter(i => i.cartItemId !== cartItemId);
    saveCart();
    renderCart();
    showToast('Item removed from Bag');
  };

  // Promo Code Engine
  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (!code) return;

      if (state.promoDiscounts[code] !== undefined) {
        state.appliedPromo = code;
        if (promoStatusMsg) {
          promoStatusMsg.style.display = 'block';
          promoStatusMsg.textContent = `✨ Coupon '${code}' applied (${(state.promoDiscounts[code] * 100)}% discount)!`;
        }
        renderCart();
        showToast(`Promo code '${code}' applied!`, 'ri-price-tag-3-fill');
      } else {
        if (promoStatusMsg) {
          promoStatusMsg.style.display = 'block';
          promoStatusMsg.style.color = 'var(--pink-accent)';
          promoStatusMsg.textContent = `Invalid code. Try GLAM15 for 15% off.`;
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // Multi-Step Checkout Modal Controller
  // --------------------------------------------------------------------------
  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutCloseBtn = document.getElementById('checkout-close-btn');
  const gotoStep2Btn = document.getElementById('goto-step-2-btn');
  const backtoStep1Btn = document.getElementById('backto-step-1-btn');
  const gotoStep3Btn = document.getElementById('goto-step-3-btn');
  const backtoStep2Btn = document.getElementById('backto-step-2-btn');
  const placeOrderBtn = document.getElementById('place-order-btn');
  const orderSuccessFinishBtn = document.getElementById('order-success-finish-btn');
  const checkoutFinalTotal = document.getElementById('checkout-final-total');
  const confirmedOrderId = document.getElementById('confirmed-order-id');

  function openCheckout() {
    if (state.cart.length === 0) {
      showToast('Your bag is empty! Add sets before checking out.', 'ri-alert-line');
      return;
    }
    closeCartDrawer();
    setCheckoutStep(1);

    // Auto-fill logged in user info if present
    if (state.user) {
      const nameParts = state.user.name.split(' ');
      const shipFname = document.getElementById('ship-fname');
      const shipLname = document.getElementById('ship-lname');
      if (shipFname) shipFname.value = nameParts[0] || 'Anastasia';
      if (shipLname) shipLname.value = nameParts.slice(1).join(' ') || 'Vance';
      const checkoutSizeProfile = document.getElementById('checkout-size-profile');
      if (checkoutSizeProfile && state.user.size) {
        checkoutSizeProfile.value = state.user.size;
      }
    }

    if (checkoutModal) checkoutModal.classList.add('open');
  }

  function closeCheckout() {
    if (checkoutModal) checkoutModal.classList.remove('open');
  }

  function setCheckoutStep(step) {
    state.checkout.step = step;
    
    // Update Stepper Navigation
    const s1 = document.getElementById('step-nav-1');
    const s2 = document.getElementById('step-nav-2');
    const s3 = document.getElementById('step-nav-3');

    [s1, s2, s3].forEach(s => s && s.classList.remove('active', 'done'));

    if (step === 1) {
      if (s1) s1.classList.add('active');
    } else if (step === 2) {
      if (s1) s1.classList.add('done');
      if (s2) s2.classList.add('active');
    } else if (step === 3) {
      if (s1) s1.classList.add('done');
      if (s2) s2.classList.add('done');
      if (s3) s3.classList.add('active');
    }

    // Show Panes
    const p1 = document.getElementById('step-pane-1');
    const p2 = document.getElementById('step-pane-2');
    const p3 = document.getElementById('step-pane-3');
    const pSuccess = document.getElementById('step-pane-success');

    [p1, p2, p3, pSuccess].forEach(p => p && p.classList.remove('active'));

    if (step === 1 && p1) p1.classList.add('active');
    if (step === 2 && p2) p2.classList.add('active');
    if (step === 3 && p3) {
      p3.classList.add('active');
      calculateCheckoutTotal();
    }
    if (step === 4 && pSuccess) pSuccess.classList.add('active');
  }

  function calculateCheckoutTotal() {
    const subtotal = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let discount = 0;
    if (state.appliedPromo && state.promoDiscounts[state.appliedPromo]) {
      discount = subtotal * state.promoDiscounts[state.appliedPromo];
    }
    
    let shipping = subtotal >= 50.00 ? 0.00 : 4.95;
    if (state.checkout.shippingSpeed === 'rush') {
      shipping = 14.95;
    }

    const grandTotal = Math.max(0, subtotal - discount) + shipping;
    if (checkoutFinalTotal) checkoutFinalTotal.textContent = `$${grandTotal.toFixed(2)}`;
    return grandTotal;
  }

  if (checkoutDrawerBtn) checkoutDrawerBtn.addEventListener('click', openCheckout);
  if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', closeCheckout);

  if (gotoStep2Btn) {
    gotoStep2Btn.addEventListener('click', () => {
      setCheckoutStep(2);
    });
  }
  if (backtoStep1Btn) {
    backtoStep1Btn.addEventListener('click', () => setCheckoutStep(1));
  }

  // Shipping Speed Radio change
  document.querySelectorAll('input[name="shipping-speed"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.checkout.shippingSpeed = e.target.value;
    });
  });

  if (gotoStep3Btn) {
    gotoStep3Btn.addEventListener('click', () => {
      setCheckoutStep(3);
    });
  }
  if (backtoStep2Btn) {
    backtoStep2Btn.addEventListener('click', () => setCheckoutStep(2));
  }

  // Modal Payment Method Handling
  let modalSelectedPayment = 'upi';
  window.selectModalPay = function(method) {
    modalSelectedPayment = method;
    ['upi', 'card', 'cod'].forEach(m => {
      const btn = document.getElementById(`modal-pay-${m}`);
      const pane = document.getElementById(`modal-pane-${m}`);
      if (btn) {
        btn.classList.toggle('active', m === method);
        btn.style.borderColor = (m === method) ? 'var(--gold-primary)' : 'var(--border-subtle)';
      }
      if (pane) pane.style.display = (m === method) ? 'block' : 'none';
    });

    const label = document.getElementById('modal-submit-label');
    if (label) {
      if (method === 'upi') label.textContent = 'Pay via UPI & Sculpt Nails';
      else if (method === 'card') label.textContent = 'Pay with Card & Sculpt Nails';
      else if (method === 'cod') label.textContent = 'Place Order (Pay on Delivery)';
    }
  };

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
      placeOrderBtn.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Sculpting Order...`;
      placeOrderBtn.disabled = true;

      const grandTotal = calculateCheckoutTotal();
      const randomOrderNum = Math.floor(100000 + Math.random() * 900000);
      const orderId = `LC-${randomOrderNum}`;

      // Save order to localStorage for Admin visibility
      const existingOrders = JSON.parse(localStorage.getItem('luxeclaws_orders') || '[]');
      const shipFname = document.getElementById('ship-fname')?.value || 'Valued';
      const shipLname = document.getElementById('ship-lname')?.value || 'Client';
      const shipAddr = document.getElementById('ship-address')?.value || '742 Evergreen Terrace';
      const shipCity = document.getElementById('ship-city')?.value || 'Los Angeles';
      const shipState = document.getElementById('ship-state')?.value || 'CA';
      const shipZip = document.getElementById('ship-zip')?.value || '90210';

      let payMethodTitle = 'Pay with UPI (GPay / PhonePe)';
      let payStatus = 'Paid';
      if (modalSelectedPayment === 'card') {
        payMethodTitle = 'Credit / Debit Card (•••• 8829)';
        payStatus = 'Paid';
      } else if (modalSelectedPayment === 'cod') {
        payMethodTitle = 'Pay on Delivery (Cash / Digital COD)';
        payStatus = 'Pending on Doorstep Delivery';
      }

      const newOrderRecord = {
        id: orderId,
        date: new Date().toLocaleString(),
        customer: `${shipFname} ${shipLname}`,
        email: state.user?.email || 'customer@example.com',
        shippingAddress: `${shipAddr}, ${shipCity}, ${shipState} ${shipZip}`,
        items: [...state.cart],
        total: grandTotal,
        paymentMethod: payMethodTitle,
        paymentStatus: payStatus,
        speed: state.checkout.shippingSpeed,
        status: 'In Sculpting'
      };

      existingOrders.unshift(newOrderRecord);
      localStorage.setItem('luxeclaws_orders', JSON.stringify(existingOrders));

      setTimeout(() => {
        placeOrderBtn.disabled = false;
        placeOrderBtn.innerHTML = `<i class="ri-check-line"></i> Complete Order & Sculpt My Nails`;
        
        if (confirmedOrderId) confirmedOrderId.textContent = `ORDER #${orderId}`;

        // Clear Cart
        state.cart = [];
        saveCart();
        renderCart();

        setCheckoutStep(4);
        showToast('Order Confirmed! Your bespoke nails are being prepared! 💅', 'ri-heart-3-fill');
      }, 1200);
    });
  }

  if (orderSuccessFinishBtn) {
    orderSuccessFinishBtn.addEventListener('click', () => {
      closeCheckout();
    });
  }

  // --------------------------------------------------------------------------
  // Quick View Modal
  // --------------------------------------------------------------------------
  const quickViewModal = document.getElementById('quick-view-modal');
  const quickViewContent = document.getElementById('quick-view-content');

  window.openQuickView = function(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product || !quickViewContent || !quickViewModal) return;

    quickViewContent.innerHTML = `
      <button class="modal-close-btn" onclick="closeQuickView()"><i class="ri-close-line"></i></button>
      <div class="quick-view-grid">
        <div>
          <img src="${product.image}" alt="${product.name}" class="quick-view-img">
        </div>
        <div>
          ${product.badge ? `<span class="badge badge-gold" style="margin-bottom: 0.8rem;">${product.badge}</span>` : ''}
          <h2 style="font-size: 1.8rem; margin-bottom: 0.3rem;">${product.name}</h2>
          <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 1rem;">${product.subtitle || 'Sculpted Japanese Gel Set'}</p>

          <div style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700; color: var(--gold-light); margin-bottom: 1.2rem;">
            $${product.price.toFixed(2)}
          </div>

          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.4rem;">
            ${product.description || 'Individually sculpted with 5 layers of salon-grade Japanese builder gel and finished with reinforced durability.'}
          </p>

          <div style="background: var(--bg-surface-elevated); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.85rem; margin-bottom: 0.5rem; color: var(--gold-light);">What's Included:</h4>
            <ul style="font-size: 0.8rem; color: var(--text-secondary); padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.3rem;">
              ${(product.included || ['10 Custom Sized Press-On Nails', 'Full Pro Prep Kit with Glue & Tabs', 'Velvet Storage Case']).map(inc => `<li>${inc}</li>`).join('')}
            </ul>
          </div>

          <button class="btn btn-gold" onclick="addProductToBag('${product.id}'); closeQuickView();" style="width: 100%; padding: 0.9rem;">
            <i class="ri-shopping-bag-3-line"></i> Add To Bag • $${product.price.toFixed(2)}
          </button>
        </div>
      </div>
    `;

    quickViewModal.classList.add('open');
  };

  window.closeQuickView = function() {
    if (quickViewModal) quickViewModal.classList.remove('open');
  };

  if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) closeQuickView();
    });
  }

  // --------------------------------------------------------------------------
  // Initialization
  // --------------------------------------------------------------------------
  renderProducts();
  renderReviews();
  renderCart();
  updateWishlistBadge();
  calculateSizeMatch();
});
