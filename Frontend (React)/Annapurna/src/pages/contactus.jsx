import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Send, Sparkles } from 'lucide-react';

export default function ContactUs() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simulate successful submission
            setSuccess('Thank you for your inquiry! Our team will contact you within 24 hours to discuss your tiffin service requirements.');
            setError('');
            setForm({ name: '', email: '', message: '' });
        } catch (err) {
            console.error(err);
            setError('Unable to send your message right now. Please call us directly at +91-98765-43210 or try again later.');
            setSuccess('');
        }
    };

    return (
        <div className="contact-wrapper">
            {/* Animated background elements */}
            <div className="floating-elements">
                <div className="floating-circle circle-1"></div>
                <div className="floating-circle circle-2"></div>
                <div className="floating-circle circle-3"></div>
                <div className="floating-triangle triangle-1"></div>
                <div className="floating-triangle triangle-2"></div>
            </div>

            <div className="container">
                <div className="row">
                    {/* Form Card */}
                    <div className="col-form">
                        <div className="glass-card">
                            <div className="form-header">
                                <div className="icon-wrapper">
                                    <Sparkles size={32} className="text-primary-gradient" />
                                </div>
                                <h3 className="form-title">Get in Touch</h3>
                                <p className="form-subtitle">
                                    Have questions about our tiffin service? Want to customize your meal plan? We're here to help you enjoy delicious, home-style meals delivered fresh to your doorstep!
                                </p>
                            </div>

                            {success && (
                                <div className="alert alert-success">
                                    <CheckCircle size={16} className="alert-icon" />
                                    {success}
                                </div>
                            )}
                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label className="form-label">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your full name"
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Your Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your email address"
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Message</label>
                                    <textarea
                                        rows={4}
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Tell us about your meal preferences, dietary requirements, or any questions about our tiffin service..."
                                        className="form-input form-textarea"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="submit-btn"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <Send size={16} className="btn-icon" />
                                    Send Message
                                    {isHovered && <Sparkles size={14} className="btn-sparkle" />}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="col-info">
                        <div className="glass-card info-card">
                            <h5 className="info-title">Contact Information</h5>
                            <div className="contact-list">
                                <div className="contact-item">
                                    <div className="contact-icon-wrapper">
                                        <Mail size={18} />
                                    </div>
                                    <div className="contact-details">
                                        <div className="contact-label">Email</div>
                                        <div className="contact-value">info@homemeals.com</div>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon-wrapper">
                                        <Phone size={18} />
                                    </div>
                                    <div className="contact-details">
                                        <div className="contact-label">Phone</div>
                                        <div className="contact-value">+91-98765-43210</div>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon-wrapper">
                                        <MapPin size={18} />
                                    </div>
                                    <div className="contact-details">
                                        <div className="contact-label">Address</div>
                                        <div className="contact-value">456, Food Street, Andheri East, Mumbai - 400069</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Why Choose Us */}
                        <div className="glass-card">
                            <h5 className="info-title">Why Choose Our Tiffin Service?</h5>
                            <div className="feature-list">
                                {[
                                    'Fresh, home-style meals cooked daily',
                                    'Customizable meal plans for dietary needs',
                                    'Timely delivery at your convenience',
                                    'Hygienic preparation and packaging',
                                    'Affordable pricing with flexible subscriptions',
                                    'Regional and North Indian cuisines'
                                ].map((item, idx) => (
                                    <div key={idx} className="feature-item">
                                        <div className="feature-icon-wrapper">
                                            <CheckCircle size={16} />
                                        </div>
                                        <span className="feature-text">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                html, body {
                    width: 100%;
                    overflow-x: hidden;
                }
            `}</style>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                
                .contact-wrapper {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
                    background-size: 400% 400%;
                    animation: gradientShift 15s ease infinite;
                    padding: 60px 0;
                    font-family: 'Inter', sans-serif;
                    position: relative;
                    overflow: hidden;
                    width: 100vw;
                }

                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .floating-elements {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1;
                }

                .floating-circle {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    animation: float 20s infinite linear;
                }

                .floating-triangle {
                    position: absolute;
                    width: 0;
                    height: 0;
                    animation: floatReverse 25s infinite linear;
                }

                .circle-1 {
                    width: 100px;
                    height: 100px;
                    top: 10%;
                    left: 10%;
                    animation-delay: 0s;
                }

                .circle-2 {
                    width: 60px;
                    height: 60px;
                    top: 60%;
                    right: 15%;
                    animation-delay: -7s;
                }

                .circle-3 {
                    width: 80px;
                    height: 80px;
                    bottom: 20%;
                    left: 20%;
                    animation-delay: -14s;
                }

                .triangle-1 {
                    top: 20%;
                    right: 20%;
                    border-left: 25px solid transparent;
                    border-right: 25px solid transparent;
                    border-bottom: 40px solid rgba(255, 255, 255, 0.1);
                    animation-delay: -10s;
                }

                .triangle-2 {
                    bottom: 30%;
                    right: 10%;
                    border-left: 15px solid transparent;
                    border-right: 15px solid transparent;
                    border-bottom: 25px solid rgba(255, 255, 255, 0.1);
                    animation-delay: -5s;
                }

                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-20px) rotate(90deg); }
                    50% { transform: translateY(0px) rotate(180deg); }
                    75% { transform: translateY(20px) rotate(270deg); }
                    100% { transform: translateY(0px) rotate(360deg); }
                }

                @keyframes floatReverse {
                    0% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(15px) rotate(-90deg); }
                    50% { transform: translateY(0px) rotate(-180deg); }
                    75% { transform: translateY(-15px) rotate(-270deg); }
                    100% { transform: translateY(0px) rotate(-360deg); }
                }

                .container {
                    max-width: 1200px;
                    width: 100%;
                    margin: 0 auto;
                    position: relative;
                    z-index: 2;
                    padding: 0 20px;
                }

                .row {
                    display: flex;
                    gap: 30px;
                    align-items: flex-start;
                    width: 100%;
                }

                .col-form {
                    flex: 1;
                    min-width: 0;
                }

                .col-info {
                    flex: 0 0 350px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .glass-card {
                    background: rgba(255, 255, 255, 0.25);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 20px;
                    padding: 40px;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    width: 100%;
                }

                .glass-card:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                }

                .form-header {
                    text-align: center;
                    margin-bottom: 40px;
                }

                .icon-wrapper {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .text-primary-gradient {
                    color: #667eea;
                }

                .form-title {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    font-size: 2.2rem;
                    font-weight: 700;
                    margin-bottom: 15px;
                }

                .form-subtitle {
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 16px;
                    line-height: 1.6;
                }

                .alert {
                    padding: 15px 20px;
                    border-radius: 12px;
                    margin-bottom: 30px;
                    display: flex;
                    align-items: center;
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    font-weight: 500;
                }

                .alert-success {
                    background: rgba(40, 167, 69, 0.2);
                    border-color: rgba(40, 167, 69, 0.3);
                }

                .alert-danger {
                    background: rgba(220, 53, 69, 0.2);
                    border-color: rgba(220, 53, 69, 0.3);
                }

                .alert-icon {
                    margin-right: 8px;
                }

                .contact-form {
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                }

                .form-label {
                    color: rgba(255, 255, 255, 0.9);
                    font-weight: 600;
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 8px;
                }

                .form-input {
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 12px;
                    color: white;
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                    padding: 14px 18px;
                    font-size: 16px;
                    font-family: inherit;
                    width: 100%;
                }

                .form-input::placeholder {
                    color: rgba(255, 255, 255, 0.6);
                }

                .form-input:focus {
                    outline: none;
                    background: rgba(255, 255, 255, 0.3);
                    border-color: rgba(102, 126, 234, 0.5);
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.25);
                }

                .form-textarea {
                    min-height: 120px;
                    resize: vertical;
                }

                .submit-btn {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    color: white;
                    padding: 16px 32px;
                    font-size: 16px;
                    font-weight: 600;
                    border-radius: 50px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                    font-family: inherit;
                    width: 100%;
                }

                .submit-btn:hover {
                    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
                }

                .submit-btn:active {
                    transform: translateY(0);
                }

                .btn-icon {
                    transition: transform 0.3s ease;
                }

                .btn-sparkle {
                    animation: sparkle 0.6s ease-in-out;
                }

                @keyframes sparkle {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    50% { transform: scale(1.2) rotate(180deg); }
                }

                .info-card {
                    margin-bottom: 20px;
                }

                .info-title {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    font-weight: 700;
                    margin-bottom: 25px;
                    font-size: 1.3rem;
                }

                .contact-list {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 15px;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                }

                .contact-item:hover {
                    background: rgba(255, 255, 255, 0.1);
                }

                .contact-icon-wrapper {
                    width: 45px;
                    height: 45px;
                    background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    flex-shrink: 0;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .contact-details {
                    flex: 1;
                    min-width: 0;
                }

                .contact-label {
                    font-size: 12px;
                    color: rgba(255, 255, 255, 0.7);
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 4px;
                }

                .contact-value {
                    color: white;
                    font-weight: 500;
                    font-size: 15px;
                    word-break: break-word;
                }

                .feature-list {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .feature-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }

                .feature-item:hover {
                    background: rgba(255, 255, 255, 0.1);
                }

                .feature-icon-wrapper {
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    flex-shrink: 0;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .feature-text {
                    color: rgba(255, 255, 255, 0.9);
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 1.5;
                }

                /* Tablet Styles */
                @media (max-width: 1024px) {
                    .container {
                        max-width: 100%;
                        padding: 0 30px;
                    }
                    
                    .row {
                        gap: 25px;
                    }
                    
                    .col-info {
                        flex: 0 0 320px;
                    }
                    
                    .glass-card {
                        padding: 35px;
                    }
                }

                /* Mobile Landscape */
                @media (max-width: 900px) {
                    .contact-wrapper {
                        padding: 40px 0;
                        min-height: auto;
                    }
                    
                    .row {
                        flex-direction: column;
                        gap: 25px;
                    }
                    
                    .col-form,
                    .col-info {
                        flex: none;
                        width: 100%;
                        max-width: 100%;
                    }
                    
                    .glass-card {
                        padding: 30px;
                        border-radius: 16px;
                    }
                    
                    .form-title {
                        font-size: 1.8rem;
                    }
                    
                    .form-subtitle {
                        font-size: 15px;
                    }
                    
                    .icon-wrapper {
                        width: 50px;
                        height: 50px;
                        margin-bottom: 15px;
                    }
                    
                    .contact-item {
                        padding: 12px;
                    }
                    
                    .contact-icon-wrapper {
                        width: 40px;
                        height: 40px;
                    }
                    
                    .feature-icon-wrapper {
                        width: 28px;
                        height: 28px;
                    }
                    
                    .floating-circle,
                    .floating-triangle {
                        opacity: 0.3;
                    }
                    
                    .circle-1 {
                        width: 70px;
                        height: 70px;
                    }
                    
                    .circle-2 {
                        width: 40px;
                        height: 40px;
                    }
                    
                    .circle-3 {
                        width: 50px;
                        height: 50px;
                    }
                }

                /* Mobile Portrait */
                @media (max-width: 600px) {
                    .contact-wrapper {
                        padding: 30px 0;
                    }
                    
                    .container {
                        padding: 0 20px;
                    }
                    
                    .glass-card {
                        padding: 25px;
                        border-radius: 14px;
                    }
                    
                    .form-header {
                        margin-bottom: 30px;
                    }
                    
                    .form-title {
                        font-size: 1.6rem;
                        margin-bottom: 12px;
                    }
                    
                    .form-subtitle {
                        font-size: 14px;
                    }
                    
                    .icon-wrapper {
                        width: 45px;
                        height: 45px;
                        margin-bottom: 12px;
                    }
                    
                    .contact-form {
                        gap: 20px;
                    }
                    
                    .form-input {
                        padding: 12px 16px;
                        font-size: 15px;
                    }
                    
                    .form-textarea {
                        min-height: 100px;
                    }
                    
                    .submit-btn {
                        padding: 14px 28px;
                        font-size: 15px;
                    }
                    
                    .info-title {
                        font-size: 1.1rem;
                        margin-bottom: 20px;
                    }
                    
                    .contact-list {
                        gap: 15px;
                    }
                    
                    .contact-item {
                        padding: 10px;
                    }
                    
                    .contact-icon-wrapper {
                        width: 35px;
                        height: 35px;
                    }
                    
                    .contact-value {
                        font-size: 14px;
                    }
                    
                    .feature-list {
                        gap: 12px;
                    }
                    
                    .feature-item {
                        padding: 10px;
                    }
                    
                    .feature-icon-wrapper {
                        width: 26px;
                        height: 26px;
                    }
                    
                    .feature-text {
                        font-size: 13px;
                    }
                }

                /* Small Mobile */
                @media (max-width: 480px) {
                    .contact-wrapper {
                        padding: 25px 0;
                    }
                    
                    .container {
                        padding: 0 15px;
                    }
                    
                    .glass-card {
                        padding: 20px;
                    }
                    
                    .form-title {
                        font-size: 1.4rem;
                    }
                    
                    .form-input {
                        padding: 10px 14px;
                        font-size: 14px;
                    }
                    
                    .submit-btn {
                        padding: 12px 24px;
                        font-size: 14px;
                    }
                    
                    .contact-icon-wrapper {
                        width: 32px;
                        height: 32px;
                    }
                    
                    .feature-icon-wrapper {
                        width: 24px;
                        height: 24px;
                    }
                    
                    .contact-value {
                        font-size: 13px;
                    }
                    
                    .feature-text {
                        font-size: 12px;
                    }
                }

                /* Very Small Mobile */
                @media (max-width: 360px) {
                    .container {
                        padding: 0 10px;
                    }
                    
                    .glass-card {
                        padding: 18px;
                    }
                    
                    .form-title {
                        font-size: 1.3rem;
                    }
                    
                    .form-input {
                        padding: 8px 12px;
                    }
                    
                    .submit-btn {
                        padding: 10px 20px;
                    }
                }

                /* Landscape orientation for phones */
                @media (max-height: 500px) and (orientation: landscape) {
                    .contact-wrapper {
                        padding: 20px 0;
                        align-items: flex-start;
                    }
                    
                    .form-header {
                        margin-bottom: 20px;
                    }
                    
                    .icon-wrapper {
                        width: 40px;
                        height: 40px;
                    }
                    
                    .form-title {
                        font-size: 1.5rem;
                    }
                    
                    .form-subtitle {
                        font-size: 13px;
                    }
                    
                    .contact-form {
                        gap: 15px;
                    }
                }
            `}</style>
        </div>
    );
}