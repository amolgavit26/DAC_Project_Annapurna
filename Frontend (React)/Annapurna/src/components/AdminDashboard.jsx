import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Tabs, Tab, Alert } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [activeTab, setActiveTab] = useState('customers');
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('success');

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchCustomers();
        fetchVendors();
    }, []);

    const fetchCustomers = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/admin/customers', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCustomers(res.data);
        } catch (err) {
            console.error('Error fetching customers', err);
            toast.error("❌ Failed to fetch customers");
        }
    };

    const fetchVendors = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/admin/vendors', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setVendors(res.data);
        } catch (err) {
            console.error('Error fetching vendors', err);
            toast.error("❌ Failed to fetch vendors");
        }
    };

    const handleDeleteCustomer = async (customerId) => {
        try {
            await axios.delete(`http://localhost:8080/api/admin/delete/${customerId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("✅ Customer deleted successfully!");
            fetchCustomers();
        } catch (err) {
            console.error("Error deleting customer", err);
            toast.error("❌ Failed to delete customer");
        }
    };

    const handleDeleteVendor = async (vendorId) => {
        try {
            await axios.delete(`http://localhost:8080/api/admin/vendor/delete/${vendorId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("✅ Vendor deleted successfully!");
            fetchVendors();
        } catch (err) {
            console.error("Error deleting vendor", err);
            toast.error("❌ Failed to delete vendor");
        }
    };


    return (
        <div className="container mt-4">
            <ToastContainer />
            <h3>Admin Dashboard</h3>
            {message && <Alert variant={variant}>{message}</Alert>}

            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
                <Tab eventKey="customers" title="Customers">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((cust) => (
                                <tr key={cust.id}>
                                    <td>{cust.id}</td>
                                    <td>{cust.email}</td>
                                    <td>{cust.fullName || "N/A"}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDeleteCustomer(cust.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>

                <Tab eventKey="vendors" title="Vendors">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendors.map((vendor) => (
                                <tr key={vendor.id}>
                                    <td>{vendor.id}</td>
                                    <td>{vendor.email}</td>
                                    <td>{vendor.fullName || "N/A"}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDeleteVendor(vendor.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
        </div>
    );
};

export default AdminDashboard;
