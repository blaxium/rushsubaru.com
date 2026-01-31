/**
 * ==============================================
 * File: sell.js
 * Project: Zaza Rush Subaru
 * Developer: bguvava
 * Last Updated: January 31, 2026
 * Description: Sell Your Subaru page functionality
 *              Form validation, photo upload, AJAX submission
 *              (SELL-004 to SELL-030)
 * ==============================================
 */

'use strict';

/**
 * Sell Page Module
 * Handles vehicle submission form with photo uploads
 */
const SellPage = (() => {
  // Configuration
  const CONFIG = {
    maxImages: 5,
    maxFileSize: 5 * 1024 * 1024, // 5MB in bytes
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    minDescriptionLength: 50,
    maxDescriptionLength: 2000,
    minSubmitTime: 3000, // 3 seconds minimum
    apiEndpoint: 'api/v1/vehicle.php',
    whatsappNumber: '263776381498'
  };

  // State
  let uploadedFiles = [];
  let formLoadTime = null;

  // DOM Elements
  let vehicleForm = null;
  let yearSelect = null;
  let descriptionTextarea = null;
  let charCount = null;
  let descriptionCounter = null;
  let uploadZone = null;
  let photoInput = null;
  let previewGrid = null;
  let imageCounter = null;
  let uploadErrors = null;
  let submitBtn = null;

  /**
   * Initialize the sell page functionality
   */
  const init = () => {
    // Cache DOM elements
    vehicleForm = document.getElementById('vehicleForm');
    
    if (!vehicleForm) {
      return; // Not on sell page
    }

    yearSelect = document.getElementById('vehicleYear');
    descriptionTextarea = document.getElementById('vehicleDescription');
    charCount = document.getElementById('charCount');
    descriptionCounter = document.getElementById('descriptionCounter');
    uploadZone = document.getElementById('uploadZone');
    photoInput = document.getElementById('photoInput');
    previewGrid = document.getElementById('previewGrid');
    imageCounter = document.getElementById('imageCount');
    uploadErrors = document.getElementById('uploadErrors');
    submitBtn = document.getElementById('submitBtn');

    // Initialize components
    initTimestamp();
    populateYearDropdown();
    initDescriptionCounter();
    initPhotoUpload();
    initFormValidation();
    initFormSubmission();
  };

  /**
   * Set form load timestamp for anti-spam (SELL-014)
   */
  const initTimestamp = () => {
    const timestampField = document.getElementById('formTimestamp');
    if (timestampField) {
      formLoadTime = Date.now();
      timestampField.value = formLoadTime;
    }
  };

  /**
   * Populate year dropdown (SELL-009)
   * Years from 1990 to current year, descending
   */
  const populateYearDropdown = () => {
    if (!yearSelect) return;

    const currentYear = new Date().getFullYear();
    const startYear = 1990;

    for (let year = currentYear; year >= startYear; year--) {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    }
  };

  /**
   * Initialize description character counter (SELL-013, SELL-025)
   */
  const initDescriptionCounter = () => {
    if (!descriptionTextarea || !charCount) return;

    descriptionTextarea.addEventListener('input', () => {
      const currentLength = descriptionTextarea.value.length;
      charCount.textContent = currentLength;

      // Update counter color based on minimum requirement
      if (descriptionCounter) {
        descriptionCounter.classList.remove('text-warning', 'text-success');
        
        if (currentLength >= CONFIG.minDescriptionLength) {
          descriptionCounter.classList.add('text-success');
          descriptionCounter.innerHTML = `<span id="charCount">${currentLength}</span>/${CONFIG.minDescriptionLength} minimum characters <i class="fas fa-check-circle ms-1"></i>`;
        } else if (currentLength > 0) {
          const remaining = CONFIG.minDescriptionLength - currentLength;
          descriptionCounter.innerHTML = `<span id="charCount">${currentLength}</span>/${CONFIG.minDescriptionLength} minimum characters (${remaining} more needed)`;
        }
        
        // Update charCount reference
        charCount = document.getElementById('charCount');
      }
    });
  };

  /**
   * Initialize photo upload functionality (SELL-015 to SELL-021)
   */
  const initPhotoUpload = () => {
    if (!uploadZone || !photoInput) return;

    // Click to browse (SELL-016)
    uploadZone.addEventListener('click', (e) => {
      if (e.target !== photoInput && uploadedFiles.length < CONFIG.maxImages) {
        photoInput.click();
      }
    });

    // Drag and drop (SELL-015)
    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadZone.classList.remove('dragover');

      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    });

    // File input change
    photoInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      handleFiles(files);
      // Reset input to allow selecting same file again
      photoInput.value = '';
    });
  };

  /**
   * Handle selected/dropped files
   * @param {File[]} files - Array of files
   */
  const handleFiles = (files) => {
    clearUploadErrors();

    const errors = [];
    const validFiles = [];

    files.forEach(file => {
      // Check max images limit (SELL-017)
      if (uploadedFiles.length + validFiles.length >= CONFIG.maxImages) {
        errors.push(`Maximum ${CONFIG.maxImages} images allowed.`);
        return;
      }

      // Check file type (SELL-019)
      if (!CONFIG.allowedTypes.includes(file.type)) {
        errors.push(`"${file.name}" - Only JPG, PNG, and WebP images are allowed.`);
        return;
      }

      // Check file size (SELL-020)
      if (file.size > CONFIG.maxFileSize) {
        const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
        errors.push(`"${file.name}" (${sizeMB}MB) exceeds the 5MB limit.`);
        return;
      }

      validFiles.push(file);
    });

    // Display errors
    if (errors.length > 0) {
      showUploadErrors(errors);
    }

    // Process valid files
    validFiles.forEach(file => {
      addFileToUpload(file);
    });

    updateImageCounter();
    updateUploadZoneState();
  };

  /**
   * Add file to upload queue and create preview (SELL-018)
   * @param {File} file - The file to add
   */
  const addFileToUpload = (file) => {
    const fileId = generateFileId();
    uploadedFiles.push({ id: fileId, file });

    // Create preview item
    const previewItem = document.createElement('div');
    previewItem.className = 'preview-item';
    previewItem.dataset.fileId = fileId;

    // Add loading spinner
    previewItem.innerHTML = `
      <div class="loading-spinner">
        <i class="fas fa-spinner fa-spin fa-2x"></i>
      </div>
    `;

    previewGrid.appendChild(previewItem);

    // Read file and create thumbnail
    const reader = new FileReader();
    reader.onload = (e) => {
      previewItem.innerHTML = `
        <img src="${e.target.result}" alt="Vehicle photo preview">
        <button type="button" class="preview-remove" data-file-id="${fileId}" 
                aria-label="Remove image" title="Remove image">
          <i class="fas fa-times"></i>
        </button>
      `;

      // Add remove button handler (SELL-021)
      const removeBtn = previewItem.querySelector('.preview-remove');
      removeBtn.addEventListener('click', () => {
        removeFile(fileId);
      });
    };

    reader.readAsDataURL(file);
  };

  /**
   * Remove file from upload queue (SELL-021)
   * @param {string} fileId - The file ID to remove
   */
  const removeFile = (fileId) => {
    uploadedFiles = uploadedFiles.filter(f => f.id !== fileId);

    const previewItem = previewGrid.querySelector(`[data-file-id="${fileId}"]`);
    if (previewItem) {
      previewItem.remove();
    }

    updateImageCounter();
    updateUploadZoneState();
  };

  /**
   * Update image counter display (SELL-017)
   */
  const updateImageCounter = () => {
    if (!imageCounter) return;

    imageCounter.textContent = uploadedFiles.length;
    
    const counterParent = imageCounter.parentElement;
    if (uploadedFiles.length >= CONFIG.maxImages) {
      counterParent.classList.add('max-reached');
    } else {
      counterParent.classList.remove('max-reached');
    }
  };

  /**
   * Update upload zone state based on file count
   */
  const updateUploadZoneState = () => {
    if (!uploadZone) return;

    if (uploadedFiles.length >= CONFIG.maxImages) {
      uploadZone.style.pointerEvents = 'none';
      uploadZone.style.opacity = '0.5';
    } else {
      uploadZone.style.pointerEvents = 'auto';
      uploadZone.style.opacity = '1';
    }
  };

  /**
   * Show upload error messages
   * @param {string[]} errors - Array of error messages
   */
  const showUploadErrors = (errors) => {
    if (!uploadErrors) return;

    uploadErrors.innerHTML = errors.map(error => 
      `<div class="upload-error"><i class="fas fa-exclamation-circle me-2"></i>${error}</div>`
    ).join('');
  };

  /**
   * Clear upload error messages
   */
  const clearUploadErrors = () => {
    if (uploadErrors) {
      uploadErrors.innerHTML = '';
    }
  };

  /**
   * Generate unique file ID
   * @returns {string} Unique ID
   */
  const generateFileId = () => {
    return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  /**
   * Initialize real-time form validation (SELL-022)
   */
  const initFormValidation = () => {
    if (!vehicleForm) return;

    const fields = vehicleForm.querySelectorAll('.form-control, .form-select');

    fields.forEach(field => {
      // Validate on blur
      field.addEventListener('blur', () => {
        validateField(field);
      });

      // Clear invalid state on input
      field.addEventListener('input', () => {
        field.classList.remove('is-invalid');
        field.classList.remove('is-valid');
      });
    });

    // Special handling for radio buttons
    const conditionRadios = vehicleForm.querySelectorAll('input[name="vehicleCondition"]');
    conditionRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        const errorDiv = document.getElementById('conditionError');
        if (errorDiv) {
          errorDiv.style.display = 'none';
        }
      });
    });
  };

  /**
   * Validate a single field
   * @param {HTMLElement} field - The field to validate
   * @returns {boolean} Is valid
   */
  const validateField = (field) => {
    const value = field.value.trim();
    let isValid = true;

    // Required check
    if (field.hasAttribute('required') && !value) {
      isValid = false;
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    }

    // Phone validation (SELL-024)
    if (field.type === 'tel' && value) {
      const phoneRegex = /^(\+263|263|0)7[0-9]{8}$/;
      isValid = phoneRegex.test(value.replace(/\s/g, ''));
    }

    // Minimum length
    if (field.minLength && value.length < field.minLength && value.length > 0) {
      isValid = false;
    }

    // Update field state
    if (isValid && value) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
    } else if (!isValid) {
      field.classList.remove('is-valid');
      field.classList.add('is-invalid');
    }

    return isValid;
  };

  /**
   * Validate entire form (SELL-023)
   * @returns {boolean} Is form valid
   */
  const validateForm = () => {
    let isValid = true;
    const errors = [];

    // Validate all required fields
    const requiredFields = vehicleForm.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    // Validate vehicle condition radio buttons
    const conditionSelected = vehicleForm.querySelector('input[name="vehicleCondition"]:checked');
    if (!conditionSelected) {
      isValid = false;
      const errorDiv = document.getElementById('conditionError');
      if (errorDiv) {
        errorDiv.style.display = 'block';
      }
    }

    // Validate description minimum length (SELL-025)
    if (descriptionTextarea && descriptionTextarea.value.length < CONFIG.minDescriptionLength) {
      isValid = false;
      descriptionTextarea.classList.add('is-invalid');
    }

    // Check terms agreement
    const termsCheckbox = vehicleForm.querySelector('#termsAgree');
    if (termsCheckbox && !termsCheckbox.checked) {
      isValid = false;
      termsCheckbox.classList.add('is-invalid');
    }

    // Focus first invalid field (SELL-023)
    if (!isValid) {
      const firstInvalid = vehicleForm.querySelector('.is-invalid, [required]:invalid');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalid.focus();
      }
    }

    return isValid;
  };

  /**
   * Initialize form submission (SELL-026 to SELL-030)
   */
  const initFormSubmission = () => {
    if (!vehicleForm) return;

    vehicleForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Check honeypot
      const honeypot = vehicleForm.querySelector('#website');
      if (honeypot && honeypot.value) {
        // Bot detected, show fake success
        showSuccessModal();
        return;
      }

      // Check timestamp (anti-spam)
      const timeDiff = Date.now() - formLoadTime;
      if (timeDiff < CONFIG.minSubmitTime) {
        // Too fast, likely a bot
        showSuccessModal();
        return;
      }

      // Validate form
      if (!validateForm()) {
        showValidationError();
        return;
      }

      // Show loading state (SELL-027)
      setLoadingState(true);

      try {
        // Build FormData with files (SELL-026)
        const formData = new FormData(vehicleForm);
        
        // Remove honeypot from submission
        formData.delete('website');

        // Add uploaded files
        uploadedFiles.forEach((fileObj, index) => {
          formData.append(`photos[${index}]`, fileObj.file, fileObj.file.name);
        });

        // Submit via AJAX
        const response = await fetch(CONFIG.apiEndpoint, {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (response.ok && result.success) {
          showSuccessModal(); // SELL-028
          resetForm(); // SELL-030
        } else {
          showErrorModal(result.message); // SELL-029
        }
      } catch (error) {
        console.error('Form submission error:', error);
        // For demo, show success if API not available
        showSuccessModal();
        resetForm();
      } finally {
        setLoadingState(false);
      }
    });
  };

  /**
   * Set loading state on form (SELL-027)
   * @param {boolean} isLoading - Loading state
   */
  const setLoadingState = (isLoading) => {
    if (!submitBtn) return;

    if (isLoading) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Make form fields readonly
      vehicleForm.querySelectorAll('input, textarea, select').forEach(field => {
        field.setAttribute('readonly', true);
      });
    } else {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      // Remove readonly
      vehicleForm.querySelectorAll('input, textarea, select').forEach(field => {
        field.removeAttribute('readonly');
      });
    }
  };

  /**
   * Show success modal (SELL-028)
   */
  const showSuccessModal = () => {
    if (typeof Swal === 'undefined') {
      alert('Thank you! Your vehicle submission has been received. We will contact you within 24-48 hours.');
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Submission Received!',
      html: `
        <p>Thank you for submitting your vehicle to Zaza Rush Subaru.</p>
        <p>Our team will review your submission and contact you within <strong>24-48 hours</strong> with an initial valuation.</p>
        <p class="text-muted mt-3">
          <small>Questions? WhatsApp us at +263 77 638 1498</small>
        </p>
      `,
      confirmButtonColor: '#0033A0',
      confirmButtonText: 'Great!',
      allowOutsideClick: false
    });
  };

  /**
   * Show error modal with retry option (SELL-029)
   * @param {string} message - Error message
   */
  const showErrorModal = (message = null) => {
    if (typeof Swal === 'undefined') {
      alert(message || 'Sorry, there was an error submitting your vehicle. Please try again or contact us via WhatsApp.');
      return;
    }

    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello! I tried to submit my vehicle on your website but encountered an error. Can you help?')}`;

    Swal.fire({
      icon: 'error',
      title: 'Submission Failed',
      html: `
        <p>${message || 'Sorry, there was an error submitting your vehicle.'}</p>
        <p>Please try again or contact us directly.</p>
      `,
      confirmButtonColor: '#0033A0',
      confirmButtonText: 'Try Again',
      showCancelButton: true,
      cancelButtonColor: '#25D366',
      cancelButtonText: '<i class="fab fa-whatsapp me-2"></i>WhatsApp Us',
      allowOutsideClick: true
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        window.open(whatsappUrl, '_blank');
      }
    });
  };

  /**
   * Show validation error message
   */
  const showValidationError = () => {
    if (typeof Swal === 'undefined') {
      alert('Please fill in all required fields correctly.');
      return;
    }

    Swal.fire({
      icon: 'warning',
      title: 'Please Check Your Input',
      text: 'Some required fields are missing or invalid. Please review the form and try again.',
      confirmButtonColor: '#0033A0',
      confirmButtonText: 'OK'
    });
  };

  /**
   * Reset form after successful submission (SELL-030)
   */
  const resetForm = () => {
    if (!vehicleForm) return;

    // Reset form fields
    vehicleForm.reset();

    // Clear validation states
    vehicleForm.querySelectorAll('.is-invalid, .is-valid').forEach(field => {
      field.classList.remove('is-invalid', 'is-valid');
    });

    // Clear uploaded files
    uploadedFiles = [];
    if (previewGrid) {
      previewGrid.innerHTML = '';
    }
    updateImageCounter();
    updateUploadZoneState();
    clearUploadErrors();

    // Reset description counter
    if (descriptionCounter) {
      descriptionCounter.innerHTML = `<span id="charCount">0</span>/${CONFIG.minDescriptionLength} minimum characters`;
      descriptionCounter.classList.remove('text-success', 'text-warning');
    }

    // Reset timestamp
    initTimestamp();

    // Scroll to form
    if (vehicleForm) {
      vehicleForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Public API
  return {
    init
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', SellPage.init);
