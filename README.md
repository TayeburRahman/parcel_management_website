# Parcel Management System

A MERN stack courier and parcel management system for logistics companies.
Users can book parcels, assign delivery agents, track parcels in real-time, and manage delivery statuses.

---

## Live Site

[Website Live URL](http://13.51.233.34:4000)

---

## Test Accounts

- **Admin:** [admin@gmail.com](mailto:admin@gmail.com) / 12345678
- **Agent:** [agent@gmail.com](mailto:agent@gmail.com) / 12345678
- **Customer:** [tayebrayhan101@gmail.com](mailto:tayebrayhan101@gmail.com) / 12345678

---

## Setup Instructions

### Backend

1. Navigate to backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Update `src/app.ts` to allow CORS for frontend URL.
4. Start backend server:

   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to frontend folder:

   ```bash
   cd dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Update backend URL in `redux/fetcher/apiSlice.js`.
4. Update `next.config.js` for images to allow backend IP or localhost.
5. Run frontend:

   ```bash
   npm run dev
   ```

---

## Features

- **Customer:** Register/Login, Book parcel, View booking history, Track parcel on map
- **Delivery Agent:** View assigned parcels, Update parcel status, Optimized delivery route (Google Maps API)
- **Admin:** Dashboard with metrics, Assign agents, View users/bookings, Export reports - Not complete (CSV/PDF)

---

## Notes

- Make sure backend is running before starting frontend.
- All sensitive keys (DB connection, JWT secret) must be added in `.env`.
- The site is hosted on AWS with the live frontend at `http://13.51.233.34:4000`.
