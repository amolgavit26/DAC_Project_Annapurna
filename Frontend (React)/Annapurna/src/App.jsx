// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import VendorDashboard from './components/VendorDashboard';
import TiffinList from './components/TiffinList';
import Navbar from './components/AppNavbar';
import OrderForm from './components/OrderForm';
import CustomerDashboard from './components/CustomerDashboard';
import VendorOrders from './components/VendorOrders';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route path="/tiffins" element={<TiffinList />} />
        <Route path="/vendor/orders" element={<VendorOrders />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/order-form/:tiffinId" element={<OrderForm />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
