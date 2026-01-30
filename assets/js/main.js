/**
 * ==============================================
 * File: main.js
 * Project: Zaza Rush Subaru
 * Developer: bguvava
 * Last Updated: January 30, 2026
 * Description: Core initialization and global handlers
 * ==============================================
 */

'use strict';

/**
 * Main Application Module
 * Handles core site functionality and initialization
 */
const RushSubaru = (() => {
  // Configuration
  const CONFIG = {
    scrollOffset: 300,
    animationDuration: 800,
    whatsappNumber: '263776381498',
    defaultWhatsappMessage: "Hello! I'm interested in Zaza Rush Subaru services."
  };

  // DOM Elements Cache
  let elements = {};

  /**
   * Initialize DOM element references
   */
  const cacheElements = () => {
    elements = {
      scrollProgress: document.querySelector('.scroll-progress'),
      scrollToTop: document.querySelector('.scroll-to-top'),
      navbar: document.querySelector('.navbar'),
      body: document.body
    };
  };

  /**
   * Update scroll progress indicator
   */
  const updateScrollProgress = () => {
    if (!elements.scrollProgress) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    elements.scrollProgress.style.width = `${scrollPercent}%`;
  };

  /**
   * Toggle scroll-to-top button visibility
   */
  const toggleScrollToTop = () => {
    if (!elements.scrollToTop) return;

    if (window.scrollY > CONFIG.scrollOffset) {
      elements.scrollToTop.classList.add('visible');
    } else {
      elements.scrollToTop.classList.remove('visible');
    }
  };

  /**
   * Handle navbar scroll behavior
   */
  const handleNavbarScroll = () => {
    if (!elements.navbar) return;

    if (window.scrollY > 50) {
      elements.navbar.classList.add('scrolled');
    } else {
      elements.navbar.classList.remove('scrolled');
    }
  };

  /**
   * Scroll to top smoothly
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  /**
   * Initialize scroll event handlers - CORE-027
   * Uses requestAnimationFrame for 60fps performance
   * Handles: sticky nav, scroll progress, scroll-to-top visibility
   */
  const initScrollHandlers = () => {
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress();
          toggleScrollToTop();
          handleNavbarScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll to top button click - CORE-023
    if (elements.scrollToTop) {
      elements.scrollToTop.addEventListener('click', scrollToTop);
    }
  };

  /**
   * Initialize AOS (Animate On Scroll) - CORE-011 & CORE-026
   * Configuration: offset 100px, duration 800ms, ease-out-cubic, once: true
   */
  const initAOS = () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        offset: 100,
        duration: CONFIG.animationDuration,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom'
      });
    }
  };

  /**
   * Generate WhatsApp URL with pre-filled message
   * @param {string} message - The pre-filled message
   * @returns {string} WhatsApp URL
   */
  const getWhatsAppUrl = (message = CONFIG.defaultWhatsappMessage) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
  };

  /**
   * Open WhatsApp with custom message
   * @param {string} message - The pre-filled message
   */
  const openWhatsApp = (message) => {
    window.open(getWhatsAppUrl(message), '_blank');
  };

  /**
   * Get current year for copyright
   * @returns {number} Current year
   */
  const getCurrentYear = () => new Date().getFullYear();

  /**
   * Update copyright year in footer
   */
  const updateCopyrightYear = () => {
    const yearElements = document.querySelectorAll('.copyright-year');
    const currentYear = getCurrentYear();

    yearElements.forEach(el => {
      el.textContent = currentYear;
    });
  };

  /**
   * Initialize mobile navigation
   */
  const initMobileNav = () => {
    const navToggler = document.querySelector('.navbar-toggler');
    const navCollapse = document.querySelector('.navbar-collapse');

    if (!navToggler || !navCollapse) return;

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggler.contains(e.target) && !navCollapse.contains(e.target)) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse && navCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      }
    });

    // Close menu when clicking a nav link
    const navLinks = navCollapse.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse && navCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  };

  /**
   * Handle smooth scroll for anchor links
   */
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (href === '#' || href === '') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  /**
   * Show loading state
   * @param {HTMLElement} button - The button element
   * @param {string} loadingText - Text to show while loading
   */
  const showLoading = (button, loadingText = 'Loading...') => {
    if (!button) return;
    
    button.disabled = true;
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = `<span class="spinner"></span> ${loadingText}`;
  };

  /**
   * Hide loading state
   * @param {HTMLElement} button - The button element
   */
  const hideLoading = (button) => {
    if (!button) return;
    
    button.disabled = false;
    button.innerHTML = button.dataset.originalText || 'Submit';
  };

  /**
   * Show success message using SweetAlert2
   * @param {string} title - Alert title
   * @param {string} message - Alert message
   */
  const showSuccess = (title, message) => {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: title,
        text: message,
        confirmButtonColor: '#0033A0'
      });
    } else {
      alert(`${title}\n\n${message}`);
    }
  };

  /**
   * Show error message using SweetAlert2
   * @param {string} title - Alert title
   * @param {string} message - Alert message
   */
  const showError = (title, message) => {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'error',
        title: title,
        text: message,
        confirmButtonColor: '#0033A0'
      });
    } else {
      alert(`${title}\n\n${message}`);
    }
  };

  /**
   * Debounce function
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in ms
   * @returns {Function} Debounced function
   */
  const debounce = (func, wait = 250) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  /**
   * Initialize the application
   */
  const init = () => {
    // Cache DOM elements
    cacheElements();

    // Initialize features
    initScrollHandlers();
    initAOS();
    initMobileNav();
    initSmoothScroll();
    updateCopyrightYear();

    // Initial scroll state
    updateScrollProgress();
    toggleScrollToTop();
    handleNavbarScroll();

    console.log('🚗 Zaza Rush Subaru - Website Initialized');
  };

  // Public API
  return {
    init,
    openWhatsApp,
    getWhatsAppUrl,
    showLoading,
    hideLoading,
    showSuccess,
    showError,
    debounce,
    getCurrentYear
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', RushSubaru.init);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RushSubaru;
}
