# Annapurna Backend (Spring Boot)

The **Annapurna Backend** is a Spring Boot REST API that powers the Annapurna food delivery and tiffin service platform.  
It is designed to handle **user authentication, vendor management, order processing, tiffin listings, and payment tracking**.

---

## 📖 Table of Contents
1. [Features](#-features)
2. [Architecture](#-architecture)
3. [Project Structure](#-project-structure)
4. [Technologies Used](#-technologies-used)
5. [Setup & Installation](#-setup--installation)
6. [Environment Configuration](#-environment-configuration)
7. [API Endpoints](#-api-endpoints)
8. [Security](#-security)
9. [Database Schema](#-database-schema)
10. [License](#-license)

---

## ✨ Features

- **Authentication & Authorization**
  - JWT-based security for stateless authentication
  - Role-based access control for `Admin`, `Vendor`, and `Customer`
- **Tiffin Service Management**
  - Add, update, delete, and fetch tiffin services
- **Order Processing**
  - Place orders, update status, track delivery
- **Vendor Management**
  - Vendor onboarding and service listing
- **Address Management**
  - Add and manage multiple delivery addresses
- **Payment Tracking**
  - Payment status tracking for orders

---

## 🏛 Architecture

The backend follows a **layered architecture**:
1. **Controller Layer** → Handles HTTP requests and responses
2. **Service Layer** → Contains business logic
3. **Repository Layer** → Handles database interactions using JPA/Hibernate
4. **Config Layer** → Security, CORS, and application configurations

Data flow is **stateless** and relies on **JWT tokens** for authentication.

---

## 📂 Project Structure

```
src/main/java/com/annapurna
│
├── config         # Security, CORS, and Web configurations
├── controller     # REST Controllers for various modules
├── domain         # Entity classes mapped to database tables
├── repository     # Data access layer using Spring Data JPA
├── service        # Business logic implementations
└── util           # Utility/helper classes
```

**Key Controllers:**
- `AuthController` → Handles login, registration, and authentication
- `TiffinController` → CRUD operations for tiffin services
- `OrderController` → Order placement and tracking
- `VendorController` → Vendor-specific operations
- `AdminController` → Admin-level management
- `AddressController` → Address management

---

## 🛠 Technologies Used

- **Java 17**
- **Spring Boot**
- **Spring Security (JWT)**
- **Spring Data JPA / Hibernate**
- **MySQL**
- **Maven**
- **Lombok** (for reducing boilerplate code)

---

## ⚙ Setup & Installation

### Prerequisites
- Java 17+
- Maven 3.8+
- MySQL database

### Steps
```bash
# 1. Clone the repository
git clone <repo-url>
cd annapurna-backend

# 2. Configure database connection
# (edit application.properties or .env)

# 3. Build and run
mvn clean install
mvn spring-boot:run
```

---

## 🌍 Environment Configuration

The application uses `.env` or `application.properties` for configuration.

Example `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/annapurna
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT Configuration
jwt.secret=YourSecretKey
jwt.expiration=86400000
```

---

## 📡 API Endpoints

| Endpoint                  | Method | Description | Role |
|---------------------------|--------|-------------|------|
| `/auth/register`          | POST   | Register a new user | Public |
| `/auth/login`             | POST   | Authenticate user and return JWT | Public |
| `/tiffins`                | GET    | Get all tiffin services | All |
| `/orders`                 | POST   | Place a new order | Customer |
| `/orders/{id}`            | GET    | Get order details | Customer |
| `/admin/tiffins`          | POST   | Add a tiffin service | Admin |
| `/vendor/tiffins`         | POST   | Vendor adds their tiffin service | Vendor |

---

## 🔒 Security

- **JWT Authentication** for stateless security
- **Role-Based Access Control** to restrict API access
- **Password Encryption** using BCrypt

---

## 🗄 Database Schema (Main Tables)

- **users** → Stores user details (with roles)
- **tiffins** → Tiffin service listings
- **orders** → Order records with status
- **addresses** → Customer delivery addresses
- **vendors** → Vendor information

---

## 📜 License

This project is licensed under the **MIT License**.
