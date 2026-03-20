# 🍲 CookEase

**CookEase** is a modern, health-first culinary platform that simplifies meal customization, equipment rental, and professional chef hiring. It is designed to bridge the gap between delicious food and specific dietary or medical requirements.

---

## 🌟 Key Features

### 🥗 Medical-Based Food Customization
Order meals that aren't just tasty, but safe for your body. Our platform allows filtering and granular customization for conditions such as:
- **Diabetic Friendly**: Low sugar and low glycemic options.
- **Gluten-Free**: Safe preparations for celiac or gluten sensitivity.
- **Vegan & Lactose-Free**: Dairy-free and plant-based alternatives.
- **Health Tweaks**: Add specific instructions like `No Oil`, `Low Salt`, or `High Protein` during checkout.

### 👨‍🍳 Hire a Professional Cook
Host a party or a family dinner without the stress of cooking.
- **Top Chefs**: Book renowned culinary experts like Chef Arjun Mehta or Chef Priya Sharma.
- **Flexible Booking**: Hire by the hour or for a full day.
- **Seamless Contracts**: Instant cost calculation and simplified booking management.

### 🍽️ Utensil Rental
Planning a big event? Rent catering-quality equipment:
- Dinner plates, glasses, and cutlery sets.
- Specialized items like Chafing Dishes and Beverage Dispensers.

---

## 🚀 Getting Started

### 1. Frontend Setup (React/Vite)
```sh
# Install dependencies
npm install

# Start the dev server
npm run dev
```

### 2. Backend Setup (Node/Express)
```sh
cd backend
# Install backend dependencies
npm install

# Run the server (auto-initializes SQLite database)
node server.js
```

---

## 📂 Project Architecture

### Frontend (User Interface)
- **Vite + React**: Fast UI development.
- **Tailwind CSS**: Modern utility-first styling.
- **TanStack Query**: Efficient data fetching and caching.
- **Lucide Icons**: Intuitive iconography.

### Backend (Data & Logic)
- **Express**: Lightweight API server.
- **SQLite**: Simple, local database storage (`database.sqlite`).
- **Data Layers**: Centralized menu, cook, and utensil data in `src/data/menuData.ts`.

---

## 📘 Learning Resources
For a deeper dive into how "CookEase" works, check out our [Minute Details Guide](file:///home/anudeepth/.gemini/antigravity/brain/c013e114-93ae-4384-bda4-a183b63cd2be/PROJECT_DETAILS.md). This document explains the codebase and database schema specifically for beginners.
