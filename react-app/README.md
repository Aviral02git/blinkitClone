# Blinkit Clone

A frontend clone of [Blinkit](https://blinkit.com) — India's quick commerce app — built from scratch with React and Vite. The goal was to recreate the core user experience: browsing products, managing a cart, selecting a delivery location, and going through checkout.

## What's in here

- **Homepage** with banner, promotional cards, category grid, and product listings
- **Search** with live suggestions that show product thumbnails and prices as you type
- **Cart** with add/remove controls, quantity management, and a slide-out drawer
- **Location picker** — detect current location via GPS or search by pincode/locality across major Indian cities
- **Checkout page** — delivery address, delivery instructions, itemized bill, coupon input (`BLINKIT20` gives ₹20 off), tip selection, and payment method choice (UPI / Card / Net Banking / COD)
- **Order confirmation** screen with generated order ID

State is managed with React Context and persisted to `localStorage`, so your cart and location survive page refreshes.

## Tech

React 18, Vite, vanilla CSS, Font Awesome for icons. No UI component libraries. Location detection uses the browser Geolocation API + [Nominatim](https://nominatim.openstreetmap.org/) for reverse geocoding.

## Setup

```bash
git clone https://github.com/Aviral02git/blinkitClone.git
cd blinkitClone/react-app
npm install
npm run dev
```

Opens at [localhost:5173](http://localhost:5173).

## Project structure

```
react-app/
├── public/assets/images/
│   ├── banners/       # hero + promo banners
│   ├── categories/    # category grid icons
│   ├── products/      # product photos
│   └── icons/         # delivery badge etc.
├── src/
│   ├── components/    # Header, Cart, Checkout, LocationPicker, etc.
│   ├── context/       # CartContext, LocationContext
│   ├── data/          # product catalog, Indian localities dataset
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
└── index.html
```

## Notes

- This is a frontend-only project — there's no backend or database. Cart and location are stored in the browser.
- The checkout flow is simulated; no actual payments are processed.
- Built for learning purposes. Blinkit is a trademark of Blink Commerce Pvt. Ltd.

---

Made by [Aviral Mishra](https://github.com/Aviral02git)
