/**
 * ==============================================
 * File: whatsapp.js
 * Project: Zaza Rush Subaru
 * Developer: bguvava
 * Last Updated: January 30, 2026
 * Description: WhatsApp integration helpers
 * ==============================================
 */

'use strict';

/**
 * WhatsApp Module
 * Handles WhatsApp integration and messaging
 */
const WhatsApp = (() => {
  // Configuration
  const CONFIG = {
    phoneNumber: '263776381498',
    defaultMessage: "Hello! I'm interested in Zaza Rush Subaru services.",
    baseUrl: 'https://wa.me/'
  };

  /**
   * Generate WhatsApp URL with message
   * @param {string} message - Pre-filled message
   * @returns {string} WhatsApp URL
   */
  const generateUrl = (message = CONFIG.defaultMessage) => {
    const encodedMessage = encodeURIComponent(message);
    return `${CONFIG.baseUrl}${CONFIG.phoneNumber}?text=${encodedMessage}`;
  };

  /**
   * Open WhatsApp with custom message
   * @param {string} message - Pre-filled message
   * @param {boolean} newWindow - Open in new window
   */
  const openChat = (message = CONFIG.defaultMessage, newWindow = true) => {
    const url = generateUrl(message);
    
    if (newWindow) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  };

  /**
   * Generate product inquiry message
   * @param {Object} product - Product details
   * @returns {string} Formatted message
   */
  const generateProductInquiry = (product) => {
    const { name, category, sku, price } = product;
    
    let message = `Hello Zaza Rush Subaru! 👋\n\n`;
    message += `I'm interested in the following item:\n\n`;
    message += `📦 Product: ${name || 'N/A'}\n`;
    
    if (category) message += `📁 Category: ${category}\n`;
    if (sku) message += `🏷️ SKU: ${sku}\n`;
    if (price) message += `💰 Listed Price: ${price}\n`;
    
    message += `\nPlease provide availability and pricing details.\n\n`;
    message += `Thank you!`;
    
    return message;
  };

  /**
   * Generate service inquiry message
   * @param {Object} service - Service details
   * @returns {string} Formatted message
   */
  const generateServiceInquiry = (service) => {
    const { name, vehicle, description } = service;
    
    let message = `Hello Zaza Rush Subaru! 👋\n\n`;
    message += `I'd like to inquire about your services:\n\n`;
    message += `🔧 Service: ${name || 'General Inquiry'}\n`;
    
    if (vehicle) message += `🚗 Vehicle: ${vehicle}\n`;
    if (description) message += `📝 Details: ${description}\n`;
    
    message += `\nPlease let me know your availability and pricing.\n\n`;
    message += `Thank you!`;
    
    return message;
  };

  /**
   * Generate quote request message
   * @param {Object} details - Quote details
   * @returns {string} Formatted message
   */
  const generateQuoteRequest = (details) => {
    const { 
      vehicleYear, 
      vehicleMake, 
      vehicleModel, 
      engineType,
      partsNeeded,
      additionalInfo 
    } = details;
    
    let message = `Hello Zaza Rush Subaru! 👋\n\n`;
    message += `I'd like to request a quote:\n\n`;
    message += `🚗 VEHICLE DETAILS:\n`;
    
    if (vehicleYear) message += `   • Year: ${vehicleYear}\n`;
    message += `   • Make: ${vehicleMake || 'Subaru'}\n`;
    if (vehicleModel) message += `   • Model: ${vehicleModel}\n`;
    if (engineType) message += `   • Engine: ${engineType}\n`;
    
    if (partsNeeded) {
      message += `\n📦 PARTS NEEDED:\n`;
      message += `${partsNeeded}\n`;
    }
    
    if (additionalInfo) {
      message += `\n📝 ADDITIONAL INFO:\n`;
      message += `${additionalInfo}\n`;
    }
    
    message += `\nPlease provide a quote at your earliest convenience.\n\n`;
    message += `Thank you!`;
    
    return message;
  };

  /**
   * Generate sell vehicle inquiry message
   * @param {Object} vehicle - Vehicle details
   * @returns {string} Formatted message
   */
  const generateSellInquiry = (vehicle) => {
    const { 
      year, 
      model, 
      mileage, 
      condition, 
      askingPrice,
      description 
    } = vehicle;
    
    let message = `Hello Zaza Rush Subaru! 👋\n\n`;
    message += `I'm interested in selling my Subaru:\n\n`;
    message += `🚗 VEHICLE DETAILS:\n`;
    
    if (year) message += `   • Year: ${year}\n`;
    if (model) message += `   • Model: ${model}\n`;
    if (mileage) message += `   • Mileage: ${mileage} km\n`;
    if (condition) message += `   • Condition: ${condition}\n`;
    if (askingPrice) message += `   • Asking Price: $${askingPrice}\n`;
    
    if (description) {
      message += `\n📝 DESCRIPTION:\n`;
      message += `${description}\n`;
    }
    
    message += `\nPlease let me know if you're interested.\n\n`;
    message += `Thank you!`;
    
    return message;
  };

  /**
   * Initialize WhatsApp click handlers
   */
  const initClickHandlers = () => {
    // Generic WhatsApp buttons
    document.querySelectorAll('[data-whatsapp]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const message = button.dataset.whatsappMessage || CONFIG.defaultMessage;
        openChat(message);
      });
    });

    // Product inquiry buttons
    document.querySelectorAll('[data-whatsapp-product]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const product = JSON.parse(button.dataset.whatsappProduct);
        const message = generateProductInquiry(product);
        openChat(message);
      });
    });

    // Service inquiry buttons
    document.querySelectorAll('[data-whatsapp-service]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const service = JSON.parse(button.dataset.whatsappService);
        const message = generateServiceInquiry(service);
        openChat(message);
      });
    });
  };

  /**
   * Initialize module
   */
  const init = () => {
    initClickHandlers();
  };

  // Public API
  return {
    init,
    openChat,
    generateUrl,
    generateProductInquiry,
    generateServiceInquiry,
    generateQuoteRequest,
    generateSellInquiry,
    CONFIG
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', WhatsApp.init);
