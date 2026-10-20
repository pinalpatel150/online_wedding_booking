# Eternal Knot — Online Wedding Booking Website (Frontend Only)

A luxury, fully responsive, and interactive **Online Wedding Booking Website** built using **HTML5, CSS3, JavaScript, and Bootstrap 5**.

> **Note:** This is a **100% frontend-only project**. No backend, server-side code, SQL queries, ADO.NET, or database connections are required. All validations, calculations, and interactions run client-side in the browser.

---

## 📁 Project Structure

All files reside in a single directory for easy execution and submission:

```text
wedding-booking/
├── index.html        # Elegant Home Page with Hero, Stats, Venues, Services, Testimonials
├── venues.html       # Venues Catalog with details modal and "Book Now" shortcuts
├── services.html     # 7 Wedding Services with detailed cards and pricing
├── booking.html      # Interactive Booking Page with real-time dynamic price calculator
├── gallery.html      # Photo Gallery with filterable categories & image Lightbox
├── about.html        # Company story, mission, core values, reasons to choose & team
├── contact.html      # Contact form with JS validation, FAQ accordion & Google Maps
├── style.css         # Custom styling (Blush pink, cream, white & gold color palette)
├── script.js         # JavaScript logic (validation, dynamic calculator, modals, lightbox)
└── README.md         # Project documentation and run instructions
```

---

## ✨ Features Overview

### 1. Home Page (`index.html`)
- **Luxury Theme:** Soft blush pink (`#fbeae8`), cream ivory (`#fdfaf6`), and metallic gold accents (`#d4af37`).
- **Sticky Navbar:** Smooth transparent-to-solid transition on scroll with active page link highlighting.
- **Hero Section:** Headed by *"Make Your Dream Wedding Come True"* with action buttons: *"Explore Venues"* and *"Book Your Wedding"*.
- **Metrics Bar:** 550+ Happy Couples, 35+ Luxury Venues, 10+ Years of Experience, 100% Satisfaction.
- **Popular Venues & Featured Services:** Interactive preview cards with direct booking links.
- **How It Works:** 4-step process guide for prospective couples.
- **Client Testimonials:** Reviews with star ratings and couple portraits.

### 2. Wedding Venues Page (`venues.html`)
- Displays 6 luxury venue cards:
  1. **Grand Royal Palace** (Udaipur, Rajasthan) — Up to 800 guests, $8,500/day
  2. **Sunset Beach Resort & Spa** (Goa) — Up to 400 guests, $6,500/day
  3. **Emerald Garden Estate** (Bangalore Hills) — Up to 500 guests, $5,200/day
  4. **Heritage Fort & Courtyard** (Jaipur) — Up to 600 guests, $9,500/day
  5. **Crystal Luxury Ballroom** (Mumbai) — Up to 450 guests, $7,000/day
  6. **Rustic Vineyard Haven** (Nashik Valley) — Up to 300 guests, $4,800/day
- Each card includes high-resolution photography, guest capacity, price tag, amenities, and location.
- **View Details:** Opens a Bootstrap modal with detailed venue specs.
- **Book Now:** Automatically transfers the selected venue to `booking.html` via URL parameters.

### 3. Wedding Services Page (`services.html`)
- Features the 7 core wedding services:
  1. **Wedding Decoration & Stage Setup** ($1,500)
  2. **Royal Gourmet Catering** ($2,500)
  3. **Candid Photography & Cinematic Film** ($1,800)
  4. **Bridal Makeup & Styling** ($600)
  5. **Flowers & Fairy Lighting** ($1,200)
  6. **Music, Sound & Live DJ** ($1,000)
  7. **Full Wedding Planning & Coordination** ($2,000)
- Detailed feature bullets and direct *"Add to Booking"* action buttons.

### 4. Wedding Booking Page with Dynamic Calculator (`booking.html`)
- **Interactive Form:**
  - Full Name (required, min 3 chars)
  - Email (regex format validation)
  - Phone (10-digit mobile validation)
  - Wedding Date (past dates disabled using JS `min` attribute)
  - Venue Selection Dropdown
  - Number of Guests input (adds $15/guest catering & seating fee)
  - 7 Service Checkboxes with immediate visual check state
  - Special Requests & Dietary Notes
  - Terms and conditions checkbox
