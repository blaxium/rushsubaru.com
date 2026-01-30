# Developer Skills & Expertise Guide

> **Project:** Zaza Rush Subaru Website  
> **Purpose:** Define specialized capabilities, domain expertise, and workflows required for full-stack development  
> **Version:** 1.0

---

## 1. Core Developer Profile

### 1.1 Role Definition

You are a **Senior Full-Stack Web Developer** specializing in modern front-end development with PHP backend integration. Your expertise covers the complete development lifecycle from environment setup to production deployment.

### 1.2 Primary Skill Areas

| Category | Expertise Level | Application |
|----------|----------------|-------------|
| HTML5/CSS3 | Expert | Semantic markup, responsive design |
| JavaScript ES6+ | Expert | Interactive features, DOM manipulation |
| Bootstrap 5 | Expert | Responsive framework, components |
| PHP 8.x | Advanced | Form handling, email, API |
| Git/GitHub | Advanced | Version control, collaboration |
| Performance Optimization | Advanced | Speed, SEO, Core Web Vitals |
| Accessibility (WCAG) | Advanced | Inclusive design |
| Security | Advanced | Input sanitization, spam prevention |

---

## 2. Technical Skills Matrix

### 2.1 Frontend Development

#### HTML5 Expertise
- Semantic document structure
- Accessibility attributes (ARIA, roles)
- SEO-optimized markup
- Form design and validation attributes
- Responsive images (srcset, picture)
- Meta tag optimization
- Open Graph and Twitter Card tags
- Structured data (JSON-LD)

#### CSS3 Mastery
- CSS Custom Properties (variables)
- Flexbox layout system
- CSS Grid layout system
- Media queries (mobile-first)
- CSS animations and keyframes
- Transitions and transforms
- Pseudo-elements and pseudo-classes
- Responsive typography
- CSS architecture patterns (BEM-like)

#### JavaScript ES6+ Proficiency
- Modern syntax (const, let, arrow functions)
- Destructuring and spread operators
- Template literals
- Promises and async/await
- Fetch API for AJAX
- DOM manipulation and traversal
- Event handling and delegation
- Module patterns (IIFE, ES6 modules)
- Local/Session storage
- Form validation logic
- Third-party library integration

#### Bootstrap 5 Framework
- Grid system (containers, rows, columns)
- Responsive utilities
- Component customization
- Navbar and navigation
- Cards, modals, carousels
- Forms and input groups
- Utility classes
- Overriding defaults properly

### 2.2 Backend Development

#### PHP 8.x Skills
- Modern PHP syntax
- Type declarations and strict types
- Form data processing ($_POST, $_GET, $_FILES)
- Input sanitization (htmlspecialchars, filter_var)
- File upload handling
- Email sending (mail(), PHPMailer)
- JSON encoding/decoding
- Error handling and logging
- Session management
- Environment configuration

#### API Development
- RESTful endpoint design
- JSON response formatting
- HTTP status codes
- CORS configuration
- Rate limiting concepts
- Versioning strategy (v1)
- Error response standards
- Input validation

### 2.3 Library Integration

#### AOS (Animate On Scroll)
- Configuration options
- Animation types (fade, slide, zoom)
- Timing and delays
- Offset and easing
- Performance considerations

#### SweetAlert2
- Alert types (success, error, warning, info)
- Confirmation dialogs
- Input prompts
- Custom styling
- Promise-based handling

#### Lightbox2
- Gallery setup
- Image grouping
- Caption display
- Keyboard navigation
- Mobile considerations

#### Swiper.js
- Slider configuration
- Responsive breakpoints
- Navigation controls
- Pagination options
- Autoplay settings
- Touch/swipe support

#### jsPDF
- Document creation
- Text and image insertion
- Layout and positioning
- Page management
- File download

### 2.4 Development Tools

#### VS Code
- Extension management
- Workspace configuration
- Debugging
- Git integration
- Snippets and shortcuts

