/**
 * ==============================================
 * File: forms.js
 * Project: Zaza Rush Subaru
 * Developer: bguvava
 * Last Updated: January 30, 2026
 * Description: Form validation and submission handling
 * ==============================================
 */

'use strict';

/**
 * Forms Module
 * Handles form validation, submission, and feedback
 */
const Forms = (() => {
  // Configuration
  const CONFIG = {
    honeypotFieldName: 'website',
    minSubmissionTime: 3000, // 3 seconds minimum
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phoneRegex: /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/
  };

  // Track form load times for anti-spam
  const formLoadTimes = new Map();

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} Is valid
   */
  const isValidEmail = (email) => {
    return CONFIG.emailRegex.test(email);
  };

  /**
   * Validate phone number format
   * @param {string} phone - Phone number to validate
   * @returns {boolean} Is valid
   */
  const isValidPhone = (phone) => {
    return CONFIG.phoneRegex.test(phone.replace(/\s/g, ''));
  };

  /**
   * Check if honeypot field is filled (spam)
   * @param {HTMLFormElement} form - The form element
   * @returns {boolean} Is spam
   */
  const isHoneypotFilled = (form) => {
    const honeypot = form.querySelector(`[name="${CONFIG.honeypotFieldName}"]`);
    return honeypot && honeypot.value.trim() !== '';
  };

  /**
   * Check if form was submitted too quickly (spam)
   * @param {HTMLFormElement} form - The form element
   * @returns {boolean} Is too quick
   */
  const isSubmittedTooQuickly = (form) => {
    const formId = form.id || form.name || 'default';
    const loadTime = formLoadTimes.get(formId);
    
    if (!loadTime) return false;
    
    const elapsed = Date.now() - loadTime;
    return elapsed < CONFIG.minSubmissionTime;
  };

  /**
   * Record form load time
   * @param {HTMLFormElement} form - The form element
   */
  const recordFormLoadTime = (form) => {
    const formId = form.id || form.name || 'default';
    formLoadTimes.set(formId, Date.now());
  };

  /**
   * Validate required fields
   * @param {HTMLFormElement} form - The form element
   * @returns {Object} Validation result
   */
  const validateRequired = (form) => {
    const errors = [];
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      const value = field.value.trim();
      const label = field.labels?.[0]?.textContent || 
                   field.placeholder || 
                   field.name;

      if (!value) {
        errors.push({
          field: field,
          message: `${label} is required`
        });
        field.classList.add('is-invalid');
      } else {
        field.classList.remove('is-invalid');
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  /**
   * Validate email fields
   * @param {HTMLFormElement} form - The form element
   * @returns {Object} Validation result
   */
  const validateEmails = (form) => {
    const errors = [];
    const emailFields = form.querySelectorAll('[type="email"]');

    emailFields.forEach(field => {
      const value = field.value.trim();
      
      if (value && !isValidEmail(value)) {
        errors.push({
          field: field,
          message: 'Please enter a valid email address'
        });
        field.classList.add('is-invalid');
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  /**
   * Validate phone fields
   * @param {HTMLFormElement} form - The form element
   * @returns {Object} Validation result
   */
  const validatePhones = (form) => {
    const errors = [];
    const phoneFields = form.querySelectorAll('[type="tel"]');

    phoneFields.forEach(field => {
      const value = field.value.trim();
      
      if (value && !isValidPhone(value)) {
        errors.push({
          field: field,
          message: 'Please enter a valid phone number'
        });
        field.classList.add('is-invalid');
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  /**
   * Validate entire form
   * @param {HTMLFormElement} form - The form element
   * @returns {Object} Validation result
   */
  const validateForm = (form) => {
    const results = [
      validateRequired(form),
      validateEmails(form),
      validatePhones(form)
    ];

    const allErrors = results.flatMap(r => r.errors);
    const isValid = results.every(r => r.isValid);

    return {
      isValid,
      errors: allErrors
    };
  };

  /**
   * Show validation errors
   * @param {Array} errors - Array of error objects
   */
  const showValidationErrors = (errors) => {
    if (errors.length === 0) return;

    // Focus first invalid field
    errors[0].field.focus();

    // Show error message
    const errorMessages = errors.map(e => e.message).join('\n');
    
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'warning',
        title: 'Please check your input',
        html: errors.map(e => `• ${e.message}`).join('<br>'),
        confirmButtonColor: '#0033A0'
      });
    }
  };

  /**
   * Show loading state on submit button
   * @param {HTMLElement} button - Submit button
   * @param {string} text - Loading text
   */
  const showLoading = (button, text = 'Sending...') => {
    if (!button) return;
    
    button.disabled = true;
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = `<span class="spinner"></span> ${text}`;
  };

  /**
   * Hide loading state on submit button
   * @param {HTMLElement} button - Submit button
   */
  const hideLoading = (button) => {
    if (!button) return;
    
    button.disabled = false;
    button.innerHTML = button.dataset.originalText || 'Submit';
  };

  /**
   * Show success message
   * @param {string} title - Success title
   * @param {string} message - Success message
   * @param {Function} callback - Optional callback after closing
   */
  const showSuccess = (title, message, callback = null) => {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: title,
        text: message,
        confirmButtonColor: '#0033A0'
      }).then(() => {
        if (callback) callback();
      });
    } else {
      alert(`${title}\n\n${message}`);
      if (callback) callback();
    }
  };

  /**
   * Show error message
   * @param {string} title - Error title
   * @param {string} message - Error message
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
   * Reset form and clear validation states
   * @param {HTMLFormElement} form - The form element
   */
  const resetForm = (form) => {
    form.reset();
    form.querySelectorAll('.is-invalid').forEach(el => {
      el.classList.remove('is-invalid');
    });
    form.querySelectorAll('.is-valid').forEach(el => {
      el.classList.remove('is-valid');
    });
  };

  /**
   * Handle form submission
   * @param {HTMLFormElement} form - The form element
   * @param {Object} options - Submission options
   * @returns {Promise} Submission promise
   */
  const handleSubmit = async (form, options = {}) => {
    const {
      url = form.action,
      method = form.method || 'POST',
      successTitle = 'Success!',
      successMessage = 'Your message has been sent successfully.',
      errorTitle = 'Error',
      errorMessage = 'Something went wrong. Please try again.',
      resetOnSuccess = true
    } = options;

    // Anti-spam checks
    if (isHoneypotFilled(form)) {
      console.warn('Form submission blocked: Honeypot filled');
      return;
    }

    if (isSubmittedTooQuickly(form)) {
      showError('Too Fast!', 'Please wait a moment before submitting.');
      return;
    }

    // Validate form
    const validation = validateForm(form);
    if (!validation.isValid) {
      showValidationErrors(validation.errors);
      return;
    }

    // Get submit button
    const submitButton = form.querySelector('[type="submit"]');
    showLoading(submitButton);

    try {
      const formData = new FormData(form);
      
      const response = await fetch(url, {
        method: method,
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showSuccess(successTitle, result.message || successMessage, () => {
          if (resetOnSuccess) {
            resetForm(form);
          }
        });
      } else {
        showError(errorTitle, result.message || errorMessage);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showError(errorTitle, errorMessage);
    } finally {
      hideLoading(submitButton);
    }
  };

  /**
   * Initialize real-time validation
   * @param {HTMLFormElement} form - The form element
   */
  const initRealTimeValidation = (form) => {
    const fields = form.querySelectorAll('input, textarea, select');

    fields.forEach(field => {
      // Validate on blur
      field.addEventListener('blur', () => {
        validateField(field);
      });

      // Clear invalid state on input
      field.addEventListener('input', () => {
        field.classList.remove('is-invalid');
      });
    });
  };

  /**
   * Validate single field
   * @param {HTMLElement} field - The field element
   */
  const validateField = (field) => {
    const value = field.value.trim();

    // Required check
    if (field.required && !value) {
      field.classList.add('is-invalid');
      return false;
    }

    // Email check
    if (field.type === 'email' && value && !isValidEmail(value)) {
      field.classList.add('is-invalid');
      return false;
    }

    // Phone check
    if (field.type === 'tel' && value && !isValidPhone(value)) {
      field.classList.add('is-invalid');
      return false;
    }

    field.classList.remove('is-invalid');
    if (value) field.classList.add('is-valid');
    
    return true;
  };

  /**
   * Initialize forms on the page
   */
  const init = () => {
    const forms = document.querySelectorAll('form[data-validate]');

    forms.forEach(form => {
      // Record load time
      recordFormLoadTime(form);

      // Initialize real-time validation
      initRealTimeValidation(form);

      // Handle submit
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSubmit(form);
      });
    });
  };

  // Public API
  return {
    init,
    validateForm,
    handleSubmit,
    showSuccess,
    showError,
    showLoading,
    hideLoading,
    resetForm,
    isValidEmail,
    isValidPhone
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', Forms.init);
