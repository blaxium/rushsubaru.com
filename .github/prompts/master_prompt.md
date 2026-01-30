# 🚀 MASTER DEVELOPMENT PROMPT - Zaza Rush Subaru

> **USE THIS PROMPT** to develop the Zaza Rush Subaru website phase by phase.  
> **Copy this entire prompt** at the start of each development session.  
> **Update the CURRENT PHASE** section as you progress.

---

## ⚙️ CURRENT PHASE CONFIGURATION

```yaml
# ═══════════════════════════════════════════════════════════════════
# UPDATE THIS SECTION TO MATCH YOUR CURRENT DEVELOPMENT PHASE
# ═══════════════════════════════════════════════════════════════════

CURRENT_PHASE: 1
PHASE_NAME: "Environment Setup"
REQUIREMENT_PREFIX: "ENV"
REQUIREMENT_RANGE: "ENV-001 to ENV-025"
LAST_COMPLETED: "None"
NEXT_REQUIREMENT: "ENV-001"

# Phase Options:
# Phase 1: Environment Setup (ENV-001 to ENV-025)
# Phase 2: Core Infrastructure (CORE-001 to CORE-028)
# Phase 3: Homepage (HOME-001 to HOME-035)
# Phase 4: Services Page (SVC-001 to SVC-032)
# Phase 5: Catalog Page (CAT-001 to CAT-033)
# Phase 6: About & Contact (ABT-001 to ABT-015, CON-001 to CON-025)
# Phase 7: Sell Your Subaru & API (SELL-001 to SELL-030, API-001 to API-018)
# Phase 8: Testing & Deployment (TEST-001 to TEST-035, DOC-001 to DOC-007, DEPLOY-001 to DEPLOY-018)
```

---

## 📋 PROJECT CONTEXT

### Project Identity
- **Project:** Zaza Rush Subaru Website
- **Domain:** www.rushsubaru.com
- **Type:** Business Website for Subaru Specialist
- **Location:** Zimbabwe (English, USD currency)
- **Developer:** bguvava (bguvava.com)

### Client Information
- **Business:** Zaza Rush Subaru
- **Slogan:** "The Heart of Every Subaru"
- **Address:** Number 9 Sherwood Crescent, Waterfalls, Zindoga Shops, Harare, Zimbabwe
- **Phone/WhatsApp:** +263 77 638 1498
- **Email:** sales@rushsubaru.com

### Technology Stack
```
Frontend: HTML5, CSS3, Bootstrap 5.3.x, JavaScript ES6+
Libraries: AOS, Font Awesome 6.x, Google Fonts, SweetAlert2, Lightbox2, Swiper.js, jsPDF
Backend: PHP 8.2+
Tools: VS Code, Git, GitHub, XAMPP (local), Cyberpanel (production)
```

### Brand Colors
```css
Primary Blue:    #0033A0  /* Headers, buttons, accents */
Secondary Blue:  #0055FF  /* Links, hover states */
Light Blue:      #E6F0FF  /* Backgrounds, cards */
WhatsApp Green:  #25D366  /* WhatsApp elements */
Success Green:   #28A745  /* Success states */
Error Red:       #DC3545  /* Error states */
Dark Gray:       #333333  /* Body text */
```

### Typography
```
Headings: Montserrat (600-700 weight)
Body: Open Sans (400 weight)
Base Size: 16px
```

---

## 📁 CONTEXT FILES TO REFERENCE

The following files contain complete project specifications. Load them for full context:

```
.github/prompts/project_description.md  - Full project specification
.github/prompts/product_mvp.md          - 301 requirements organized by phase
.github/prompts/settings.yml            - Project configuration
.github/prompts/coding_style.json       - Coding conventions
.github/prompts/copilot_instructions.md - AI assistant guidelines
.github/prompts/skills.md               - Developer expertise guide
.github/user_requirements.md            - Original client requirements
```

---

## 🎯 OBJECTIVES

### Primary Goal
Implement all requirements for the **CURRENT PHASE** as defined in `product_mvp.md`, following the incremental development approach where each module must be tested to 100% completion before proceeding.

### Success Criteria for Each Phase
- [ ] All phase requirements implemented
- [ ] Code follows `coding_style.json` conventions
- [ ] Brand guidelines strictly followed
- [ ] Mobile-first responsive design
- [ ] All global components present (scroll indicator, scroll-to-top, WhatsApp button, developer credits)
- [ ] Zero console errors
- [ ] Forms have honeypot and validation (if applicable)
- [ ] Documentation updated in `docs/{page_name}/`
- [ ] Test results recorded in `tests/{page_name}/`

---

## 📜 INSTRUCTIONS

### How to Develop

1. **Start with the current requirement** from the CURRENT PHASE
2. **Read the full requirement** from `product_mvp.md`
3. **Implement the requirement** completely
4. **Test the implementation** thoroughly
5. **Document completion** before moving to next requirement
6. **Update LAST_COMPLETED and NEXT_REQUIREMENT** in this prompt

### Code Quality Standards