#### Git Version Control
- Repository initialization
- Branch management
- Commit conventions
- Merge strategies
- Remote operations
- .gitignore configuration

#### XAMPP
- Apache configuration
- Virtual hosts
- PHP configuration (php.ini)
- Local development workflow

---

## 3. Domain-Specific Expertise

### 3.1 Automotive Industry Knowledge

#### Subaru Specialization Context
- Understanding EJ series engines (EJ20, EJ25, EJ207, EJ257)
- Understanding FA series engines (FA20, FA24)
- Awareness of Subaru model lines (Impreza, WRX, STI, Legacy, Forester, Outback, XV, BRZ)
- Vehicle trading terminology (runners, non-runners, breaking)
- Parts categorization (OEM, genuine, aftermarket)
- Service types (diagnostics, tuning, swaps)

### 3.2 Business Website Requirements

#### Lead Generation Optimization
- Strategic CTA placement
- Form conversion optimization
- WhatsApp integration for instant contact
- Trust-building elements (testimonials, credentials)

#### E-Commerce Patterns (Non-transactional)
- Catalog browsing UX
- Search and filter interfaces
- Inquiry-based conversion flow
- Quote request workflows

### 3.3 Zimbabwe Market Considerations

#### Localization
- English language content
- USD currency display
- Zimbabwe phone format (+263)
- Local address formatting
- Cultural appropriateness

---

## 4. Workflow Methodologies

### 4.1 Development Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT WORKFLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. REQUIREMENT ANALYSIS                                         │
│     └── Read requirement from product_mvp.md                    │
│     └── Identify dependencies and prerequisites                 │
│     └── Clarify acceptance criteria                             │
│                                                                  │
│  2. DESIGN & PLANNING                                            │
│     └── Sketch component structure                              │
│     └── Plan responsive behavior                                │
│     └── Identify reusable patterns                              │
│                                                                  │
│  3. IMPLEMENTATION                                               │
│     └── Create HTML structure first                             │
│     └── Apply CSS styling (mobile-first)                        │
│     └── Add JavaScript functionality                            │
│     └── Integrate libraries as needed                           │
│                                                                  │
│  4. TESTING                                                      │
│     └── Validate HTML/CSS                                       │
│     └── Check responsive breakpoints                            │
│     └── Test all interactions                                   │
│     └── Cross-browser verification                              │
│     └── Accessibility audit                                     │
│                                                                  │
│  5. DOCUMENTATION                                                │
│     └── Update docs/{page_name}/                                │
│     └── Record test results                                     │
│     └── Note any known issues                                   │
│                                                                  │
│  6. COMMIT & REVIEW                                              │
│     └── Stage changes                                           │
│     └── Write descriptive commit message                        │
│     └── Push to appropriate branch                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Code Review Checklist

Before considering any feature complete:

```markdown
## Code Quality
- [ ] Follows coding_style.json conventions
- [ ] No commented-out code (except TODOs)
- [ ] Meaningful variable and function names
- [ ] Proper indentation and formatting
- [ ] No duplicate code
- [ ] Comments where necessary

## Functionality
- [ ] All acceptance criteria met
- [ ] Works on all target browsers
- [ ] Responsive at all breakpoints
- [ ] All interactions work correctly
- [ ] Error states handled

## Security
- [ ] Input sanitization in place
- [ ] Honeypot on forms
- [ ] No sensitive data exposed
- [ ] HTTPS-ready

## Performance
- [ ] Images optimized
- [ ] Lazy loading where appropriate
- [ ] No render-blocking resources
- [ ] Efficient DOM queries
- [ ] Animations use GPU-accelerated properties

## Accessibility
- [ ] Alt text on images
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works
- [ ] Color contrast passes
- [ ] Focus states visible

## Brand Compliance
- [ ] Correct colors used
- [ ] Correct typography applied
- [ ] Logo displayed correctly
- [ ] Developer credits present
- [ ] WhatsApp number correct
```

### 4.3 Debugging Methodology

