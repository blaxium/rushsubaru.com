# Zaza Rush Subaru - Project Description

> **Document Version:** 1.0  
> **Last Updated:** January 30, 2026  
> **Project Domain:** www.rushsubaru.com  
> **Developed by:** bguvava (bguvava.com)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Objectives & Goals](#2-project-objectives--goals)
3. [Technology Stack](#3-technology-stack)
4. [User Roles & Access Levels](#4-user-roles--access-levels)
5. [System Architecture & Workflow](#5-system-architecture--workflow)
6. [Site Map & Page Structure](#6-site-map--page-structure)
7. [Core Features & Functionalities](#7-core-features--functionalities)
8. [Design Guidelines](#8-design-guidelines)
9. [Integration Requirements](#9-integration-requirements)
10. [Deployment & Hosting](#10-deployment--hosting)

---

## 1. Project Overview

### 1.1 Company Profile

**Company Name:** Zaza Rush Subaru  
**Slogan:** "The Heart of Every Subaru."  
**Location:** Number 9 Sherwood Crescent, Waterfalls, Zindoga Shops, Harare, Zimbabwe

**Contact Information:**
- **Primary Email:** sales@rushsubaru.com
- **Secondary Emails:** zaza.rushsubaru@gmail.com, info@rushsubaru.com
- **Phone/WhatsApp:** +263 77 638 1498
- **Website:** www.rushsubaru.com

### 1.2 Business Description

Zaza Rush Subaru is a dedicated Subaru specialist providing comprehensive automotive services to Subaru owners, enthusiasts, and racers. The business operates as a one-stop hub offering:

- **Engine Sales** - New and low-mileage used Subaru engines (EJ & FA series)
- **Parts Department** - Genuine, OEM, and quality aftermarket spare parts
- **Car Breaking** - Full vehicle dismantling for parts recovery
- **Vehicle Trading** - Buying and selling runner/non-runner Subaru vehicles
- **Specialist Garage** - Diagnostic, maintenance, repair, and performance tuning

### 1.3 Project Summary

This project involves developing a world-class, fast, and professional business website for Zaza Rush Subaru. The website will serve as the primary digital storefront and lead generation platform, enabling customers to browse inventory, request quotes, book services, and sell their vehicles.

**Localization:** Zimbabwe (English language, USD$ currency only)

---

## 2. Project Objectives & Goals

### 2.1 Primary Objectives

| # | Objective | Success Metric |
|---|-----------|----------------|
| 1 | Establish strong online presence | Live website on www.rushsubaru.com |
| 2 | Generate quality leads | Minimum 50 inquiries/month via forms |
| 3 | Showcase inventory & services | Complete parts catalog with inquiry system |
| 4 | Build brand credibility | Professional design matching brand identity |
| 5 | Enable customer self-service | Online quote requests & service bookings |

### 2.2 Business Goals

1. **Lead Generation** - Capture customer inquiries for parts, services, and vehicle sales through strategic contact forms and WhatsApp integration
2. **Brand Authority** - Position Zaza Rush Subaru as THE Subaru specialist in Zimbabwe and beyond
3. **Inventory Visibility** - Display available engines, parts, and vehicles with easy inquiry mechanism
4. **Customer Engagement** - Provide valuable information and resources to Subaru enthusiasts
5. **Operational Efficiency** - Streamline customer communication through centralized contact management

### 2.3 Technical Goals

1. **Performance** - Page load time under 3 seconds on 3G networks
2. **Responsiveness** - Flawless display on all devices (mobile-first approach)
3. **SEO Optimization** - Rank for "Subaru specialist Zimbabwe" and related keywords
4. **Maintainability** - Easy content updates without developer intervention
5. **Security** - Protection against spam and malicious submissions

---

## 3. Technology Stack

### 3.1 Frontend Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| HTML5 | Semantic structure | Latest |
| CSS3 | Styling & animations | Latest |
| Bootstrap 5 | Responsive framework | 5.3.x |
| JavaScript (ES6+) | Interactivity & logic | ES2020+ |
| AOS (Animate On Scroll) | Scroll animations | 2.3.x |
| Font Awesome | Icon library | 6.x |
| Google Fonts | Typography | Latest |
| Pure.css | Lightweight utilities | 3.x |

### 3.2 Additional Libraries

| Library | Purpose |
|---------|---------|
| SweetAlert2 | Beautiful modals & alerts |
| Lightbox2 | Image gallery viewing |
| Swiper.js | Touch-enabled sliders |
| jsPDF | PDF generation |

### 3.3 Development Tools

| Tool | Purpose |
|------|---------|
| Git | Version control |
| GitHub | Repository hosting |
| VS Code | Development IDE |
| XAMPP | Local development server |

---

## 4. User Roles & Access Levels

### 4.1 Role Definitions

This is a **public-facing business website** with minimal role complexity. The system defines two primary user types:

| Role | Description | Access Level |
|------|-------------|--------------|
| **Visitor** | General public browsing the website | Public pages, forms, catalog |
| **Administrator** | Business owner/staff managing content | Full backend access (via Cyberpanel) |

### 4.2 Role Capabilities

#### 4.2.1 Visitor (Public User)

**Description:** Any person accessing the website without authentication.

**Capabilities:**
- Browse all public pages
- View parts catalog and inventory
- Submit contact/inquiry forms
- Request quotes via WhatsApp
- Submit "Sell My Subaru" form with photo uploads
- Book service appointments
- View company information and location

**Restrictions:**
- Cannot access backend/admin areas
- Cannot modify website content
- Cannot view other users' submissions

#### 4.2.2 Administrator

**Description:** Authorized personnel managing website content and leads.

**Capabilities:**
- Receive and respond to form submissions via email (sales@rushsubaru.com)
- Update website content (via direct file editing)
- Manage inventory listings (manual HTML/JSON updates)
- Access Cyberpanel hosting controls
- View website analytics
- Manage domain and email settings

**Access Method:**
- Cyberpanel login (hosting control panel)
- FTP/File Manager for content updates
- Email client for lead management

---

## 5. System Architecture & Workflow

### 5.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Desktop   │  │   Tablet    │  │   Mobile    │              │
│  │   Browser   │  │   Browser   │  │   Browser   │              │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │
└─────────┼────────────────┼────────────────┼─────────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                           │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              Static Website (HTML/CSS/JS)                  │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │ │
│  │  │ Homepage │ │ Services │ │ Catalog  │ │ Contact  │      │ │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     INTEGRATION LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   WhatsApp   │  │    Email     │  │   Google     │          │
│  │     API      │  │   (SMTP)     │  │    Maps      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
          │                │                
          ▼                ▼                
┌─────────────────────────────────────────────────────────────────┐
│                     COMMUNICATION ENDPOINTS                      │
│  ┌────────────────────────┐  ┌────────────────────────────────┐ │
│  │  +263 77 638 1498      │  │  sales@rushsubaru.com          │ │
│  │  (WhatsApp Business)   │  │  (Lead Management Email)       │ │
│  └────────────────────────┘  └────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Data Flow Diagrams

#### 5.2.1 Parts Inquiry Workflow

```
┌──────────┐    ┌──────────────┐    ┌───────────────┐    ┌──────────────┐
│ Visitor  │───▶│ Browse Parts │───▶│ Click Inquiry │───▶│ Choose Method│
└──────────┘    │   Catalog    │    │    Button     │    └──────┬───────┘
                └──────────────┘    └───────────────┘           │
                                                                 │
                    ┌────────────────────────────────────────────┼────┐
                    │                                            │    │
                    ▼                                            ▼    │
            ┌───────────────┐                          ┌─────────────┐│
            │ WhatsApp Chat │                          │ Contact Form││
            │ (Pre-filled)  │                          │ Submission  ││
            └───────┬───────┘                          └──────┬──────┘│
                    │                                         │       │
                    ▼                                         ▼       │
            ┌───────────────┐                          ┌─────────────┐│
            │ +263776381498 │                          │ Email Sent  ││
            │ Receives Msg  │                          │ to Sales@   ││
            └───────────────┘                          └─────────────┘│
                    │                                         │       │
                    └─────────────────┬───────────────────────┘       │
                                      ▼                               │
                              ┌───────────────┐                       │
                              │ Admin Reviews │                       │
                              │  & Responds   │◀──────────────────────┘
                              └───────────────┘
```

#### 5.2.2 Sell My Subaru Workflow

```
┌──────────┐    ┌──────────────┐    ┌───────────────┐    ┌──────────────┐
│ Visitor  │───▶│ Navigate to  │───▶│  Fill Form    │───▶│ Upload Photos│
└──────────┘    │ Sell My Car  │    │  (Vehicle     │    │ (Max 5 imgs) │
                └──────────────┘    │   Details)    │    └──────┬───────┘
                                    └───────────────┘           │
                                                                 ▼
                                                    ┌────────────────────┐
                                                    │  Honeypot Check    │
                                                    │  (Spam Filter)     │
                                                    └─────────┬──────────┘
                                                              │
                              ┌────────────────┬──────────────┴───────────┐
                              │                │                          │
                              ▼                ▼                          ▼
                        ┌──────────┐    ┌──────────────┐         ┌───────────┐
                        │  SPAM    │    │  Valid Lead  │         │ Email to  │
                        │ Rejected │    │  Processed   │         │ sales@    │
                        └──────────┘    └──────────────┘         └───────────┘
                                               │
                                               ▼
                                    ┌──────────────────┐
                                    │ Admin Evaluates  │
                                    │ & Contacts Owner │
                                    └──────────────────┘
```

#### 5.2.3 Service Booking Workflow

```
┌──────────┐    ┌──────────────┐    ┌───────────────┐
│ Visitor  │───▶│ View Service │───▶│ Click "Book   │
└──────────┘    │   Options    │    │  Service"     │
                └──────────────┘    └───────┬───────┘
                                            │
                                            ▼
                                ┌───────────────────────┐
                                │  Service Booking Form │
                                │  ┌─────────────────┐  │
                                │  │ - Name          │  │
                                │  │ - Contact       │  │
                                │  │ - Vehicle Info  │  │
                                │  │ - Service Type  │  │
                                │  │ - Preferred Date│  │
                                │  │ - Description   │  │
                                │  └─────────────────┘  │
                                └───────────┬───────────┘
                                            │
                                            ▼
                                ┌───────────────────────┐
                                │   Email Notification  │
                                │   to sales@           │
                                └───────────┬───────────┘
                                            │
                                            ▼
                                ┌───────────────────────┐
                                │  Admin Confirms &     │
                                │  Schedules Appointment│
                                └───────────────────────┘
```

### 5.3 Form Submission Security

All contact forms implement the following security measures:

1. **Honeypot Field** - Hidden field that bots fill but humans don't see
2. **Time-based Validation** - Reject submissions faster than 3 seconds (bot behavior)
3. **Required Field Validation** - Client and server-side validation
4. **Email Format Validation** - Proper email regex checking
5. **Rate Limiting** - Prevent form spam flooding

---

## 6. Site Map & Page Structure

### 6.1 Visual Site Map

```
                            ┌─────────────────┐
                            │    HOMEPAGE     │
                            │   (index.html)  │
                            └────────┬────────┘
                                     │
        ┌────────────┬───────────────┼───────────────┬────────────┐
        │            │               │               │            │
        ▼            ▼               ▼               ▼            ▼
┌───────────┐ ┌───────────┐ ┌───────────────┐ ┌───────────┐ ┌───────────┐
│  SERVICES │ │  CATALOG  │ │    ABOUT US   │ │  CONTACT  │ │   SELL    │
│           │ │           │ │               │ │           │ │ YOUR CAR  │
└─────┬─────┘ └─────┬─────┘ └───────────────┘ └───────────┘ └───────────┘
      │             │
      │             ├──── Engines Tab
      │             ├──── Parts Tab
      │             ├──── Vehicles Tab
      │             └──── Breaking Parts Tab
      │
      ├──── Engine Sales (Tab/Section)
      ├──── Parts Department (Tab/Section)
      ├──── Car Breaking (Tab/Section)
      ├──── Vehicle Trading (Tab/Section)
      ├──── Specialist Garage (Tab/Section)
      └──── Diagnostics (Tab/Section)
```

### 6.2 Page Inventory

#### Visitor Pages (Public Access)

| # | Page | File | Description |
|---|------|------|-------------|
| 1 | Homepage | `index.html` | Hero, services overview, featured items, quick contact |
| 2 | Services | `services.html` | All services with tabbed navigation |
| 3 | Parts Catalog | `catalog.html` | Searchable/filterable inventory with tabs |
| 4 | About Us | `about.html` | Company profile, mission, vision, team |
| 5 | Contact | `contact.html` | Forms, map, contact info |
| 6 | Sell Your Subaru | `sell.html` | Vehicle submission form with photo upload |

#### Modal Components (Headless)

| # | Modal | Trigger | Purpose |
|---|-------|---------|---------|
| 1 | Quick Inquiry | "Inquire" buttons | Fast parts/service inquiry |
| 2 | Quote Request | "Get Quote" buttons | Detailed quote request |
| 3 | Service Booking | "Book Now" buttons | Schedule appointments |
| 4 | Image Gallery | Catalog images | Full-size image viewing |
| 5 | Success/Error | Form submissions | Submission feedback |

### 6.3 Detailed Page Specifications

#### 6.3.1 Homepage (`index.html`)

**Sections:**
1. **Hero Section** - Full-width banner with tagline, CTA buttons
2. **Value Proposition** - "Why Choose Us" with icon highlights
3. **Services Overview** - 6 service cards with links
4. **Featured Inventory** - Carousel of featured engines/vehicles
5. **Testimonials** - Customer reviews slider
6. **Quick Contact** - Embedded contact form
7. **Location Preview** - Mini map with address

#### 6.3.2 Services (`services.html`)

**Tab Structure:**
- Tab 1: Engine Sales & Swaps
- Tab 2: Parts Department
- Tab 3: Car Breaking
- Tab 4: Vehicle Trading
- Tab 5: Specialist Garage
- Tab 6: Diagnostics & Tuning

Each tab contains: Description, bullet points, pricing indicators, CTA button

#### 6.3.3 Parts Catalog (`catalog.html`)

**Features:**
- Search bar with instant filtering
- Category tabs (Engines | Parts | Vehicles | Breaking)
- Filter sidebar (by model, year, condition, price range)
- Grid/List view toggle
- Product cards with: Image, Title, Price (if listed), Condition, "Inquire" button
- Pagination or infinite scroll

**Product Card Actions:**
- Click image → Lightbox gallery
- Click "Inquire" → WhatsApp with pre-filled message
- Click "Request Quote" → Modal form

#### 6.3.4 About Us (`about.html`)

**Sections:**
1. Company Story
2. Mission Statement
3. Vision Statement
4. Why Subaru? (brand expertise showcase)
5. Certifications/Partnerships

#### 6.3.5 Contact (`contact.html`)

**Components:**
1. **Contact Information** - Address, phone, email, hours
2. **Google Maps Embed** - Interactive location map
3. **Main Contact Form** with dropdown:
   - Get a quote for a part
   - Book a service
   - General inquiry
   - Sell my car (redirects)
   - Other
4. **WhatsApp Quick Connect** - Click-to-chat button
5. **Social Media Links**

#### 6.3.6 Sell Your Subaru (`sell.html`)

**Form Fields:**
- Owner Name*
- Contact Number*
- Email Address*
- Vehicle Make/Model*
- Year*
- Mileage*
- Condition (Runner/Non-Runner)*
- Asking Price (optional)
- Description*
- Photo Upload* (up to 5 images)
- Honeypot field (hidden)

---

## 7. Core Features & Functionalities

### 7.1 Feature Matrix

| Feature | Priority | Description |
|---------|----------|-------------|
| Responsive Design | Critical | Mobile-first, works on all devices |
| WhatsApp Integration | Critical | Click-to-chat with pre-filled messages |
| Contact Forms | Critical | Multiple forms with honeypot protection |
| Parts Catalog | High | Searchable inventory display |
| Image Galleries | High | Light box for product images |
| Scroll Animations | Medium | AOS library for engaging reveals |
| PDF Generation | Medium | Quote/inquiry PDFs with company branding |
| Google Maps | Medium | Embedded location map |
| Tab Navigation | Medium | Reduce pages, improve UX |
| Modal Dialogs | Medium | Non-intrusive forms and alerts |

### 7.2 WhatsApp Integration Specifications

**Target Number:** +263776381498

**Message Templates:**

1. **Parts Inquiry:**
```
Hello Zaza Rush Subaru! 👋

I'm interested in: [PART_NAME]
Category: [CATEGORY]
Reference: [ITEM_ID]

Please provide availability and pricing.

Thank you!
```

2. **Service Booking:**
```
Hello Zaza Rush Subaru! 👋

I'd like to book a service:
Service Type: [SERVICE]
Vehicle: [MAKE_MODEL]
Preferred Date: [DATE]

Please confirm availability.

Thank you!
```

3. **General Inquiry:**
```
Hello Zaza Rush Subaru! 👋

I have a question about: [SUBJECT]

[MESSAGE]

Thank you!
```

### 7.3 Email Specifications

**Recipient:** sales@rushsubaru.com

**Email Structure:**
- **Subject:** [Form Type] - [Customer Name] - Rush Subaru Website
- **From:** noreply@rushsubaru.com (or server default)
- **Body:** Formatted HTML with all form fields
- **Anti-Spam:** Honeypot validation before sending

### 7.4 PDF Generation Specifications

**Layout Structure:**
```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
│  ┌────────┐                                                  │
│  │  LOGO  │  Zaza Rush Subaru                               │
│  └────────┘  "The Heart of Every Subaru"                    │
├─────────────────────────────────────────────────────────────┤
│  DOCUMENT TITLE                                              │
│  [e.g., "Parts Inquiry Quote" / "Service Estimate"]         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  CONTENTS                                                    │
│  [Dynamic content based on document type]                   │
│                                                              │
│                                                              │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                      │
│  Generated by: Zaza Rush Subaru Website                     │
│  Date/Time: [TIMESTAMP]                                      │
│  ─────────────────────────────────────────────────────────  │
│  CONFIDENTIAL: This document is intended for the recipient  │
│  only. Unauthorized distribution is prohibited.             │
│  © 2026 Zaza Rush Subaru. All Rights Reserved.              │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Design Guidelines

### 8.1 Brand Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Primary Blue** | `#0033A0` | Headers, buttons, accents |
| **Secondary Blue** | `#0055FF` | Links, hover states |
| **Light Blue** | `#E6F0FF` | Backgrounds, cards |
| **White** | `#FFFFFF` | Primary background |
| **Dark Gray** | `#333333` | Body text |
| **Light Gray** | `#F5F5F5` | Section backgrounds |
| **Success Green** | `#28A745` | Success messages |
| **Error Red** | `#DC3545` | Error messages |

### 8.2 Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Headings | Montserrat | 700 | 32-48px |
| Subheadings | Montserrat | 600 | 20-28px |
| Body Text | Open Sans | 400 | 16px |
| Buttons | Montserrat | 600 | 14-16px |
| Captions | Open Sans | 400 | 14px |

### 8.3 UI Components

**Buttons:**
- Primary: Blue background, white text, rounded corners
- Secondary: White background, blue border, blue text
- WhatsApp: Green (#25D366) background, white text

**Cards:**
- White background
- Subtle shadow (0 2px 10px rgba(0,0,0,0.1))
- Rounded corners (8px)
- Hover: Slight lift animation

**Forms:**
- Input fields with blue focus border
- Clear labels above fields
- Inline validation messages
- Disabled submit until valid

### 8.4 Animation Guidelines

**AOS Settings:**
- Duration: 800ms
- Easing: ease-in-out
- Once: true (animate only first time)
- Offset: 100px

**Common Animations:**
- Fade-up: Content sections
- Fade-right/left: Alternating feature blocks
- Zoom-in: Cards and images
- Flip-up: Stat counters

---

## 9. Integration Requirements

### 9.1 External Services

| Service | Purpose | Implementation |
|---------|---------|----------------|
| WhatsApp Business | Direct customer chat | wa.me links with URL encoding |
| Google Maps | Location display | Embed API (free tier) |
| Google Fonts | Typography | CDN link |
| Font Awesome | Icons | CDN link |
| Email (SMTP) | Form submissions | Cyberpanel email or PHP mail() |

### 9.2 API Endpoints

**WhatsApp Click-to-Chat:**
```
https://wa.me/263776381498?text=[URL_ENCODED_MESSAGE]
```

**Google Maps Embed:**
```
https://www.google.com/maps/embed?pb=![PLACE_ID]
```

---

## 10. Deployment & Hosting

### 10.1 Hosting Environment

| Specification | Value |
|---------------|-------|
| **Platform** | Cyberpanel Shared Hosting |
| **Domain** | www.rushsubaru.com |
| **SSL** | Required (Let's Encrypt) |
| **PHP** | 8.2+ (for email forms) |
| **Email** | Cyberpanel Email (sales@rushsubaru.com) |

### 10.2 File Structure

```
rushsubaru.com/
├── index.html                 # Homepage
├── services.html              # Services page
├── catalog.html               # Parts catalog
├── about.html                 # About us
├── contact.html               # Contact page
├── sell.html                  # Sell your Subaru
├── assets/
│   ├── css/
│   │   ├── style.css          # Main stylesheet
│   │   ├── responsive.css     # Media queries
│   │   └── animations.css     # Custom animations
│   ├── js/
│   │   ├── main.js            # Core functionality
│   │   ├── catalog.js         # Catalog filtering
│   │   ├── forms.js           # Form handling
│   │   ├── whatsapp.js        # WhatsApp integration
│   │   └── pdf-generator.js   # PDF creation
│   ├── images/
│   │   ├── logo/              # Logo variations
│   │   ├── hero/              # Hero banners
│   │   ├── services/          # Service icons/images
│   │   ├── catalog/           # Product images
│   │   └── gallery/           # General gallery
│   └── fonts/                 # Self-hosted fonts (if any)
├── data/
│   └── catalog.json           # Product data (manually updated)
├── php/
│   ├── contact-handler.php    # Form processing
│   ├── email-template.php     # Email HTML template
│   └── honeypot-check.php     # Spam validation
├── .htaccess                  # Apache configuration
├── robots.txt                 # SEO crawler instructions
├── sitemap.xml                # SEO sitemap
└── .github/
    ├── assets/                # Source assets
    ├── prompts/               # AI prompts
    └── user_requirements.md   # Requirements document
```

### 10.3 Version Control

**Repository:** GitHub
**Branch Strategy:**
- `main` - Production-ready code
- `develop` - Development/staging
- `feature/*` - Feature branches

**Deployment:**
- Push to `main` triggers deployment via FTP/Cyberpanel Git or manual upload

### 10.4 Performance Optimization

| Technique | Implementation |
|-----------|----------------|
| Image Optimization | WebP format, lazy loading, responsive images |
| CSS Minification | Minified production CSS |
| JS Minification | Minified production JS |
| Browser Caching | .htaccess cache headers |
| Gzip Compression | .htaccess compression |
| CDN | Bootstrap, Font Awesome via CDN |
| Critical CSS | Inline above-fold styles |

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| AOS | Animate On Scroll - JavaScript library for scroll animations |
| CTA | Call To Action - Button/link prompting user action |
| EJ/FA Series | Subaru engine family designations |
| Honeypot | Hidden form field to detect bot submissions |
| OEM | Original Equipment Manufacturer |
| UX/UI | User Experience / User Interface |

---

## Appendix B: Contact & Support

**Project Developer:**
- Name: bguvava
- Website: bguvava.com

**Client Contact:**
- Business: Zaza Rush Subaru
- Email: sales@rushsubaru.com
- Phone: +263 77 638 1498

---

*This document serves as the authoritative reference for the Zaza Rush Subaru website development project. All development decisions should align with the specifications outlined herein.*

**Document Status:** APPROVED FOR DEVELOPMENT  
**Next Phase:** Design Mockups & Wireframes
