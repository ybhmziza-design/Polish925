# POLISH 925 — Jewelry E-Commerce & Care Portal

A modern jewelry e-commerce website and polishing booking system built for **POLISH 925** (Nairobi, Kenya) with an integrated **Admin Dashboard** and **Python Flask/SQLite Backend**.

---

## 🌟 Features

### 🛍️ Client Features:
- **Hero & Showcase**: Discover 925 Sterling Silver, 18K/14K Gold chains, rings, and bangles with high-resolution imagery.
- **Dynamic Shop Filter**: Instant filtering across **All**, **925 Silver**, **Gold**, and **Collections**.
- **Interactive Jewelry Spa & Booking**: Clients choose jewelry type, material, desired treatment (Ultrasonic Cleaning, High-Gloss Polishing, Inspection), pickup date & time, contact info, and view estimated costs.
- **Cart & Wishlist with Kenya Currency (KSh)**: Real-time notification toasts and mobile-friendly bottom bar.

### ⚙️ Admin Dashboard & Control Center:
- **Change Prices & Discounts**: Edit regular prices and crossed-out old prices anytime.
- **Upload Photos & Links**: Upload local image files directly or paste web links.
- **Add & Delete Products**: Create new items with specs, custom badges (e.g., *Best Seller*, *-20%*, *New*), and rating stars.
- **Manage Service Bookings**: Real-time log of customer cleaning and polishing requests with status toggles (`pending` -> `in_progress` -> `completed`).

---

## 🚀 How to Run

### Method 1: Start the Backend Server (Recommended)
This runs the Python Flask API + SQLite database and serves the website with full backend support:

```bash
./start_server.sh
```
or:
```bash
python3 backend/app.py
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser.

### Method 2: Open Directly (Offline / Standalone)
You can double-click **`index.html`** or open it directly in Chrome / Firefox:
- Works with in-memory state and graceful fallback even without the backend running.

---

## 🗄️ Backend API Endpoints

- `GET /api/products` — List all products
- `POST /api/products` — Add a new product (supports multipart file uploads)
- `POST /api/products/<id>` — Update product details, prices, or photos
- `DELETE /api/products/<id>` — Remove a product
- `GET /api/bookings` — View submitted jewelry polishing requests
- `POST /api/bookings` — Submit a new booking request
- `POST /api/bookings/<id>/status` — Update booking status