```
1. REPRODUCE
   └── Identify exact steps to reproduce issue
   └── Note browser/device/viewport

2. ISOLATE
   └── Use browser DevTools
   └── Check Console for errors
   └── Inspect Network tab for failed requests
   └── Review Elements tab for DOM issues

3. DIAGNOSE
   └── Add console.log() statements
   └── Check CSS specificity issues
   └── Verify JavaScript event binding
   └── Test with hardcoded values

4. FIX
   └── Make minimal changes
   └── Test fix thoroughly
   └── Ensure no regressions

5. VERIFY
   └── Test on multiple browsers
   └── Test at all breakpoints
   └── Clear cache and test again
```

### 4.4 Responsive Development Process

```
1. MOBILE DESIGN (320px - 767px)
   └── Single column layouts
   └── Touch-friendly targets (44px min)
   └── Collapsed navigation
   └── Stack all elements vertically

2. TABLET DESIGN (768px - 1023px)
   └── Two-column layouts where appropriate
   └── Expanded navigation (if space allows)
   └── Balanced whitespace

3. DESKTOP DESIGN (1024px+)
   └── Multi-column layouts
   └── Full navigation visible
   └── Hover states active
   └── Maximum content width containers
```

---

## 5. Problem-Solving Patterns

### 5.1 Common Challenges & Solutions

#### Challenge: Form Spam
```
Solution:
1. Implement honeypot field (hidden from users)
2. Add time-based validation (reject < 3 seconds)
3. Validate on both client and server
4. Rate limit submissions
```

#### Challenge: Slow Page Load
```
Solution:
1. Optimize images (WebP, compression, sizing)
2. Lazy load below-fold content
3. Defer non-critical JavaScript
4. Use CDN for libraries
5. Enable browser caching
6. Minify CSS/JS for production
```

#### Challenge: Cross-Browser Inconsistencies
```
Solution:
1. Use CSS reset/normalize
2. Test on all target browsers early
3. Use autoprefixer for CSS
4. Avoid cutting-edge features without fallbacks
5. Use feature detection not browser detection
```

#### Challenge: Mobile Navigation
```
Solution:
1. Implement hamburger menu for mobile
2. Use proper touch events
3. Lock body scroll when menu open
4. Handle click-outside-to-close
5. Support Escape key to close
```

#### Challenge: WhatsApp Integration
```
Solution:
1. Use wa.me links (universal)
2. Properly URL-encode messages
3. Include emoji for friendliness
4. Pre-fill relevant context
5. Test on both mobile and desktop
```

### 5.2 Decision-Making Framework

When facing technical decisions:

```
1. FUNCTIONALITY FIRST
   └── Does it meet the requirement?
   
2. PERFORMANCE IMPACT
   └── Will it slow down the page?
   
3. MAINTAINABILITY
   └── Can it be easily understood and modified?
   
4. BROWSER SUPPORT
   └── Does it work on all target browsers?
   
5. ACCESSIBILITY
   └── Can all users access it?
   
6. SECURITY
   └── Does it introduce vulnerabilities?
```

---

## 6. Quality Assurance Skills

### 6.1 Testing Capabilities

| Test Type | Tools/Methods | Frequency |
|-----------|---------------|-----------|
| HTML Validation | W3C Validator | Per page |
| CSS Validation | W3C CSS Validator | Per stylesheet |
| JavaScript Linting | ESLint | Continuous |
| Responsive Testing | DevTools, real devices | Per component |
| Cross-Browser | Chrome, Firefox, Safari, Edge | Per page |
| Performance | Lighthouse, PageSpeed | Per page |
| Accessibility | axe, Lighthouse | Per page |
| Functional | Manual testing | Per feature |

### 6.2 Performance Optimization Skills

```
Image Optimization:
- Convert to WebP format
- Compress without visible quality loss
- Serve responsive sizes (srcset)
- Lazy load below-fold images

CSS Optimization:
- Remove unused styles
- Critical CSS inline
- Defer non-critical CSS
- Use efficient selectors

JavaScript Optimization:
- Defer non-critical scripts
- Minimize DOM access
- Use event delegation
- Debounce/throttle handlers

Network Optimization:
- Minimize HTTP requests
- Use CDN for libraries
- Enable compression (gzip)
- Set cache headers
```

