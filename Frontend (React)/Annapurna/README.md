# Annapurna Frontend

Annapurna Frontend is a **React.js**-based web application for a **Tiffin Service Management System**. It allows customers to browse tiffins, place orders, and manage their profiles, while vendors can list tiffins, view/manage orders, and administrators can oversee the platform. This frontend works seamlessly with both **Spring Boot** and **ASP.NET Core** backends.

---

## 🚀 Features

### **For Customers**
- Browse tiffin menu (Breakfast, Lunch, Dinner categories).
- Place orders and track status.
- Manage delivery addresses.
- View order history.

### **For Vendors**
- Add and manage tiffin listings with images.
- View and manage vendor-specific orders.
- Update order statuses.

### **For Admins**
- View all users, tiffins, and orders.
- Manage vendors and customers.
- Oversee platform statistics.

---

## 🛠 Tech Stack

- **Frontend Framework:** React.js (Vite)
- **Routing:** React Router
- **State Management:** React Hooks & Context API
- **Styling:** CSS
- **HTTP Requests:** Axios
- **Backend APIs:** Compatible with both:
  - Spring Boot backend
  - ASP.NET Core backend

---

## 📂 Project Structure

```
Annapurna Frontend/
│
├── src/
│   ├── assets/                # Images and static assets
│   ├── components/            # Reusable UI components
│   │   ├── AddressForm.jsx
│   │   ├── AddTiffin.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AppNavbar.jsx
│   │   ├── CustomerDashboard.jsx
│   │   ├── MyOrders.jsx
│   │   ├── OrderForm.jsx
│   │   ├── TiffinList.jsx
│   │   └── VendorDashboard.jsx
│   │
│   ├── pages/                 # Page-level components
│   │   ├── aboutus.jsx
│   │   ├── contactus.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   └── Register.jsx
│   │
│   ├── services/              # API integration
│   │   └── api.js
│   │
│   ├── config.js              # Environment configurations
│   ├── App.jsx                # Main App component
│   ├── main.jsx               # Entry point
│   ├── App.css                # Global styles
│   └── index.css              # Base CSS
│
├── package.json               # Dependencies and scripts
└── vite.config.js              # Vite configuration
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/annapurna-frontend.git
   cd annapurna-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Base URL**
   - Open `src/config.js`
   - Set the `API_BASE_URL` to match your backend (Spring Boot or ASP.NET Core).

   ```javascript
   export const API_BASE_URL = "http://localhost:8080"; // Spring Boot
   // or
   export const API_BASE_URL = "http://localhost:5000"; // ASP.NET Core
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

5. **Access the app**
   - Open browser: `http://localhost:5173`

---

## 📸 Screenshots

*(Add screenshots of Home Page, Dashboard, Vendor Panel, and Admin Panel here)*

---

## 🔗 Backend Repositories
- [Annapurna Spring Boot Backend](#)
- [Annapurna ASP.NET Core Backend](#)

---

## 📜 License
This project is licensed under the MIT License.
