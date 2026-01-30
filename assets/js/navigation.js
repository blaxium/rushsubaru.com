/**
 * ==============================================
 * File: navigation.js
 * Project: Zaza Rush Subaru
 * Developer: bguvava
 * Last Updated: January 30, 2026
 * Description: Navigation component functionality
 * ==============================================
 */

'use strict';

/**
 * Navigation Module
 * Handles all navigation-related functionality
 */
const Navigation = (() => {
  // Configuration
  const CONFIG = {
    scrollThreshold: 50,
    activeClass: 'active',
    scrolledClass: 'scrolled'
  };

  // DOM Elements
  let elements = {};

  /**
   * Cache DOM elements
   */
  const cacheElements = () => {
    elements = {
      navbar: document.querySelector('.navbar'),
      navLinks: document.querySelectorAll('.navbar-nav .nav-link'),
      navToggler: document.querySelector('.navbar-toggler'),
      navCollapse: document.querySelector('.navbar-collapse')
    };
  };

  /**
   * Set active navigation link based on current page
   */
  const setActiveLink = () => {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    elements.navLinks.forEach(link => {
      link.classList.remove(CONFIG.activeClass);
      
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'index.html') ||
          (currentPage === 'index.html' && linkHref === 'index.html')) {
        link.classList.add(CONFIG.activeClass);
      }
    });
  };

  /**
   * Handle scroll spy for single-page sections
   */
  const initScrollSpy = () => {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          updateActiveNavLink(`#${id}`);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  };

  /**
   * Update active nav link
   * @param {string} href - The href to mark as active
   */
  const updateActiveNavLink = (href) => {
    elements.navLinks.forEach(link => {
      link.classList.remove(CONFIG.activeClass);
      if (link.getAttribute('href') === href) {
        link.classList.add(CONFIG.activeClass);
      }
    });
  };

  /**
   * Handle navbar background on scroll
   */
  const handleScroll = () => {
    if (!elements.navbar) return;

    if (window.scrollY > CONFIG.scrollThreshold) {
      elements.navbar.classList.add(CONFIG.scrolledClass);
    } else {
      elements.navbar.classList.remove(CONFIG.scrolledClass);
    }
  };

  /**
   * Close mobile menu - CORE-028
   */
  const closeMobileMenu = () => {
    if (!elements.navCollapse) return;

    const bsCollapse = bootstrap.Collapse.getInstance(elements.navCollapse);
    if (bsCollapse && elements.navCollapse.classList.contains('show')) {
      bsCollapse.hide();
    }
    
    // Remove body scroll lock
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
  };

  /**
   * Open mobile menu with body scroll lock - CORE-028
   */
  const openMobileMenu = () => {
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  };

  /**
   * Initialize mobile navigation handlers - CORE-028
   * Includes body scroll lock, click-outside-to-close, and Escape key
   */
  const initMobileNav = () => {
    if (!elements.navCollapse || !elements.navToggler) return;

    // Listen for Bootstrap collapse events to manage body scroll lock
    elements.navCollapse.addEventListener('show.bs.collapse', openMobileMenu);
    elements.navCollapse.addEventListener('hide.bs.collapse', closeMobileMenu);

    // Close menu when clicking a nav link
    elements.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          closeMobileMenu();
        }
      });
    });

    // Close menu when clicking outside - CORE-028
    document.addEventListener('click', (e) => {
      if (window.innerWidth < 992) {
        const isClickInside = elements.navbar.contains(e.target);
        if (!isClickInside && elements.navCollapse.classList.contains('show')) {
          closeMobileMenu();
        }
      }
    });

    // Handle escape key - CORE-028
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.navCollapse.classList.contains('show')) {
        closeMobileMenu();
        elements.navToggler.focus();
      }
    });
  };

  /**
   * Initialize keyboard navigation
   */
  const initKeyboardNav = () => {
    elements.navLinks.forEach((link, index) => {
      link.addEventListener('keydown', (e) => {
        const links = Array.from(elements.navLinks);
        let nextIndex;

        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            e.preventDefault();
            nextIndex = (index + 1) % links.length;
            links[nextIndex].focus();
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            e.preventDefault();
            nextIndex = (index - 1 + links.length) % links.length;
            links[nextIndex].focus();
            break;
          case 'Home':
            e.preventDefault();
            links[0].focus();
            break;
          case 'End':
            e.preventDefault();
            links[links.length - 1].focus();
            break;
        }
      });
    });
  };

  /**
   * Initialize scroll event listener
   */
  const initScrollHandler = () => {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  };

  /**
   * Initialize navigation
   */
  const init = () => {
    cacheElements();

    if (!elements.navbar) {
      console.warn('Navigation: Navbar element not found');
      return;
    }

    setActiveLink();
    initScrollHandler();
    initMobileNav();
    initKeyboardNav();
    initScrollSpy();

    // Initial scroll state
    handleScroll();
  };

  // Public API
  return {
    init,
    setActiveLink,
    closeMobileMenu
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', Navigation.init);
