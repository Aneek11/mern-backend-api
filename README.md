MERN Backend (Node.js + Express + MongoDB)

This is a RESTful API built using Node.js, Express, and MongoDB.  
It includes Authentication, Role-Based Access Control, Product Management with Image Upload, and Orders API.

---

Features

- User Registration & Login (with bcrypt password hashing + JWT authentication)
- Role-Based Access Control (User / Admin)
- Product CRUD with Multer file uploads(images)
- Orders API (Create, View My Orders, Admin Get All Orders, Update Order Status)
- Middleware for authentication, roles, error handling, and validation
- Secure implementation with JWT tokens in cookies & headers

---

Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JW for authentication
- bcryptjs for password hashing
- multer for image upload
- express-validator for validation
- cookie-parser, cors, dotenv

---

Project Structure
mern-backend/
├─ config/
│ └─ db.js
├─ controllers/
│ ├─ authController.js
│ ├─ productController.js
│ └─ orderController.js
├─ middleware/
│ ├─ auth.js
│ ├─ role.js
│ ├─ upload.js
│ └─ errorHandler.js
├─ models/
│ ├─ User.js
│ ├─ Product.js
│ └─ Order.js
├─ routes/
│ ├─ auth.js
│ ├─ users.js
│ ├─ products.js
│ └─ orders.js
├─ uploads/
├─ .env
└─ server.js

yaml

---

Installation & Setup

Clone repository

```bash
git clone https://github.com/Aneek11/mern-backend.git
cd mern-backend
Install dependencies
```

bash

npm install

bash

npm run dev

API Endpoints
Auth
POST /api/auth/register → Register new user

POST /api/auth/login → Login user

Users
GET /api/users/me → Get logged-in user profile

GET /api/users/admin → Admin-only route

Products
GET /api/products → Get all products (public)

POST /api/products → Create product (admin only, with image upload)

Orders
POST /api/orders → Create order (user)

GET /api/orders/my → Get my orders (user)

GET /api/orders → Get all orders (admin only)

PUT /api/orders/:id/status → Update order status (admin only)

Security

Passwords hashed with bcrypt

Tokens with JWT (stored in cookies or headers)

Role-based authorization (user/admin)

Input validation using express-validator

File upload restricted to images only with size limit
