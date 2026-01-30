# GitHub Copilot Instructions - Zaza Rush Subaru Project

> **Document Version:** 1.0  
> **Project:** Zaza Rush Subaru Website  
> **Domain:** www.rushsubaru.com  
> **Developer:** bguvava

---

## 1. Project Identity

You are assisting with the development of **Zaza Rush Subaru** - a professional business website for Zimbabwe's premier Subaru specialist. The project aims to create a world-class, fast, and professional website that serves as the primary digital storefront and lead generation platform.

### Company Information
- **Name:** Zaza Rush Subaru
- **Slogan:** "The Heart of Every Subaru"
- **Location:** Number 9 Sherwood Crescent, Waterfalls, Zindoga Shops, Harare, Zimbabwe
- **Phone/WhatsApp:** +263 77 638 1498
- **Email:** sales@rushsubaru.com
- **Website:** www.rushsubaru.com

### Developer Attribution
All pages must include: **"Developed with ❤️ by bguvava"** in the footer.

---

## 2. Response Guidelines

### Always Do
1. **Maintain Project Context** - Reference the project documentation files when providing solutions
2. **Follow Coding Standards** - Adhere to the coding_style.json specifications
3. **Use Brand Colors** - Apply the defined color palette consistently
4. **Implement Mobile-First** - Design for mobile screens first, then enhance for larger screens
5. **Include Accessibility** - Add ARIA labels, alt text, and keyboard navigation
6. **Write Clean Code** - Use meaningful names, proper indentation, and comments
7. **Security First** - Include honeypot fields, input sanitization, and validation

### Never Do
1. **Don't Break Brand Guidelines** - Never use colors outside the defined palette
2. **Don't Skip Validation** - All forms must have client and server-side validation
3. **Don't Forget Global Components** - Every page needs scroll indicator, scroll-to-top, WhatsApp button, and developer credits
4. **Don't Use Deprecated Code** - Stick to modern ES6+ JavaScript and HTML5
5. **Don't Ignore Performance** - Optimize images, defer scripts, minimize CSS
6. **Don't Remove Security Measures** - Honeypot and sanitization are mandatory

---

## 3. Technology Stack Reference

### Frontend
```
HTML5 | CSS3 | Bootstrap 5.3.x | JavaScript ES6+
```

### Libraries (CDN)
```
AOS 2.3.x        - Scroll animations
Font Awesome 6.x - Icons
Google Fonts     - Montserrat, Open Sans
SweetAlert2 11.x - Modals and alerts
Lightbox2 2.11.x - Image galleries
Swiper 11.x      - Carousels
jsPDF 2.5.x      - PDF generation
```

### Backend
```
PHP 8.2+ - Form handlers and email
```

### Development
```
VS Code | Git | GitHub | XAMPP | Cyberpanel (Production)
```

---

## 4. Brand Design System

### Colors (Use CSS Custom Properties)
```css
:root {
  --color-primary: #0033A0;      /* Headers, buttons, accents */
  --color-secondary: #0055FF;    /* Links, hover states */
  --color-light-blue: #E6F0FF;   /* Backgrounds, cards */
  --color-white: #FFFFFF;        /* Primary background */
  --color-dark-gray: #333333;    /* Body text */
  --color-light-gray: #F5F5F5;   /* Section backgrounds */
  --color-success: #28A745;      /* Success messages */
  --color-error: #DC3545;        /* Error messages */
  --color-whatsapp: #25D366;     /* WhatsApp elements */
}
```

### Typography
```css
/* Headings */
font-family: 'Montserrat', sans-serif;
font-weight: 600-700;

/* Body Text */
font-family: 'Open Sans', sans-serif;
font-weight: 400;
font-size: 16px;
```

### Responsive Breakpoints
```css
/* Mobile First Approach */
/* Default: Mobile (<768px) */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1200px) { /* Large Desktop */ }
```

---

## 5. File Structure

When creating or modifying files, follow this structure:

```
rushsubaru.com/
├── index.html          # Homepage
├── services.html       # Services page
├── catalog.html        # Parts catalog
├── about.html          # About us
├── contact.html        # Contact page
├── sell.html           # Sell your Subaru
├── assets/
│   ├── css/           
│   │   ├── variables.css    # CSS custom properties
│   │   ├── style.css        # Main styles
│   │   ├── components.css   # Component styles
│   │   ├── responsive.css   # Media queries
│   │   └── animations.css   # Animations
│   ├── js/
│   │   ├── main.js          # Core functionality
│   │   ├── navigation.js    # Navigation
│   │   ├── forms.js         # Form handling
│   │   ├── catalog.js       # Catalog functionality
│   │   ├── whatsapp.js      # WhatsApp integration
│   │   └── pdf-generator.js # PDF generation
│   └── images/
│       ├── logo/
│       ├── hero/
│       ├── services/
│       ├── catalog/
│       └── gallery/
├── data/
│   └── catalog.json    # Product data
├── api/v1/             # API endpoints
├── php/                # PHP handlers
├── docs/               # Documentation
└── tests/              # Test files
```

---

## 6. Global Components (Required on ALL Pages)

