/* ==============================================
   File: pages/home.js
   Project: Zaza Rush Subaru
   Developer: bguvava
   Last Updated: January 30, 2026
   Description: Homepage-specific JavaScript (HOME-001 to HOME-035)
   ============================================== */

'use strict';

/**
 * Homepage Module - IIFE Pattern
 * Handles all homepage-specific functionality
 */
const HomePage = (function() {
  
  // Cache DOM Elements
  let featuredSwiper = null;
  let testimonialsSwiper = null;
  let contactForm = null;
  let formTimestamp = null;

  /**
   * Initialize Featured Inventory Swiper
   * HOME-015 to HOME-018
   */
  function initFeaturedSwiper() {
    const swiperElement = document.querySelector('.featured-swiper');
    
    if (!swiperElement) return;
    
    featuredSwiper = new Swiper('.featured-swiper', {
      // Core settings
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      speed: 600,
      grabCursor: true,
      
      // Autoplay - HOME-017
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      
      // Navigation arrows
      navigation: {
        nextEl: '.featured-swiper .swiper-button-next',
        prevEl: '.featured-swiper .swiper-button-prev',
      },
      
      // Pagination dots
      pagination: {
        el: '.featured-swiper .swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      
      // Responsive breakpoints - HOME-016
      breakpoints: {
        // >= 576px (Small devices)
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // >= 768px (Tablets)
        768: {
          slidesPerView: 3,
          spaceBetween: 25,
        },
        // >= 992px (Desktop)
        992: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
      
      // Accessibility
      a11y: {
        prevSlideMessage: 'Previous product',
        nextSlideMessage: 'Next product',
        firstSlideMessage: 'This is the first product',
        lastSlideMessage: 'This is the last product',
        paginationBulletMessage: 'Go to product {{index}}',
      },
    });
    
    console.log('✅ Featured inventory Swiper initialized');
  }

  /**
   * Initialize Testimonials Swiper
   * HOME-019 to HOME-021
   */
  function initTestimonialsSwiper() {
    const swiperElement = document.querySelector('.testimonials-swiper');
    
    if (!swiperElement) return;
    
    testimonialsSwiper = new Swiper('.testimonials-swiper', {
      // Core settings
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      speed: 800,
      grabCursor: true,
      centeredSlides: true,
      effect: 'slide',
      
      // Autoplay - HOME-020 (6-second rotation)
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      
      // Pagination dots
      pagination: {
        el: '.testimonials-swiper .swiper-pagination',
        clickable: true,
      },
      
      // Responsive breakpoints
      breakpoints: {
        768: {
          slidesPerView: 2,
          centeredSlides: false,
        },
        992: {
          slidesPerView: 2,
          centeredSlides: false,
          spaceBetween: 40,
        },
      },
      
      // Accessibility
      a11y: {
        prevSlideMessage: 'Previous testimonial',
        nextSlideMessage: 'Next testimonial',
        paginationBulletMessage: 'Go to testimonial {{index}}',
      },
    });
    
    console.log('✅ Testimonials Swiper initialized');
  }

  /**
   * Initialize Contact Form
   * HOME-022 to HOME-026
   */
  function initContactForm() {
    contactForm = document.getElementById('quick-contact-form');
    
    if (!contactForm) return;
    
    // Set form timestamp for bot detection
    formTimestamp = document.getElementById('form_time');
    if (formTimestamp) {
      formTimestamp.value = Date.now();
    }
    
    // Add form submit handler
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearFieldError);
    });
    
    console.log('✅ Contact form initialized');
  }

  /**
   * Handle Form Submission
   * HOME-024 (SweetAlert2 feedback)
   * HOME-025 (Loading states)
   */
  async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Validate all fields
    if (!validateForm()) {
      return;
    }
    
    // Check honeypot - HOME-023
    const honeypot = contactForm.querySelector('input[name="website"]');
    if (honeypot && honeypot.value) {
      console.warn('Honeypot triggered - likely spam submission');
      showSuccessMessage(); // Show fake success to confuse bots
      return;
    }
    
    // Check timestamp (form filled too quickly = bot)
    const formTime = parseInt(formTimestamp?.value || 0);
    if (formTime && (Date.now() - formTime) < 3000) {
      console.warn('Form filled too quickly - likely spam');
      showSuccessMessage();
      return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('#contact-submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = new FormData(contactForm);
    
    try {
      // Send to server
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        showSuccessMessage();
        contactForm.reset();
        // Reset timestamp
        if (formTimestamp) {
          formTimestamp.value = Date.now();
        }
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showErrorMessage();
    } finally {
      // Remove loading state
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }

  /**
   * Validate entire form
   */
  function validateForm() {
    let isValid = true;
    const requiredFields = contactForm.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!validateField({ target: field })) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  /**
   * Validate individual field
   */
  function validateField(event) {
    const field = event.target;
    let isValid = true;
    
    // Check if required and empty
    if (field.required && !field.value.trim()) {
      showFieldError(field);
      isValid = false;
    }
    // Check email format
    else if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        showFieldError(field, 'Please enter a valid email address');
        isValid = false;
      }
    }
    // Check phone format
    else if (field.type === 'tel' && field.value) {
      const phoneRegex = /^[\+]?[0-9\s\-]{10,}$/;
      if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
        showFieldError(field, 'Please enter a valid phone number');
        isValid = false;
      }
    }
    // Check minimum length
    else if (field.minLength && field.value.length < field.minLength) {
      showFieldError(field, `Please enter at least ${field.minLength} characters`);
      isValid = false;
    }
    // Valid
    else {
      clearFieldError({ target: field });
    }
    
    return isValid;
  }

  /**
   * Show field error
   */
  function showFieldError(field, message = null) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    
    if (message) {
      const feedback = field.nextElementSibling;
      if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.textContent = message;
      }
    }
  }

  /**
   * Clear field error
   */
  function clearFieldError(event) {
    const field = event.target;
    
    if (field.value.trim()) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
    }
  }

  /**
   * Show success message (SweetAlert2) - HOME-024
   */
  function showSuccessMessage() {
    Swal.fire({
      icon: 'success',
      title: 'Message Sent!',
      text: 'Thank you for contacting us. We\'ll get back to you within 24 hours.',
      confirmButtonColor: '#0033A0',
      confirmButtonText: 'Great!',
    });
  }

  /**
   * Show error message (SweetAlert2)
   */
  function showErrorMessage() {
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'Something went wrong. Please try again or contact us via WhatsApp.',
      confirmButtonColor: '#0033A0',
      confirmButtonText: 'Try Again',
      showCancelButton: true,
      cancelButtonText: 'WhatsApp Instead',
      cancelButtonColor: '#25D366',
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        window.open('https://wa.me/263776381498?text=Hello!%20I%20tried%20to%20send%20a%20message%20through%20the%20website%20but%20had%20an%20issue.', '_blank');
      }
    });
  }

  /**
   * Initialize smooth scroll for anchor links
   */
  function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        
        if (target) {
          e.preventDefault();
          
          const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    console.log('✅ Smooth scroll initialized');
  }

  /**
   * Initialize hero tagline animation observer
   */
  function initTaglineAnimation() {
    const tagline = document.querySelector('.tagline-animated');
    
    if (!tagline) return;
    
    // Reset animation on page load
    tagline.style.opacity = '0';
    
    // Trigger animation after a short delay
    setTimeout(() => {
      tagline.style.animation = 'taglineFadeIn 1s ease-out forwards';
    }, 300);
    
    console.log('✅ Tagline animation initialized');
  }

  /**
   * Public initialization method
   */
  function init() {
    console.log('🏠 Initializing HomePage module...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAll);
    } else {
      initAll();
    }
  }

  /**
   * Initialize all components
   */
  function initAll() {
    // Check if Swiper is available
    if (typeof Swiper !== 'undefined') {
      initFeaturedSwiper();
      initTestimonialsSwiper();
    } else {
      console.warn('Swiper not loaded');
    }
    
    // Check if SweetAlert2 is available
    if (typeof Swal !== 'undefined') {
      initContactForm();
    } else {
      console.warn('SweetAlert2 not loaded');
    }
    
    initSmoothScroll();
    initTaglineAnimation();
    
    console.log('✅ HomePage module fully initialized');
  }

  // Public API
  return {
    init: init,
    validateForm: validateForm,
  };
  
})();

// Auto-initialize when script loads
HomePage.init();
