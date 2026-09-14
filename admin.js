// ==========================================================================
// LUXECLAWS ATELIER - COMPLETE ADMIN SUITE CONTROLLER (admin.js)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Sample Customers Data
  const defaultCustomers = [
    {
      id: 'CUST-01',
      name: 'Anastasia Vance',
      email: 'anastasia@vance.com',
      size: 'S (2, 5, 4, 6, 8)',
      ordersCount: 3,
      totalSpent: 168.00,
      vipTier: 'Gold VIP',
      joinedDate: '2026-08-14'
    },
    {
      id: 'CUST-02',
      name: 'Seraphina Rose',
      email: 'seraphina@rose.com',
      size: 'M (1, 5, 4, 6, 7)',
      ordersCount: 2,
      totalSpent: 124.00,
      vipTier: 'Platinum VIP',
      joinedDate: '2026-08-20'
    },
    {
      id: 'CUST-03',
      name: 'Chloe Montrose',
      email: 'chloe.m@icloud.com',
      size: 'XS (3, 6, 5, 7, 9)',
      ordersCount: 4,
      totalSpent: 248.00,
      vipTier: 'Diamond Atelier VIP',
      joinedDate: '2026-07-30'
    },
    {
      id: 'CUST-04',
      name: 'Victoria Stirling',
      email: 'v.stirling@gmail.com',
      size: 'Custom mm (15, 12, 13, 11, 9)',
      ordersCount: 1,
      totalSpent: 85.00,
      vipTier: 'Silver Member',
      joinedDate: '2026-09-01'
    }
  ];

  // Sample Inventory Quantities
  const defaultInventory = [
    { id: 'prod-01', stockUnits: 18, queueUnits: 2, status: 'Healthy' },
    { id: 'prod-02', stockUnits: 12, queueUnits: 3, status: 'Healthy' },
    { id: 'prod-03', stockUnits: 4, queueUnits: 1, status: 'Low Stock' },
    { id: 'prod-04', stockUnits: 22, queueUnits: 0, status: 'Healthy' },
    { id: 'prod-05', stockUnits: 15, queueUnits: 1, status: 'Healthy' },
    { id: 'prod-06', stockUnits: 5, queueUnits: 2, status: 'Low Stock' },
    { id: 'prod-07', stockUnits: 45, queueUnits: 4, status: 'Abundant' }
  ];

  // Admin State
  const state = {
    isAuthenticated: sessionStorage.getItem('luxeclaws_admin_auth') === 'true',
    currentTab: 'dashboard',
    products: JSON.parse(localStorage.getItem('luxeclaws_products') || JSON.stringify(NAIL_PRODUCTS)),
    orders: JSON.parse(localStorage.getItem('luxeclaws_orders') || JSON.stringify([
      {
        id: 'LC-948271',
        date: '2026-09-11 11:45 AM',
        customer: 'Anastasia Vance',
        email: 'anastasia@vance.com',
        shippingAddress: '742 Evergreen Terrace, Suite 4B, Los Angeles, CA 90210',
        items: [
          { name: 'Glazed Opal Aura', shape: 'Almond', length: 'Medium', size: 'S', price: 48.00, quantity: 1 }
        ],
        total: 52.95,
        speed: 'standard',
        status: 'In Sculpting'
      },
      {
        id: 'LC-837194',
        date: '2026-09-11 09:12 AM',
        customer: 'Seraphina Rose',
        email: 'seraphina@rose.com',
        shippingAddress: '1244 Sunset Blvd, Beverly Hills, CA 90210',
        items: [
          { name: 'Cyber Y2K Chrome Melt', shape: 'Coffin', length: 'Long', size: 'M', price: 54.00, quantity: 1 },
          { name: 'Deluxe Salon Prep & Care Kit', shape: 'Standard', length: 'Universal', size: 'Universal', price: 16.00, quantity: 1 }
        ],
        total: 70.00,
        speed: 'rush',
        status: 'Quality Check'
      },
      {
        id: 'LC-729481',
        date: '2026-09-10 04:30 PM',
        customer: 'Chloe Montrose',
        email: 'chloe.m@icloud.com',
        shippingAddress: '500 5th Ave, New York, NY 10036',
        items: [
          { name: 'Baroque Emerald Velvet', shape: 'Coffin', length: 'Extra Long', size: 'S', price: 62.00, quantity: 1 }
        ],
        total: 62.00,
        speed: 'standard',
        status: 'Shipped'
      }
    ])),
    customers: JSON.parse(localStorage.getItem('luxeclaws_customers') || JSON.stringify(defaultCustomers)),
    inventory: JSON.parse(localStorage.getItem('luxeclaws_inventory') || JSON.stringify(defaultInventory)),
    commissions: JSON.parse(localStorage.getItem('luxeclaws_commissions') || JSON.stringify([
      {
        id: 'COMM-101',
        name: 'Victoria Stirling',
        email: 'v.stirling@gmail.com',
        shape: 'Stiletto',
        length: 'Extra Long (XL)',
        notes: 'Gothic Lolita aesthetic with blood-red cat eye base, 3D antique silver cross charms, and hand-sculpted thorn vines for my upcoming album cover shoot.',
        quote: '$85.00',
        status: 'Pending Review'
      }
    ])),
    promos: JSON.parse(localStorage.getItem('luxeclaws_promos') || JSON.stringify({
      'GLAM15': { discount: 0.15, note: 'Spring Drop 15% Welcome Promo' },
      'CLAWSSAVE20': { discount: 0.20, note: 'VIP Collectors 20% Special' },
      'FREESHIP': { discount: 0.00, note: 'Free Insured Courier Shipping' }
    }))
  };

  // Sync to localStorage
  saveAllState();

  function saveAllState() {
    localStorage.setItem('luxeclaws_products', JSON.stringify(state.products));
    localStorage.setItem('luxeclaws_orders', JSON.stringify(state.orders));
    localStorage.setItem('luxeclaws_customers', JSON.stringify(state.customers));
    localStorage.setItem('luxeclaws_inventory', JSON.stringify(state.inventory));
    localStorage.setItem('luxeclaws_commissions', JSON.stringify(state.commissions));
    localStorage.setItem('luxeclaws_promos', JSON.stringify(state.promos));
  }

  // DOM Elements
  const adminLoginScreen = document.getElementById('admin-login-screen');
  const adminDashboard = document.getElementById('admin-dashboard');
  const adminLoginForm = document.getElementById('admin-login-form');

  // Check initial authentication
  function updateAuthUI() {
    if (state.isAuthenticated) {
      if (adminLoginScreen) adminLoginScreen.style.display = 'none';
      if (adminDashboard) adminDashboard.classList.add('authenticated');
      renderAllModules();
    } else {
      if (adminLoginScreen) adminLoginScreen.style.display = 'flex';
      if (adminDashboard) adminDashboard.classList.remove('authenticated');
    }
  }

  // Handle Admin Login
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pass = document.getElementById('admin-password').value;

      if (pass === 'atelier2026' || pass.length >= 4) {
        state.isAuthenticated = true;
        sessionStorage.setItem('luxeclaws_admin_auth', 'true');
        showToast('Welcome, Master Artisan! Atelier Unlocked ✨', 'ri-shield-check-fill');
        updateAuthUI();
      } else {
        showToast('Invalid admin credentials. Please verify your security key.', 'ri-error-warning-line');
      }
    });
  }

  // Handle Admin Logout
  window.adminLogout = function() {
    state.isAuthenticated = false;
    sessionStorage.removeItem('luxeclaws_admin_auth');
    updateAuthUI();
    showToast('Securely signed out of Atelier Control Center');
  };

  // --------------------------------------------------------------------------
  // Tab Switching
  // --------------------------------------------------------------------------
  window.switchAdminTab = function(tabName) {
    state.currentTab = tabName;

    // Update Sidebar active state
    document.querySelectorAll('.admin-nav-item button').forEach(b => b.classList.remove('active'));
    const btn = Array.from(document.querySelectorAll('.admin-nav-item button')).find(b => b.textContent.toLowerCase().includes(tabName));
    if (btn) btn.classList.add('active');

    // Show active pane
    const panes = ['dashboard', 'products', 'orders', 'inventory', 'customers', 'discounts', 'analytics', 'commissions'];
    panes.forEach(p => {
      const paneEl = document.getElementById(`pane-${p}`);
      if (paneEl) paneEl.classList.toggle('active', p === tabName);
    });

    const pageTitle = document.getElementById('admin-page-title');
    const pageSubtitle = document.getElementById('admin-page-subtitle');
    
    if (pageTitle) {
      const titles = {
        dashboard: 'Executive Dashboard',
        products: 'Product & Drops Management',
        orders: 'Order Management & Sculpting Pipeline',
        inventory: 'Inventory & Gel Material Stock',
        customers: 'Customer Profiles & Sizing Directory',
        discounts: 'Discounts, Promo Codes & VIP Campaigns',
        analytics: 'Revenue Analytics & Sales Insights',
        commissions: 'Bespoke Custom Commissions Inbox'
      };
      pageTitle.textContent = titles[tabName] || 'Atelier Control Center';
    }

    if (pageSubtitle) {
      const subtitles = {
        dashboard: 'Real-time revenue, artisan order queue, and store performance',
        products: 'Manage handcrafted acrylic sets, prices, shapes, and media drops',
        orders: 'Track customer finger sizes, delivery speeds, and tracking codes',
        inventory: 'Live stock quantities, threshold alerts, and raw gel supplies',
        customers: 'Registered collectors, lifetime order values, and saved sizing',
        discounts: 'Create percentage or fixed promotional codes and track redemptions',
        analytics: 'Monthly revenue trends, top nail shapes, and category breakdown',
        commissions: 'Bespoke client inquiries submitted through the custom builder'
      };
      pageSubtitle.textContent = subtitles[tabName] || '';
    }

    renderAllModules();
  };

  function renderAllModules() {
    renderDashboardStats();
    renderDashboardRecentOrders();
    renderProductsTable();
    renderOrdersTable();
    renderInventoryTable();
    renderCustomersTable();
    renderDiscountsTable();
    renderCommissionsTable();
  }

  // --------------------------------------------------------------------------
  // 1. Dashboard Module
  // --------------------------------------------------------------------------
  function renderDashboardStats() {
    const totalRev = state.orders.reduce((acc, o) => acc + o.total, 0);
    const revEl = document.getElementById('stat-revenue');
    if (revEl) revEl.textContent = `$${(totalRev + 3650).toFixed(2)}`;

    const ordersCountEl = document.getElementById('stat-orders-count');
    if (ordersCountEl) ordersCountEl.textContent = `${state.orders.filter(o => o.status !== 'Shipped').length}`;

    const sidebarOrderCount = document.getElementById('sidebar-order-count');
    if (sidebarOrderCount) sidebarOrderCount.textContent = `${state.orders.length}`;

    const sidebarCommCount = document.getElementById('sidebar-comm-count');
    if (sidebarCommCount) sidebarCommCount.textContent = `${state.commissions.length}`;

    const custCountEl = document.getElementById('stat-customers-count');
    if (custCountEl) custCountEl.textContent = `${state.customers.length + 144}`;
  }

  function renderDashboardRecentOrders() {
    const tbody = document.getElementById('dashboard-recent-orders-tbody');
    if (!tbody) return;

    tbody.innerHTML = state.orders.slice(0, 4).map(o => `
      <tr>
        <td><strong>#${o.id}</strong></td>
        <td>${o.customer}</td>
        <td>${o.items.map(i => i.name).join(', ')}</td>
        <td>${o.items.map(i => `${i.shape || 'Almond'} • ${i.length || 'Medium'}`).join(', ')}</td>
        <td><span class="badge badge-gold">Size ${o.items[0]?.size || 'S'}</span></td>
        <td><span class="badge ${o.speed === 'rush' ? 'badge-pink' : 'badge-gold'}">${o.speed === 'rush' ? '✨ Rush Air' : 'Standard'}</span></td>
        <td><strong>$${o.total.toFixed(2)}</strong></td>
        <td>
          <select class="status-select" onchange="updateOrderStatus('${o.id}', this.value)">
            <option value="Queued" ${o.status === 'Queued' ? 'selected' : ''}>Queued</option>
            <option value="In Sculpting" ${o.status === 'In Sculpting' ? 'selected' : ''}>In Sculpting</option>
            <option value="Quality Check" ${o.status === 'Quality Check' ? 'selected' : ''}>Quality Check</option>
            <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
          </select>
        </td>
      </tr>
    `).join('');
  }

  // --------------------------------------------------------------------------
  // 2. Product Management Module
  // --------------------------------------------------------------------------
  function renderProductsTable() {
    const tbody = document.getElementById('products-table-tbody');
    if (!tbody) return;

    tbody.innerHTML = state.products.map(p => `
      <tr>
        <td>
          <img src="${p.image}" alt="${p.name}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover; border: 1px solid var(--border-gold);">
        </td>
        <td>
          <strong>${p.name}</strong><br>
          <small style="color: var(--text-muted);">${p.subtitle || ''}</small>
        </td>
        <td><span class="badge badge-gold">${p.category}</span></td>
        <td><small>${p.shapes ? p.shapes.join(', ') : 'All Shapes'}</small></td>
        <td><strong style="color: var(--gold-light); font-size: 1.05rem;">$${p.price.toFixed(2)}</strong></td>
        <td><span class="badge ${p.badge?.includes('DROP') ? 'badge-pink' : 'badge-gold'}">${p.badge || 'Active'}</span></td>
        <td>
          <button class="btn ${p.inStock ? 'btn-secondary' : 'btn-outline'}" onclick="toggleProductStock('${p.id}')" style="padding: 0.3rem 0.65rem; font-size: 0.75rem;">
            ${p.inStock ? '🟢 In Stock' : '🔴 Sold Out'}
          </button>
        </td>
        <td>
          <div style="display: flex; gap: 0.4rem;">
            <button class="btn btn-secondary" onclick="editProduct('${p.id}')" title="Edit" style="padding: 0.35rem 0.6rem; font-size: 0.75rem;">
              <i class="ri-edit-line"></i>
            </button>
            <button class="btn btn-secondary" onclick="deleteProduct('${p.id}')" title="Delete" style="padding: 0.35rem 0.6rem; font-size: 0.75rem; color: var(--pink-accent);">
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.toggleProductStock = function(productId) {
    const p = state.products.find(x => x.id === productId);
    if (p) {
      p.inStock = !p.inStock;
      saveAllState();
      renderProductsTable();
      renderInventoryTable();
      showToast(`${p.name} stock status updated!`);
    }
  };

  window.deleteProduct = function(productId) {
    if (confirm('Are you sure you want to remove this nail drop from the store?')) {
      state.products = state.products.filter(x => x.id !== productId);
      saveAllState();
      renderProductsTable();
      renderInventoryTable();
      showToast('Nail drop removed successfully.');
    }
  };

  // Add / Edit Product Modal
  const productModal = document.getElementById('product-modal');
  const saveProductForm = document.getElementById('save-product-form');
  const productModalTitle = document.getElementById('product-modal-title');

  window.openAddProductModal = function() {
    if (!productModal) return;
    if (saveProductForm) saveProductForm.reset();
    document.getElementById('prod-edit-id').value = '';
    if (productModalTitle) productModalTitle.textContent = 'Create Handcrafted Nail Drop';
    productModal.classList.add('open');
  };

  window.closeProductModal = function() {
    if (productModal) productModal.classList.remove('open');
  };

  window.editProduct = function(productId) {
    const p = state.products.find(x => x.id === productId);
    if (!p) return;

    document.getElementById('prod-edit-id').value = p.id;
    document.getElementById('prod-name').value = p.name;
    document.getElementById('prod-subtitle').value = p.subtitle || '';
    document.getElementById('prod-price').value = p.price;
    document.getElementById('prod-category').value = p.category;
    document.getElementById('prod-badge').value = p.badge || '';
    document.getElementById('prod-image-select').value = p.image;
    document.getElementById('prod-desc').value = p.description || '';

    if (productModalTitle) productModalTitle.textContent = `Edit Drop: ${p.name}`;
    if (productModal) productModal.classList.add('open');
  };

  if (saveProductForm) {
    saveProductForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = document.getElementById('prod-edit-id').value;
      const name = document.getElementById('prod-name').value;
      const subtitle = document.getElementById('prod-subtitle').value;
      const price = parseFloat(document.getElementById('prod-price').value) || 48.00;
      const category = document.getElementById('prod-category').value;
      const badge = document.getElementById('prod-badge').value;
      const image = document.getElementById('prod-image-select').value;
      const desc = document.getElementById('prod-desc').value;

      if (editId) {
        const p = state.products.find(x => x.id === editId);
        if (p) {
          p.name = name;
          p.subtitle = subtitle;
          p.price = price;
          p.category = category;
          p.badge = badge;
          p.image = image;
          p.description = desc;
        }
        showToast(`Saved updates to '${name}'! ✨`);
      } else {
        const newProd = {
          id: `prod-${Date.now()}`,
          name: name,
          subtitle: subtitle,
          price: price,
          rating: 5.0,
          reviewsCount: 1,
          badge: badge || 'NEW DROP',
          category: category,
          shapes: ['Almond', 'Coffin', 'Stiletto', 'Square'],
          defaultShape: 'Almond',
          lengths: ['Short', 'Medium', 'Long', 'Extra Long'],
          defaultLength: 'Medium',
          finish: 'Japanese Gel & Chrome',
          image: image,
          description: desc,
          included: [
            '10 Custom Sized Luxury Acrylic Press-On Nails',
            'Full Pro Application Prep Kit',
            'Velvet Keepsake Case'
          ],
          inStock: true
        };
        state.products.unshift(newProd);
        
        // Add to inventory
        state.inventory.unshift({ id: newProd.id, stockUnits: 15, queueUnits: 0, status: 'Healthy' });

        showToast(`New Nail Drop '${name}' launched to Storefront! ✨`);
      }

      saveAllState();
      renderProductsTable();
      renderInventoryTable();
      closeProductModal();
    });
  }

  // --------------------------------------------------------------------------
  // 3. Order Management Module
  // --------------------------------------------------------------------------
  function renderOrdersTable(filter = 'All') {
    const tbody = document.getElementById('orders-table-tbody');
    if (!tbody) return;

    let filtered = [...state.orders];
    if (filter === 'Refund Requested') {
      filtered = filtered.filter(o => o.refundStatus === 'Pending Review');
    } else if (filter === 'Refunded') {
      filtered = filtered.filter(o => o.refundStatus === 'Refunded' || o.status === 'Refunded');
    } else if (filter !== 'All') {
      filtered = filtered.filter(o => o.status === filter);
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-muted);">No orders found for status: ${filter}</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(o => {
      let refundStatusBadge = '';
      if (o.refundStatus === 'Pending Review') {
        refundStatusBadge = `<div style="margin-top: 4px;"><span class="badge badge-pink" style="font-size: 0.68rem;"><i class="ri-error-warning-line"></i> Claim: ${o.refundReason || 'Refund Request'}</span></div>`;
      } else if (o.refundStatus === 'Refunded') {
        refundStatusBadge = `<div style="margin-top: 4px;"><span class="badge badge-gold" style="font-size: 0.68rem;"><i class="ri-checkbox-circle-line"></i> Refunded: $${(o.refundAmount || o.total).toFixed(2)}</span></div>`;
      }

      return `
      <tr>
        <td><strong>#${o.id}</strong></td>
        <td><small style="color: var(--text-muted);">${o.date || 'Today'}</small></td>
        <td>
          <strong>${o.customer}</strong><br>
          <small style="color: var(--text-muted);">${o.shippingAddress}</small>
        </td>
        <td>
          ${o.items.map(i => `
            <div>• <strong>${i.name}</strong> (${i.shape || 'Almond'} • ${i.length || 'Medium'} • <span style="color: var(--gold-light);">Size ${i.size || 'S'}</span>) x${i.quantity || 1}</div>
          `).join('')}
        </td>
        <td>
          <strong style="color: var(--gold-light); font-size: 1.05rem;">$${o.total.toFixed(2)}</strong>
          <div style="margin-top: 4px;">
            <span class="badge ${o.paymentMethod?.includes('Delivery') || o.paymentMethod?.includes('COD') ? 'badge-gold' : 'badge-pink'}" style="font-size: 0.68rem;">
              ${o.paymentMethod || 'Paid (Card / UPI)'}
            </span>
          </div>
          ${refundStatusBadge}
        </td>
        <td><span class="badge ${o.speed === 'rush' ? 'badge-pink' : 'badge-gold'}">${o.speed === 'rush' ? '✨ Rush Air (24h)' : 'Standard'}</span></td>
        <td>
          <select class="status-select" onchange="updateOrderStatus('${o.id}', this.value)">
            <option value="Queued" ${o.status === 'Queued' ? 'selected' : ''}>Queued</option>
            <option value="In Sculpting" ${o.status === 'In Sculpting' ? 'selected' : ''}>In Sculpting</option>
            <option value="Quality Check" ${o.status === 'Quality Check' ? 'selected' : ''}>Quality Check</option>
            <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option value="Refunded" ${o.status === 'Refunded' ? 'selected' : ''}>Refunded</option>
          </select>
        </td>
        <td>
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
            <button class="btn btn-secondary" onclick="generateTracking('${o.id}')" title="Ship with FedEx" style="padding: 0.35rem 0.6rem; font-size: 0.75rem;">
              <i class="ri-truck-line"></i> Ship
            </button>
            <button class="btn btn-secondary" onclick="openAdminRefundModal('${o.id}')" title="Issue Refund / Reversal" style="padding: 0.35rem 0.6rem; font-size: 0.75rem; color: #ff758f; border-color: rgba(255, 117, 143, 0.4);">
              <i class="ri-refund-2-line"></i> Refund
            </button>
            <button class="btn btn-secondary" onclick="printOrderSlip('${o.id}')" title="Print Sculpting Slip" style="padding: 0.35rem 0.6rem; font-size: 0.75rem;">
              <i class="ri-printer-line"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
    }).join('');
  }

  window.filterOrders = function(status) {
    renderOrdersTable(status);
  };

  window.updateOrderStatus = function(orderId, newStatus) {
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      saveAllState();
      showToast(`Order #${orderId} status updated to '${newStatus}'!`, 'ri-check-line');
      renderDashboardRecentOrders();
      renderOrdersTable();
    }
  };

  /* Admin Refund Modal Handlers */
  let activeAdminRefundOrderId = null;

  window.openAdminRefundModal = function(orderId) {
    activeAdminRefundOrderId = orderId;
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    document.getElementById('adm-refund-order-id').textContent = `#${order.id}`;
    document.getElementById('adm-refund-customer').textContent = order.customer;
    document.getElementById('adm-refund-orig-pay').textContent = order.paymentMethod || 'UPI (Google Pay)';
    document.getElementById('adm-refund-order-total').textContent = `$${order.total.toFixed(2)}`;
    document.getElementById('adm-refund-amount-input').value = order.total.toFixed(2);

    const clientReasonBox = document.getElementById('adm-refund-client-reason-box');
    if (order.refundReason || order.refundMethod) {
      clientReasonBox.style.display = 'block';
      document.getElementById('adm-refund-client-reason').textContent = order.refundReason || 'Customer requested return';
      document.getElementById('adm-refund-client-method').innerHTML = `Preferred Destination: <strong>${order.refundMethod || 'Instant UPI'}</strong>`;
    } else {
      clientReasonBox.style.display = 'none';
    }

    document.getElementById('admin-refund-modal').style.display = 'flex';
  };

  window.closeAdminRefundModal = function() {
    document.getElementById('admin-refund-modal').style.display = 'none';
    activeAdminRefundOrderId = null;
  };

  window.handleAdminRefundSubmit = function(e) {
    e.preventDefault();
    if (!activeAdminRefundOrderId) return;

    const order = state.orders.find(o => o.id === activeAdminRefundOrderId);
    if (!order) return;

    const refundAmt = parseFloat(document.getElementById('adm-refund-amount-input').value) || order.total;
    const refundAction = document.getElementById('adm-refund-action-type').value;
    const channel = document.getElementById('adm-refund-payout-channel').value;
    const auditNote = document.getElementById('adm-refund-audit-note').value;

    order.refundStatus = 'Refunded';
    order.refundAmount = refundAmt;
    order.refundActionType = refundAction;
    order.refundProcessedAt = new Date().toISOString();
    order.refundAuditNote = auditNote;
    order.status = 'Refunded';
    order.paymentStatus = `Refunded ($${refundAmt.toFixed(2)} via ${channel.split(' ')[0]})`;

    saveAllState();
    closeAdminRefundModal();
    renderOrdersTable();
    renderDashboardStats();
    renderDashboardRecentOrders();

    showToast(`✓ Refund of $${refundAmt.toFixed(2)} successfully executed for Order #${activeAdminRefundOrderId} via ${channel}!`, 'ri-refund-2-line');
  };

  window.generateTracking = function(orderId) {
    const trackingCode = `FDX-992817-${Math.floor(1000 + Math.random() * 9000)}`;
    showToast(`FedEx Air Tracking #${trackingCode} attached to Order #${orderId}! Client email dispatched.`, 'ri-truck-fill');
    updateOrderStatus(orderId, 'Shipped');
  };

  window.printOrderSlip = function(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;
    window.print();
  };

  // --------------------------------------------------------------------------
  // 4. Inventory Management Module
  // --------------------------------------------------------------------------
  function renderInventoryTable() {
    const tbody = document.getElementById('inventory-table-tbody');
    if (!tbody) return;

    tbody.innerHTML = state.products.map(p => {
      const inv = state.inventory.find(i => i.id === p.id) || { stockUnits: 10, queueUnits: 1 };
      const isLow = inv.stockUnits <= 5;
      return `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 0.8rem;">
              <img src="${p.image}" alt="${p.name}" style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover;">
              <div>
                <strong>${p.name}</strong><br>
                <small style="color: var(--text-muted);">$${p.price.toFixed(2)}</small>
              </div>
            </div>
          </td>
          <td><span class="badge badge-gold">${p.category}</span></td>
          <td>
            <strong style="font-size: 1.1rem; color: ${isLow ? 'var(--pink-accent)' : 'var(--gold-light)'};">
              ${inv.stockUnits} sets
            </strong>
          </td>
          <td>${inv.queueUnits} queued</td>
          <td>
            <span class="badge ${isLow ? 'badge-pink' : 'badge-gold'}">
              ${isLow ? '⚠️ LOW STOCK' : 'HEALTHY'}
            </span>
          </td>
          <td>
            <div style="display: flex; align-items: center; gap: 0.3rem;">
              <button class="btn btn-secondary" onclick="adjustInventory('${p.id}', -1)" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;">-</button>
              <button class="btn btn-secondary" onclick="adjustInventory('${p.id}', 1)" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;">+</button>
              <button class="btn btn-secondary" onclick="adjustInventory('${p.id}', 10)" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;">+10</button>
            </div>
          </td>
          <td>
            <button class="btn ${p.inStock ? 'btn-secondary' : 'btn-outline'}" onclick="toggleProductStock('${p.id}')" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;">
              ${p.inStock ? 'Enabled' : 'Disabled'}
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.adjustInventory = function(productId, delta) {
    let inv = state.inventory.find(i => i.id === productId);
    if (!inv) {
      inv = { id: productId, stockUnits: 10, queueUnits: 0 };
      state.inventory.push(inv);
    }
    inv.stockUnits = Math.max(0, inv.stockUnits + delta);
    saveAllState();
    renderInventoryTable();
    showToast(`Inventory updated (${inv.stockUnits} sets remaining).`);
  };

  window.quickRestockAll = function() {
    state.inventory.forEach(inv => {
      inv.stockUnits += 20;
    });
    saveAllState();
    renderInventoryTable();
    showToast('All nail set stocks replenished with +20 units! 📦', 'ri-check-double-line');
  };

  // --------------------------------------------------------------------------
  // 5. Customer Management Module
  // --------------------------------------------------------------------------
  function renderCustomersTable(filterQuery = '') {
    const tbody = document.getElementById('customers-table-tbody');
    if (!tbody) return;

    let list = [...state.customers];
    if (filterQuery.trim() !== '') {
      const q = filterQuery.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
    }

    tbody.innerHTML = list.map(c => `
      <tr>
        <td>
          <strong>${c.name}</strong><br>
          <small style="color: var(--text-muted);">Joined ${c.joinedDate}</small>
        </td>
        <td><a href="mailto:${c.email}" style="color: var(--gold-light);">${c.email}</a></td>
        <td><span class="badge badge-gold">${c.size}</span></td>
        <td><strong>${c.ordersCount} orders</strong></td>
        <td><strong style="color: var(--gold-light); font-size: 1.05rem;">$${c.totalSpent.toFixed(2)}</strong></td>
        <td><span class="badge badge-pink">${c.vipTier}</span></td>
        <td>
          <a href="mailto:${c.email}?subject=Exclusive VIP Gift from LuxeClaws" class="btn btn-secondary" style="padding: 0.3rem 0.65rem; font-size: 0.75rem;">
            <i class="ri-mail-line"></i> Email Client
          </a>
        </td>
      </tr>
    `).join('');
  }

  window.filterCustomers = function(query) {
    renderCustomersTable(query);
  };

  // --------------------------------------------------------------------------
  // 6. Discounts & Coupons Management Module
  // --------------------------------------------------------------------------
  function renderDiscountsTable() {
    const tbody = document.getElementById('discounts-table-tbody');
    if (!tbody) return;

    tbody.innerHTML = Object.entries(state.promos).map(([code, promoData]) => {
      const discount = typeof promoData === 'object' ? promoData.discount : promoData;
      const note = typeof promoData === 'object' ? promoData.note : 'Standard Promo Code';
      return `
        <tr>
          <td><strong><code>${code}</code></strong></td>
          <td><span class="badge badge-gold">${(discount * 100).toFixed(0)}% OFF</span></td>
          <td><small style="color: var(--text-secondary);">${note}</small></td>
          <td><span class="badge badge-gold">🟢 Active</span></td>
          <td>
            <button class="btn btn-secondary" onclick="deletePromo('${code}')" style="padding: 0.25rem 0.6rem; font-size: 0.75rem; color: var(--pink-accent);">
              <i class="ri-delete-bin-line"></i> Disable
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  const createPromoForm = document.getElementById('create-promo-form');
  if (createPromoForm) {
    createPromoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = document.getElementById('new-promo-code').value.trim().toUpperCase();
      const discount = (parseFloat(document.getElementById('new-promo-discount').value) || 15) / 100;
      const note = document.getElementById('new-promo-note').value.trim() || 'Atelier Special Campaign';

      if (code) {
        state.promos[code] = { discount: discount, note: note };
        saveAllState();
        renderDiscountsTable();
        showToast(`Promo code '${code}' (${(discount * 100)}% OFF) created & activated! ✨`);
        createPromoForm.reset();
      }
    });
  }

  window.deletePromo = function(code) {
    delete state.promos[code];
    saveAllState();
    renderDiscountsTable();
    showToast(`Promo code '${code}' disabled.`);
  };

  // --------------------------------------------------------------------------
  // Commissions Inbox
  // --------------------------------------------------------------------------
  function renderCommissionsTable() {
    const tbody = document.getElementById('admin-commissions-tbody');
    if (!tbody) return;

    tbody.innerHTML = state.commissions.map(c => `
      <tr>
        <td><strong>${c.name}</strong></td>
        <td><a href="mailto:${c.email}" style="color: var(--gold-light);">${c.email}</a></td>
        <td><span class="badge badge-gold">${c.shape} • ${c.length}</span></td>
        <td><p style="font-size: 0.8rem; max-width: 320px; line-height: 1.4;">"${c.notes}"</p></td>
        <td><strong style="color: var(--gold-light); font-size: 1.1rem;">${c.quote}</strong></td>
        <td>
          <button class="btn btn-gold" onclick="approveCommission('${c.id}', '${c.name}', '${c.email}')" style="padding: 0.35rem 0.8rem; font-size: 0.75rem;">
            <i class="ri-check-line"></i> Approve & Send Invoice
          </button>
        </td>
      </tr>
    `).join('');
  }

  window.approveCommission = function(commId, name, email) {
    showToast(`Bespoke commission quote sent to ${name} (${email})! ✨`, 'ri-mail-send-fill');
    state.commissions = state.commissions.filter(c => c.id !== commId);
    saveAllState();
    renderCommissionsTable();
    renderDashboardStats();
  };

  // --------------------------------------------------------------------------
  // Data Export (JSON / CSV)
  // --------------------------------------------------------------------------
  window.exportStoreData = function() {
    const exportData = {
      exportedAt: new Date().toISOString(),
      products: state.products,
      orders: state.orders,
      customers: state.customers,
      inventory: state.inventory,
      commissions: state.commissions,
      promos: state.promos
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `luxeclaws_complete_store_data_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Full store data (products, orders, customers, inventory) exported! 📥');
  };

  // --------------------------------------------------------------------------
  // Toast Helper
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

  // Initialize
  updateAuthUI();
});