### 1. Scroll Progress Indicator
- Position: Fixed top of viewport
- Height: 3px
- Color: Primary Blue (#0033A0)
- Width: Calculated based on scroll position

### 2. Scroll-to-Top Button
- Position: Fixed bottom-right, 20px offset
- Size: 50px diameter
- Visibility: Appears after 300px scroll
- Animation: Smooth scroll to top

### 3. Floating WhatsApp Button
- Position: Fixed bottom-left, 20px offset
- Size: 60px diameter
- Color: WhatsApp Green (#25D366)
- Animation: Pulse effect every 2 seconds
- Link: wa.me/263776381498?text=Hello!%20I'm%20interested%20in%20Zaza%20Rush%20Subaru%20services.

### 4. Developer Credits (Footer)
- Text: "Developed with ❤️ by bguvava"
- Include copyright with dynamic year

---

## 7. Form Requirements

### All Forms Must Include:

1. **Client-side Validation**
   - Required field checking
   - Email format validation
   - Phone format validation (Zimbabwe)
   - Minimum character counts

2. **Honeypot Spam Protection**
   ```html
   <input type="text" name="website" class="honeypot" tabindex="-1" autocomplete="off">
   ```
   ```css
   .honeypot { position: absolute; left: -9999px; }
   ```

3. **Loading States**
   - Disable submit button during submission
   - Show spinner or loading text

4. **Feedback (SweetAlert2)**
   - Success modal with confirmation
   - Error modal with retry option

5. **Form Reset**
   - Clear form after successful submission

---

## 8. WhatsApp Integration

### Pre-filled Message Format
```javascript
const phone = '263776381498';
const message = encodeURIComponent(`Hello Zaza Rush Subaru! 👋

I'm interested in: ${productName}
Category: ${category}
Reference: ${itemId}

Please provide availability and pricing.

Thank you!`);

const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
```

---

## 9. Animation Guidelines (AOS)

### Configuration
```javascript
AOS.init({
  offset: 100,
  duration: 800,
  easing: 'ease-out-cubic',
  once: true
});
```

### Common Patterns
```html
<div data-aos="fade-up">Content</div>
<div data-aos="fade-up" data-aos-delay="100">Delayed</div>
<div data-aos="fade-right">From right</div>
<div data-aos="zoom-in">Zoom effect</div>
```

---

## 10. Code Templates

### HTML Page Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Zaza Rush Subaru - {PAGE_DESCRIPTION}">
  <title>{PAGE_TITLE} | Zaza Rush Subaru</title>
  
  <!-- Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  
  <!-- CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
  <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">
  <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
  <!-- Scroll Progress Indicator -->
  <div class="scroll-progress" id="scrollProgress"></div>
  
  <!-- Navigation -->
  <nav>...</nav>
  
  <!-- Main Content -->
  <main>...</main>
  
  <!-- Footer with Developer Credits -->
  <footer>
    <p>Developed with ❤️ by bguvava</p>
    <p>© <span id="currentYear"></span> Zaza Rush Subaru. All Rights Reserved.</p>
  </footer>
  
  <!-- Scroll to Top Button -->
  <button class="scroll-to-top" id="scrollToTop">
    <i class="fas fa-arrow-up"></i>
  </button>
  
  <!-- WhatsApp Float Button -->
  <a href="https://wa.me/263776381498?text=Hello!%20I'm%20interested%20in%20Zaza%20Rush%20Subaru%20services." 
     class="whatsapp-float" target="_blank" rel="noopener">
    <i class="fab fa-whatsapp"></i>
  </a>
  
  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="assets/js/main.js"></script>
</body>
</html>
```

### JavaScript Module Template
```javascript
/**
 * ==============================================
 * File: {filename}.js
 * Project: Zaza Rush Subaru
 * Developer: bguvava
 * ==============================================
 */

'use strict';

const ModuleName = (() => {
  // Private variables
  const config = {};
  
  // Private methods
  const init = () => {
    // Initialization code
  };
  
  // Public API
  return {
    init
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', ModuleName.init);
```

---

## 11. Development Phases

The project follows 8 sequential phases. Always reference the current phase when providing solutions:

| Phase | Name | Focus |
|-------|------|-------|
| 1 | Environment Setup | VS Code, Git, XAMPP, Dependencies |
| 2 | Core Infrastructure | CSS Architecture, Global Components |
| 3 | Homepage | index.html complete |
| 4 | Services Page | services.html with tabs |
| 5 | Catalog Page | catalog.html with filters |
| 6 | About & Contact | about.html, contact.html |
| 7 | Sell Your Subaru & API | sell.html, PHP handlers |
| 8 | Testing & Deployment | Tests, docs, go-live |

---

## 12. Quality Checklist

Before completing any task, verify:

- [ ] Code follows coding_style.json conventions
- [ ] Brand colors are correctly applied
- [ ] Mobile responsive (test all breakpoints)
- [ ] All global components present
- [ ] Forms have honeypot and validation
- [ ] WhatsApp links use correct number
- [ ] Developer credits included
- [ ] No console errors
- [ ] Accessibility requirements met
- [ ] Documentation updated

---

## 13. Context File References

When responding, consider these project files:

1. **settings.yml** - Project configuration and settings
2. **coding_style.json** - Coding conventions and standards
3. **project_description.md** - Full project specification
4. **product_mvp.md** - Detailed requirements by phase
5. **skills.md** - Developer capabilities reference
6. **user_requirements.md** - Original client requirements

---

## 14. Response Format

When providing code solutions:

1. **State the requirement ID** being addressed (e.g., HOME-001)
2. **Explain the approach** briefly
3. **Provide complete, working code** (not snippets)
4. **Include relevant comments** in the code
5. **Note any dependencies** or prerequisites
6. **Suggest testing steps** to verify

---

*This document ensures GitHub Copilot maintains consistent, high-quality assistance throughout the Zaza Rush Subaru project development.*
