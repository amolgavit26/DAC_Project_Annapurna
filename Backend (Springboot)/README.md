# Annapurna Tiffin Delivery Service - SpringBoot (Backend)

The **Annapurna** is a Spring Boot REST API that powers the Annapurna food delivery and tiffin service platform.  
It is designed to handle **user authentication, vendor management, order processing, tiffin listings, and payment tracking**.

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
- **Receipt Download**
  - Customer and download the receipt(.pdf) of his order.
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

- **Java 21**
- **Spring Boot**
- **Spring Security (JWT)**
- **Spring Data JPA / Hibernate**
- **MySQL**
- **Maven**
- **Lombok** (for reducing boilerplate code)

---

## ⚙ Setup & Installation

### Prerequisites
- Java 21+
- Maven 3.8+
- MySQL database

### Steps
```bash
# 1. Clone the repository
git clone https://github.com/amolgavit26/DAC_Project_Annapurna.git
cd Backend (Springboot)

# 2. Configure database connection
# (edit .env)

# 3. Build and run
mvn clean install
mvn spring-boot:run
```

---

## 🌍 Environment Configuration

The application uses `.env` for configuration.

Example `.env`:
```properties
DB_USERNAME=root
DB_PASSWORD=root
JWT_SECRET=@abcdefghijklmn#123456zxvdgt
MAIL_USERNAME=amolgavit158121@gmail.com
MAIL_PASSWORD=abcd efgh ijkl mnop

razorpay.key_id=rzp_test_XdrtDU2pZqIo
razorpay.key_secret=hdTdsjyHKsyjsAuj7xN5WcY1jcK

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

