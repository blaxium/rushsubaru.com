# Zaza Rush Subaru - Product Requirements Document (MVP)

> **Document Version:** 1.0  
> **Created:** January 30, 2026  
> **Project Domain:** www.rushsubaru.com  
> **Document Type:** Minimum Viable Product (MVP) Specification  
> **Developed by:** bguvava (bguvava.com)

---

## Table of Contents

1. [Document Overview](#1-document-overview)
2. [MVP Objectives & Success Criteria](#2-mvp-objectives--success-criteria)
3. [Development Phases Overview](#3-development-phases-overview)
4. [Phase 1: Development Environment Setup](#4-phase-1-development-environment-setup)
5. [Phase 2: Core Infrastructure & Global Components](#5-phase-2-core-infrastructure--global-components)
6. [Phase 3: Homepage (index.html)](#6-phase-3-homepage-indexhtml)
7. [Phase 4: Services Page (services.html)](#7-phase-4-services-page-serviceshtml)
8. [Phase 5: Parts Catalog (catalog.html)](#8-phase-5-parts-catalog-cataloghtml)
9. [Phase 6: About Us & Contact Pages](#9-phase-6-about-us--contact-pages)
10. [Phase 7: Sell Your Subaru & API Backend](#10-phase-7-sell-your-subaru--api-backend)
11. [Phase 8: Testing, Documentation & Deployment](#11-phase-8-testing-documentation--deployment)
12. [Appendices](#12-appendices)

---

## 1. Document Overview

### 1.1 Purpose

This Product Requirements Document (MVP) provides a comprehensive, step-by-step breakdown of all requirements for building the Zaza Rush Subaru website. The document follows an incremental development approach, progressing from environment setup through to deployment.

### 1.2 Scope

The MVP encompasses:
- Complete website development for www.rushsubaru.com
- 6 public-facing pages with full functionality
- Backend API for form processing
- Comprehensive testing and deployment procedures

### 1.3 Document Structure

Each requirement is documented using the following format:

| Column | Description |
|--------|-------------|
| **Requirement ID** | Unique identifier (e.g., ENV-001, HOME-001) |
| **Module Name** | Feature/component category |
| **Description** | Detailed requirement description |
| **User Story** | User perspective narrative |
| **Expected System Behaviour/Outcome** | Specific measurable outcome |
| **Role** | Primary user role (Visitor/Developer/Administrator) |

### 1.4 Design Compliance

All requirements must adhere to the Design Guidelines specified in the Project Description:

| Element | Specification |
|---------|--------------|
| **Primary Blue** | #0033A0 |
| **Secondary Blue** | #0055FF |
| **Light Blue** | #E6F0FF |
| **WhatsApp Green** | #25D366 |
| **Typography** | Montserrat (headings), Open Sans (body) |
| **Animations** | AOS library, 800ms duration, ease-in-out |

---

## 2. MVP Objectives & Success Criteria

### 2.1 Primary Objectives

| # | Objective | Measurable Outcome |
|---|-----------|-------------------|
| 1 | Establish online presence | Live, functional website at www.rushsubaru.com |
| 2 | Enable lead generation | Working contact forms, WhatsApp integration |
| 3 | Showcase inventory | Searchable parts catalog with inquiry system |
| 4 | Professional brand image | Consistent design, smooth animations, fast loading |
| 5 | Mobile accessibility | Fully responsive at all breakpoints (320px-1920px) |

### 2.2 Global Success Criteria

- ✅ **100% Test Pass Rate** - No failing tests before deployment
- ✅ **Page Load < 3 seconds** - On 3G network connections
- ✅ **Lighthouse Score > 80** - Performance, Accessibility, Best Practices, SEO
- ✅ **Zero Console Errors** - Clean browser developer tools
- ✅ **Cross-Browser Compatible** - Chrome, Firefox, Safari, Edge
- ✅ **Mobile Responsive** - All breakpoints verified
- ✅ **Security Implemented** - Honeypot, input sanitization, SSL

### 2.3 Global UI Components (All Pages)

The following components must appear on **every page**:

| Component | Position | Specification |
|-----------|----------|---------------|
| Scroll Progress Indicator | Top of viewport | 3px height, Primary Blue #0033A0 |
| Scroll-to-Top Button | Bottom-right, 20px offset | Appears after 300px scroll |
| Floating WhatsApp Button | Bottom-left, 20px offset | WhatsApp Green #25D366, pulse animation |
| Developer Credits | Footer | "Developed with ❤️ by bguvava" |

---

## 3. Development Phases Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT ROADMAP                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PHASE 1: Environment Setup                                      │
│  └── VS Code, Git, XAMPP, Dependencies                          │
│           │                                                      │
│           ▼                                                      │
│  PHASE 2: Core Infrastructure                                    │
│  └── CSS Architecture, Global Components, Navigation            │
│           │                                                      │
│           ▼                                                      │
│  PHASE 3: Homepage (index.html)                                  │
│  └── Hero, Services, Featured, Testimonials, Contact            │
│           │                                                      │
│           ▼                                                      │
│  PHASE 4: Services Page (services.html)                          │
│  └── 6 Service Tabs with Full Content                           │
│           │                                                      │
│           ▼                                                      │
│  PHASE 5: Parts Catalog (catalog.html)                           │
│  └── Search, Filters, Product Cards, Pagination                 │
│           │                                                      │
│           ▼                                                      │
│  PHASE 6: About & Contact Pages                                  │
│  └── about.html, contact.html with Forms & Map                  │
│           │                                                      │
│           ▼                                                      │
│  PHASE 7: Sell Your Subaru & API                                 │
│  └── sell.html, PHP Handlers, API Structure                     │
│           │                                                      │
│           ▼                                                      │
│  PHASE 8: Testing & Deployment                                   │
│  └── 100% Test Coverage, Documentation, Go-Live                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.1 Folder Structure Requirements

All development must follow this structure:

```
rushsubaru.com/
├── index.html
├── services.html
├── catalog.html
├── about.html
├── contact.html
├── sell.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── variables.css
│   │   ├── components.css
│   │   ├── responsive.css
│   │   └── animations.css
│   ├── js/
│   │   ├── main.js
│   │   ├── navigation.js
│   │   ├── forms.js
│   │   ├── catalog.js
│   │   ├── whatsapp.js
│   │   └── pdf-generator.js
│   ├── images/
│   │   ├── logo/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── catalog/
│   │   └── gallery/
│   └── fonts/
├── data/
│   └── catalog.json
├── api/
│   └── v1/
│       ├── contact.php
│       ├── vehicle.php
│       └── config.php
├── php/
│   ├── contact-handler.php
│   ├── vehicle-handler.php
│   ├── email-template.php
│   └── logs/
├── docs/
│   ├── homepage/
│   ├── services/
│   ├── catalog/
│   ├── about/
│   ├── contact/
│   ├── sell/
│   └── api/
├── tests/
│   ├── homepage/
│   ├── services/
│   ├── catalog/
│   ├── about/
│   ├── contact/
│   └── sell/
├── .htaccess
├── robots.txt
├── sitemap.xml
└── .github/
    ├── assets/
    ├── prompts/
    └── user_requirements.md
```

---

## 4. Phase 1: Development Environment Setup

### 4.1 Phase Objectives

- Set up VS Code with required extensions
- Initialize Git repository with proper branch strategy
- Configure XAMPP local development server
- Create project folder structure
- Install all CDN dependencies

### 4.2 Requirements Table

| Requirement ID | Module Name | Description | User Story | Expected System Behaviour/Outcome | Role |
|----------------|-------------|-------------|------------|-----------------------------------|------|
| ENV-001 | VS Code Installation | Install Visual Studio Code IDE on development machine | As a developer, I want VS Code installed so that I have a modern code editor for web development | VS Code launches successfully, version 1.85+ installed, welcome screen displays, all default features functional | Developer |
| ENV-002 | Live Server Extension | Install and configure Live Server extension for real-time browser preview | As a developer, I want live browser refresh so that I can see changes instantly without manual refresh | Live Server icon appears in status bar, right-click "Open with Live Server" available, browser auto-opens on port 5500 | Developer |
| ENV-003 | Code Formatting Extensions | Install Prettier, ESLint, HTML CSS Support extensions | As a developer, I want automated code formatting so that code style remains consistent across the project | Extensions show as installed and enabled, format on save works, linting errors display in Problems panel | Developer |
| ENV-004 | Bootstrap Development Extensions | Install Bootstrap 5 Quick Snippets and IntelliSense extensions | As a developer, I want Bootstrap snippets so that I can rapidly scaffold Bootstrap components | Typing "bs5-" triggers snippet suggestions, Bootstrap class autocomplete works in HTML files | Developer |
| ENV-005 | Git Integration Extensions | Install GitLens and Git Graph extensions for enhanced version control | As a developer, I want advanced Git visualization so that I can track changes and collaborate effectively | GitLens blame annotations appear inline, Git Graph shows commit history visually, branch management accessible | Developer |
| ENV-006 | VS Code Workspace Settings | Configure workspace settings.json with project-specific formatting rules | As a developer, I want consistent editor settings so that all code follows the same formatting standards | .vscode/settings.json created with tabSize: 2, formatOnSave: true, defaultFormatter set for HTML/CSS/JS files | Developer |
| ENV-007 | Git Repository Initialization | Initialize Git repository and create initial project commit | As a developer, I want version control initialized so that I can track all code changes from project start | `git init` successful, .git folder exists, `git status` shows clean working directory after initial commit | Developer |
| ENV-008 | Git Ignore Configuration | Create comprehensive .gitignore file for web project | As a developer, I want ignored files configured so that sensitive and unnecessary files are not committed | .gitignore includes: node_modules/, .env, .DS_Store, *.log, .vscode/*, thumbs.db, *.tmp, /vendor/ | Developer |
| ENV-009 | Branch Strategy Setup | Establish Git branching strategy with main, develop, and feature branches | As a developer, I want organized branches so that development workflow follows best practices | Main branch protected, develop branch created, feature/* branch naming convention documented, branches visible in Git Graph | Developer |
| ENV-010 | GitHub Remote Repository | Create GitHub repository and link local repo to remote origin | As a developer, I want remote backup so that code is stored securely and accessible for deployment | `git remote -v` shows origin URL, `git push origin main` succeeds, repository visible on GitHub | Developer |
| ENV-011 | XAMPP Installation | Install XAMPP with Apache and PHP 8.2+ on development machine | As a developer, I want a local server environment so that I can test PHP functionality locally | XAMPP Control Panel launches, Apache starts on port 80, PHP version 8.2+ confirmed via phpinfo() | Developer |
| ENV-012 | Virtual Host Configuration | Configure Apache virtual host for rushsubaru.local domain | As a developer, I want a custom local domain so that the development URL mirrors production structure | httpd-vhosts.conf updated, hosts file entry added (127.0.0.1 rushsubaru.local), http://rushsubaru.local loads project | Developer |
| ENV-013 | PHP Configuration | Configure PHP settings for development (error reporting, memory limit, upload size) | As a developer, I want PHP properly configured so that debugging is enabled and file operations work correctly | php.ini: display_errors=On, error_reporting=E_ALL, memory_limit=256M, upload_max_filesize=10M, post_max_size=12M | Developer |
| ENV-014 | Root Directory Structure | Create primary project folders: assets/, data/, php/, docs/, tests/, api/ | As a developer, I want organized folder structure so that project files are logically separated by function | All 6 root folders created, visible in VS Code explorer, folder structure matches project architecture document | Developer |
| ENV-015 | Assets Subdirectory Setup | Create assets subfolders: css/, js/, images/, fonts/, videos/, icons/ | As a developer, I want asset organization so that static resources are categorized by type | All 6 asset subfolders created under /assets/, each folder contains placeholder .gitkeep file | Developer |
| ENV-016 | CSS File Structure | Create CSS files: styles.css, variables.css, components.css, responsive.css, animations.css | As a developer, I want modular CSS architecture so that styles are maintainable and organized | All 5 CSS files created in /assets/css/, each file has header comment with purpose description | Developer |
| ENV-017 | JavaScript File Structure | Create JS files: main.js, navigation.js, forms.js, animations.js, utils.js | As a developer, I want modular JavaScript architecture so that functionality is separated by concern | All 5 JS files created in /assets/js/, each file uses ES6+ module pattern with 'use strict' directive | Developer |
| ENV-018 | API Folder Structure | Create API versioning structure: api/v1/endpoints/, api/v1/config/, api/v1/utils/ | As a developer, I want API organization so that backend services follow RESTful conventions | api/v1/ folder structure created with subdirectories, index.php router placeholder in api/v1/ | Developer |
| ENV-019 | Bootstrap CDN Integration | Add Bootstrap 5.3.x CSS and JS CDN links to base HTML template | As a developer, I want Bootstrap framework so that I can use responsive grid and UI components | Bootstrap 5.3.3 CSS in `<head>`, Bootstrap JS bundle before `</body>`, no console errors, grid system functional | Developer |
| ENV-020 | Font Awesome CDN Setup | Integrate Font Awesome 6.x icon library via CDN | As a developer, I want icon library so that I can add professional icons throughout the website | Font Awesome 6.5.x CDN link added, `<i class="fas fa-car"></i>` renders correctly, icon fonts load without CORS errors | Developer |
| ENV-021 | Google Fonts Integration | Add Montserrat and Open Sans font families from Google Fonts | As a developer, I want custom typography so that the website matches brand design specifications | Google Fonts preconnect links added, Montserrat (400,500,600,700) and Open Sans (400,600) weights loaded, CSS font-family applied | Developer |
| ENV-022 | AOS Animation Library | Integrate Animate On Scroll library for scroll-triggered animations | As a developer, I want scroll animations so that page elements animate as users scroll | AOS CSS and JS CDN links added, AOS.init() called in main.js, data-aos="fade-up" triggers animation on scroll | Developer |
| ENV-023 | Interactive Libraries Setup | Add SweetAlert2, Lightbox2, and Swiper.js libraries via CDN | As a developer, I want UI enhancement libraries so that I can create modals, galleries, and carousels | All 3 libraries loaded via CDN, Swal.fire() displays modal, Lightbox opens images, Swiper carousel initializes | Developer |
| ENV-024 | PDF Generation Library | Integrate jsPDF library for client-side PDF generation | As a developer, I want PDF capabilities so that users can download quotes and documents | jsPDF CDN loaded, new jsPDF() creates instance, doc.save('test.pdf') downloads valid PDF file | Developer |
| ENV-025 | Base HTML Template | Create index.html with complete CDN links, meta tags, and semantic structure | As a developer, I want a master template so that all pages follow consistent structure and load dependencies | index.html includes: DOCTYPE, charset, viewport meta, SEO meta tags, all CDN links, semantic HTML5 structure, no validation errors | Developer |

### 4.3 Phase 1 Success Criteria

- [ ] VS Code opens project without errors
- [ ] All extensions installed and active
- [ ] Git repository initialized with proper .gitignore
- [ ] XAMPP Apache serves project at localhost or rushsubaru.local
- [ ] All folder structures created per specification
- [ ] Base HTML template renders with all CDN resources loading

---

## 5. Phase 2: Core Infrastructure & Global Components

### 5.1 Phase Objectives

- Establish CSS architecture with brand colors and typography
- Create responsive breakpoint system
- Build global navigation component
- Build global footer with developer credits
- Implement scroll progress indicator
- Create scroll-to-top and floating WhatsApp buttons
- Set up main JavaScript initialization

### 5.2 Requirements Table

| Requirement ID | Module Name | Description | User Story | Expected System Behaviour/Outcome | Role |
|----------------|-------------|-------------|------------|-----------------------------------|------|
| CORE-001 | Base CSS Architecture | Define CSS custom properties (variables) for all brand colors including Primary Blue (#0033A0), Secondary Blue (#0055FF), Light Blue (#E6F0FF), White (#FFFFFF), Dark Gray (#333333), Light Gray (#F5F5F5), Success Green (#28A745), Error Red (#DC3545), and WhatsApp Green (#25D366) in the :root selector | As a developer, I want centralized color variables so that I can maintain brand consistency and easily update colors site-wide | System SHALL define all brand colors as CSS custom properties in style.css :root selector, accessible via var(--color-name) syntax throughout the stylesheet | Developer |
| CORE-002 | Base CSS Architecture | Implement typography base styles using Montserrat for headings (font-weight 600-700) and Open Sans for body text (font-weight 400) with proper font-size hierarchy | As a visitor, I want consistent, readable typography so that I can easily consume content across all pages | System SHALL apply Montserrat font to all h1-h6 elements with appropriate weights and Open Sans to body/paragraph elements, with responsive font scaling | Developer |
| CORE-003 | Base CSS Architecture | Create utility classes for common styling patterns including spacing (margin/padding), flexbox layouts, text alignment, and visibility helpers | As a developer, I want reusable utility classes so that I can rapidly build consistent layouts without writing repetitive CSS | System SHALL provide utility classes (.flex, .flex-center, .text-center, .mb-1 through .mb-5, .py-1 through .py-5, .hidden, .visible) with consistent naming conventions | Developer |
| CORE-004 | Base CSS Architecture | Define responsive breakpoint variables and container max-widths for mobile (default), tablet (768px), desktop (1024px), and large desktop (1200px) | As a developer, I want standardized breakpoints so that I can implement consistent responsive behavior across all components | System SHALL define breakpoint values as CSS custom properties and establish max-width containers (100%, 750px, 970px, 1170px) for each breakpoint | Developer |
| CORE-005 | Responsive CSS | Implement mobile-first base styles with default styling optimized for screens under 768px width | As a visitor on a mobile device, I want a fully functional experience so that I can access all content and features on my smartphone | System SHALL render all components in single-column layout with touch-friendly tap targets (minimum 44px) and appropriate font sizes (minimum 16px body text) on mobile devices | Visitor |
| CORE-006 | Responsive CSS | Create tablet breakpoint media queries (min-width: 768px) with adjusted layouts, navigation, and component sizing | As a visitor on a tablet, I want an optimized layout so that I can utilize the additional screen space effectively | System SHALL apply tablet-specific styles at 768px breakpoint including two-column grids, expanded navigation, and increased whitespace | Visitor |
| CORE-007 | Responsive CSS | Implement desktop breakpoint media queries (min-width: 1024px and 1200px) with full-width layouts and enhanced visual elements | As a visitor on a desktop, I want a rich visual experience so that I can view detailed content with optimal use of screen real estate | System SHALL apply desktop styles at 1024px and 1200px breakpoints including multi-column layouts, hover states, and maximum container widths | Visitor |
| CORE-008 | Animation CSS | Define custom keyframe animations for fade-in, slide-up, slide-in-left, slide-in-right, and scale-up effects with configurable durations | As a visitor, I want smooth entrance animations so that the page feels polished and professional | System SHALL define @keyframes for fadeIn, slideUp, slideInLeft, slideInRight, and scaleUp animations with default 0.6s duration and ease-out timing | Developer |
| CORE-009 | Animation CSS | Create hover effect classes for interactive elements including buttons, cards, and links with transform and color transitions | As a visitor, I want visual feedback on interactive elements so that I know which elements are clickable and responsive to my actions | System SHALL apply smooth transitions (0.3s ease) on hover states including scale transforms (1.02-1.05), color shifts to Secondary Blue (#0055FF), and subtle shadow increases | Visitor |
| CORE-010 | Animation CSS | Implement transition utility classes for common animation properties (opacity, transform, color, background, box-shadow) | As a developer, I want pre-built transition utilities so that I can quickly add consistent animation behavior to elements | System SHALL provide transition utility classes (.transition-all, .transition-opacity, .transition-transform) with standardized duration (0.3s) and easing (ease-in-out) | Developer |
| CORE-011 | Animation CSS | Configure AOS (Animate On Scroll) custom settings including offset, duration, easing, and custom animation variants matching brand style | As a visitor, I want scroll-triggered animations so that content reveals elegantly as I navigate down the page | System SHALL configure AOS with 100px offset, 800ms duration, ease-out-cubic easing, and once: true to prevent repeat animations, initialized on DOMContentLoaded | Visitor |
| CORE-012 | Global Navigation | Build responsive navbar with Zaza Rush Subaru logo (left-aligned), navigation links (center/right), and consistent Primary Blue (#0033A0) background | As a visitor, I want a clear navigation bar so that I can easily identify the brand and access different sections of the website | System SHALL display logo (max-height 50px) and navigation links horizontally on desktop, with proper spacing and white text on Primary Blue background | Visitor |
| CORE-013 | Global Navigation | Implement mobile hamburger menu with animated toggle icon (three lines to X transformation) and slide-out menu panel | As a visitor on mobile, I want an accessible menu so that I can navigate the site without the nav taking up excessive screen space | System SHALL display hamburger icon (three horizontal lines) on screens under 768px, which toggles to X icon and reveals vertical navigation menu with slide animation | Visitor |
| CORE-014 | Global Navigation | Add active page indicators highlighting current page in navigation with visual distinction (underline or background color change) | As a visitor, I want to know which page I'm on so that I can orient myself within the website structure | System SHALL apply .active class to current page nav link with visual indicator (2px bottom border in Secondary Blue #0055FF or background highlight) | Visitor |
| CORE-015 | Global Navigation | Implement sticky header behavior with shadow effect appearing after scrolling past 100px from top | As a visitor, I want persistent navigation so that I can access the menu without scrolling back to the top | System SHALL fix navbar to viewport top after 100px scroll, add box-shadow (0 2px 10px rgba(0,0,0,0.1)), and include smooth transition for shadow appearance | Visitor |
| CORE-016 | Global Footer | Create company information section displaying Zaza Rush Subaru name, slogan "The Heart of Every Subaru", and brief company description | As a visitor, I want to see company information so that I can understand who Zaza Rush Subaru is and what they specialize in | System SHALL display company logo/name, slogan in Light Blue (#E6F0FF) text, and 2-3 sentence description in the footer left section | Visitor |
| CORE-017 | Global Footer | Build quick links section with navigation to key pages (Home, Services, Parts, Gallery, About, Contact) in organized column layout | As a visitor, I want footer navigation links so that I can quickly access important pages from any location on the site | System SHALL display vertical list of internal links with hover effect (color shift to Secondary Blue #0055FF) and proper spacing between items | Visitor |
| CORE-018 | Global Footer | Display contact information including physical address, phone number (+263 77 638 1498), and email (sales@rushsubaru.com) with clickable links | As a visitor, I want visible contact details so that I can reach Zaza Rush Subaru through my preferred communication method | System SHALL display contact info with tel: link for phone, mailto: link for email, and appropriate icons (Font Awesome) preceding each item | Visitor |
| CORE-019 | Global Footer | Add social media icon links for Facebook, Instagram, and WhatsApp with hover animations and appropriate brand colors | As a visitor, I want social media links so that I can follow and connect with Zaza Rush Subaru on social platforms | System SHALL display social media icons in circular containers with hover effect (scale 1.1, background color change) opening links in new tabs (target="_blank" rel="noopener") | Visitor |
| CORE-020 | Global Footer | Include developer credit line "Developed with ❤️ by bguvava" and dynamic copyright notice with current year | As a visitor, I want to see proper attribution so that I know who developed the website | System SHALL display developer credit in small text and copyright notice "© [current year] Zaza Rush Subaru. All Rights Reserved." with year generated dynamically via JavaScript | Visitor |
| CORE-021 | Scroll Progress Indicator | Implement horizontal progress bar fixed at top of viewport showing scroll progress through page content | As a visitor, I want to see my scroll progress so that I know how much content remains on longer pages | System SHALL display 3px height progress bar at viewport top, width calculated as (scrollTop / (documentHeight - viewportHeight)) * 100%, in Primary Blue (#0033A0) | Visitor |
| CORE-022 | Scroll-to-Top Button | Create fixed-position button (bottom-right corner, 20px offset) that appears after scrolling 300px with up-arrow icon | As a visitor, I want a quick return-to-top option so that I can easily navigate back to the top of long pages | System SHALL display circular button (50px diameter) with up-arrow icon, hidden by default (opacity: 0), fading in (opacity: 1) after 300px scroll with smooth CSS transition | Visitor |
| CORE-023 | Scroll-to-Top Button | Implement smooth scroll animation to top of page when button is clicked, styled with brand colors and hover effect | As a visitor, I want smooth scrolling so that the return-to-top action feels polished rather than jarring | System SHALL trigger window.scrollTo({top: 0, behavior: 'smooth'}) on click, with button styled in Primary Blue (#0033A0) background, white icon, and hover scale effect (1.1) | Visitor |
| CORE-024 | Floating WhatsApp Button | Create fixed-position WhatsApp button (bottom-left corner, 20px offset) with WhatsApp icon and pulse animation | As a visitor, I want easy WhatsApp access so that I can quickly contact Zaza Rush Subaru with inquiries | System SHALL display circular button (60px diameter) in WhatsApp Green (#25D366) with white WhatsApp icon, featuring continuous pulse animation (scale 1.0 to 1.1) every 2 seconds | Visitor |
| CORE-025 | Floating WhatsApp Button | Configure WhatsApp button to open wa.me link with pre-filled message "Hello! I'm interested in Zaza Rush Subaru services." | As a visitor, I want a pre-filled message so that I can start a conversation quickly without typing an introduction | System SHALL open https://wa.me/263776381498?text=Hello!%20I'm%20interested%20in%20Zaza%20Rush%20Subaru%20services. in new tab when clicked, with proper URL encoding | Visitor |
| CORE-026 | Main JavaScript | Initialize AOS library on DOMContentLoaded with configured settings (offset: 100, duration: 800, easing: 'ease-out-cubic', once: true) | As a visitor, I want scroll animations to work immediately so that the page feels interactive from first load | System SHALL call AOS.init() with specified configuration after DOM is fully loaded, enabling scroll-triggered animations on elements with data-aos attributes | Developer |
| CORE-027 | Main JavaScript | Implement scroll event handlers for sticky navigation, scroll progress bar, and scroll-to-top button visibility with debouncing for performance | As a developer, I want optimized scroll handlers so that animations perform smoothly without impacting page performance | System SHALL use requestAnimationFrame or throttled scroll listeners (16ms minimum interval) to update UI elements, maintaining 60fps performance on scroll | Developer |
| CORE-028 | Main JavaScript | Create mobile menu toggle function with body scroll lock when menu is open and click-outside-to-close functionality | As a visitor on mobile, I want intuitive menu behavior so that I can open, use, and close the menu naturally | System SHALL toggle .menu-open class on nav element, apply overflow: hidden to body when open, and close menu when clicking outside menu area or pressing Escape key | Visitor |

### 5.3 Phase 2 Success Criteria

- [ ] All CSS variables defined and working
- [ ] Typography renders correctly (Montserrat, Open Sans)
- [ ] Navigation displays on all breakpoints
- [ ] Mobile hamburger menu functions correctly
- [ ] Footer displays with all sections and developer credits
- [ ] Scroll progress indicator works accurately
- [ ] Scroll-to-top button appears/disappears correctly
- [ ] WhatsApp button pulses and opens correct link
- [ ] AOS animations trigger on scroll
- [ ] No console errors

---

## 6. Phase 3: Homepage (index.html)

### 6.1 Phase Objectives

- Create impactful hero section with CTAs
- Build "Why Choose Us" value proposition section
- Display 6 service overview cards
- Implement featured inventory carousel
- Add customer testimonials slider
- Include quick contact form with validation
- Show location preview with map

### 6.2 Page Sections

1. Hero Section
2. Value Proposition ("Why Choose Us")
3. Services Overview
4. Featured Inventory Carousel
5. Testimonials Slider
6. Quick Contact Form
7. Location Preview
8. Call-to-Action Banner

### 6.3 Requirements Table

| Requirement ID | Module Name | Description | User Story | Expected System Behaviour/Outcome | Role |
|----------------|-------------|-------------|------------|-----------------------------------|------|
| HOME-001 | Hero Section | Full-width hero banner with high-quality background image showcasing Subaru vehicles/engines | As a visitor, I want to see an impactful hero section when I land on the homepage so that I immediately understand what Zaza Rush Subaru offers | System displays full-width hero section with optimized background image (WebP format, lazy-loaded), minimum height of 80vh on desktop, 60vh on mobile, with dark overlay for text readability | Visitor |
| HOME-002 | Hero Section | Company logo display in hero section | As a visitor, I want to see the Zaza Rush Subaru logo prominently so that I recognize the brand | System displays company logo centered or left-aligned within hero section, responsive sizing (max-width: 280px desktop, 180px mobile), with alt text for accessibility | Visitor |
| HOME-003 | Hero Section | Tagline display with animated text reveal | As a visitor, I want to see the company tagline "The Heart of Every Subaru" with an engaging animation so that the brand message is memorable | System displays tagline with CSS/JS animation (fade-in or typewriter effect) triggered on page load, animation duration 1-2 seconds, text uses brand typography at h1 size | Visitor |
| HOME-004 | Hero Section | Primary CTA button - Browse Parts | As a visitor, I want to click "Browse Parts" to explore available inventory so that I can find parts I need | System displays primary CTA button styled in Primary Blue (#0033A0), hover state changes to Secondary Blue (#0055FF), click navigates to catalog.html, button has subtle scale animation on hover | Visitor |
| HOME-005 | Hero Section | Secondary CTA button - Contact Us | As a visitor, I want to click "Contact Us" to reach the team so that I can make inquiries | System displays secondary CTA button (outline style with white border), hover state fills with Light Blue (#E6F0FF), click smooth-scrolls to Quick Contact Form section or navigates to contact.html | Visitor |
| HOME-006 | Hero Section | Responsive height and layout adjustments | As a visitor on any device, I want the hero section to display properly so that I have a good experience regardless of screen size | System adjusts hero height (80vh desktop, 70vh tablet, 60vh mobile), repositions elements vertically on mobile, maintains text readability at all breakpoints (320px-2560px) | Visitor |
| HOME-007 | Value Proposition | Why Choose Us section with benefit cards | As a visitor, I want to understand the key benefits of choosing Zaza Rush Subaru so that I can trust the company | System displays section with heading "Why Choose Zaza Rush Subaru" and 6 icon cards representing: Expertise, Quality Parts, Fast Service, Fair Prices, Warranty, Customer Support | Visitor |
| HOME-008 | Value Proposition | Icon cards with visual hierarchy | As a visitor, I want each benefit to be clearly presented with an icon and description so that I can quickly scan the information | Each card displays: SVG/Font Awesome icon (48px), benefit title (h3), brief description (2-3 lines max), consistent padding and spacing, brand color accents | Visitor |
| HOME-009 | Value Proposition | AOS fade-up animations on scroll | As a visitor, I want the benefit cards to animate into view so that the page feels dynamic and engaging | System implements AOS (Animate On Scroll) library, cards fade-up with 100ms stagger delay between each, animation triggers when 20% of element is visible, animations only play once | Visitor |
| HOME-010 | Value Proposition | Responsive grid layout | As a visitor on any device, I want the benefit cards to display in an appropriate grid so that I can view all benefits easily | System displays grid: 6 columns on desktop (>1200px), 3 columns on tablet (768-1199px), 2 columns on mobile (<768px), with consistent gap spacing (24px) | Visitor |
| HOME-011 | Services Overview | Six service cards section | As a visitor, I want to see an overview of all services offered so that I understand the full scope of Zaza Rush Subaru's capabilities | System displays section with heading "Our Services" and 6 cards: Engine Sales, Parts Department, Car Breaking, Vehicle Trading, Specialist Garage, Diagnostics | Visitor |
| HOME-012 | Services Overview | Service card content and design | As a visitor, I want each service card to provide essential information so that I can decide which service interests me | Each card displays: service icon (SVG), service title (h3), brief description (50-75 words), "Learn More" link styled as text link with arrow icon, card has subtle border and shadow | Visitor |
| HOME-013 | Services Overview | Hover lift animation on service cards | As a visitor, I want visual feedback when hovering over service cards so that I know they are interactive | System applies translateY(-8px) and enhanced box-shadow on hover, smooth transition (0.3s ease), icon color changes to Secondary Blue (#0055FF) on hover | Visitor |
| HOME-014 | Services Overview | Service card navigation with tab parameter | As a visitor, I want to click "Learn More" to see detailed service information so that I can learn more about specific services | Each "Learn More" link navigates to services.html with appropriate tab parameter (e.g., services.html?tab=engine-sales), target page opens corresponding service tab | Visitor |
| HOME-015 | Featured Inventory | Swiper.js carousel implementation | As a visitor, I want to browse featured products in a carousel so that I can see available inventory highlights | System implements Swiper.js carousel with 4-8 featured products (engines/vehicles), responsive slides per view: 1 mobile, 2 tablet, 3-4 desktop, infinite loop enabled | Visitor |
| HOME-016 | Featured Inventory | Product slide content | As a visitor, I want each featured product to show key information so that I can quickly assess items of interest | Each slide displays: product image (lazy-loaded, aspect ratio 4:3), product title, price or status badge ("In Stock"/"Sold"), "Inquire Now" button linking to contact form with product pre-selected | Visitor |
| HOME-017 | Featured Inventory | Auto-play with pause on hover | As a visitor, I want the carousel to auto-rotate but pause when I interact so that I can view items at my own pace | Carousel auto-plays with 5-second interval, pauses on mouse hover or touch, resumes 2 seconds after interaction ends, includes progress bar indicator | Visitor |
| HOME-018 | Featured Inventory | Navigation arrows and pagination | As a visitor, I want to manually navigate the carousel so that I can browse featured items at will | System displays navigation arrows (left/right, styled in brand colors), pagination dots below carousel, both keyboard accessible (arrow keys), touch swipe enabled on mobile | Visitor |
| HOME-019 | Testimonials | Customer review carousel | As a visitor, I want to read reviews from other customers so that I can trust Zaza Rush Subaru's reputation | System displays testimonials section with heading "What Our Customers Say" and rotating carousel of 4-6 customer reviews | Visitor |
| HOME-020 | Testimonials | Review card content and styling | As a visitor, I want each review to be easy to read and authentic so that I can relate to other customers' experiences | Each review card displays: quotation mark graphic, review text (100-150 words max), customer name, vehicle owned/service used, star rating (1-5 stars displayed as icons), card has Light Blue (#E6F0FF) background | Visitor |
| HOME-021 | Testimonials | Auto-rotating carousel | As a visitor, I want testimonials to rotate automatically so that I see multiple reviews without manual interaction | Carousel rotates every 6 seconds with fade transition, includes pagination dots, pause on hover, smooth CSS transitions | Visitor |
| HOME-022 | Quick Contact Form | Contact form fields implementation | As a visitor, I want to fill out a contact form so that I can send an inquiry to Zaza Rush Subaru | Form displays fields: Full Name (required), Email (required), Phone Number (optional), Subject dropdown (Parts Inquiry, Service Booking, Vehicle Trading, General Question), Message textarea (required) | Visitor |
| HOME-023 | Quick Contact Form | Honeypot spam protection | As a visitor, I should not see or interact with spam protection so that my experience is seamless | System includes hidden honeypot field (display: none, tabindex: -1), server rejects submissions where honeypot field contains data, field labeled to attract bots | Visitor |
| HOME-024 | Quick Contact Form | Client-side form validation | As a visitor, I want immediate feedback on form errors so that I can correct mistakes before submitting | System validates: email format (regex), required fields not empty, phone format if provided, message minimum 20 characters; displays inline error messages in red below fields, prevents submission until valid | Visitor |
| HOME-025 | Quick Contact Form | Form submission handling | As a visitor, I want my inquiry to be sent successfully so that Zaza Rush Subaru receives my message | Form submits via AJAX to backend endpoint, sends email to sales@rushsubaru.com with all form data, includes timestamp and source page, button shows loading spinner during submission | Visitor |
| HOME-026 | Quick Contact Form | SweetAlert2 feedback messages | As a visitor, I want clear feedback after submitting so that I know my inquiry was received | On success: SweetAlert2 displays success modal with green checkmark, message "Thank you! We'll respond within 24 hours", form resets; On error: displays error modal with retry option and alternative contact methods | Visitor |
| HOME-027 | Location Preview | Mini Google Maps embed | As a visitor, I want to see the business location on a map so that I can visualize where Zaza Rush Subaru is located | System embeds Google Maps iframe (400px height mobile, 350px desktop) showing business location marker, map loads lazily, interactive zoom/pan enabled | Visitor |
| HOME-028 | Location Preview | Address and business hours display | As a visitor, I want to see the address and business hours so that I can plan my visit | Section displays: full street address, business hours (Mon-Fri: 8AM-5PM, Sat: 8AM-1PM, Sun: Closed), phone number as clickable tel: link, styled text overlay on light background | Visitor |
| HOME-029 | Location Preview | Get Directions functionality | As a visitor, I want to get directions to the business so that I can navigate there easily | "Get Directions" button opens Google Maps directions in new tab with destination pre-filled, button styled with location pin icon, works on all devices | Visitor |
| HOME-030 | CTA Banner | Final call-to-action section | As a visitor, I want a clear final prompt to take action so that I'm encouraged to contact Zaza Rush Subaru | System displays full-width banner with Primary Blue (#0033A0) background, heading "Ready to Find Your Part?", subtext encouraging contact | Visitor |
| HOME-031 | CTA Banner | WhatsApp and Contact buttons | As a visitor, I want quick ways to reach out so that I can connect via my preferred method | Banner displays two buttons: WhatsApp (green, opens wa.me link with pre-filled message), Contact Us (white outline, scrolls to contact form), buttons have hover animations, WhatsApp icon displayed | Visitor |
| HOME-032 | Performance | Page load optimization | As a visitor, I want the page to load quickly so that I don't abandon the site | Page achieves: <3 second load time on 3G, Lighthouse performance score >80, critical CSS inlined, images optimized (WebP with fallbacks), JavaScript deferred/async loaded | Visitor |
| HOME-033 | Performance | Smooth non-blocking animations | As a visitor, I want animations to be smooth so that my browsing experience feels premium | All animations use CSS transforms/opacity (GPU accelerated), animations respect prefers-reduced-motion media query, no layout shift during animations, 60fps maintained | Visitor |
| HOME-034 | Responsiveness | Mobile responsive at all breakpoints | As a visitor on any device, I want the entire homepage to display correctly so that I have a consistent experience | Page tested and functional at breakpoints: 320px, 375px, 428px, 768px, 1024px, 1280px, 1920px; no horizontal scroll, all text readable without zoom, touch targets minimum 44px | Visitor |
| HOME-035 | Navigation | All links functional and tested | As a visitor, I want all links to work correctly so that I can navigate the site without errors | All navigation links, CTAs, and internal anchors verified working, no 404 errors, external links open in new tab with rel="noopener noreferrer", smooth scroll for anchor links | Visitor |

### 6.4 Phase 3 Success Criteria

- [ ] Hero displays with logo, tagline, and CTAs
- [ ] All 6 value proposition cards animate on scroll
- [ ] All 6 service cards display with working links
- [ ] Featured inventory carousel slides and auto-plays
- [ ] Testimonials rotate with proper styling
- [ ] Contact form validates and submits successfully
- [ ] Google Maps embed displays correctly
- [ ] CTA banner displays with working buttons
- [ ] Page loads under 3 seconds
- [ ] Fully responsive at all breakpoints
- [ ] No console errors

---

## 7. Phase 4: Services Page (services.html)

### 7.1 Phase Objectives

- Implement Bootstrap tabs for 6 service categories
- Create deep-linking via URL parameters
- Build content for each service tab
- Add image galleries per service
- Include CTAs for each service

### 7.2 Tab Structure

| Tab # | Tab Name | URL Parameter |
|-------|----------|---------------|
| 1 | Engine Sales & Swaps | ?tab=engines |
| 2 | Parts Department | ?tab=parts |
| 3 | Car Breaking | ?tab=breaking |
| 4 | Vehicle Trading | ?tab=trading |
| 5 | Specialist Garage | ?tab=garage |
| 6 | Diagnostics & Tuning | ?tab=diagnostics |

### 7.3 Requirements Table

| Requirement ID | Module Name | Description | User Story | Expected System Behaviour/Outcome | Role |
|----------------|-------------|-------------|------------|-----------------------------------|------|
| SVC-001 | Services Tab Navigation | Bootstrap tab navigation system with 6 service category tabs displayed horizontally | As a visitor, I want to see all available service categories at a glance so I can quickly navigate to the service I need | Tab navigation bar displays 6 clickable tabs (Engine Sales & Swaps, Parts Department, Car Breaking, Vehicle Trading, Specialist Garage, Diagnostics & Tuning) with active state styling in Primary Blue #0033A0 | Visitor |
| SVC-002 | Tab URL Parameters | URL parameter system for direct tab access | As a visitor, I want to share or bookmark a specific service tab so I can return directly to that content | Clicking a tab updates URL to services.html?tab=[tabname], page loads correct tab when URL parameter present | Visitor |
| SVC-003 | Deep Linking Support | External pages can link directly to specific service tabs | As a visitor, I want links from other pages to take me directly to the relevant service section | Links from homepage, inventory, or other pages with tab parameters load services.html with correct tab active | Visitor |
| SVC-004 | Engine Sales Hero Banner | Hero section for Engine Sales & Swaps tab with service image | As a visitor, I want to see an engaging visual introduction to engine services | Full-width hero banner displays high-quality image of EJ/FA series engines with overlay text "Engine Sales & Swaps" and tagline | Visitor |
| SVC-005 | Engine Types Display | Information section showing available engine series | As a visitor, I want to know what engine types are available for purchase | Content displays New & Used EJ series (EJ20, EJ25, EJ207, EJ257) and FA series (FA20, FA24) engines with brief descriptions | Visitor |
| SVC-006 | Engine Builds & Swaps Info | Service details for custom engine work | As a visitor, I want to understand the engine build and swap services offered | Bullet point list displays: Complete engine builds, Engine swaps (including cross-model), Forged internals upgrades, Turbo upgrades | Visitor |
| SVC-007 | Engine Warranty Information | Warranty terms display for engine purchases | As a visitor, I want to know what warranty coverage comes with engine purchases | Warranty information section displays coverage terms, conditions, and duration for new vs used engines | Visitor |
| SVC-008 | Engine Pricing Indicators | Price range indicators for engine products | As a visitor, I want to understand approximate costs before enquiring | Pricing indicators display ranges (e.g., "From $X,XXX") for different engine types with "Contact for exact quote" disclaimer | Visitor |
| SVC-009 | Engine Quote CTA | Primary call-to-action for engine enquiries | As a visitor, I want to easily request a quote for an engine | "Request Engine Quote" button styled in Primary Blue links to WhatsApp with pre-filled message "Hi, I'm interested in an engine quote for [engine type]" | Visitor |
| SVC-010 | Parts Department Hero | Hero section for Parts Department tab | As a visitor, I want to see the parts department service introduction | Hero banner displays parts inventory image with "Parts Department" heading and "Genuine, OEM & Aftermarket" subheading | Visitor |
| SVC-011 | Parts Categories Display | Organized parts category listing | As a visitor, I want to browse parts by category to find what I need | Four category cards display: Turbo Components, Drivetrain Parts, Suspension Systems, Electrical Components - each with icon and brief description | Visitor |
| SVC-012 | Parts Quality Tiers | Information on parts quality options | As a visitor, I want to understand the difference between genuine, OEM, and aftermarket parts | Quality tier section explains: Genuine Subaru parts, OEM equivalent, Quality aftermarket options with pros/cons of each | Visitor |
| SVC-013 | Parts Request Form Link | CTA linking to parts enquiry form | As a visitor, I want to submit a specific part request | "Request a Part" button links to contact.html with part request form or WhatsApp with pre-filled "Part Request:" message | Visitor |
| SVC-014 | Car Breaking Hero | Hero section for Car Breaking tab | As a visitor, I want to understand what car breaking service means | Hero banner displays image of vehicle being parted out with "Car Breaking" heading and explanation of part-out service | Visitor |
| SVC-015 | Breaking Vehicles List | Display of currently breaking vehicles | As a visitor, I want to see which vehicles are currently being broken for parts | Dynamic list/cards display available breaking stock with: Model, Year, Variant, Available parts status, condition notes | Visitor |
| SVC-016 | Core Items Section | Information on rebuildable/core items available | As a visitor, I want to find rebuildable cores for my project | Section displays available core items: Engines, Transmissions, Differentials, Turbos with core charge information | Visitor |
| SVC-017 | Breaking Stock Gallery | Photo gallery of breaking inventory | As a visitor, I want to see photos of parts from breaking vehicles | Lightbox gallery displays categorized photos of available parts from current breaking stock with zoom functionality | Visitor |
| SVC-018 | Vehicle Trading Hero | Hero section for Vehicle Trading tab | As a visitor, I want to learn about buying and selling Subarus | Hero banner displays quality Subaru image with "Vehicle Trading" heading, "Buy & Sell Subarus" subheading | Visitor |
| SVC-019 | Trading Services Info | Buy and sell service explanation | As a visitor, I want to understand how to buy from or sell to Rush Subaru | Content sections explain: Purchasing process, Vehicle sourcing, Runner and non-runner acceptance, Inspection standards | Visitor |
| SVC-020 | Sell Your Subaru CTA | Primary CTA for vehicle sellers | As a visitor, I want to easily submit my vehicle for sale consideration | "Sell Your Subaru" button styled prominently links to sell.html vehicle submission form | Visitor |
| SVC-021 | Specialist Garage Hero | Hero section for garage services tab | As a visitor, I want to see the workshop and services offered | Hero banner displays workshop/garage image with "Specialist Garage" heading and service highlights | Visitor |
| SVC-022 | Garage Services List | Comprehensive mechanical services listing | As a visitor, I want to know what mechanical work is available | Organized list displays: General repairs, Performance work, Engine/transmission swaps, Suspension setup, Installation services | Visitor |
| SVC-023 | Service Booking CTA | Workshop booking call-to-action | As a visitor, I want to book my vehicle in for service | "Book Service" button links to WhatsApp or booking form with vehicle details pre-fill option | Visitor |
| SVC-024 | Diagnostics Hero | Hero section for Diagnostics & Tuning tab | As a visitor, I want to understand diagnostic and tuning capabilities | Hero banner displays diagnostic equipment/software image with "Diagnostics & Tuning" heading | Visitor |
| SVC-025 | Diagnostic Services | Computer diagnostics service details | As a visitor, I want to know what diagnostic services are available | Content displays: Subaru Select Monitor capability, Fault code reading/clearing, Live data analysis, Pre-purchase inspections | Visitor |
| SVC-026 | Tuning Services | ECU tuning and performance upgrade info | As a visitor, I want to learn about tuning options for my Subaru | Section displays: ECU remapping options, Performance tune packages, Custom tuning, Dyno tuning availability | Visitor |
| SVC-027 | Health Check Service | Vehicle health assessment service | As a visitor, I want to book a comprehensive vehicle health check | Health check package details display: What's included, Duration, Price indicator, "Book Health Check" CTA button | Visitor |
| SVC-028 | Mobile Accordion Fallback | Alternative navigation for mobile devices | As a visitor on mobile, I want easy navigation between services | On screens below 768px, tabs convert to collapsible accordion panels with smooth expand/collapse animations | Visitor |
| SVC-029 | Tab Content AOS Animations | Scroll-triggered animations on tab content | As a visitor, I want an engaging visual experience when viewing services | Tab content elements animate in using AOS library (fade-up, fade-in) when tab is activated or content scrolls into view | Visitor |
| SVC-030 | Secondary Contact CTA | Consistent secondary call-to-action across all tabs | As a visitor, I want an alternative way to contact about services | All tabs display secondary "Contact Us" button below primary CTA, linking to contact.html | Visitor |
| SVC-031 | Tab Image Galleries | Service-specific image galleries per tab | As a visitor, I want to see examples of work and products for each service | Each tab includes 4-6 image thumbnail gallery with lightbox functionality showing relevant service images | Visitor |
| SVC-032 | Tab State Persistence | Tab selection maintained during session | As a visitor, I want my tab selection remembered if I navigate away and return | Active tab state stored in sessionStorage, restored when returning to services page during same session | Visitor |

### 7.4 Phase 4 Success Criteria

- [ ] All 6 tabs display correctly
- [ ] Tab switching works smoothly
- [ ] URL parameters update and deep-link correctly
- [ ] Mobile accordion fallback functions
- [ ] All CTAs link to correct destinations
- [ ] Image galleries open in lightbox
- [ ] Content is complete for each tab
- [ ] Responsive at all breakpoints

---

## 8. Phase 5: Parts Catalog (catalog.html)

### 8.1 Phase Objectives

- Implement search functionality with instant filtering
- Create category tabs with counts
- Build filter sidebar with multiple criteria
- Display product cards with actions
- Add pagination/load more functionality
- Create catalog.json data structure

### 8.2 Requirements Table

| Requirement ID | Module Name | Description | User Story | Expected System Behaviour/Outcome | Role |
|----------------|-------------|-------------|------------|-----------------------------------|------|
| CAT-001 | Search Functionality | Search bar prominently displayed at top of catalog page | As a visitor, I want to see a search bar immediately when I open the catalog so I can quickly find specific parts | Search input field displayed with placeholder text "Search parts, SKU, or compatible models..." and magnifying glass icon, minimum 300px width on desktop | Visitor |
| CAT-002 | Search Functionality | Instant search filtering as user types | As a visitor, I want search results to update as I type so I can find parts faster without pressing enter | Search triggers after 300ms debounce, filters products matching part name, SKU, or model compatibility fields, results update in under 500ms | Visitor |
| CAT-003 | Search Functionality | Clear search button | As a visitor, I want to quickly clear my search and see all products again | "X" button appears inside search field when text is present, clicking clears input and resets to show all products in current category/filters | Visitor |
| CAT-004 | Search Functionality | Search term highlighting | As a visitor, I want to see where my search term matches so I understand why results appeared | Matching text in product titles highlighted with background color when search is active | Visitor |
| CAT-005 | Category Tabs | Four category tabs displayed | As a visitor, I want to browse parts by main categories so I can narrow down what I'm looking for | Horizontal tab bar with Engines, Parts, Vehicles, and Breaking Parts tabs, visually distinct active state with brand blue underline | Visitor |
| CAT-006 | Category Tabs | Tab item counts | As a visitor, I want to see how many items are in each category so I know what's available | Each tab displays count badge (e.g., "Engines (24)"), counts update when filters are applied to show filtered totals | Visitor |
| CAT-007 | Category Tabs | Tab switching functionality | As a visitor, I want to click tabs to view different product categories | Clicking tab filters products to that category, updates URL parameter (?category=engines), maintains other active filters | Visitor |
| CAT-008 | Category Tabs | Default tab selection | As a visitor, I want a category pre-selected when I arrive so I see products immediately | "Parts" tab selected by default, or tab specified in URL parameter if present | Visitor |
| CAT-009 | Filter Sidebar | Subaru model filter | As a visitor, I want to filter by Subaru model so I only see parts for my vehicle | Checkbox list with models: Impreza, WRX, STI, Legacy, Forester, Outback, XV/Crosstrek, BRZ, Levorg, Tribeca, multiple selections allowed | Visitor |
| CAT-010 | Filter Sidebar | Year range filter | As a visitor, I want to filter by year range so I find parts compatible with my vehicle's year | Two dropdown selects for "From Year" and "To Year" (1990-2026), or dual-handle range slider | Visitor |
| CAT-011 | Filter Sidebar | Condition filter | As a visitor, I want to filter by part condition so I can choose new or used based on my budget | Checkbox options: New, Used, Rebuilt with visual indicators (green/amber/blue badges), multiple selections allowed | Visitor |
| CAT-012 | Filter Sidebar | Price range filter | As a visitor, I want to filter by price range so I only see parts within my budget | Dual input fields for min/max USD price, or range slider with handles, displays "USD$ X - USD$ Y" format | Visitor |
| CAT-013 | Filter Sidebar | Clear all filters button | As a visitor, I want to reset all filters at once so I can start a fresh search | "Clear All Filters" button visible when any filter is active, resets all filters and shows all products in current category | Visitor |
| CAT-014 | Filter Sidebar | Active filter tags | As a visitor, I want to see which filters are currently active so I understand the current results | Active filters displayed as removable tags/chips above product grid, clicking "X" on tag removes that specific filter | Visitor |
| CAT-015 | Filter Sidebar | Mobile filter toggle | As a visitor on mobile, I want to access filters without them taking up screen space | "Filters" button with filter icon opens slide-out panel from left, panel has close button and "Apply Filters" button, overlay dims background | Visitor |
| CAT-016 | Filter Sidebar | Filter result count preview | As a visitor, I want to see how many results my filter selection will return before applying | On mobile filter panel, "Show X Results" button updates count dynamically as filters are selected | Visitor |
| CAT-017 | View Toggle | Grid and list view options | As a visitor, I want to switch between grid and list views based on my preference | Toggle buttons with grid and list icons, grid shows 3 columns desktop/2 tablet/1 mobile, list shows horizontal cards | Visitor |
| CAT-018 | View Toggle | View preference persistence | As a visitor, I want the site to remember my view preference for future visits | Selected view saved to localStorage key "catalogViewPreference", applied on page load | Visitor |
| CAT-019 | Product Cards | Product image display | As a visitor, I want to see product images so I can visually identify parts | Product image displayed at consistent aspect ratio (4:3), lazy loading with loading="lazy" attribute, placeholder shown while loading | Visitor |
| CAT-020 | Product Cards | Product information display | As a visitor, I want to see key product details at a glance | Card displays: product title (max 2 lines with ellipsis), price in USD$ format or "Contact for Price", condition badge, compatibility models list | Visitor |
| CAT-021 | Product Cards | Condition badge styling | As a visitor, I want to quickly identify part condition visually | Badges styled: New (green background), Used (amber background), Rebuilt (blue background), positioned top-right of image | Visitor |
| CAT-022 | Product Cards | WhatsApp inquiry button | As a visitor, I want to quickly inquire about a part via WhatsApp | "Inquire" button with WhatsApp icon opens wa.me link with pre-filled message: "Hi, I'm interested in [Product Name] (SKU: [SKU]) listed at USD$ [Price] on your website." to +263776381498 | Visitor |
| CAT-023 | Product Cards | Request Quote button | As a visitor, I want to request a formal quote for a part | "Request Quote" button opens modal form with pre-filled product info, form fields: Name, Email, Phone, Quantity needed, Additional notes | Visitor |
| CAT-024 | Product Cards | Quick view lightbox | As a visitor, I want to see larger product images without leaving the catalog | Clicking product image opens lightbox modal with larger image, multiple images navigable if available, close button and click-outside-to-close | Visitor |
| CAT-025 | Pagination | Items per page limit | As a visitor, I want manageable page loads so the site performs well | Maximum 12 product cards displayed initially, additional items loaded via pagination or load more | Visitor |
| CAT-026 | Pagination | Load more functionality | As a visitor, I want to load more products without full page refresh | "Load More" button at bottom of grid loads next 12 items, button shows "Loading..." state during fetch, button hidden when all items loaded | Visitor |
| CAT-027 | Pagination | Results count display | As a visitor, I want to know how many total products match my search/filters | Text displays "Showing X of Y results" above product grid, updates when filters change or more items load | Visitor |
| CAT-028 | Catalog Data | JSON schema structure | As a developer, I need a consistent data structure for catalog products | catalog.json contains array of products with fields: id, sku, title, description, category, price (number or null), condition, models (array), yearFrom, yearTo, images (array), inStock (boolean), dateAdded | Developer |
| CAT-029 | No Results State | Empty state display | As a visitor, I want helpful guidance when no products match my criteria | Friendly illustration or icon displayed with message "No parts found matching your criteria", maintains brand styling | Visitor |
| CAT-030 | No Results State | Search suggestions | As a visitor, I want suggestions to find what I'm looking for when search fails | Empty state includes: "Try broadening your search", "Remove some filters", "Browse all [current category]" link, "Contact us" CTA button | Visitor |
| CAT-031 | Responsive Design | Mobile catalog layout | As a mobile visitor, I want the catalog to be fully usable on my phone | Single column product grid, collapsible filter sidebar, sticky search bar, touch-friendly buttons minimum 44px tap targets | Visitor |
| CAT-032 | Performance | Fast initial load | As a visitor, I want the catalog to load quickly | catalog.json fetched and parsed on page load, initial 12 items rendered in under 1 second, skeleton loading states shown during data fetch | Visitor |
| CAT-033 | URL State | Shareable filter URLs | As a visitor, I want to share or bookmark my filtered catalog view | Active category, filters, and search term reflected in URL parameters, page state restored when URL is loaded directly | Visitor |

### 8.3 Catalog JSON Schema

```json
{
  "products": [
    {
      "id": "ENG-001",
      "sku": "EJ257-2019-LOW",
      "title": "EJ257 2.5L Turbo Engine - Low Mileage",
      "description": "Complete EJ257 engine from 2019 WRX STI. 45,000km. Includes turbo, manifolds, and harness.",
      "category": "engines",
      "price": 4500,
      "condition": "used",
      "models": ["WRX STI", "Forester XT"],
      "yearFrom": 2015,
      "yearTo": 2021,
      "images": ["ej257-1.jpg", "ej257-2.jpg"],
      "inStock": true,
      "dateAdded": "2026-01-15"
    }
  ]
}
```

### 8.4 Phase 5 Success Criteria

- [ ] Search filters results in real-time
- [ ] All 4 category tabs work correctly
- [ ] All filters function individually and combined
- [ ] Mobile filter panel works smoothly
- [ ] Product cards display all information
- [ ] WhatsApp inquiry sends correct message
- [ ] Quote modal form works
- [ ] Lightbox opens product images
- [ ] Pagination/load more functions
- [ ] URL parameters sync with state
- [ ] catalog.json loads and parses correctly

---

## 9. Phase 6: About Us & Contact Pages

### 9.1 Phase Objectives

- Create About Us page with company story
- Display mission and vision statements
- Build Contact page with form and map
- Implement honeypot spam protection
- Add Google Maps integration

### 9.2 Requirements Table

| Requirement ID | Module Name | Description | User Story | Expected System Behaviour/Outcome | Role |
|----------------|-------------|-------------|------------|-----------------------------------|------|
| ABT-001 | Company Story Section | Display founding story with engaging narrative | As a visitor, I want to learn about Zaza Rush Subaru's history so I can understand their background and passion | System displays a hero section with company founding story, highlighting the journey to becoming Zimbabwe's Subaru specialists, with compelling storytelling about the passion for Subaru vehicles | Visitor |
| ABT-002 | Company Story Section | Showcase Subaru passion and dedication | As a visitor, I want to see evidence of genuine Subaru expertise so I can trust their specialist knowledge | System presents content emphasizing exclusive focus on Subaru vehicles, technical passion, and "The Heart of Every Subaru" philosophy with supporting imagery | Visitor |
| ABT-003 | Company Story Section | Display team expertise and qualifications | As a visitor, I want to know about the team's technical capabilities so I can feel confident in their service | System shows information about technician training, years of experience, and specialized Subaru knowledge in an easy-to-read format | Visitor |
| ABT-004 | Mission Statement | Display company mission prominently | As a visitor, I want to clearly see the company's mission so I can understand their purpose | System displays mission statement "To keep every Subaru performing at its peak" in a visually prominent section with supporting explanatory content | Visitor |
| ABT-005 | Mission Statement | Provide mission supporting content | As a visitor, I want context around the mission so I can appreciate what it means in practice | System shows bullet points or cards explaining how the mission translates to customer benefits: quality parts, expert service, honest advice | Visitor |
| ABT-006 | Vision Statement | Display company vision clearly | As a visitor, I want to understand the company's future direction so I can assess their ambition and stability | System presents vision statement "To be the leading global destination for Subaru performance" with visual emphasis and aspirational design elements | Visitor |
| ABT-007 | Vision Statement | Show future goals and growth plans | As a visitor, I want to see the company's growth trajectory so I can understand their commitment to improvement | System displays future plans including expanded services, regional reach, and commitment to staying current with latest Subaru technology | Visitor |
| ABT-008 | Why Subaru Section | Highlight Boxer engine expertise | As a visitor, I want to learn about their Boxer engine specialization so I can trust they understand my Subaru | System displays dedicated content explaining Boxer engine knowledge, unique maintenance requirements, and specialized tools/training for horizontally-opposed engines | Visitor |
| ABT-009 | Why Subaru Section | Showcase AWD system specialization | As a visitor, I want confidence in their AWD expertise so I know they can properly service my Subaru's drivetrain | System presents information about Symmetrical AWD system expertise, differential service capabilities, and drivetrain maintenance knowledge | Visitor |
| ABT-010 | Why Subaru Section | Demonstrate model range knowledge | As a visitor, I want to see they work on all Subaru generations so I know my specific model is supported | System shows visual timeline or grid displaying expertise from classic GC8 Imprezas through current WRX/STI, covering all generations and model variants | Visitor |
| ABT-011 | Values/Principles | Display core company values | As a visitor, I want to understand the company's principles so I can assess if they align with my expectations | System presents 3-5 core values (quality, integrity, expertise, customer focus) in card format with icons and brief descriptions | Visitor |
| ABT-012 | Values/Principles | Show quality commitment details | As a visitor, I want specifics about their quality standards so I can trust their parts and services | System displays content about OEM/genuine parts usage, quality control processes, and warranty commitments with visual indicators | Visitor |
| ABT-013 | Team/About Imagery | Display workshop photos | As a visitor, I want to see the actual workshop so I can assess the professionalism of the facility | System shows high-quality images of the workshop at Number 9 Sherwood Crescent, displaying clean workspace, professional equipment, and organized layout | Visitor |
| ABT-014 | Team/About Imagery | Showcase equipment and facility | As a visitor, I want to see their tools and equipment so I can gauge their technical capabilities | System displays images of diagnostic equipment, specialized Subaru tools, lifts, and professional-grade machinery with optional captions | Visitor |
| ABT-015 | About Page Layout | Responsive page structure | As a visitor, I want the About page to display properly on my device so I can read content comfortably | System renders all About page sections responsively with proper spacing, readable typography, and optimized images across mobile, tablet, and desktop | Visitor |
| CON-001 | Contact Information Display | Show full business address with icon | As a visitor, I want to see the complete address so I can visit or send items to the workshop | System displays full address "Number 9 Sherwood Crescent, Waterfalls, Zindoga Shops, Harare, Zimbabwe" with location pin icon and clear formatting | Visitor |
| CON-002 | Contact Information Display | Display clickable phone number | As a visitor, I want to tap the phone number to call directly so I can quickly reach the business | System shows phone number "+263 77 638 1498" with tel: link that opens device dialer when clicked/tapped, with phone icon | Visitor |
| CON-003 | Contact Information Display | Display clickable email address | As a visitor, I want to click the email to compose a message so I can contact them via my email client | System displays "sales@rushsubaru.com" with mailto: link that opens default email client with pre-populated recipient, with email icon | Visitor |
| CON-004 | Contact Information Display | Show business hours | As a visitor, I want to know operating hours so I can contact or visit during open times | System displays business hours in clear format showing weekday and weekend availability, with clock icon | Visitor |
| CON-005 | Google Maps Integration | Embed full-width interactive map | As a visitor, I want to see the location on a map so I can understand where the business is located | System displays full-width Google Maps embed showing exact location at Sherwood Crescent, Waterfalls with proper zoom level and satellite/map toggle | Visitor |
| CON-006 | Google Maps Integration | Display business marker on map | As a visitor, I want to see a clear marker so I can identify the exact business location | System shows custom or standard Google Maps marker at precise business coordinates with "Zaza Rush Subaru" label visible | Visitor |
| CON-007 | Google Maps Integration | Provide directions link | As a visitor, I want to get directions so I can navigate to the workshop | System includes "Get Directions" button/link that opens Google Maps navigation in new tab with destination pre-set to business address | Visitor |
| CON-008 | Main Contact Form | Render form with required fields | As a visitor, I want to fill out a contact form so I can send an inquiry without using email | System displays form with Name (required), Email (required), Phone (optional), fields with proper labels, placeholders, and HTML5 validation | Visitor |
| CON-009 | Main Contact Form | Implement subject dropdown | As a visitor, I want to categorize my inquiry so the business can route it appropriately | System shows select dropdown with options: "Get a quote for a part", "Book a service", "General inquiry", "Sell my car", "Other" with "Select subject" placeholder | Visitor |
| CON-010 | Main Contact Form | Handle "Sell my car" selection | As a visitor who wants to sell a car, I want to be directed to the proper form so I can provide vehicle details | When "Sell my car" is selected, system displays notification and redirects user to sell.html page, or shows inline message with link to sell form | Visitor |
| CON-011 | Main Contact Form | Provide message textarea | As a visitor, I want space to write my detailed message so I can fully explain my inquiry | System displays textarea with minimum 4 rows, character counter (optional), and 2000 character limit with clear placeholder text | Visitor |
| CON-012 | Main Contact Form | Implement honeypot spam protection | As a business, we want to prevent bot submissions so we receive only genuine inquiries | System includes hidden honeypot field (CSS hidden, not display:none) that bots will fill; submissions with populated honeypot are rejected silently | Visitor |
| CON-013 | Main Contact Form | Implement time-based validation | As a business, we want additional bot protection so we filter automated submissions | System records form load timestamp and rejects submissions occurring within 3 seconds of page load, indicating likely bot behavior | Visitor |
| CON-014 | Main Contact Form | Submit form via AJAX | As a visitor, I want seamless form submission so I don't experience page reloads | System submits form data via JavaScript fetch/AJAX to backend endpoint, maintaining page state and showing loading indicator during submission | Visitor |
| CON-015 | Main Contact Form | Display SweetAlert2 success feedback | As a visitor, I want clear confirmation so I know my message was sent successfully | Upon successful submission, system displays SweetAlert2 modal with success icon, "Message Sent!" title, and confirmation text, then resets form | Visitor |
| CON-016 | Main Contact Form | Display SweetAlert2 error feedback | As a visitor, I want to know if submission failed so I can retry or use alternate contact | Upon failed submission, system displays SweetAlert2 modal with error icon, descriptive message, and suggestion to try WhatsApp or phone as alternative | Visitor |
| CON-017 | WhatsApp Quick Connect | Display prominent WhatsApp button | As a visitor, I want quick access to WhatsApp so I can chat directly with the business | System shows large, visually prominent WhatsApp button with brand colors and icon, positioned prominently in contact section | Visitor |
| CON-018 | WhatsApp Quick Connect | Implement pre-filled message | As a visitor, I want a pre-written message start so I can begin conversation easily | WhatsApp button links to wa.me/263776381498?text=Hello%20Zaza%20Rush%20Subaru... opening WhatsApp with pre-filled greeting message | Visitor |
| CON-019 | Social Media Links | Display Facebook link | As a visitor, I want to find the business on Facebook so I can follow updates and see reviews | System shows Facebook icon button linking to business Facebook page, opening in new tab with proper aria-label for accessibility | Visitor |
| CON-020 | Social Media Links | Display Instagram link | As a visitor, I want to see their Instagram so I can view workshop photos and projects | System shows Instagram icon button linking to business Instagram profile, opening in new tab with proper aria-label for accessibility | Visitor |
| CON-021 | Contact Page Layout | Implement responsive design | As a visitor, I want the contact page to work on any device so I can reach them from mobile | System renders contact page responsively: stacked layout on mobile, side-by-side form/info on desktop, touch-friendly form inputs, readable text at all sizes | Visitor |
| CON-022 | Form Validation | Validate email format | As a visitor, I want immediate feedback on invalid email so I can correct mistakes before submitting | System validates email field on blur and submission using regex pattern, displays inline error message for invalid format with visual indicator | Visitor |
| CON-023 | Form Validation | Validate required fields | As a visitor, I want to know which fields are required so I can complete the form correctly | System marks required fields with asterisk, validates on submission, highlights empty required fields with error styling and messages | Visitor |
| CON-024 | Contact Information Display | Create contact info card component | As a visitor, I want contact details organized clearly so I can quickly find the method I prefer | System displays all contact information in styled card with consistent icon sizes, proper spacing, hover effects on clickable items, and clear visual hierarchy | Visitor |
| CON-025 | Map Integration | Handle map loading gracefully | As a visitor, I want the page to work even if the map fails to load so I can still contact the business | System includes fallback content if Google Maps fails to load, showing static address text and directions link; map lazy-loads to improve page speed | Visitor |

### 9.3 Phase 6 Success Criteria

- [ ] About page displays all sections correctly
- [ ] Mission and vision are prominently displayed
- [ ] Workshop images load and display
- [ ] Contact form validates correctly
- [ ] Honeypot blocks bot submissions
- [ ] Form submits and sends email
- [ ] SweetAlert2 feedback displays
- [ ] Google Maps embed loads
- [ ] All contact links work (tel:, mailto:)
- [ ] Responsive on all devices

---

## 10. Phase 7: Sell Your Subaru & API Backend

### 10.1 Phase Objectives

- Create Sell Your Subaru page with photo upload
- Build PHP backend for form processing
- Implement API versioning structure
- Add security measures (sanitization, honeypot)
- Configure email sending

### 10.2 Requirements Table

| Requirement ID | Module Name | Description | User Story | Expected System Behaviour/Outcome | Role |
|----------------|-------------|-------------|------------|-----------------------------------|------|
| SELL-001 | Page Introduction | Hero section with compelling headline explaining the "Sell Your Subaru" service, including background image of Subaru vehicle | As a visitor, I want to immediately understand what this page offers so I can decide if this service is right for me | Hero section displays with headline "Sell Your Subaru to Zimbabwe's Specialist", subheadline explaining quick cash offers, and CTA button scrolling to form | Visitor |
| SELL-002 | Page Introduction | Benefits section highlighting advantages of selling to Rush Subaru | As a visitor, I want to see why I should sell to Rush Subaru instead of private sale so I can make an informed decision | Display 4-6 benefit cards: "Fair Market Valuation", "Quick Cash Payment", "Free Vehicle Inspection", "Hassle-Free Process", "No Advertising Costs", "Immediate Decision" | Visitor |
| SELL-003 | Page Introduction | Visual process overview showing 3-4 step selling journey | As a visitor, I want to understand the selling process before submitting my vehicle so I know what to expect | Numbered step cards: 1) Submit Vehicle Details, 2) Receive Valuation Call, 3) Vehicle Inspection, 4) Get Paid - with icons and brief descriptions | Visitor |
| SELL-004 | Vehicle Form | Owner Name input field with required validation | As a visitor, I want to provide my name so Rush Subaru can address me properly when contacting | Text input with label "Full Name", placeholder "e.g., John Moyo", required attribute, minimum 2 characters validation | Visitor |
| SELL-005 | Vehicle Form | Contact Number input with Zimbabwe format validation | As a visitor, I want to provide my phone number so Rush Subaru can call me about my vehicle | Tel input with label "Contact Number", placeholder "+263 XX XXX XXXX", pattern validation for Zimbabwe mobile numbers, required field | Visitor |
| SELL-006 | Vehicle Form | Email Address input with format validation | As a visitor, I want to provide my email so I can receive written communication about my submission | Email input with label "Email Address", placeholder "your@email.com", HTML5 email validation, required field | Visitor |
| SELL-007 | Vehicle Form | Vehicle Make dropdown pre-selected to Subaru | As a visitor, I want the make field to show Subaru since Rush Subaru only deals with Subaru vehicles | Dropdown with "Subaru" pre-selected and disabled/readonly, value submitted with form, visual indication this is Subaru-only service | Visitor |
| SELL-008 | Vehicle Form | Vehicle Model dropdown with all Subaru models | As a visitor, I want to select my specific Subaru model from a comprehensive list | Dropdown with options: Impreza, WRX, WRX STI, Legacy, Legacy B4, Outback, Forester, XV/Crosstrek, BRZ, Levorg, Tribeca, Exiga, Other - with "Select Model" placeholder | Visitor |
| SELL-009 | Vehicle Form | Year dropdown from 1990 to current year | As a visitor, I want to select my vehicle's year of manufacture for accurate valuation | Dropdown populated dynamically from 1990 to 2026, sorted descending (newest first), required field with "Select Year" placeholder | Visitor |
| SELL-010 | Vehicle Form | Mileage/KM number input field | As a visitor, I want to enter my vehicle's current mileage so Rush Subaru can assess its value | Number input with label "Mileage (KM)", placeholder "e.g., 150000", min value 0, max value 999999, required field with thousands separator formatting | Visitor |
| SELL-011 | Vehicle Form | Vehicle Condition radio buttons (Runner/Non-Runner) | As a visitor, I want to indicate if my vehicle is running or not so Rush Subaru can prepare appropriate offers | Radio button group with two options: "Runner (Driveable)" and "Non-Runner (Not Driveable)", required selection, default none selected | Visitor |
| SELL-012 | Vehicle Form | Asking Price optional input in USD | As a visitor, I want to optionally specify my expected price so Rush Subaru knows my expectations | Number input with label "Asking Price (USD) - Optional", placeholder "e.g., 15000", currency prefix "$", optional field, min value 0 | Visitor |
| SELL-013 | Vehicle Form | Vehicle Description textarea with minimum character requirement | As a visitor, I want to describe my vehicle's condition, features, and history in detail | Textarea with label "Vehicle Description", placeholder text guiding what to include, minimum 50 characters, maximum 2000, character counter displayed, required field | Visitor |
| SELL-014 | Vehicle Form | Honeypot hidden field for spam prevention | As a site owner, I want to prevent automated spam submissions without inconveniencing real users | Hidden text input with name "website" or similar, CSS display:none, if filled on submission indicates bot, no visible indication to users | Visitor |
| SELL-015 | Photo Upload | Drag and drop upload zone for vehicle images | As a visitor, I want to easily upload photos of my vehicle by dragging them into the form | Dashed border drop zone with icon and text "Drag & drop images here or click to browse", accepts multiple files, visual feedback on dragover | Visitor |
| SELL-016 | Photo Upload | Click to browse file selection fallback | As a visitor, I want to click to select files if drag and drop doesn't work on my device | Hidden file input triggered by clicking drop zone, opens native file picker, accepts multiple selection, same validation as drag-drop | Visitor |
| SELL-017 | Photo Upload | Maximum 5 images limit with counter | As a visitor, I want to know how many photos I can upload and how many I've added | Display "X/5 images uploaded" counter, disable upload when 5 reached, show message "Maximum 5 images allowed" if attempting to exceed | Visitor |
| SELL-018 | Photo Upload | Image preview thumbnails grid | As a visitor, I want to see previews of my uploaded images to confirm they're correct | Grid display of thumbnail previews (approximately 100x100px), maintain aspect ratio, show loading spinner during processing | Visitor |
| SELL-019 | Photo Upload | File type validation (jpg, png, webp only) | As a visitor, I want to be informed if I try to upload an unsupported file format | Accept only image/jpeg, image/png, image/webp MIME types, show error "Only JPG, PNG, and WebP images are allowed" for invalid types | Visitor |
| SELL-020 | Photo Upload | Maximum file size validation (5MB per image) | As a visitor, I want to know if my image is too large before the form fails to submit | Validate each file is ≤5MB, show error "Image [filename] exceeds 5MB limit" for oversized files, suggest compression | Visitor |
| SELL-021 | Photo Upload | Remove individual image option | As a visitor, I want to remove an uploaded image if I selected the wrong one | X button overlay on each thumbnail, click removes from upload queue, updates counter, confirms removal for accessibility | Visitor |
| SELL-022 | Form Validation | Real-time client-side validation feedback | As a visitor, I want immediate feedback when I fill a field incorrectly so I can fix it before submitting | Validate on blur/input events, show green checkmark for valid, red border and message for invalid, don't validate empty optional fields | Visitor |
| SELL-023 | Form Validation | Required field highlighting on submission attempt | As a visitor, I want to see which required fields I missed when trying to submit an incomplete form | Scroll to first invalid field, highlight all empty required fields with red border, show "This field is required" message, focus first invalid | Visitor |
| SELL-024 | Form Validation | Phone number format validation for Zimbabwe | As a visitor, I want to be told if my phone number format is incorrect | Accept formats: +263XXXXXXXXX, 07XXXXXXXX, 263XXXXXXXXX, show "Please enter a valid Zimbabwe phone number" for invalid formats | Visitor |
| SELL-025 | Form Validation | Description minimum length validation with counter | As a visitor, I want to see how many more characters I need to meet the minimum requirement | Live character counter showing "X/50 minimum characters", changes color when minimum met, validation message if under 50 on submit | Visitor |
| SELL-026 | Form Submission | AJAX form submission without page reload | As a visitor, I want to submit the form without losing my place on the page | Form submits via Fetch API to vehicle handler endpoint, FormData object includes all fields and files, prevents default form submission | Visitor |
| SELL-027 | Form Submission | Loading state on submit button during processing | As a visitor, I want visual feedback that my submission is being processed | Button text changes to "Submitting...", spinner icon added, button disabled to prevent double-submit, form fields readonly during submit | Visitor |
| SELL-028 | Form Submission | SweetAlert2 success confirmation with next steps | As a visitor, I want clear confirmation that my submission was received and know what happens next | Success modal with green checkmark, title "Submission Received!", message explaining 24-48 hour response time, contact info for questions, OK button | Visitor |
| SELL-029 | Form Submission | SweetAlert2 error handling with retry option | As a visitor, I want to understand what went wrong if my submission fails and have option to retry | Error modal with red X icon, title "Submission Failed", specific error message from API, "Try Again" button re-enables form, "Contact Us" alternative link | Visitor |
| SELL-030 | Form Submission | Form reset after successful submission | As a visitor, I want the form cleared after successful submission so I know it went through | Clear all form fields, remove uploaded image previews, reset character counters, scroll to success message or top of form | Visitor |
| API-001 | Contact Handler | PHP endpoint to receive contact form POST data | As a developer, I need an endpoint to process general contact form submissions | php/contact-handler.php accepts POST with name, email, phone, subject, message fields, validates all required fields present, returns JSON response | Developer |
| API-002 | Contact Handler | Honeypot field validation for spam filtering | As a developer, I need to automatically reject bot submissions without CAPTCHA friction | Check honeypot field (e.g., "website") is empty, if filled return 200 with fake success (don't alert spammer), log attempt for monitoring | Developer |
| API-003 | Contact Handler | Timestamp validation to prevent instant bot submissions | As a developer, I need to reject submissions that happen too quickly to be human | Hidden timestamp field set on page load, reject if submission < 3 seconds after load, return generic error, log suspicious activity | Developer |
| API-004 | Contact Handler | Send formatted email to sales@rushsubaru.com | As a developer, I need contact form data emailed to the sales team | Use PHP mail() or PHPMailer, send to sales@rushsubaru.com, include all form fields formatted clearly, set Reply-To as submitter's email | Developer |
| API-005 | Vehicle Handler | PHP endpoint to receive multipart vehicle submission data | As a developer, I need an endpoint to process vehicle sale submissions with images | php/vehicle-handler.php accepts multipart/form-data POST, parses all text fields and $_FILES array, validates required fields, handles up to 5 images | Developer |
| API-006 | Vehicle Handler | Image upload processing and temporary storage | As a developer, I need to securely handle uploaded vehicle images | Validate MIME types server-side, check file sizes ≤5MB, generate unique filenames, store in temporary directory, clean up after email sent | Developer |
| API-007 | Vehicle Handler | Image optimization and resize before email attachment | As a developer, I need to optimize images to reduce email size while maintaining quality | Use GD library to resize images max 1200px width, compress JPEG to 80% quality, convert all to JPEG for consistency, max total attachment size 10MB | Developer |
| API-008 | Vehicle Handler | Send email with vehicle details and image attachments | As a developer, I need vehicle submissions emailed with photos to sales team | Use PHPMailer for attachments, attach all uploaded images, format vehicle details in HTML template, send to sales@rushsubaru.com, set Reply-To as submitter | Developer |
| API-009 | Email Template | Reusable HTML email template with company branding | As a developer, I need consistent, professional email formatting for all submissions | php/email-template.php with Rush Subaru logo, brand colors (#0033A0 blue), responsive layout, inline CSS for email client compatibility | Developer |
| API-010 | Email Template | Structured data display for vehicle submissions | As a developer, I need vehicle details displayed clearly in email for quick review | Table format with labels: Owner, Contact, Email, Model, Year, Mileage, Condition, Asking Price, Description - clear section headers, alternating row colors | Developer |
| API-011 | API Structure | Versioned API endpoint for contact submissions | As a developer, I need versioned endpoints for future API changes without breaking existing integrations | api/v1/contact.php routes to contact-handler, accepts POST only, returns JSON with status, message, and optional data fields | Developer |
| API-012 | API Structure | Versioned API endpoint for vehicle submissions | As a developer, I need versioned endpoints for vehicle sale form processing | api/v1/vehicle.php routes to vehicle-handler, accepts POST multipart only, returns JSON with status, message, submission_id for tracking | Developer |
| API-013 | API Structure | Centralized configuration file for API settings | As a developer, I need centralized configuration for easy environment management | api/v1/config.php with constants: ADMIN_EMAIL, MAX_FILE_SIZE, ALLOWED_TYPES, UPLOAD_DIR, RATE_LIMIT, environment detection (dev/prod) | Developer |
| API-014 | API Structure | Consistent JSON response format across all endpoints | As a developer, I need predictable API responses for frontend error handling | All endpoints return: {"success": bool, "message": string, "data": object|null, "errors": array|null}, appropriate HTTP status codes (200, 400, 500) | Developer |
| API-015 | Security | Input sanitization for all form fields | As a developer, I need to prevent XSS and injection attacks from user input | Sanitize all inputs with htmlspecialchars(), strip_tags() where appropriate, validate email format with filter_var(), escape for SQL if database used | Developer |
| API-016 | Security | Rate limiting headers to prevent abuse | As a developer, I need to discourage rapid repeated submissions from same source | Set X-RateLimit-Limit and X-RateLimit-Remaining headers, implement basic IP-based tracking, return 429 Too Many Requests if exceeded (10 per hour) | Developer |
| API-017 | Security | Secure error handling without sensitive data exposure | As a developer, I need informative errors for debugging without exposing system details | Log detailed errors to server file (php/logs/), return generic "An error occurred" to client in production, include request ID for support correlation | Developer |
| API-018 | Security | CORS headers for API endpoints | As a developer, I need proper CORS configuration for frontend JavaScript requests | Set Access-Control-Allow-Origin for rushsubaru.com domain only, allow POST method, allow Content-Type header, reject preflight from unknown origins | Developer |

### 10.3 Phase 7 Success Criteria

- [ ] Sell page displays with all sections
- [ ] Form validates all fields correctly
- [ ] Photo upload works (drag/drop and click)
- [ ] Image previews display
- [ ] File type and size validation works
- [ ] Form submits via AJAX
- [ ] Loading states display
- [ ] Success/error modals appear
- [ ] PHP handlers receive data
- [ ] Emails send to sales@rushsubaru.com
- [ ] Images attach to emails
- [ ] API returns correct JSON format
- [ ] Honeypot blocks bots
- [ ] Input sanitization working

---

## 11. Phase 8: Testing, Documentation & Deployment

### 11.1 Phase Objectives

- Complete all unit and functional tests
- Verify cross-browser compatibility
- Achieve Lighthouse scores >80
- Complete all documentation
- Deploy to production
- Verify live site functionality

### 11.2 Requirements Table

| Requirement ID | Module Name | Description | User Story | Expected System Behaviour/Outcome | Role |
|----------------|-------------|-------------|------------|-----------------------------------|------|
| TEST-001 | Unit Testing - HTML | W3C HTML validation for all pages | As a developer, I want to validate HTML markup so that pages render correctly across browsers | System validates all HTML files against W3C standards with zero errors and warnings documented in tests/{page_name}/html_validation.md | Developer |
| TEST-002 | Unit Testing - CSS | W3C CSS validation for all stylesheets | As a developer, I want to validate CSS so that styles apply consistently | System validates all CSS files against W3C standards with zero errors; warnings reviewed and documented | Developer |
| TEST-003 | Unit Testing - JavaScript | JavaScript error and lint checking | As a developer, I want error-free JavaScript so that functionality works reliably | ESLint passes with zero errors; all scripts execute without throwing exceptions | Developer |
| TEST-004 | Unit Testing - Console | Browser console error verification | As a developer, I want zero console errors so that the site appears professional | Browser DevTools console shows zero errors, warnings, or failed resource loads on all pages | Developer |
| TEST-005 | Functional Testing - Links | Internal and external link verification | As a user, I want all links to work so that I can navigate the site | Automated link checker confirms zero 404 errors; all internal links resolve correctly; external links open in new tabs | Developer |
| TEST-006 | Functional Testing - Forms | Form submission validation | As a user, I want forms to submit correctly so that my inquiries are received | All forms submit successfully; validation messages display; success/error states work; data reaches intended destination | Developer |
| TEST-007 | Functional Testing - WhatsApp | WhatsApp integration testing | As a user, I want WhatsApp links to open the app so that I can message the dealership | WhatsApp links open WhatsApp app/web with pre-filled message; works on mobile and desktop | Developer |
| TEST-008 | Functional Testing - Email | Email link (mailto:) testing | As a user, I want email links to open my email client so that I can contact the dealership | All mailto: links open default email client with correct recipient address pre-filled | Developer |
| TEST-009 | Functional Testing - Navigation | Navigation menu functionality | As a user, I want navigation to work so that I can access all pages | Desktop nav, mobile hamburger menu, dropdowns, and footer links all function correctly; active states display | Developer |
| TEST-010 | Responsive Testing - Mobile Small | Testing at 320px viewport | As a mobile user, I want the site to display correctly on small screens | All content visible, readable, and interactive at 320px; no horizontal scroll; touch targets minimum 44px | Developer |
| TEST-011 | Responsive Testing - Mobile Medium | Testing at 375px viewport | As a mobile user, I want the site optimized for iPhone-sized screens | Layout adapts correctly at 375px; images scale; text remains readable; forms usable | Developer |
| TEST-012 | Responsive Testing - Mobile Large | Testing at 428px viewport | As a mobile user, I want the site to work on larger phones | Layout displays correctly at 428px; no broken layouts or overflow issues | Developer |
| TEST-013 | Responsive Testing - Tablet Portrait | Testing at 768px viewport | As a tablet user, I want the site to work in portrait orientation | Two-column layouts display correctly; navigation adapts; images scale appropriately | Developer |
| TEST-014 | Responsive Testing - Tablet Landscape | Testing at 1024px viewport | As a tablet user, I want the site to work in landscape orientation | Full tablet layout displays; hover states work; all interactive elements accessible | Developer |
| TEST-015 | Responsive Testing - Desktop | Testing at 1280px viewport | As a desktop user, I want the full site experience | Full desktop layout with all features; max-width containers centered; all columns display | Developer |
| TEST-016 | Responsive Testing - Desktop Large | Testing at 1920px viewport | As a user with large monitor, I want the site to scale appropriately | Content remains centered with appropriate max-widths; no stretched images; readable text | Developer |
| TEST-017 | Cross-Browser - Chrome | Chrome browser compatibility | As a Chrome user, I want full site functionality | All features work in Chrome latest; CSS renders correctly; JavaScript executes without errors | Developer |
| TEST-018 | Cross-Browser - Firefox | Firefox browser compatibility | As a Firefox user, I want full site functionality | All features work in Firefox latest; CSS flexbox/grid renders correctly; forms function | Developer |
| TEST-019 | Cross-Browser - Safari | Safari browser compatibility | As a Safari user, I want full site functionality | All features work in Safari latest; WebKit-specific CSS applied; date inputs handled | Developer |
| TEST-020 | Cross-Browser - Edge | Edge browser compatibility | As an Edge user, I want full site functionality | All features work in Edge latest; Chromium-based rendering verified | Developer |
| TEST-021 | Cross-Browser - Mobile Safari | iOS Safari compatibility | As an iPhone user, I want full mobile functionality | Touch events work; viewport scales correctly; no iOS-specific bugs; smooth scrolling | Developer |
| TEST-022 | Cross-Browser - Chrome Android | Android Chrome compatibility | As an Android user, I want full mobile functionality | Touch events work; viewport scales correctly; Android-specific rendering verified | Developer |
| TEST-023 | Performance - Lighthouse | Lighthouse audit scoring | As a stakeholder, I want good performance scores so that the site ranks well | Lighthouse scores: Performance >80, Accessibility >90, Best Practices >80, SEO >90 | Developer |
| TEST-024 | Performance - Load Time | Page load time optimization | As a user, I want fast page loads so that I don't leave the site | All pages load in under 3 seconds on 3G connection; First Contentful Paint <1.5s | Developer |
| TEST-025 | Performance - Images | Image optimization verification | As a user, I want images to load quickly | All images compressed; WebP format with fallbacks; lazy loading implemented; no images >200KB | Developer |
| TEST-026 | Performance - Render Blocking | Render-blocking resource elimination | As a user, I want content to appear quickly | No render-blocking CSS/JS; critical CSS inlined; scripts deferred or async; fonts preloaded | Developer |
| TEST-027 | Accessibility - ARIA | ARIA labels implementation | As a screen reader user, I want elements properly labeled | All interactive elements have aria-labels; landmarks defined; live regions for dynamic content | Developer |
| TEST-028 | Accessibility - Alt Text | Image alternative text | As a visually impaired user, I want image descriptions | All images have descriptive alt text; decorative images have empty alt=""; no missing alt attributes | Developer |
| TEST-029 | Accessibility - Keyboard | Keyboard navigation testing | As a keyboard user, I want to navigate without a mouse | Tab order logical; focus visible; all interactive elements reachable; no keyboard traps | Developer |
| TEST-030 | Accessibility - Contrast | Color contrast verification | As a user with low vision, I want readable text | All text meets WCAG AA contrast ratios (4.5:1 normal, 3:1 large); verified with contrast checker | Developer |
| TEST-031 | Accessibility - Screen Reader | Screen reader compatibility | As a screen reader user, I want content to be announced correctly | VoiceOver/NVDA testing complete; headings hierarchical; form labels associated; tables accessible | Developer |
| TEST-032 | Security - Honeypot | Spam honeypot field testing | As an admin, I want spam protection so that only legitimate submissions arrive | Honeypot fields hidden from users but trap bots; submissions with filled honeypot rejected silently | Developer |
| TEST-033 | Security - Input Sanitization | Form input sanitization | As an admin, I want protected forms so that malicious input is blocked | All inputs sanitized server-side; XSS attempts blocked; SQL injection prevented; special characters escaped | Developer |
| TEST-034 | Security - Console | Console security verification | As a security auditor, I want no sensitive data exposed | No API keys, passwords, or sensitive data in console; error messages generic; debug mode disabled | Developer |
| TEST-035 | Security - SSL | SSL certificate verification | As a user, I want secure connections so that my data is protected | SSL certificate valid; HTTPS enforced; HTTP redirects to HTTPS; no mixed content warnings | Developer |
| DOC-001 | Page Documentation | Page overview documentation per page | As a developer, I want documentation so that I can maintain the code | docs/{page_name}/page_overview.md created for each page with purpose, structure, and dependencies | Developer |
| DOC-002 | Component Documentation | Component documentation per page | As a developer, I want component details so that I can modify them | docs/{page_name}/components.md documents all components with props, styling, and usage examples | Developer |
| DOC-003 | Test Results Documentation | Test results documentation per page | As a QA reviewer, I want test records so that I can verify quality | docs/{page_name}/test_results.md contains all test outcomes, dates, and tester information | Developer |
| DOC-004 | API Endpoints | API endpoint documentation | As a developer, I want API docs so that I can integrate correctly | docs/api/endpoints.md lists all endpoints with methods, URLs, authentication, and rate limits | Developer |
| DOC-005 | API Request/Response | Request and response format documentation | As a developer, I want format specs so that I can build correct requests | docs/api/request_response_formats.md details JSON schemas, required fields, and example payloads | Developer |
| DOC-006 | API Error Codes | Error code documentation | As a developer, I want error handling guidance so that I can handle failures | docs/api/error_codes.md lists all error codes, meanings, and recommended user-facing messages | Developer |
| DOC-007 | Deployment Guide | Server requirements and deployment instructions | As a deployer, I want clear instructions so that I can deploy correctly | docs/deployment/deployment_guide.md covers Cyberpanel requirements, file structure, and configuration | Developer |
| DEPLOY-001 | Pre-Deploy - Tests | All tests passing verification | As a release manager, I want confirmed quality before deployment | Automated test suite runs with 100% pass rate; no skipped tests; test report generated | Developer |
| DEPLOY-002 | Pre-Deploy - Images | Image optimization confirmation | As a deployer, I want optimized assets for production | All images compressed, properly sized, WebP converted; total image payload verified under budget | Developer |
| DEPLOY-003 | Pre-Deploy - Minification | CSS and JavaScript minification | As a deployer, I want minified assets for performance | All CSS/JS files minified; source maps generated for debugging; build process documented | Developer |
| DEPLOY-004 | Pre-Deploy - Meta Tags | Meta tag completion verification | As an SEO specialist, I want complete meta tags for search visibility | All pages have title, description, OG tags, Twitter cards, canonical URLs; meta tags validated | Developer |
| DEPLOY-005 | Pre-Deploy - Robots | robots.txt configuration | As an SEO specialist, I want proper crawler instructions | robots.txt properly configured; allows search engines; blocks admin areas; references sitemap | Developer |
| DEPLOY-006 | Pre-Deploy - Sitemap | sitemap.xml generation | As an SEO specialist, I want search engines to find all pages | sitemap.xml generated with all public pages; proper lastmod dates; submitted to search consoles | Developer |
| DEPLOY-007 | Deployment - Git | Git deployment to production | As a deployer, I want version-controlled deployments | Code pushed to main branch; Git tags created for version; deployment triggered automatically or manually | Developer |
| DEPLOY-008 | Deployment - Upload | File upload to Cyberpanel | As a deployer, I want files on the production server | Files uploaded via FTP/SFTP or Git deploy to Cyberpanel; file permissions set correctly (644/755) | Developer |
| DEPLOY-009 | Deployment - DNS | DNS verification | As a deployer, I want correct domain resolution | DNS records verified; A record points to correct IP; www subdomain configured; propagation confirmed | Developer |
| DEPLOY-010 | Deployment - SSL | Let's Encrypt SSL activation | As a deployer, I want active SSL for security | Let's Encrypt certificate installed via Cyberpanel; auto-renewal configured; certificate chain valid | Developer |
| DEPLOY-011 | Deployment - Email | Email configuration verification | As an admin, I want working email for form submissions | Email sending configured; SMTP settings verified; test emails received; SPF/DKIM records set | Developer |
| DEPLOY-012 | Post-Deploy - Live Test | Live site functional testing | As a QA tester, I want to verify production functionality | Complete test suite run on live URL; all pages accessible; no 500 errors; performance acceptable | Developer |
| DEPLOY-013 | Post-Deploy - Forms | Production form testing | As a QA tester, I want forms working in production | All forms submitted on live site; emails received; success messages display; database entries created | Developer |
| DEPLOY-014 | Post-Deploy - WhatsApp | Live WhatsApp link testing | As a QA tester, I want WhatsApp working in production | WhatsApp links tested on live site from mobile and desktop; correct phone number; message pre-fills | Developer |
| DEPLOY-015 | Post-Deploy - Analytics | Analytics verification | As a marketing manager, I want tracking working | Google Analytics/Tag Manager firing correctly; page views tracked; events logging; no duplicate tags | Developer |
| DEPLOY-016 | Rollback - Backup | Previous version backup creation | As a deployer, I want rollback capability if issues arise | Previous production version archived with timestamp; database backup taken; backup verified restorable | Developer |
| DEPLOY-017 | Rollback - Procedure | Quick rollback procedure documentation | As a deployer, I want fast recovery from failed deployments | Rollback procedure documented; can be executed in under 5 minutes; tested before go-live | Developer |
| DEPLOY-018 | Success Criteria | Final deployment verification checklist | As a project manager, I want confirmation of successful deployment | 100% test pass rate confirmed; zero console errors; all functionality verified; SSL valid; docs complete | Developer |

### 11.3 Phase 8 Success Criteria

- [ ] 100% test pass rate (not 99%)
- [ ] All HTML/CSS validates
- [ ] Zero console errors on all pages
- [ ] All links verified working
- [ ] All forms tested and working
- [ ] Responsive at all breakpoints verified
- [ ] Cross-browser testing complete
- [ ] Lighthouse scores >80 achieved
- [ ] All accessibility checks pass
- [ ] Security testing complete
- [ ] Documentation complete in /docs/
- [ ] Test results recorded in /tests/
- [ ] Site deployed to www.rushsubaru.com
- [ ] SSL active and valid
- [ ] All live functionality verified
- [ ] Rollback procedure documented

---

## 12. Appendices

### Appendix A: Requirement ID Reference

| Prefix | Phase | Count |
|--------|-------|-------|
| ENV-xxx | Environment Setup | 25 |
| CORE-xxx | Core Infrastructure | 28 |
| HOME-xxx | Homepage | 35 |
| SVC-xxx | Services Page | 32 |
| CAT-xxx | Catalog Page | 33 |
| ABT-xxx | About Page | 15 |
| CON-xxx | Contact Page | 25 |
| SELL-xxx | Sell Your Subaru | 30 |
| API-xxx | API Backend | 18 |
| TEST-xxx | Testing | 35 |
| DOC-xxx | Documentation | 7 |
| DEPLOY-xxx | Deployment | 18 |
| **TOTAL** | | **301** |

### Appendix B: Technology Quick Reference

| Category | Technology | CDN/Source |
|----------|------------|------------|
| CSS Framework | Bootstrap 5.3.3 | cdn.jsdelivr.net |
| Icons | Font Awesome 6.5.x | cdnjs.cloudflare.com |
| Fonts | Montserrat, Open Sans | fonts.googleapis.com |
| Animations | AOS 2.3.4 | unpkg.com |
| Modals | SweetAlert2 11.x | cdn.jsdelivr.net |
| Gallery | Lightbox2 2.11.x | cdnjs.cloudflare.com |
| Carousel | Swiper 11.x | cdn.jsdelivr.net |
| PDF | jsPDF 2.5.x | cdnjs.cloudflare.com |

### Appendix C: Contact Information

| Type | Value |
|------|-------|
| WhatsApp | +263 77 638 1498 |
| Email | sales@rushsubaru.com |
| Website | www.rushsubaru.com |
| Address | Number 9 Sherwood Crescent, Waterfalls, Zindoga Shops, Harare, Zimbabwe |

### Appendix D: Brand Colors CSS Variables

```css
:root {
  --color-primary: #0033A0;
  --color-secondary: #0055FF;
  --color-light-blue: #E6F0FF;
  --color-white: #FFFFFF;
  --color-dark-gray: #333333;
  --color-light-gray: #F5F5F5;
  --color-success: #28A745;
  --color-error: #DC3545;
  --color-whatsapp: #25D366;
}
```

---

**Document End**

*This MVP document contains 301 individual requirements organized across 8 development phases. Each requirement must be implemented and tested to achieve 100% completion before project deployment.*

**Document Status:** READY FOR DEVELOPMENT  
**Estimated Development Time:** 4-6 weeks  
**Next Step:** Begin Phase 1 - Development Environment Setup
