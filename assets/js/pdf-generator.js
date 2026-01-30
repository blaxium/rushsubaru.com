/**
 * ==============================================
 * File: pdf-generator.js
 * Project: Zaza Rush Subaru
 * Developer: bguvava
 * Last Updated: January 30, 2026
 * Description: PDF generation functionality
 * ==============================================
 */

'use strict';

/**
 * PDF Generator Module
 * Handles PDF document generation for quotes and reports
 */
const PDFGenerator = (() => {
  // Configuration
  const CONFIG = {
    companyName: 'Zaza Rush Subaru',
    slogan: 'The Heart of Every Subaru',
    address: 'Number 9 Sherwood Crescent, Waterfalls, Zindoga Shops, Harare, Zimbabwe',
    phone: '+263 77 638 1498',
    email: 'sales@rushsubaru.com',
    website: 'www.rushsubaru.com',
    colors: {
      primary: '#0033A0',
      secondary: '#0055FF',
      dark: '#333333',
      light: '#F5F5F5'
    }
  };

  /**
   * Check if jsPDF is available
   * @returns {boolean} Is jsPDF loaded
   */
  const isJsPDFAvailable = () => {
    return typeof jspdf !== 'undefined' || typeof jsPDF !== 'undefined';
  };

  /**
   * Get jsPDF constructor
   * @returns {Function} jsPDF constructor
   */
  const getJsPDF = () => {
    return window.jspdf?.jsPDF || window.jsPDF;
  };

  /**
   * Add header to PDF document
   * @param {Object} doc - jsPDF document instance
   */
  const addHeader = (doc) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Company name
    doc.setFontSize(24);
    doc.setTextColor(0, 51, 160); // Primary blue
    doc.text(CONFIG.companyName, pageWidth / 2, 20, { align: 'center' });
    
    // Slogan
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(CONFIG.slogan, pageWidth / 2, 28, { align: 'center' });
    
    // Contact info
    doc.setFontSize(8);
    doc.text(`${CONFIG.phone} | ${CONFIG.email} | ${CONFIG.website}`, pageWidth / 2, 34, { align: 'center' });
    
    // Line separator
    doc.setDrawColor(0, 51, 160);
    doc.setLineWidth(0.5);
    doc.line(20, 38, pageWidth - 20, 38);
  };

  /**
   * Add footer to PDF document
   * @param {Object} doc - jsPDF document instance
   * @param {number} pageNumber - Current page number
   */
  const addFooter = (doc, pageNumber) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Line separator
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(20, pageHeight - 20, pageWidth - 20, pageHeight - 20);
    
    // Footer text
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(CONFIG.address, pageWidth / 2, pageHeight - 14, { align: 'center' });
    doc.text(`Page ${pageNumber}`, pageWidth / 2, pageHeight - 8, { align: 'center' });
  };

  /**
   * Generate quote PDF
   * @param {Object} quoteData - Quote details
   * @returns {Object} jsPDF document instance
   */
  const generateQuote = (quoteData) => {
    if (!isJsPDFAvailable()) {
      console.error('jsPDF is not loaded');
      return null;
    }

    const { jsPDF } = getJsPDF();
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Add header
    addHeader(doc);

    // Quote title
    let yPos = 50;
    doc.setFontSize(18);
    doc.setTextColor(51, 51, 51);
    doc.text('QUOTATION', pageWidth / 2, yPos, { align: 'center' });

    // Quote info
    yPos += 15;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    
    const today = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    
    doc.text(`Date: ${today}`, 20, yPos);
    if (quoteData.quoteNumber) {
      doc.text(`Quote #: ${quoteData.quoteNumber}`, pageWidth - 60, yPos);
    }

    // Customer info
    if (quoteData.customer) {
      yPos += 15;
      doc.setFontSize(12);
      doc.setTextColor(51, 51, 51);
      doc.text('Customer Details:', 20, yPos);
      
      yPos += 7;
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      
      if (quoteData.customer.name) {
        doc.text(`Name: ${quoteData.customer.name}`, 25, yPos);
        yPos += 5;
      }
      if (quoteData.customer.phone) {
        doc.text(`Phone: ${quoteData.customer.phone}`, 25, yPos);
        yPos += 5;
      }
      if (quoteData.customer.email) {
        doc.text(`Email: ${quoteData.customer.email}`, 25, yPos);
        yPos += 5;
      }
    }

    // Vehicle info
    if (quoteData.vehicle) {
      yPos += 10;
      doc.setFontSize(12);
      doc.setTextColor(51, 51, 51);
      doc.text('Vehicle Information:', 20, yPos);
      
      yPos += 7;
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      
      const vehicleInfo = [
        quoteData.vehicle.year,
        quoteData.vehicle.make,
        quoteData.vehicle.model
      ].filter(Boolean).join(' ');
      
      doc.text(`Vehicle: ${vehicleInfo}`, 25, yPos);
      
      if (quoteData.vehicle.engine) {
        yPos += 5;
        doc.text(`Engine: ${quoteData.vehicle.engine}`, 25, yPos);
      }
    }

    // Items table
    if (quoteData.items && quoteData.items.length > 0) {
      yPos += 15;
      doc.setFontSize(12);
      doc.setTextColor(51, 51, 51);
      doc.text('Items:', 20, yPos);
      
      yPos += 10;
      
      // Table header
      doc.setFillColor(0, 51, 160);
      doc.rect(20, yPos - 5, pageWidth - 40, 8, 'F');
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text('Description', 25, yPos);
      doc.text('Qty', pageWidth - 70, yPos);
      doc.text('Price', pageWidth - 45, yPos);
      
      yPos += 8;
      doc.setTextColor(51, 51, 51);
      
      let total = 0;
      quoteData.items.forEach((item, index) => {
        const rowY = yPos + (index * 8);
        
        // Alternate row background
        if (index % 2 === 0) {
          doc.setFillColor(245, 245, 245);
          doc.rect(20, rowY - 5, pageWidth - 40, 8, 'F');
        }
        
        doc.text(item.description || '', 25, rowY);
        doc.text(String(item.quantity || 1), pageWidth - 70, rowY);
        
        const price = item.price || 0;
        const itemTotal = price * (item.quantity || 1);
        total += itemTotal;
        
        doc.text(`$${itemTotal.toFixed(2)}`, pageWidth - 45, rowY);
      });
      
      yPos += (quoteData.items.length * 8) + 10;
      
      // Total
      doc.setFontSize(12);
      doc.setTextColor(0, 51, 160);
      doc.text(`Total: $${total.toFixed(2)}`, pageWidth - 45, yPos);
    }

    // Notes
    if (quoteData.notes) {
      yPos += 20;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Notes:', 20, yPos);
      yPos += 5;
      doc.setFontSize(9);
      
      const splitNotes = doc.splitTextToSize(quoteData.notes, pageWidth - 50);
      doc.text(splitNotes, 25, yPos);
    }

    // Validity
    yPos += 25;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('This quote is valid for 14 days from the date of issue.', 20, yPos);
    doc.text('Prices are in USD and subject to availability.', 20, yPos + 4);

    // Add footer
    addFooter(doc, 1);

    return doc;
  };

  /**
   * Download quote as PDF
   * @param {Object} quoteData - Quote details
   * @param {string} filename - Download filename
   */
  const downloadQuote = (quoteData, filename = 'quote') => {
    const doc = generateQuote(quoteData);
    
    if (doc) {
      const dateStr = new Date().toISOString().split('T')[0];
      doc.save(`${filename}-${dateStr}.pdf`);
    }
  };

  /**
   * Open quote in new window
   * @param {Object} quoteData - Quote details
   */
  const openQuote = (quoteData) => {
    const doc = generateQuote(quoteData);
    
    if (doc) {
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    }
  };

  /**
   * Initialize PDF generation handlers
   */
  const init = () => {
    // Initialize any PDF generation buttons
    document.querySelectorAll('[data-generate-pdf]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const quoteData = JSON.parse(button.dataset.generatePdf);
        downloadQuote(quoteData);
      });
    });
  };

  // Public API
  return {
    init,
    generateQuote,
    downloadQuote,
    openQuote,
    isJsPDFAvailable
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', PDFGenerator.init);