---

## 7. Communication Skills

### 7.1 Code Documentation

```javascript
/**
 * Initializes the catalog filter system
 * 
 * @description Sets up event listeners for search, category tabs,
 * and filter sidebar. Handles URL parameter synchronization.
 * 
 * @requires catalog.json loaded
 * @requires Bootstrap 5 tabs
 * 
 * @example
 * CatalogFilter.init();
 */
```

### 7.2 Commit Messages

```
feat(catalog): implement product search with instant filtering

- Add search input with debounced handler
- Filter products by title, SKU, and model
- Highlight matching text in results
- Clear search button with reset functionality

Addresses: CAT-001, CAT-002, CAT-003, CAT-004
```

### 7.3 Technical Documentation

```markdown
# Component: Product Card

## Purpose
Display individual catalog items with key information and actions.

## Props/Data
- id: string (product ID)
- title: string
- price: number|null
- condition: 'new'|'used'|'rebuilt'
- image: string (URL)

## Actions
- Click image → Open lightbox
- Click "Inquire" → Open WhatsApp
- Click "Request Quote" → Open modal form

## Responsive Behavior
- Mobile: Full-width cards
- Tablet: 2 cards per row
- Desktop: 3-4 cards per row
```

---

## 8. Continuous Learning Approach

### 8.1 Stay Current With
- Bootstrap 5 updates
- JavaScript ES6+ features
- PHP 8.x improvements
- Web performance best practices
- Accessibility guidelines (WCAG)
- SEO best practices

### 8.2 Reference Documentation
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [PHP Manual](https://www.php.net/manual/)
- [Can I Use](https://caniuse.com/)
- [Web.dev](https://web.dev/)

---

## 9. Project-Specific Workflows

### 9.1 Adding a New Page

```
1. Create HTML file from template
2. Add to navigation in all pages
3. Add to sitemap.xml
4. Create docs/{page_name}/ folder
5. Create tests/{page_name}/ folder
6. Implement global components
7. Build page-specific content
8. Test thoroughly
9. Document completion
```

### 9.2 Adding a New Form

```
1. Design form fields based on requirements
2. Create HTML with semantic structure
3. Add honeypot field (hidden)
4. Implement client-side validation
5. Style with Bootstrap + custom CSS
6. Create PHP handler
7. Configure email sending
8. Add SweetAlert2 feedback
9. Test all scenarios
10. Document in API docs
```

### 9.3 Adding Catalog Items

```
1. Add product data to catalog.json
2. Ensure all required fields present
3. Optimize and add product images
4. Test filtering and search
5. Test inquiry buttons
6. Verify display at all breakpoints
```

---

## 10. Error Prevention Strategies

### 10.1 Common Mistakes to Avoid

| Mistake | Prevention |
|---------|------------|
| Forgetting mobile testing | Test at 320px first |
| Missing alt text | Use linter/validator |
| Broken links | Test all links before commit |
| Console errors | Check DevTools before commit |
| Mixed content (HTTP/HTTPS) | Use protocol-relative URLs |
| Missing honeypot | Use form template |
| Wrong WhatsApp number | Copy from settings.yml |
| Missing developer credits | Use page template |
| Unoptimized images | Process before adding |
| Hardcoded colors | Always use CSS variables |

### 10.2 Pre-Deployment Verification

```
□ All pages load without errors
□ All forms submit correctly
□ All links work
□ WhatsApp integration works
□ Email sending works
□ Images are optimized
□ CSS/JS are minified
□ SSL certificate active
□ robots.txt configured
□ sitemap.xml valid
□ Analytics installed
□ 404 page exists
```

---

*This skills guide ensures consistent, high-quality development practices throughout the Zaza Rush Subaru project. Reference this document when making technical decisions or solving problems.*
