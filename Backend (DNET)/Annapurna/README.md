# Annapurna Tiffin Delivery Service - ASP.NET Backend

## 📌 Overview
The **Annapurna Backend** is built using **ASP.NET Core Web API** for managing a Tiffin Delivery Service platform.  
It supports three main roles:
- **Customer**: Register, login, browse menu, place orders.
- **Vendor**: Add/manage tiffins, view orders.
- **Admin**: Manage customers, vendors, and orders.

The backend provides RESTful APIs for all operations and integrates with an SQLite database.

---

## 🏗 Project Structure
```
Annapurna Backend (ASP.NET)/
│── Controllers/           # API Controllers for different modules
│   ├── AddressController.cs
│   ├── AdminController.cs
│   ├── AuthController.cs
│   ├── HealthController.cs
│   ├── OrderController.cs
│   ├── TiffinController.cs
│   ├── VendorController.cs
│
│── Data/
│   ├── ApplicationDbContext.cs  # Entity Framework Core DB Context
│
│── DTOs/                  # Data Transfer Objects
│   ├── AddressDTO.cs
│   ├── AddressResponseDTO.cs
│   ├── LoginDTO.cs
│   ├── OrderDTO.cs
│   ├── RegisterDTO.cs
│   ├── TiffinDTO.cs
│   ├── VendorDTO.cs
│
│── Models/                # Entity Models
│   ├── Address.cs
│   ├── Admin.cs
│   ├── Customer.cs
│   ├── Order.cs
│   ├── Tiffin.cs
│   ├── Vendor.cs
│
│── Program.cs              # Main entry point
│── appsettings.json        # Application configuration
│── AnnapurnaAPI.sln        # Solution file
│── AnnapurnaAPI.csproj     # Project file
│── AnnapurnaDB.db          # SQLite database
```

---

## ⚙️ Technologies Used
- **ASP.NET Core Web API**
- **Entity Framework Core (EF Core)**
- **SQLite** (Default DB, can be switched to SQL Server/MySQL)
- **JWT Authentication**
- **C# 10**

---

## 🚀 Features
- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control
- **Customer APIs**
  - Register, login, browse tiffins, place orders
- **Vendor APIs**
  - Add/manage tiffins
  - View orders
- **Admin APIs**
  - Manage customers, vendors, and orders
- **Order Management**
  - Create, update, delete, view orders
- **Address Management**
  - Add, update, delete addresses

---

## 📦 Installation
1. **Clone the repository**
```bash
git clone https://github.com/yourusername/annapurna-backend.git
cd annapurna-backend
```

2. **Install dependencies**
```bash
dotnet restore
```

3. **Update database (if needed)**
```bash
dotnet ef database update
```

4. **Run the project**
```bash
dotnet run
```

---

## 🔑 API Endpoints (Summary)
| Method | Endpoint                  | Role        | Description |
|--------|---------------------------|-------------|-------------|
| POST   | /api/auth/register         | Public      | Register a new user |
| POST   | /api/auth/login            | Public      | Login and get JWT |
| GET    | /api/tiffin                | Public      | Browse all tiffins |
| POST   | /api/tiffin                | Vendor      | Add new tiffin |
| GET    | /api/order                 | Customer    | View customer orders |
| POST   | /api/order                 | Customer    | Place a new order |
| GET    | /api/admin/customers        | Admin       | View all customers |
| GET    | /api/admin/vendors          | Admin       | View all vendors |

---

## 🛡 Security
- JWT tokens must be sent in the `Authorization` header as:
```
Authorization: Bearer <your_token_here>
```
- Passwords are hashed before storage.

---

## 📄 License
This project is licensed under the MIT License.