```yaml
HTML:
  - Use semantic HTML5 elements
  - Include all required meta tags
  - Add accessibility attributes (ARIA, alt text)
  - Follow proper indentation (2 spaces)

CSS:
  - Use CSS custom properties for colors
  - Follow mobile-first approach
  - Group properties logically
  - Add section comments

JavaScript:
  - Use ES6+ syntax
  - Include 'use strict'
  - Add JSDoc comments for functions
  - Handle errors gracefully

PHP:
  - Use strict types
  - Sanitize all inputs
  - Log errors to file
  - Return JSON responses
```

### File Organization
```
rushsubaru.com/
├── index.html, services.html, catalog.html, about.html, contact.html, sell.html
├── assets/
│   ├── css/ (variables.css, style.css, components.css, responsive.css, animations.css)
│   ├── js/ (main.js, navigation.js, forms.js, catalog.js, whatsapp.js, pdf-generator.js)
│   └── images/ (logo/, hero/, services/, catalog/, gallery/)
├── data/catalog.json
├── api/v1/ (contact.php, vehicle.php, config.php)
├── php/ (handlers, templates, logs/)
├── docs/{page_name}/
└── tests/{page_name}/
```

---

## ✅ DO's

1. **DO** reference `product_mvp.md` for exact requirement specifications
2. **DO** use CSS custom properties for all colors
3. **DO** test at mobile (320px) first, then tablet and desktop
4. **DO** include honeypot fields on ALL forms
5. **DO** add "Developed with ❤️ by bguvava" in footer
6. **DO** use WhatsApp number +263776381498 for all integrations
7. **DO** send emails to sales@rushsubaru.com
8. **DO** implement scroll progress indicator on every page
9. **DO** add scroll-to-top button (bottom-right) on every page
10. **DO** add floating WhatsApp button (bottom-left) on every page
11. **DO** use AOS for scroll animations (800ms, ease-out-cubic, once)
12. **DO** validate forms on client AND server side
13. **DO** use SweetAlert2 for form feedback
14. **DO** optimize images (WebP, lazy loading)
15. **DO** write meaningful commit messages

---

## ❌ DON'Ts

1. **DON'T** use colors outside the brand palette
2. **DON'T** skip mobile responsive testing
3. **DON'T** forget global components on any page
4. **DON'T** leave console errors
5. **DON'T** use inline styles (use CSS classes)
6. **DON'T** hardcode values that should be variables
7. **DON'T** skip form validation
8. **DON'T** forget accessibility (alt text, ARIA labels)
9. **DON'T** use deprecated JavaScript (var, callbacks without error handling)
10. **DON'T** commit without testing
11. **DON'T** proceed to next phase until current phase is 100% complete
12. **DON'T** skip documentation
13. **DON'T** ignore security measures
14. **DON'T** use CDN libraries that could be blocked
15. **DON'T** forget the developer credits

---

## 🔍 PHASE REQUIREMENTS QUICK REFERENCE

### Phase 1: Environment Setup (25 requirements)
```
ENV-001 to ENV-006:  VS Code setup and extensions
ENV-007 to ENV-010:  Git repository and branching
ENV-011 to ENV-013:  XAMPP configuration
ENV-014 to ENV-018:  Folder structure creation
ENV-019 to ENV-024:  CDN library integration
ENV-025:             Base HTML template
```

### Phase 2: Core Infrastructure (28 requirements)
```
CORE-001 to CORE-004:  CSS architecture and variables
CORE-005 to CORE-007:  Responsive breakpoints
CORE-008 to CORE-011:  Animation CSS and AOS
CORE-012 to CORE-015:  Global navigation
CORE-016 to CORE-020:  Global footer
CORE-021 to CORE-023:  Scroll indicators
CORE-024 to CORE-025:  WhatsApp button
CORE-026 to CORE-028:  Main JavaScript
```

### Phase 3: Homepage (35 requirements)
```
HOME-001 to HOME-006:  Hero section
HOME-007 to HOME-010:  Value proposition
HOME-011 to HOME-014:  Services overview
HOME-015 to HOME-018:  Featured inventory
HOME-019 to HOME-021:  Testimonials
HOME-022 to HOME-026:  Quick contact form
HOME-027 to HOME-029:  Location preview
HOME-030 to HOME-035:  CTA, performance, responsiveness
```

### Phase 4: Services Page (32 requirements)
```
SVC-001 to SVC-003:   Tab navigation and deep linking
SVC-004 to SVC-009:   Engine Sales tab
SVC-010 to SVC-013:   Parts Department tab
SVC-014 to SVC-017:   Car Breaking tab
SVC-018 to SVC-020:   Vehicle Trading tab
SVC-021 to SVC-023:   Specialist Garage tab
SVC-024 to SVC-027:   Diagnostics tab
SVC-028 to SVC-032:   Mobile accordion, animations, CTAs
```

### Phase 5: Catalog Page (33 requirements)
```
CAT-001 to CAT-004:   Search functionality
CAT-005 to CAT-008:   Category tabs
CAT-009 to CAT-016:   Filter sidebar
CAT-017 to CAT-018:   View toggle
CAT-019 to CAT-024:   Product cards
CAT-025 to CAT-027:   Pagination
CAT-028 to CAT-033:   Data structure, empty states, responsive
```

