
<p align="center">
    ## ** 🛍️ E-Commerce API**
 </p>
<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express](https://img.shields.io/badge/Express-5.1.0-lightgrey.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen.svg)

**A RESTful API for e-commerce applications built with Node.js, Express, and MongoDB**

</div>

---

## 📋 About

A backend API for e-commerce platforms featuring product management, shopping cart, order processing, and image upload capabilities using Cloudinary.

## ✨ Features

- 🔐 Session-based authentication with bcrypt
- 📦 Product management with image upload
- 🛒 Shopping cart functionality
- 💳 Order management system
- 🖼️ Cloudinary integration for images
- ✅ Input validation

---

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB** - Database
- **Mongoose 8.18.1** - ODM
- **Cloudinary** - Image hosting
- **Multer** - File upload handling
- **bcrypt** - Password hashing
- **express-session** - Session management
- **express-validator** - Input validation

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/javaadde/ecommerce_api.git
   cd ecommerce_api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/ecommerce_db
   SESSION_SECRET=your-session-secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run the application**
   ```bash
   node app.js
   ```

The API will be running at `http://localhost:3000`

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/password` - Change password

---

## 🔍 Example Usage

**Register User**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

**Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Get Products**
```bash
curl -X GET http://localhost:3000/api/products
```

**Add to Cart**
```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "productId": "64abc123def456789",
    "quantity": 2
  }'
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📝 License

This project is licensed under the ISC License.

---

## 👤 Author

**javaadde** - [GitHub](https://github.com/javaadde)

---

<div align="center">

⭐ Star this repo if you find it helpful!

</div>