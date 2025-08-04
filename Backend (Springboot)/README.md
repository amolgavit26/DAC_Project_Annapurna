# 🥗 Annapurna Tiffins - Backend (Spring Boot)

A RESTful backend service for Annapurna Tiffins — a tiffin ordering platform that handles user registration, tiffin listings, order management, and payment integration using Razorpay.

---

## ✅ Features

- 🔐 **JWT-based Authentication & Authorization**
- 👥 **Role-based access** (`CUSTOMER`, `VENDOR`)
- 🧾 **Order management & payment verification**
- 💳 **Razorpay integration**
- 🥘 **Tiffin creation, listing, and retrieval**
- 📦 Built with **Spring Boot**, **Spring Data JPA**, and **MySQL**

---

## ⚙️ Technologies Used

| Purpose        | Technology              |
|----------------|--------------------------|
| Backend        | Spring Boot 3, Java 21    |
| ORM & DB       | Spring Data JPA, MySQL    |
| Auth           | Spring Security + JWT     |
| Payment        | Razorpay REST API         |
| Build Tool     | Maven                     |

---

## 📁 Project Structure

```
src/
├── controller/       # REST endpoints for users, orders, and tiffins
├── domain/           # Entity classes (User, Tiffin, Order, Payment)
├── dto/              # DTOs for data transfer
├── repository/       # Spring Data JPA Repositories
├── service/          # Business logic
├── security/         # JWT Filter, Config, and Util
└── resources/
    └── application.properties
```

---

## 🔐 Authentication

- **Sign Up**: `/api/auth/signup`
- **Login**: `/api/auth/login`  
  Returns a **JWT token** which should be passed in `Authorization` header for protected endpoints:

```
Authorization: Bearer <your_token_here>
```

---

## 🔑 Role-Based Access

| Role      | Can Do                                       |
|-----------|----------------------------------------------|
| CUSTOMER  | Browse tiffins, place orders, make payment   |
| VENDOR    | Add tiffins, view/update customer orders     |

---

## 🧾 Key REST Endpoints

### Authentication
- `POST /api/auth/signup` – Create account
- `POST /api/auth/login` – Login and get token

### Tiffins
- `GET /api/tiffins` – Get all tiffins (open)
- `POST /api/tiffins` – Add new tiffin (vendor only)

### Orders
- `POST /api/orders/place` – Place an order (customer)
- `POST /api/orders/{id}/pay` – Create Razorpay order
- `POST /api/orders/{id}/verify` – Verify payment signature
- `GET /api/customer/orders` – Customer’s own orders
- `GET /api/vendor/orders` – Vendor's received orders
- `PATCH /api/vendor/orders/{id}/status` – Update order status

---

## 🧠 Entity Overview

### User
```java
id, name, email, password, role (CUSTOMER / VENDOR)
```

### Tiffin
```java
id, name, description, price, vendor (User)
```

### Order
```java
id, tiffin, customer, quantity, totalPrice, status (PENDING / ACCEPTED / DELIVERED / REJECTED)
```

### Payment
```java
id, razorpayOrderId, paymentId, signature, verified
```

---

## 🔧 Configuration

Update the following in `src/main/resources/application.properties`:

```properties
# MySQL Config
spring.datasource.url=jdbc:mysql://localhost:3306/annapurna
spring.datasource.username=root
spring.datasource.password=your_password

# JPA Settings
spring.jpa.hibernate.ddl-auto=update

# JWT Secret
jwt.secret=your_jwt_secret

# Razorpay Credentials
razorpay.key=your_razorpay_key
razorpay.secret=your_razorpay_secret
```

---

## 🚀 Running the Backend

### Prerequisites:
- MySQL running on port 3306
- Java 21
- Maven

### Start:

```bash
mvn clean install
mvn spring-boot:run
```

Server runs on: `http://localhost:8080`

---

## 🧪 Testing

Basic unit/integration tests:

```bash
mvn test
```

---

## 📬 Contact

Built with ❤️ by the Annapurna Tiffins backend team.