### Phase 6: About & Contact (40 requirements)
```
ABT-001 to ABT-015:   About page sections
CON-001 to CON-007:   Contact info and map
CON-008 to CON-016:   Contact form
CON-017 to CON-025:   WhatsApp, social, validation
```

### Phase 7: Sell Your Subaru & API (48 requirements)
```
SELL-001 to SELL-014: Sell page form fields
SELL-015 to SELL-021: Photo upload
SELL-022 to SELL-030: Validation and submission
API-001 to API-010:   PHP handlers
API-011 to API-018:   API structure and security
```

### Phase 8: Testing & Deployment (60 requirements)
```
TEST-001 to TEST-035: All testing types
DOC-001 to DOC-007:   Documentation
DEPLOY-001 to DEPLOY-018: Deployment steps
```

---

## 🛠️ DEVELOPMENT COMMANDS

### Start Development Session
```powershell
# Navigate to project
cd C:\xampp\htdocs\rushsubaru.com

# Open in VS Code
code .

# Start XAMPP Apache (if not running)
# Access at: http://localhost/rushsubaru.com or http://rushsubaru.local
```

### Git Commands
```powershell
# Check status
git status

# Stage changes
git add .

# Commit with message
git commit -m "feat(phase): implement REQUIREMENT_ID - description"

# Push to remote
git push origin develop
```

### Create Branch for Feature
```powershell
git checkout -b feature/ENV-001-vscode-setup
```

---

## 📊 PROGRESS TRACKING

Track your progress by updating this section after completing requirements:

```yaml
Phase 1 - Environment Setup:
  Total: 25
  Completed: 0
  Remaining: 25
  Progress: 0%

Phase 2 - Core Infrastructure:
  Total: 28
  Completed: 0
  Remaining: 28
  Progress: 0%

Phase 3 - Homepage:
  Total: 35
  Completed: 0
  Remaining: 35
  Progress: 0%

Phase 4 - Services Page:
  Total: 32
  Completed: 0
  Remaining: 32
  Progress: 0%

Phase 5 - Catalog Page:
  Total: 33
  Completed: 0
  Remaining: 33
  Progress: 0%

Phase 6 - About & Contact:
  Total: 40
  Completed: 0
  Remaining: 40
  Progress: 0%

Phase 7 - Sell & API:
  Total: 48
  Completed: 0
  Remaining: 48
  Progress: 0%

Phase 8 - Testing & Deployment:
  Total: 60
  Completed: 0
  Remaining: 60
  Progress: 0%

OVERALL:
  Total Requirements: 301
  Completed: 0
  Progress: 0%
```

---

## 🚨 IMPORTANT REMINDERS

### Global Components Checklist (Every Page)
- [ ] Scroll progress indicator (top, 3px, Primary Blue)
- [ ] Scroll-to-top button (bottom-right, 20px offset)
- [ ] WhatsApp float button (bottom-left, 20px offset, pulse animation)
- [ ] Developer credits in footer ("Developed with ❤️ by bguvava")
- [ ] Dynamic copyright year

### Form Security Checklist (All Forms)
- [ ] Honeypot field (hidden, name="website")
- [ ] Client-side validation
- [ ] Server-side validation
- [ ] SweetAlert2 feedback
- [ ] Loading state on submit
- [ ] Form reset on success

### Pre-Commit Checklist
- [ ] Code follows coding standards
- [ ] No console errors
- [ ] Tested on mobile (320px)
- [ ] Tested on tablet (768px)
- [ ] Tested on desktop (1024px+)
- [ ] All links working
- [ ] Images optimized
- [ ] Accessibility checked

---

## 💬 HOW TO USE THIS PROMPT

1. **Copy this entire prompt** at the start of a new chat session
2. **Update the CURRENT PHASE CONFIGURATION** section to match your progress
3. **Ask the AI** to help with specific requirements, e.g.:
   - "Implement ENV-001 - VS Code Installation verification"
   - "Create the base HTML template for ENV-025"
   - "Build the navigation component for CORE-012"
4. **Follow the DO's and DON'Ts** strictly
5. **Update progress tracking** as you complete requirements
6. **Move to next phase** only when current phase is 100% complete

---

## 📞 SUPPORT INFORMATION

### Project Contacts
- **Client WhatsApp:** +263 77 638 1498
- **Client Email:** sales@rushsubaru.com
- **Developer:** bguvava (bguvava.com)

### Reference URLs
- **Production:** www.rushsubaru.com
- **Local Dev:** http://localhost/rushsubaru.com or http://rushsubaru.local

---

**🎯 CURRENT TASK:**

Based on the CURRENT PHASE CONFIGURATION above, please help me implement requirement **[NEXT_REQUIREMENT]**. 

Refer to `product_mvp.md` for the full requirement specification and ensure the implementation follows all coding standards, brand guidelines, and includes proper testing verification.

---

*This master prompt ensures consistent, high-quality development throughout all 8 phases of the Zaza Rush Subaru website project.*
