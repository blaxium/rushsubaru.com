/**
 * ==============================================
 * File: catalog.js
 * Project: Zaza Rush Subaru
 * Developer: bguvava
 * Last Updated: January 30, 2026
 * Description: Catalog filtering and search functionality
 * ==============================================
 */

'use strict';

/**
 * Catalog Module
 * Handles catalog filtering, searching, and display
 */
const Catalog = (() => {
  // Configuration
  const CONFIG = {
    itemsPerPage: 12,
    searchDebounceMs: 300,
    dataPath: 'data/catalog.json'
  };

  // State
  let state = {
    items: [],
    filteredItems: [],
    currentPage: 1,
    activeCategory: 'all',
    activeCondition: 'all',
    activeStock: 'all',
    searchQuery: '',
    viewMode: 'grid' // 'grid' or 'list'
  };

  // DOM Elements
  let elements = {};

  /**
   * Cache DOM elements
   */
  const cacheElements = () => {
    elements = {
      catalogContainer: document.querySelector('.catalog-items'),
      searchInput: document.querySelector('#catalog-search'),
      categoryFilter: document.querySelector('#category-filter'),
      conditionFilter: document.querySelector('#condition-filter'),
      stockFilter: document.querySelector('#stock-filter'),
      sortSelect: document.querySelector('#catalog-sort'),
      viewToggle: document.querySelectorAll('[data-view]'),
      pagination: document.querySelector('.catalog-pagination'),
      resultsCount: document.querySelector('.results-count'),
      loadingIndicator: document.querySelector('.catalog-loading'),
      noResults: document.querySelector('.no-results')
    };
  };

  /**
   * Load catalog data
   * @returns {Promise<Array>} Catalog items
   */
  const loadCatalogData = async () => {
    try {
      const response = await fetch(CONFIG.dataPath);
      if (!response.ok) throw new Error('Failed to load catalog data');
      
      const data = await response.json();
      state.items = data.items || data;
      state.filteredItems = [...state.items];
      
      return state.items;
    } catch (error) {
      console.error('Error loading catalog:', error);
      return [];
    }
  };

  /**
   * Filter items by search query
   * @param {Array} items - Items to filter
   * @param {string} query - Search query
   * @returns {Array} Filtered items
   */
  const filterBySearch = (items, query) => {
    if (!query) return items;
    
    const searchTerms = query.toLowerCase().split(' ');
    
    return items.filter(item => {
      const searchableText = [
        item.title,
        item.description,
        item.category,
        item.sku,
        item.models?.join(' ')
      ].join(' ').toLowerCase();
      
      return searchTerms.every(term => searchableText.includes(term));
    });
  };

  /**
   * Filter items by category
   * @param {Array} items - Items to filter
   * @param {string} category - Category filter
   * @returns {Array} Filtered items
   */
  const filterByCategory = (items, category) => {
    if (category === 'all') return items;
    return items.filter(item => item.category === category);
  };

  /**
   * Filter items by condition
   * @param {Array} items - Items to filter
   * @param {string} condition - Condition filter
   * @returns {Array} Filtered items
   */
  const filterByCondition = (items, condition) => {
    if (condition === 'all') return items;
    return items.filter(item => item.condition === condition);
  };

  /**
   * Filter items by stock status
   * @param {Array} items - Items to filter
   * @param {string} stock - Stock filter
   * @returns {Array} Filtered items
   */
  const filterByStock = (items, stock) => {
    if (stock === 'all') return items;
    return items.filter(item => {
      return stock === 'in-stock' ? item.inStock : !item.inStock;
    });
  };

  /**
   * Sort items
   * @param {Array} items - Items to sort
   * @param {string} sortBy - Sort criteria
   * @returns {Array} Sorted items
   */
  const sortItems = (items, sortBy) => {
    const sorted = [...items];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-high':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'newest':
        return sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      case 'name-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  };

  /**
   * Apply all filters
   */
  const applyFilters = () => {
    let filtered = [...state.items];
    
    filtered = filterBySearch(filtered, state.searchQuery);
    filtered = filterByCategory(filtered, state.activeCategory);
    filtered = filterByCondition(filtered, state.activeCondition);
    filtered = filterByStock(filtered, state.activeStock);
    
    if (elements.sortSelect) {
      filtered = sortItems(filtered, elements.sortSelect.value);
    }
    
    state.filteredItems = filtered;
    state.currentPage = 1;
    
    renderCatalog();
  };

  /**
   * Get paginated items
   * @returns {Array} Items for current page
   */
  const getPaginatedItems = () => {
    const start = (state.currentPage - 1) * CONFIG.itemsPerPage;
    const end = start + CONFIG.itemsPerPage;
    return state.filteredItems.slice(start, end);
  };

  /**
   * Generate product card HTML
   * @param {Object} item - Product item
   * @returns {string} HTML string
   */
  const generateCardHtml = (item) => {
    const stockClass = item.inStock ? 'badge-in-stock' : 'badge-out-of-stock';
    const stockText = item.inStock ? 'In Stock' : 'Out of Stock';
    const imageUrl = item.images?.[0] || 'assets/images/catalog/placeholder.jpg';
    
    return `
      <div class="col-md-6 col-lg-4 catalog-item" data-aos="fade-up">
        <div class="card product-card h-100">
          <div class="product-image">
            <img src="${imageUrl}" alt="${item.title}" loading="lazy">
            <span class="badge ${stockClass}">${stockText}</span>
          </div>
          <div class="card-body">
            <span class="product-category">${item.category || 'Uncategorized'}</span>
            <h5 class="product-title">${item.title}</h5>
            <p class="product-description">${item.description || ''}</p>
            ${item.price ? `<p class="product-price">$${item.price.toFixed(2)}</p>` : '<p class="product-price">Price on Request</p>'}
            <div class="product-meta">
              ${item.sku ? `<span class="sku">SKU: ${item.sku}</span>` : ''}
              ${item.condition ? `<span class="condition">${item.condition}</span>` : ''}
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary btn-sm w-100" 
                    data-whatsapp-product='${JSON.stringify({
                      name: item.title,
                      category: item.category,
                      sku: item.sku,
                      price: item.price ? `$${item.price}` : 'Price on Request'
                    })}'>
              <i class="fab fa-whatsapp me-2"></i>Inquire Now
            </button>
          </div>
        </div>
      </div>
    `;
  };

  /**
   * Render catalog items
   */
  const renderCatalog = () => {
    if (!elements.catalogContainer) return;
    
    const items = getPaginatedItems();
    
    // Show/hide no results
    if (items.length === 0) {
      elements.catalogContainer.innerHTML = '';
      if (elements.noResults) elements.noResults.classList.remove('d-none');
    } else {
      if (elements.noResults) elements.noResults.classList.add('d-none');
      elements.catalogContainer.innerHTML = items.map(generateCardHtml).join('');
    }
    
    // Update results count
    if (elements.resultsCount) {
      elements.resultsCount.textContent = `Showing ${items.length} of ${state.filteredItems.length} items`;
    }
    
    // Re-init WhatsApp handlers
    if (typeof WhatsApp !== 'undefined') {
      WhatsApp.init();
    }
    
    // Re-init AOS
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
    
    renderPagination();
  };

  /**
   * Render pagination
   */
  const renderPagination = () => {
    if (!elements.pagination) return;
    
    const totalPages = Math.ceil(state.filteredItems.length / CONFIG.itemsPerPage);
    
    if (totalPages <= 1) {
      elements.pagination.innerHTML = '';
      return;
    }
    
    let html = '<ul class="pagination justify-content-center">';
    
    // Previous button
    html += `
      <li class="page-item ${state.currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${state.currentPage - 1}">Previous</a>
      </li>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || 
          (i >= state.currentPage - 2 && i <= state.currentPage + 2)) {
        html += `
          <li class="page-item ${i === state.currentPage ? 'active' : ''}">
            <a class="page-link" href="#" data-page="${i}">${i}</a>
          </li>
        `;
      } else if (i === state.currentPage - 3 || i === state.currentPage + 3) {
        html += '<li class="page-item disabled"><span class="page-link">...</span></li>';
      }
    }
    
    // Next button
    html += `
      <li class="page-item ${state.currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${state.currentPage + 1}">Next</a>
      </li>
    `;
    
    html += '</ul>';
    elements.pagination.innerHTML = html;
    
    // Add click handlers
    elements.pagination.querySelectorAll('[data-page]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = parseInt(link.dataset.page);
        if (page >= 1 && page <= totalPages) {
          state.currentPage = page;
          renderCatalog();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  };

  /**
   * Initialize event listeners
   */
  const initEventListeners = () => {
    // Search input
    if (elements.searchInput) {
      let debounceTimer;
      elements.searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          state.searchQuery = e.target.value.trim();
          applyFilters();
        }, CONFIG.searchDebounceMs);
      });
    }
    
    // Category filter
    if (elements.categoryFilter) {
      elements.categoryFilter.addEventListener('change', (e) => {
        state.activeCategory = e.target.value;
        applyFilters();
      });
    }
    
    // Condition filter
    if (elements.conditionFilter) {
      elements.conditionFilter.addEventListener('change', (e) => {
        state.activeCondition = e.target.value;
        applyFilters();
      });
    }
    
    // Stock filter
    if (elements.stockFilter) {
      elements.stockFilter.addEventListener('change', (e) => {
        state.activeStock = e.target.value;
        applyFilters();
      });
    }
    
    // Sort select
    if (elements.sortSelect) {
      elements.sortSelect.addEventListener('change', () => {
        applyFilters();
      });
    }
    
    // View toggle
    elements.viewToggle.forEach(btn => {
      btn.addEventListener('click', () => {
        elements.viewToggle.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.viewMode = btn.dataset.view;
        
        if (elements.catalogContainer) {
          elements.catalogContainer.classList.toggle('list-view', state.viewMode === 'list');
        }
      });
    });
  };

  /**
   * Initialize catalog
   */
  const init = async () => {
    cacheElements();
    
    if (!elements.catalogContainer) {
      return; // Not on catalog page
    }
    
    if (elements.loadingIndicator) {
      elements.loadingIndicator.classList.remove('d-none');
    }
    
    await loadCatalogData();
    initEventListeners();
    renderCatalog();
    
    if (elements.loadingIndicator) {
      elements.loadingIndicator.classList.add('d-none');
    }
  };

  // Public API
  return {
    init,
    applyFilters,
    getState: () => ({ ...state })
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', Catalog.init);
