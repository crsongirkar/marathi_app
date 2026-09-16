# Marathi Learning API Backend (Node.js & MySQL)

A Node.js and Express REST API backend for the **Marathi Learning** application built with **MySQL** (`mysql2`). Features mobile-number-based Login & Auto-Signup authentication alongside protected user profile management endpoints.

---

## 🚀 Features

- **Mobile Login / Auto-Signup**: Login with mobile number. If the mobile number does not exist in the MySQL database, a new account is automatically created.
- **MySQL Prepared Queries**: Uses `mysql2/promise` connection pooling with 100% SQL parameterized queries (`?`) for SQL injection protection.
- **JWT Authentication**: Generates secure JSON Web Tokens for user session management.
- **Profile Management**: Retrieve and update user profile details (Name, Email, Age, Gender, Preferred Language, Profile Image).
- **Auto Table Creation & Fallback**: Automatically creates the `users` table upon connection and handles local testing seamlessly.
- **Complete Test Suite**: Automated verification script included (`node test-api.js`).

---

## 📁 Project Structure

```
Marathi_learning/
├── server.js               # Express application entry point
├── schema.sql              # MySQL Database table creation script
├── package.json            # Dependencies (mysql2, express, jsonwebtoken, etc.)
├── test-api.js             # Automated API test suite
├── .env                    # Environment variables configuration (MySQL settings)
├── .env.example            # Environment variables template
└── src/
    ├── config/
    │   └── db.js           # MySQL connection pool & table initializer
    ├── controllers/
    │   └── authController.js# Handlers for Mobile Auth & Profile APIs
    ├── middleware/
    │   └── authMiddleware.js# JWT Bearer token authentication middleware
    ├── models/
    │   └── User.js         # User model field specifications
    ├── routes/
    │   └── authRoutes.js   # Express API routes definition
    └── services/
        └── userService.js  # MySQL Service layer (SQL Prepared Queries)
```

---

## 🛠️ Installation & Setup

1. **Navigate into the project directory**:
   ```bash
   cd Marathi_learning
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure MySQL Credentials**:
   Update `.env` with your MySQL credentials:
   ```env
   PORT=5000
   MYSQL_HOST=127.0.0.1
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_PASSWORD=your_password
   MYSQL_DATABASE=marathi_learning
   JWT_SECRET=marathi_learning_super_secret_jwt_key_2026
   JWT_EXPIRES_IN=30d
   ```

4. **Import Database Schema (Optional - Auto created)**:
   You can run [`schema.sql`](file:///Users/chinmay/Desktop/rto_marathi_learning/Marathi_learning/schema.sql) in phpMyAdmin or MySQL CLI:
   ```bash
   mysql -u root -p < schema.sql
   ```

5. **Start the API Server**:
   ```bash
   npm start
   # or with live-reload
   npm run dev
   ```

6. **Run Automated Test Suite**:
   ```bash
   npm test
   ```

---

## 📡 API Documentation & Endpoints

### 1. Mobile Login / Signup
- **Endpoint**: `POST /api/auth/mobile-auth`
- **Access**: Public
- **Description**: Authenticates user by mobile number. If user does not exist in MySQL DB, creates a new account automatically.
- **Request Body**:
  ```json
  {
    "mobileNumber": "9876543210"
  }
  ```
- **Response (201 Created - New Account)**:
  ```json
  {
    "success": true,
    "message": "Account created successfully",
    "isNewUser": true,
    "token": "eyJhbGciOiJIUzI1Ni...",
    "user": {
      "id": "1",
      "mobileNumber": "9876543210",
      "name": "Learner",
      "email": "",
      "age": null,
      "gender": "Not Specified",
      "preferredLanguage": "Marathi",
      "isProfileComplete": false
    }
  }
  ```

---

### 2. Get Profile
- **Endpoint**: `GET /api/auth/profile`
- **Access**: Private (Requires Bearer Token)
- **Headers**:
  ```
  Authorization: Bearer <YOUR_JWT_TOKEN>
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "user": {
      "id": "1",
      "mobileNumber": "9876543210",
      "name": "Rohan Patil",
      "email": "rohan.patil@example.com",
      "age": 25,
      "gender": "Male",
      "preferredLanguage": "Marathi",
      "isProfileComplete": true
    }
  }
  ```

---

### 3. Update Profile
- **Endpoint**: `PUT /api/auth/profile`
- **Access**: Private (Requires Bearer Token)
- **Headers**:
  ```
  Authorization: Bearer <YOUR_JWT_TOKEN>
  ```
- **Request Body**:
  ```json
  {
    "name": "Rohan Patil",
    "email": "rohan.patil@example.com",
    "age": 25,
    "gender": "Male",
    "preferredLanguage": "Marathi"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Profile updated successfully",
    "user": {
      "id": "1",
      "mobileNumber": "9876543210",
      "name": "Rohan Patil",
      "email": "rohan.patil@example.com",
      "age": 25,
      "gender": "Male",
      "preferredLanguage": "Marathi",
      "isProfileComplete": true
    }
  }
  ```