- **Real-Time Sticky Price Estimator:**
  - Instantly recalculates the total as the user changes the venue, guest count, or service checkboxes.
  - Displays an itemized breakdown.
- **Booking Confirmation Modal:**
  - Upon valid form submission, displays an itemized booking invoice receipt with a generated Reference ID (e.g. `EK-582914`), customer details, venue, date, guest count, and estimated total price.
  - Includes a *"Print Receipt"* option.

### 5. Photo Gallery with Lightbox (`gallery.html`)
- Filter categories: **All Photos**, **Venues**, **Decorations**, **Ceremonies**, **Flowers & Lighting**, and **Wedding Stages**.
- Hover effects with gold icon zoom badge.
- **Full Lightbox Modal:** Clicking any photo opens a high-resolution enlarged view with a custom caption.

### 6. About Us Page (`about.html`)
- Company narrative and founding story with 10+ Years experience badge.
- Mission, Vision & Core Values cards.
- 4 Reasons to choose Eternal Knot (Verified Venues, Real-Time Pricing, Dedicated Coordinator, Award-Winning Vendors).
- Team cards for Creative Directors and Lead Planners.

### 7. Contact Us Page (`contact.html`)
- Direct contact cards (Flagship Studio address in Udaipur, Hotline, Email, Working Hours).
- Contact inquiry form with client-side validation.
- Interactive FAQ accordion for booking questions.
- Embedded Google Map view.

---

## 🚀 How to Run the Website

### Method 1: Open Directly in Any Web Browser (No installation needed)
1. Navigate to the folder:
   `C:\Users\HP\.gemini\antigravity\scratch\wedding-booking`
2. Double-click **`index.html`** (or right-click → **Open with** → Google Chrome, Microsoft Edge, or Mozilla Firefox).
3. The website will open immediately with full functionality!

---

### Method 2: Open in Visual Studio Code with Live Server (Recommended for BCA College Presentation)
1. Open **Visual Studio Code**.
2. Click **File** → **Open Folder...** and select:
   `C:\Users\HP\.gemini\antigravity\scratch\wedding-booking`
3. If you don't already have it installed, open the Extensions tab (`Ctrl + Shift + X`), search for **Live Server** (by Ritwick Dey), and click **Install**.
4. In the Explorer pane, right-click **`index.html`** and select **"Open with Live Server"**.
5. Your default browser will launch at `http://127.0.0.1:5500/index.html`.

---

## 🎨 Color Palette Reference

| Color Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary Gold** | `#c59b27` / `#d4af37` | Badges, buttons, dividers, highlights |
| **Gold Gradient** | `linear-gradient(135deg, #d4af37 0%, #b8860b 100%)` | CTA buttons, icons, accents |
| **Blush Pink** | `#fbeae8` / `#fef5f4` | Section backgrounds, soft cards |
| **Cream Ivory** | `#fdfaf6` / `#faf5ee` | Main body background |
| **Luxury Dark** | `#27221e` | Headings and readable typography |
| **Muted Neutral**| `#6b635b` | Secondary text and descriptions |

---

## 🛠️ Technologies Used
- **HTML5:** Semantic document structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, forms, modals).
- **CSS3:** Custom styles, CSS variables, flexbox, CSS grid, hover transitions, and animations.
- **Bootstrap 5.3.3:** Responsive grid system, navbar toggler, cards, form controls, accordions, and modals via CDN.
- **Bootstrap Icons 1.11.3:** Vector icons for venues, services, contact cards, and ratings.
- **Google Fonts:**
  - *Playfair Display* (Editorial serifs for headings)
  - *Montserrat* (Clean, readable sans-serif for body copy)
  - *Alex Brush* (Romantic cursive script accents)
- **Vanilla JavaScript (ES6):**
  - Form validations with regex checks (Email & 10-digit mobile number)
  - Dynamic live price estimator based on venue base price, guest fee multiplier, and checkbox selections
  - Past wedding date disabling
  - Filterable image gallery and Lightbox modal
  - URL query parameter reading for pre-selecting venues and services
  - Venue specifications modal
