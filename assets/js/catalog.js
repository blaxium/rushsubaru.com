/**
 * ==============================================
 * File: catalog.js
 * Project: Zaza Rush Subaru
 * Developer: bguvava
 * Last Updated: January 30, 2026
 * Description: Parts Catalog functionality (CAT-001 to CAT-033)
 * - Search with instant filtering (CAT-001 to CAT-004)
 * - Category tabs with counts (CAT-005 to CAT-008)
 * - Filter sidebar (CAT-009 to CAT-016)
 * - View toggle persistence (CAT-017, CAT-018)
 * - Product cards and actions (CAT-019 to CAT-024)
 * - Pagination/Load more (CAT-025 to CAT-027)
 * - URL state management (CAT-033)
 * ==============================================
 */

'use strict';

const RushCatalog = (() => {
  // Configuration
  const CONFIG = {
    ITEMS_PER_PAGE: 12,
    DEBOUNCE_DELAY: 300,
    WHATSAPP_NUMBER: '263776381498',
    CATALOG_URL: 'data/catalog.json',
    STORAGE_KEYS: {
      VIEW_PREFERENCE: 'catalogViewPreference'
    },
    PLACEHOLDER_IMAGE: 'assets/images/catalog/placeholder.jpg',
    IMAGE_BASE_PATH: 'assets/images/catalog/'
  };

  // State
  let state = {
    products: [],
    filteredProducts: [],
    displayedCount: 0,
    currentCategory: 'parts',
    searchTerm: '',
    filters: {
      models: [],
      yearFrom: '',
      yearTo: '',
      conditions: [],
      priceMin: '',
      priceMax: '',
      inStockOnly: false
    },
    viewMode: 'grid',
    isLoading: true
  };

  // DOM Elements cache
  const elements = {};

  /**
   * Initialize the catalog
   */
  async function init() {
    cacheElements();
    
    // Check if we're on catalog page
    if (!elements.productGrid) {
      console.log('[Catalog] Not on catalog page, skipping init');
      return;
    }
    
    setupEventListeners();
    restoreViewPreference();
    restoreStateFromURL();
    populateYearDropdowns();
    
    try {
      await loadCatalogData();
      applyFilters();
      updateCategoryCounts();
      updateHeaderStats();
    } catch (error) {
      console.error('[Catalog] Failed to initialize:', error);
      showError('Failed to load catalog. Please refresh the page.');
    }
  }

  /**
   * Cache DOM elements for performance
   */
  function cacheElements() {
    elements.searchInput = document.getElementById('catalogSearch');
    elements.clearSearch = document.getElementById('clearSearch');
    elements.gridView = document.getElementById('gridView');
    elements.listView = document.getElementById('listView');
    elements.productGrid = document.getElementById('productGrid');
    elements.productList = document.getElementById('productList');
    elements.loadingState = document.getElementById('loadingState');
    elements.noResults = document.getElementById('noResults');
    elements.loadMoreWrapper = document.getElementById('loadMoreWrapper');
    elements.loadMoreBtn = document.getElementById('loadMoreBtn');
    elements.resultsCount = document.getElementById('resultsCount');
    elements.showingCount = document.getElementById('showingCount');
    elements.totalCount = document.getElementById('totalCount');
    elements.currentlyShowing = document.getElementById('currentlyShowing');
    elements.totalItems = document.getElementById('totalItems');
    elements.activeFilters = document.getElementById('activeFilters');
    elements.filterTags = document.getElementById('filterTags');
    elements.clearAllFilters = document.getElementById('clearAllFilters');
    elements.resetFiltersBtn = document.getElementById('resetFiltersBtn');
    elements.filterSidebar = document.getElementById('filterSidebar');
    elements.filterOverlay = document.getElementById('filterOverlay');
    elements.mobileFilterToggle = document.getElementById('mobileFilterToggle');
    elements.closeFilters = document.getElementById('closeFilters');
    elements.applyFilters = document.getElementById('applyFilters');
    elements.mobileResultCount = document.getElementById('mobileResultCount');
    elements.categoryTabs = document.getElementById('categoryTabs');
    elements.modelFilters = document.getElementById('modelFilters');
    elements.conditionFilters = document.getElementById('conditionFilters');
    elements.yearFrom = document.getElementById('yearFrom');
    elements.yearTo = document.getElementById('yearTo');
    elements.inStockOnly = document.getElementById('inStockOnly');
    elements.totalProducts = document.getElementById('totalProducts');
    elements.inStockCount = document.getElementById('inStockCount');
    
    // Quote modal elements
    elements.quoteModal = document.getElementById('quoteModal');
    elements.quoteForm = document.getElementById('quoteForm');
    elements.quoteProductImage = document.getElementById('quoteProductImage');
    elements.quoteProductTitle = document.getElementById('quoteProductTitle');
    elements.quoteProductSku = document.getElementById('quoteProductSku');
    elements.quoteProductPrice = document.getElementById('quoteProductPrice');
    elements.quoteProductId = document.getElementById('quoteProductId');
    elements.whatsappQuote = document.getElementById('whatsappQuote');
    
    // Quick view modal elements
    elements.quickViewModal = document.getElementById('quickViewModal');
    elements.quickViewImages = document.getElementById('quickViewImages');
    elements.quickViewTitle = document.getElementById('quickViewTitle');
    elements.quickViewDescription = document.getElementById('quickViewDescription');
    elements.quickViewPrice = document.getElementById('quickViewPrice');
    elements.quickViewWhatsApp = document.getElementById('quickViewWhatsApp');
    elements.quickViewQuote = document.getElementById('quickViewQuote');
  }

  /**
   * Setup event listeners
   */
  function setupEventListeners() {
    // Search - CAT-001 to CAT-004
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', debounce(handleSearch, CONFIG.DEBOUNCE_DELAY));
    }
    
    if (elements.clearSearch) {
      elements.clearSearch.addEventListener('click', clearSearch);
    }
    
    // View toggle - CAT-017, CAT-018
    if (elements.gridView) {
      elements.gridView.addEventListener('click', () => setViewMode('grid'));
    }
    
    if (elements.listView) {
      elements.listView.addEventListener('click', () => setViewMode('list'));
    }
    
    // Category tabs - CAT-005 to CAT-008
    if (elements.categoryTabs) {
      elements.categoryTabs.addEventListener('click', handleCategoryClick);
    }
    
    // Model filters - CAT-009
    if (elements.modelFilters) {
      elements.modelFilters.addEventListener('change', handleFilterChange);
    }
    
    // Condition filters - CAT-011
    if (elements.conditionFilters) {
      elements.conditionFilters.addEventListener('change', handleFilterChange);
    }
    
    // Year filters - CAT-010
    if (elements.yearFrom) {
      elements.yearFrom.addEventListener('change', handleFilterChange);
    }
    
    if (elements.yearTo) {
      elements.yearTo.addEventListener('change', handleFilterChange);
    }
    
    // In stock only
    if (elements.inStockOnly) {
      elements.inStockOnly.addEventListener('change', handleFilterChange);
    }
    if (elements.inStockOnly) {
      elements.inStockOnly.addEventListener('change', handleFilterChange);
    }
    
    // Clear all filters - CAT-013
    if (elements.clearAllFilters) {
      elements.clearAllFilters.addEventListener('click', clearAllFilters);
    }
    
    if (elements.resetFiltersBtn) {
      elements.resetFiltersBtn.addEventListener('click', clearAllFilters);
    }
    
    // Mobile filter toggle - CAT-015
    if (elements.mobileFilterToggle) {
      elements.mobileFilterToggle.addEventListener('click', openMobileFilters);
    }
    
    if (elements.closeFilters) {
      elements.closeFilters.addEventListener('click', closeMobileFilters);
    }
    
    if (elements.filterOverlay) {
      elements.filterOverlay.addEventListener('click', closeMobileFilters);
    }
    
    if (elements.applyFilters) {
      elements.applyFilters.addEventListener('click', () => {
        closeMobileFilters();
      });
    }
    
    // Load more - CAT-026
    if (elements.loadMoreBtn) {
      elements.loadMoreBtn.addEventListener('click', loadMoreProducts);
    }
    
    // Quote form - CAT-023
    if (elements.quoteForm) {
      elements.quoteForm.addEventListener('submit', handleQuoteSubmit);
    }
    
    if (elements.whatsappQuote) {
      elements.whatsappQuote.addEventListener('click', handleWhatsAppQuote);
    }
    
    // URL state - CAT-033
    window.addEventListener('popstate', handlePopState);
  }

  /**
   * Load catalog data from JSON - CAT-028, CAT-032
   */
  async function loadCatalogData() {
    showLoading(true);
    
    try {
      const response = await fetch(CONFIG.CATALOG_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      state.products = data.products || [];
      
      console.log(`[Catalog] Loaded ${state.products.length} products`);
    } catch (error) {
      console.error('[Catalog] Error loading catalog:', error);
      throw error;
    } finally {
      showLoading(false);
    }
  }

  /**
   * Apply all filters and update display
   */
  function applyFilters() {
    let filtered = [...state.products];
    
    // Filter by category - CAT-005 to CAT-008
    if (state.currentCategory) {
      filtered = filtered.filter(p => p.category === state.currentCategory);
    }
    
    // Filter by search term - CAT-002
    if (state.searchTerm) {
      const term = state.searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.models.some(m => m.toLowerCase().includes(term))
      );
    }
    
    // Filter by models - CAT-009
    if (state.filters.models.length > 0) {
      filtered = filtered.filter(p => 
        p.models.some(m => 
          state.filters.models.some(fm => 
            m.toLowerCase().includes(fm.toLowerCase())
          )
        )
      );
    }
    
    // Filter by year range - CAT-010
    if (state.filters.yearFrom) {
      filtered = filtered.filter(p => p.yearTo >= parseInt(state.filters.yearFrom));
    }
    
    if (state.filters.yearTo) {
      filtered = filtered.filter(p => p.yearFrom <= parseInt(state.filters.yearTo));
    }
    
    // Filter by condition - CAT-011
    if (state.filters.conditions.length > 0) {
      filtered = filtered.filter(p => state.filters.conditions.includes(p.condition));
    }
    
    // Filter in stock only
    if (state.filters.inStockOnly) {
      filtered = filtered.filter(p => p.inStock);
    }
    
    state.filteredProducts = filtered;
    state.displayedCount = 0;
    
    renderProducts();
    updateResultsCount();
    updateActiveFilters();
    updateURL();
    updateMobileResultCount();
  }

  /**
   * Render products to the grid/list
   */
  function renderProducts() {
    const products = state.filteredProducts.slice(0, state.displayedCount + CONFIG.ITEMS_PER_PAGE);
    state.displayedCount = products.length;
    
    if (state.viewMode === 'grid') {
      renderGridView(products);
    } else {
      renderListView(products);
    }
    
    // Show/hide empty state - CAT-029
    if (state.filteredProducts.length === 0) {
      if (elements.productGrid) elements.productGrid.classList.add('d-none');
      if (elements.productList) elements.productList.classList.add('d-none');
      if (elements.noResults) elements.noResults.classList.remove('d-none');
      if (elements.loadMoreWrapper) elements.loadMoreWrapper.classList.add('d-none');
    } else {
      if (elements.noResults) elements.noResults.classList.add('d-none');
      
      if (state.viewMode === 'grid') {
        if (elements.productGrid) elements.productGrid.classList.remove('d-none');
        if (elements.productList) elements.productList.classList.add('d-none');
      } else {
        if (elements.productGrid) elements.productGrid.classList.add('d-none');
        if (elements.productList) elements.productList.classList.remove('d-none');
      }
      
      // Show/hide load more - CAT-025, CAT-026
      if (state.displayedCount < state.filteredProducts.length) {
        if (elements.loadMoreWrapper) elements.loadMoreWrapper.classList.remove('d-none');
      } else {
        if (elements.loadMoreWrapper) elements.loadMoreWrapper.classList.add('d-none');
      }
    }
    
    updateResultsCount();
  }

  /**
   * Render grid view - CAT-019 to CAT-024
   */
  function renderGridView(products) {
    if (!elements.productGrid) return;
    elements.productGrid.innerHTML = products.map(product => createProductCard(product)).join('');
    
    // Add event listeners to new cards
    attachCardEventListeners();
  }

  /**
   * Render list view - CAT-017
   */
  function renderListView(products) {
    if (!elements.productList) return;
    elements.productList.innerHTML = products.map(product => createProductListItem(product)).join('');
    
    // Add event listeners to new items
    attachCardEventListeners();
  }

  /**
   * Create a product card HTML - CAT-019 to CAT-024
   */
  function createProductCard(product) {
    const priceDisplay = 'Contact for Quote';
    const priceClass = 'contact-price';
    const outOfStockClass = !product.inStock ? 'out-of-stock' : '';
    const conditionClass = `badge-${product.condition}`;
    const title = highlightSearchTerm(product.title);
    const modelsText = product.models.slice(0, 3).join(', ') + (product.models.length > 3 ? '...' : '');
    const imageUrl = product.images && product.images.length > 0 
      ? `${CONFIG.IMAGE_BASE_PATH}${product.images[0]}`
      : CONFIG.PLACEHOLDER_IMAGE;
    
    return `
      <div class="col-lg-4 col-md-6" data-aos="fade-up">
        <div class="product-card ${outOfStockClass}" data-product-id="${product.id}">
          <div class="product-card-image">
            <img src="${imageUrl}" 
                 alt="${product.title}" 
                 loading="lazy"
                 onerror="this.src='${CONFIG.PLACEHOLDER_IMAGE}'">
            <div class="product-condition">
              <span class="badge ${conditionClass}">${product.condition}</span>
            </div>
            <button class="quick-view-btn" data-product-id="${product.id}" aria-label="Quick view">
              <i class="fas fa-expand"></i>
            </button>
          </div>
          <div class="product-card-body">
            <span class="product-sku">SKU: ${product.sku}</span>
            <h5 class="product-title">${title}</h5>
            <p class="product-models">
              <i class="fas fa-car me-1"></i>${modelsText}
            </p>
            <p class="product-price ${priceClass}">${priceDisplay}</p>
            <div class="product-card-actions">
              <button class="btn btn-success btn-whatsapp" data-product-id="${product.id}">
                <i class="fab fa-whatsapp me-1"></i>Inquire
              </button>
              <button class="btn btn-outline-primary btn-quote" data-product-id="${product.id}">
                <i class="fas fa-file-invoice me-1"></i>Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Create a product list item HTML - CAT-017
   */
  function createProductListItem(product) {
    const priceDisplay = 'Contact for Quote';
    const priceClass = 'contact-price';
    const outOfStockClass = !product.inStock ? 'out-of-stock' : '';
    const conditionClass = `badge-${product.condition}`;
    const title = highlightSearchTerm(product.title);
    const imageUrl = product.images && product.images.length > 0 
      ? `${CONFIG.IMAGE_BASE_PATH}${product.images[0]}`
      : CONFIG.PLACEHOLDER_IMAGE;
    
    return `
      <div class="product-list-item ${outOfStockClass}" data-product-id="${product.id}">
        <div class="row g-0">
          <div class="col-md-3">
            <div class="product-list-image">
              <img src="${imageUrl}" 
                   alt="${product.title}" 
                   loading="lazy"
                   onerror="this.src='${CONFIG.PLACEHOLDER_IMAGE}'">
              <div class="product-condition">
                <span class="badge ${conditionClass}">${product.condition}</span>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="product-list-body">
              <span class="product-sku">SKU: ${product.sku}</span>
              <h5 class="product-title">${title}</h5>
              <p class="product-description">${product.description}</p>
              <p class="product-models mb-0">
                <i class="fas fa-car me-1 text-primary"></i>
                <small>${product.models.join(', ')}</small>
              </p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="product-list-actions">
              <p class="product-price ${priceClass} mb-2">${priceDisplay}</p>
              <div class="btn-group-vertical w-100">
                <button class="btn btn-success btn-sm btn-whatsapp" data-product-id="${product.id}">
                  <i class="fab fa-whatsapp me-1"></i>Inquire
                </button>
                <button class="btn btn-outline-primary btn-sm btn-quote" data-product-id="${product.id}">
                  <i class="fas fa-file-invoice me-1"></i>Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Attach event listeners to product cards
   */
  function attachCardEventListeners() {
    // WhatsApp buttons - CAT-022
    document.querySelectorAll('.btn-whatsapp').forEach(btn => {
      btn.addEventListener('click', handleWhatsAppInquiry);
    });
    
    // Quote buttons - CAT-023
    document.querySelectorAll('.btn-quote').forEach(btn => {
      btn.addEventListener('click', handleQuoteRequest);
    });
    
    // Quick view buttons - CAT-024
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', handleQuickView);
    });
  }

  /**
   * Handle search input - CAT-001 to CAT-004
   */
  function handleSearch(e) {
    state.searchTerm = e.target.value.trim();
    
    // Show/hide clear button - CAT-003
    if (state.searchTerm) {
      if (elements.clearSearch) elements.clearSearch.classList.remove('d-none');
    } else {
      if (elements.clearSearch) elements.clearSearch.classList.add('d-none');
    }
    
    applyFilters();
  }

  /**
   * Clear search - CAT-003
   */
  function clearSearch() {
    if (elements.searchInput) elements.searchInput.value = '';
    state.searchTerm = '';
    if (elements.clearSearch) elements.clearSearch.classList.add('d-none');
    applyFilters();
  }

  /**
   * Highlight search term in text - CAT-004
   */
  function highlightSearchTerm(text) {
    if (!state.searchTerm) return text;
    
    const regex = new RegExp(`(${escapeRegExp(state.searchTerm)})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
  }

  /**
   * Handle category tab click - CAT-005 to CAT-008
   */
  function handleCategoryClick(e) {
    const tab = e.target.closest('.category-tab');
    if (!tab) return;
    
    const category = tab.dataset.category;
    
    // Update active state
    if (elements.categoryTabs) {
      elements.categoryTabs.querySelectorAll('.category-tab').forEach(t => {
        t.classList.remove('active');
        const badge = t.querySelector('.tab-count');
        if (badge) {
          badge.classList.remove('bg-primary');
          badge.classList.add('bg-secondary');
        }
      });
    }
    
    tab.classList.add('active');
    const activeBadge = tab.querySelector('.tab-count');
    if (activeBadge) {
      activeBadge.classList.remove('bg-secondary');
      activeBadge.classList.add('bg-primary');
    }
    
    state.currentCategory = category;
    applyFilters();
  }

  /**
   * Handle filter changes - CAT-009 to CAT-012
   */
  function handleFilterChange() {
    // Models
    state.filters.models = [];
    if (elements.modelFilters) {
      elements.modelFilters.querySelectorAll('input:checked').forEach(input => {
        state.filters.models.push(input.value);
      });
    }
    
    // Conditions
    state.filters.conditions = [];
    if (elements.conditionFilters) {
      elements.conditionFilters.querySelectorAll('input:checked').forEach(input => {
        state.filters.conditions.push(input.value);
      });
    }
    
    // Year range
    if (elements.yearFrom) state.filters.yearFrom = elements.yearFrom.value;
    if (elements.yearTo) state.filters.yearTo = elements.yearTo.value;
    
    // In stock only
    if (elements.inStockOnly) state.filters.inStockOnly = elements.inStockOnly.checked;
    
    applyFilters();
  }

  /**
   * Clear all filters - CAT-013
   */
  function clearAllFilters() {
    // Reset filter state
    state.filters = {
      models: [],
      yearFrom: '',
      yearTo: '',
      conditions: [],
      inStockOnly: false
    };
    state.searchTerm = '';
    
    // Reset UI
    if (elements.searchInput) elements.searchInput.value = '';
    if (elements.clearSearch) elements.clearSearch.classList.add('d-none');
    
    if (elements.modelFilters) {
      elements.modelFilters.querySelectorAll('input').forEach(input => {
        input.checked = false;
      });
    }
    
    if (elements.conditionFilters) {
      elements.conditionFilters.querySelectorAll('input').forEach(input => {
        input.checked = false;
      });
    }
    
    if (elements.yearFrom) elements.yearFrom.value = '';
    if (elements.yearTo) elements.yearTo.value = '';
    if (elements.inStockOnly) elements.inStockOnly.checked = false;
    
    applyFilters();
  }

  /**
   * Update active filter tags - CAT-014
   */
  function updateActiveFilters() {
    const tags = [];
    
    // Search term
    if (state.searchTerm) {
      tags.push({ type: 'search', label: `Search: "${state.searchTerm}"` });
    }
    
    // Models
    state.filters.models.forEach(model => {
      tags.push({ type: 'model', value: model, label: `Model: ${model}` });
    });
    
    // Year range
    if (state.filters.yearFrom || state.filters.yearTo) {
      const from = state.filters.yearFrom || '1990';
      const to = state.filters.yearTo || '2026';
      tags.push({ type: 'year', label: `Year: ${from} - ${to}` });
    }
    
    // Conditions
    state.filters.conditions.forEach(condition => {
      tags.push({ type: 'condition', value: condition, label: `Condition: ${condition}` });
    });
    
    // Price range
    if (state.filters.priceMin || state.filters.priceMax) {
      const min = state.filters.priceMin || '0';
      const max = state.filters.priceMax || '∞';
      tags.push({ type: 'price', label: `Price: $${min} - $${max}` });
    }
    
    // In stock only
    if (state.filters.inStockOnly) {
      tags.push({ type: 'inStock', label: 'In Stock Only' });
    }
    
    // Render tags
    if (tags.length > 0) {
      if (elements.activeFilters) elements.activeFilters.classList.remove('d-none');
      if (elements.clearAllFilters) elements.clearAllFilters.classList.remove('d-none');
      
      if (elements.filterTags) {
        elements.filterTags.innerHTML = tags.map(tag => `
          <span class="filter-tag" data-type="${tag.type}" data-value="${tag.value || ''}">
            ${tag.label}
            <i class="fas fa-times remove-tag" aria-label="Remove filter"></i>
          </span>
        `).join('');
        
        // Add remove listeners
        elements.filterTags.querySelectorAll('.remove-tag').forEach(btn => {
          btn.addEventListener('click', handleRemoveFilter);
        });
      }
    } else {
      if (elements.activeFilters) elements.activeFilters.classList.add('d-none');
      if (elements.clearAllFilters) elements.clearAllFilters.classList.add('d-none');
    }
  }

  /**
   * Handle removing individual filter tag
   */
  function handleRemoveFilter(e) {
    const tag = e.target.closest('.filter-tag');
    const type = tag.dataset.type;
    const value = tag.dataset.value;
    
    switch (type) {
      case 'search':
        clearSearch();
        break;
      case 'model':
        if (elements.modelFilters) {
          const modelInput = elements.modelFilters.querySelector(`input[value="${value}"]`);
          if (modelInput) modelInput.checked = false;
        }
        handleFilterChange();
        break;
      case 'year':
        if (elements.yearFrom) elements.yearFrom.value = '';
        if (elements.yearTo) elements.yearTo.value = '';
        handleFilterChange();
        break;
      case 'condition':
        if (elements.conditionFilters) {
          const condInput = elements.conditionFilters.querySelector(`input[value="${value}"]`);
          if (condInput) condInput.checked = false;
        }
        handleFilterChange();
        break;
      case 'price':
        if (elements.priceMin) elements.priceMin.value = '';
        if (elements.priceMax) elements.priceMax.value = '';
        handleFilterChange();
        break;
      case 'inStock':
        if (elements.inStockOnly) elements.inStockOnly.checked = false;
        handleFilterChange();
        break;
    }
  }

  /**
   * Update category counts - CAT-006
   */
  function updateCategoryCounts() {
    const counts = {
      engines: 0,
      parts: 0,
      vehicles: 0,
      breaking: 0
    };
    
    state.products.forEach(product => {
      if (counts.hasOwnProperty(product.category)) {
        counts[product.category]++;
      }
    });
    
    Object.keys(counts).forEach(category => {
      const countEl = document.getElementById(`count-${category}`);
      if (countEl) {
        countEl.textContent = counts[category];
      }
    });
  }

  /**
   * Update header stats
   */
  function updateHeaderStats() {
    if (elements.totalProducts) {
      elements.totalProducts.textContent = state.products.length;
    }
    
    if (elements.inStockCount) {
      const inStock = state.products.filter(p => p.inStock).length;
      elements.inStockCount.textContent = inStock;
    }
  }

  /**
   * Update results count display - CAT-027
   */
  function updateResultsCount() {
    const total = state.filteredProducts.length;
    const showing = state.displayedCount;
    
    if (elements.showingCount) elements.showingCount.textContent = showing;
    if (elements.totalCount) elements.totalCount.textContent = total;
    if (elements.currentlyShowing) elements.currentlyShowing.textContent = showing;
    if (elements.totalItems) elements.totalItems.textContent = total;
  }

  /**
   * Update mobile filter result count - CAT-016
   */
  function updateMobileResultCount() {
    if (elements.mobileResultCount) {
      elements.mobileResultCount.textContent = state.filteredProducts.length;
    }
  }

  /**
   * Load more products - CAT-026
   */
  function loadMoreProducts() {
    const btn = elements.loadMoreBtn;
    if (btn) btn.classList.add('loading');
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      renderProducts();
      if (btn) btn.classList.remove('loading');
      
      // Refresh AOS
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    }, 300);
  }

  /**
   * Set view mode - CAT-017, CAT-018
   */
  function setViewMode(mode) {
    state.viewMode = mode;
    
    // Update buttons
    if (elements.gridView) elements.gridView.classList.toggle('active', mode === 'grid');
    if (elements.listView) elements.listView.classList.toggle('active', mode === 'list');
    
    // Save preference - CAT-018
    try {
      localStorage.setItem(CONFIG.STORAGE_KEYS.VIEW_PREFERENCE, mode);
    } catch (e) {
      console.warn('[Catalog] Could not save view preference');
    }
    
    renderProducts();
  }

  /**
   * Restore view preference - CAT-018
   */
  function restoreViewPreference() {
    try {
      const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.VIEW_PREFERENCE);
      if (saved && (saved === 'grid' || saved === 'list')) {
        state.viewMode = saved;
        if (elements.gridView) elements.gridView.classList.toggle('active', saved === 'grid');
        if (elements.listView) elements.listView.classList.toggle('active', saved === 'list');
      }
    } catch (e) {
      console.warn('[Catalog] Could not restore view preference');
    }
  }

  /**
   * Open mobile filters - CAT-015
   */
  function openMobileFilters() {
    if (elements.filterSidebar) elements.filterSidebar.classList.add('show');
    if (elements.filterOverlay) elements.filterOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close mobile filters - CAT-015
   */
  function closeMobileFilters() {
    if (elements.filterSidebar) elements.filterSidebar.classList.remove('show');
    if (elements.filterOverlay) elements.filterOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  /**
   * Handle WhatsApp inquiry - CAT-022
   */
  function handleWhatsAppInquiry(e) {
    const productId = e.target.closest('[data-product-id]').dataset.productId;
    const product = state.products.find(p => p.id === productId);
    
    if (!product) return;
    
    const priceText = product.price ? `USD$ ${product.price.toLocaleString()}` : 'price not listed';
    const message = encodeURIComponent(
      `Hi, I'm interested in ${product.title} (SKU: ${product.sku}) listed at ${priceText} on your website. Please provide more details.`
    );
    
    window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${message}`, '_blank');
  }

  /**
   * Handle quote request - CAT-023
   */
  function handleQuoteRequest(e) {
    const productId = e.target.closest('[data-product-id]').dataset.productId;
    const product = state.products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Populate modal
    const imageUrl = product.images && product.images.length > 0 
      ? `${CONFIG.IMAGE_BASE_PATH}${product.images[0]}`
      : CONFIG.PLACEHOLDER_IMAGE;
    
    if (elements.quoteProductImage) elements.quoteProductImage.src = imageUrl;
    if (elements.quoteProductTitle) elements.quoteProductTitle.textContent = product.title;
    if (elements.quoteProductSku) elements.quoteProductSku.textContent = product.sku;
    if (elements.quoteProductPrice) {
      elements.quoteProductPrice.textContent = 'Contact for Quote';
    }
    if (elements.quoteProductId) elements.quoteProductId.value = productId;
    
    // Store product for WhatsApp
    if (elements.quoteModal) elements.quoteModal._currentProduct = product;
    
    // Show modal
    if (elements.quoteModal) {
      const modal = new bootstrap.Modal(elements.quoteModal);
      modal.show();
    }
  }

  /**
   * Handle quote form submission
   */
  async function handleQuoteSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    
    // Check honeypot
    const honeypot = document.getElementById('website');
    if (honeypot && honeypot.value) {
      console.warn('[Catalog] Honeypot triggered');
      return;
    }
    
    // Validate form
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    
    const submitBtn = document.getElementById('submitQuote');
    if (submitBtn) {
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      if (btnText) btnText.classList.add('d-none');
      if (btnLoading) btnLoading.classList.remove('d-none');
      submitBtn.disabled = true;
    }
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      if (submitBtn) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        if (btnText) btnText.classList.remove('d-none');
        if (btnLoading) btnLoading.classList.add('d-none');
        submitBtn.disabled = false;
      }
      
      // Close modal
      if (elements.quoteModal) {
        const modalInstance = bootstrap.Modal.getInstance(elements.quoteModal);
        if (modalInstance) modalInstance.hide();
      }
      
      // Show success message
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'success',
          title: 'Quote Request Sent!',
          text: 'We\'ll get back to you within 24 hours with a detailed quote.',
          confirmButtonColor: '#0033A0'
        });
      }
      
      // Reset form
      form.reset();
      form.classList.remove('was-validated');
    }, 1500);
  }

  /**
   * Handle WhatsApp quote from modal
   */
  function handleWhatsAppQuote() {
    const product = elements.quoteModal ? elements.quoteModal._currentProduct : null;
    if (!product) return;
    
    const nameInput = document.getElementById('quoteName');
    const quantityInput = document.getElementById('quoteQuantity');
    const notesInput = document.getElementById('quoteNotes');
    
    const name = nameInput ? nameInput.value : 'Customer';
    const quantity = quantityInput ? quantityInput.value : 1;
    const notes = notesInput ? notesInput.value : '';
    
    let message = `Hi, I'd like to request a quote for:\n\n`;
    message += `Product: ${product.title}\n`;
    message += `SKU: ${product.sku}\n`;
    message += `Quantity: ${quantity}\n`;
    message += `Name: ${name}\n`;
    
    if (notes) {
      message += `\nNotes: ${notes}`;
    }
    
    window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    
    // Close modal
    if (elements.quoteModal) {
      const modalInstance = bootstrap.Modal.getInstance(elements.quoteModal);
      if (modalInstance) modalInstance.hide();
    }
  }

  /**
   * Handle quick view - CAT-024
   */
  function handleQuickView(e) {
    e.stopPropagation();
    const productId = e.target.closest('[data-product-id]').dataset.productId;
    const product = state.products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Populate images
    const imagesHtml = product.images && product.images.length > 0
      ? product.images.map((img, index) => `
          <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img src="${CONFIG.IMAGE_BASE_PATH}${img}" class="d-block w-100" alt="${product.title}"
                 onerror="this.src='${CONFIG.PLACEHOLDER_IMAGE}'">
          </div>
        `).join('')
      : `<div class="carousel-item active">
           <img src="${CONFIG.PLACEHOLDER_IMAGE}" class="d-block w-100" alt="${product.title}">
         </div>`;
    
    if (elements.quickViewImages) elements.quickViewImages.innerHTML = imagesHtml;
    if (elements.quickViewTitle) elements.quickViewTitle.textContent = product.title;
    if (elements.quickViewDescription) elements.quickViewDescription.textContent = product.description;
    if (elements.quickViewPrice) {
      elements.quickViewPrice.textContent = 'Contact for Quote';
    }
    
    // Store product for actions
    if (elements.quickViewModal) elements.quickViewModal._currentProduct = product;
    
    // Setup action buttons
    if (elements.quickViewWhatsApp) {
      elements.quickViewWhatsApp.onclick = () => {
        const message = encodeURIComponent(
          `Hi, I'm interested in ${product.title} (SKU: ${product.sku}). Please provide pricing and more details.`
        );
        window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${message}`, '_blank');
      };
    }
    
    if (elements.quickViewQuote) {
      elements.quickViewQuote.onclick = () => {
        if (elements.quickViewModal) {
          const modalInstance = bootstrap.Modal.getInstance(elements.quickViewModal);
          if (modalInstance) modalInstance.hide();
        }
        setTimeout(() => handleQuoteRequest({ target: { closest: () => ({ dataset: { productId } }) } }), 300);
      };
    }
    
    // Show modal
    if (elements.quickViewModal) {
      const modal = new bootstrap.Modal(elements.quickViewModal);
      modal.show();
    }
  }

  /**
   * Update URL with current state - CAT-033
   */
  function updateURL() {
    const params = new URLSearchParams();
    
    if (state.currentCategory) params.set('category', state.currentCategory);
    if (state.searchTerm) params.set('search', state.searchTerm);
    if (state.filters.models.length) params.set('models', state.filters.models.join(','));
    if (state.filters.yearFrom) params.set('yearFrom', state.filters.yearFrom);
    if (state.filters.yearTo) params.set('yearTo', state.filters.yearTo);
    if (state.filters.conditions.length) params.set('conditions', state.filters.conditions.join(','));
    if (state.filters.priceMin) params.set('priceMin', state.filters.priceMin);
    if (state.filters.priceMax) params.set('priceMax', state.filters.priceMax);
    if (state.filters.inStockOnly) params.set('inStock', '1');
    
    const url = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({ catalogState: state }, '', url);
  }

  /**
   * Restore state from URL - CAT-033
   */
  function restoreStateFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Category - CAT-008
    const category = params.get('category');
    if (category && ['engines', 'parts', 'vehicles', 'breaking'].includes(category)) {
      state.currentCategory = category;
      
      // Update tab UI
      if (elements.categoryTabs) {
        elements.categoryTabs.querySelectorAll('.category-tab').forEach(tab => {
          tab.classList.toggle('active', tab.dataset.category === category);
          const badge = tab.querySelector('.tab-count');
          if (badge) {
            badge.classList.toggle('bg-primary', tab.dataset.category === category);
            badge.classList.toggle('bg-secondary', tab.dataset.category !== category);
          }
        });
      }
    }
    
    // Search
    const search = params.get('search');
    if (search) {
      state.searchTerm = search;
      if (elements.searchInput) elements.searchInput.value = search;
      if (elements.clearSearch) elements.clearSearch.classList.remove('d-none');
    }
    
    // Models
    const models = params.get('models');
    if (models) {
      state.filters.models = models.split(',');
      if (elements.modelFilters) {
        state.filters.models.forEach(model => {
          const input = elements.modelFilters.querySelector(`input[value="${model}"]`);
          if (input) input.checked = true;
        });
      }
    }
    
    // Year range
    const yearFrom = params.get('yearFrom');
    const yearTo = params.get('yearTo');
    if (yearFrom) {
      state.filters.yearFrom = yearFrom;
      if (elements.yearFrom) elements.yearFrom.value = yearFrom;
    }
    if (yearTo) {
      state.filters.yearTo = yearTo;
      if (elements.yearTo) elements.yearTo.value = yearTo;
    }
    
    // Conditions
    const conditions = params.get('conditions');
    if (conditions) {
      state.filters.conditions = conditions.split(',');
      if (elements.conditionFilters) {
        state.filters.conditions.forEach(cond => {
          const input = elements.conditionFilters.querySelector(`input[value="${cond}"]`);
          if (input) input.checked = true;
        });
      }
    }
    
    // Price range
    const priceMin = params.get('priceMin');
    const priceMax = params.get('priceMax');
    if (priceMin) {
      state.filters.priceMin = priceMin;
      if (elements.priceMin) elements.priceMin.value = priceMin;
    }
    if (priceMax) {
      state.filters.priceMax = priceMax;
      if (elements.priceMax) elements.priceMax.value = priceMax;
    }
    
    // In stock
    const inStock = params.get('inStock');
    if (inStock === '1') {
      state.filters.inStockOnly = true;
      if (elements.inStockOnly) elements.inStockOnly.checked = true;
    }
  }

  /**
   * Handle browser back/forward - CAT-033
   */
  function handlePopState(e) {
    if (e.state && e.state.catalogState) {
      Object.assign(state, e.state.catalogState);
      applyFilters();
    } else {
      restoreStateFromURL();
      applyFilters();
    }
  }

  /**
   * Populate year dropdowns - CAT-010
   */
  function populateYearDropdowns() {
    const currentYear = new Date().getFullYear();
    const startYear = 1990;
    
    let options = '<option value="">Any</option>';
    for (let year = currentYear; year >= startYear; year--) {
      options += `<option value="${year}">${year}</option>`;
    }
    
    if (elements.yearFrom) elements.yearFrom.innerHTML = options;
    if (elements.yearTo) elements.yearTo.innerHTML = options;
  }

  /**
   * Show/hide loading state - CAT-032
   */
  function showLoading(isLoading) {
    state.isLoading = isLoading;
    
    if (isLoading) {
      if (elements.loadingState) elements.loadingState.classList.remove('d-none');
      if (elements.productGrid) elements.productGrid.classList.add('d-none');
      if (elements.productList) elements.productList.classList.add('d-none');
    } else {
      if (elements.loadingState) elements.loadingState.classList.add('d-none');
    }
  }

  /**
   * Show error message
   */
  function showError(message) {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonColor: '#0033A0'
      });
    } else {
      alert(message);
    }
  }

  /**
   * Debounce utility
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Escape regex special characters
   */
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Public API
  return {
    init,
    getState: () => ({ ...state }),
    filterByCategory: (category) => {
      state.currentCategory = category;
      applyFilters();
    },
    search: (term) => {
      state.searchTerm = term;
      if (elements.searchInput) elements.searchInput.value = term;
      applyFilters();
    }
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', RushCatalog.init);

