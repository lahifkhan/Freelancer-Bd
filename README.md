# BookNest

**BookNest** is a full-stack MERN-based online book management and ordering platform with role-based access control.  
It includes advanced search & filtering, real-time analytics dashboards, and secure online payments.

---

## Project Purpose

The purpose of BookNest is to build a real-world, scalable online book platform where:

- Users can search, filter, purchase, review, and wishlist books
- Librarians can manage books and process orders
- Admins can manage users and roles
- Analytics dashboards visualize real data using charts
- Payments are handled securely using Stripe

---

## Live Website

🔗 **Live URL:**  
👉 https://book-nest-orpin-theta.vercel.app/

---

## User Roles & Features

### User Features

- Secure authentication using Firebase
- Browse all books with **search & filtering**
  - Search by book name
  - Filter by category / availability
- Add and remove books from wishlist
- Place orders and make secure payments using **Stripe**
- Cancel orders (before delivery)
- View order history and real-time order status
- Submit book reviews and ratings after purchase
- Fully responsive UI

---

### Librarian Features

- Librarian-only dashboard
- Add new books with image upload
- Update book details and availability
- View all orders placed by users
- Update order status:
  - `Pending`
  - `Shipped`
  - `Delivered`
- Manage latest added books

---

### Admin Features

- Admin-only dashboard
- View all registered users
- Change user roles:
  - User
  - Librarian
  - Admin
- Platform access and role management

---

## Dashboard Analytics (Recharts)

- Interactive analytics dashboard using **Recharts**
- Real backend data visualization
- Includes:

  - Published vs Unpublished books
  - Order statistics

- Combination of **Bar Chart & Other Chart types**
- Helps admins and librarians track platform performance

---

## Search & Filtering System

- Implemented in **All Books** section
- Real-time search functionality
- Filter books by:
  - Category
  - Availability
- Optimized for better user experience and performance

---

## Payment System

- Integrated **Stripe Payment Gateway**
- Secure checkout process
- Payment verification before order confirmation
- Order cancellation logic based on delivery status

---

##Tech Stack

### Frontend

- React
- React Router DOM
- Tailwind CSS
- DaisyUI
- Axios
- React Hook Form
- SweetAlert2
- **Recharts**

### Backend

- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK
- JWT (JSON Web Token)
- Stripe

### Deployment

- Client: Vercel
- Server: Vercel
- Database: MongoDB Atlas

---

## NPM Packages Used

### Frontend

- `react`
- `react-router-dom`
- `axios`
- `react-hook-form`
- `sweetalert2`
- `tailwindcss`
- `daisyui`
- `recharts`

### Backend

- `express`
- `cors`
- `mongodb`
- `jsonwebtoken`
- `dotenv`
- `firebase-admin`
- `stripe`

---

## Environment Variables

### Client (.env)

```env
VITE_api_url=your_api_url
VITE_image_host=your_imgbb_api_key
VITE_firebase_apiKey=your_firebase_key
```
