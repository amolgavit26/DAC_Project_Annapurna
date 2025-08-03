import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
     const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: "🏠",
            title: "Home-Cooked Quality",
            description: "Fresh, healthy meals prepared by verified home chefs",
            color: "#FF6B6B"
        },
        {
            icon: "🚚",
            title: "Fast Delivery",
            description: "Hot meals delivered to your doorstep on time",
            color: "#4ECDC4"
        },
        {
            icon: "💰",
            title: "Affordable Pricing",
            description: "Quality food at prices that won't break the bank",
            color: "#45B7D1"
        },
        {
            icon: "🛡️",
            title: "Hygienic Standards",
            description: "Strict quality control and hygiene protocols",
            color: "#96CEB4"
        }
    ];

    const testimonials = [
        { name: "Priya S.", rating: 5, text: "Best tiffin service in the city! Food tastes just like home." },
        { name: "Rahul M.", rating: 5, text: "Always fresh and delivered on time. Highly recommended!" },
        { name: "Anita K.", rating: 5, text: "Affordable and delicious. My go-to for daily meals." }
    ];

    return (
        <>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Poppins', sans-serif;
                }
                
                body {
                    overflow-x: hidden;
                }
                
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                }
                
                .row {
                    display: flex;
                    flex-wrap: wrap;
                    margin: -15px;
                }
                
                .row.g-4 {
                    margin: -1.5rem;
                }
                
                .row.g-4 > * {
                    padding: 1.5rem;
                }
                
                .col {
                    flex: 1;
                    padding: 15px;
                }
                
                .col-md-4 {
                    flex: 0 0 33.333333%;
                    max-width: 33.333333%;
                    padding: 15px;
                }
                
                .col-md-6 {
                    flex: 0 0 50%;
                    max-width: 50%;
                    padding: 15px;
                }
                
                .col-lg-3 {
                    flex: 0 0 25%;
                    max-width: 25%;
                    padding: 15px;
                }
                
                .col-lg-6 {
                    flex: 0 0 50%;
                    max-width: 50%;
                    padding: 15px;
                }
                
                .col-lg-8 {
                    flex: 0 0 66.666667%;
                    max-width: 66.666667%;
                    padding: 15px;
                }
                
                @media (max-width: 768px) {
                    .col-md-4, .col-md-6, .col-lg-3, .col-lg-6, .col-lg-8 {
                        flex: 0 0 100%;
                        max-width: 100%;
                    }
                }
                
                .text-center {
                    text-align: center;
                }
                
                .text-white {
                    color: white;
                }
                
                .text-muted {
                    color: #6c757d;
                }
                
                .text-success {
                    color: #28a745;
                }
                
                .text-warning {
                    color: #ffc107;
                }
                
                .fw-bold {
                    font-weight: 700;
                }
                
                .fst-italic {
                    font-style: italic;
                }
                
                .mb-0 { margin-bottom: 0; }
                .mb-1 { margin-bottom: 0.25rem; }
                .mb-2 { margin-bottom: 0.5rem; }
                .mb-3 { margin-bottom: 1rem; }
                .mb-4 { margin-bottom: 1.5rem; }
                .mb-5 { margin-bottom: 3rem; }
                
                .mt-5 { margin-top: 3rem; }
                .me-3 { margin-right: 1rem; }
                
                .py-3 { padding-top: 1rem; padding-bottom: 1rem; }
                .py-4 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
                .py-5 { padding-top: 3rem; padding-bottom: 3rem; }
                .px-3 { padding-left: 1rem; padding-right: 1rem; }
                .px-4 { padding-left: 1.5rem; padding-right: 1.5rem; }
                .px-5 { padding-left: 3rem; padding-right: 3rem; }
                .p-4 { padding: 1.5rem; }
                
                .d-flex {
                    display: flex;
                }
                
                .align-items-center {
                    align-items: center;
                }
                
                .justify-content-center {
                    justify-content: center;
                }
                
                .justify-content-between {
                    justify-content: space-between;
                }
                
                .flex-wrap {
                    flex-wrap: wrap;
                }
                
                .gap-3 {
                    gap: 1rem;
                }
                
                .gap-4 {
                    gap: 1.5rem;
                }
                
                .position-relative {
                    position: relative;
                }
                
                .position-absolute {
                    position: absolute;
                }
                
                .mx-auto {
                    margin-left: auto;
                    margin-right: auto;
                }
                
                .min-vh-100 {
                    min-height: 100vh;
                }
                
                .btn {
                    display: inline-block;
                    padding: 0.75rem 1.5rem;
                    font-size: 1rem;
                    font-weight: 600;
                    text-align: center;
                    text-decoration: none;
                    border: 2px solid transparent;
                    border-radius: 0.375rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: none;
                }
                
                .btn-lg {
                    padding: 1rem 2rem;
                    font-size: 1.125rem;
                }
                
                .btn-warning {
                    background: linear-gradient(45deg, #FFD700, #FFA500);
                    color: #000;
                    border: none;
                }
                
                .btn-outline-light {
                    color: white;
                    border-color: white;
                    background: transparent;
                }
                
                .btn-outline-light:hover {
                    background: white;
                    color: #000;
                }
                
                .btn-light {
                    background: white;
                    color: #000;
                    border: none;
                }
                
                .btn-outline-primary {
                    color: #0d6efd;
                    border-color: #0d6efd;
                    background: transparent;
                }
                
                .btn-outline-primary:hover {
                    background: #0d6efd;
                    color: white;
                }
                
                .card {
                    background: white;
                    border-radius: 0.375rem;
                    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
                    border: 1px solid rgba(0, 0, 0, 0.125);
                }
                
                .card-body {
                    padding: 1.25rem;
                }
                
                .badge {
                    display: inline-block;
                    padding: 0.35em 0.65em;
                    font-size: 0.75em;
                    font-weight: 700;
                    line-height: 1;
                    color: #fff;
                    text-align: center;
                    white-space: nowrap;
                    vertical-align: baseline;
                    border-radius: 0.375rem;
                }
                
                .bg-success {
                    background-color: #28a745;
                }
                
                .rounded-circle {
                    border-radius: 50% !important;
                }
                
                .display-3 {
                    font-size: calc(1.425rem + 2.1vw);
                    font-weight: 300;
                    line-height: 1.2;
                }
                
                .display-4 {
                    font-size: calc(1.375rem + 1.5vw);
                    font-weight: 300;
                    line-height: 1.2;
                }
                
                .display-5 {
                    font-size: calc(1.325rem + 0.9vw);
                    font-weight: 300;
                    line-height: 1.2;
                }
                
                .lead {
                    font-size: 1.25rem;
                    font-weight: 300;
                }
                
                .fs-5 {
                    font-size: 1.25rem;
                }
                
                .fs-6 {
                    font-size: 1rem;
                }
                
                .small {
                    font-size: 0.875em;
                }
                
                .h-100 {
                    height: 100% !important;
                }
                
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes floatAnimation {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-20px) rotate(5deg); }
                    50% { transform: translateY(-10px) rotate(0deg); }
                    75% { transform: translateY(-25px) rotate(-5deg); }
                }
                
                @keyframes bounceIn {
                    0% { opacity: 0; transform: scale(0.3) translateY(100px); }
                    50% { opacity: 1; transform: scale(1.1) translateY(-20px); }
                    70% { transform: scale(0.9) translateY(0px); }
                    100% { opacity: 1; transform: scale(1) translateY(0px); }
                }
                
                @keyframes slideInLeft {
                    0% { opacity: 0; transform: translateX(-100px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes slideInRight {
                    0% { opacity: 0; transform: translateX(100px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes pulseGlow {
                    0%, 100% { 
                        box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
                        transform: scale(1);
                    }
                    50% { 
                        box-shadow: 0 0 40px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.6);
                        transform: scale(1.05);
                    }
                }
                
                @keyframes rotate360 {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes sparkle {
                    0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
                    50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
                }
                
                @keyframes wave {
                    0%, 100% { transform: rotate(0deg) scale(1); }
                    25% { transform: rotate(15deg) scale(1.1); }
                    75% { transform: rotate(-15deg) scale(1.1); }
                }
                
                @keyframes morphBlob {
                    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
                }
                
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .hero-section {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
                    background-size: 400% 400%;
                    animation: gradientShift 15s ease infinite;
                    position: relative;
                    overflow: hidden;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                }
                
                .hero-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: 
                        radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
                    pointer-events: none;
                }
                
                .hero-section::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.2)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
                    opacity: 0.3;
                    pointer-events: none;
                }
                
                .animated-title {
                    animation: slideInLeft 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                
                .animated-subtitle {
                    animation: slideInLeft 1.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                
                .animated-description {
                    animation: slideInLeft 1.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                
                .animated-buttons {
                    animation: bounceIn 2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                
                .animated-stats {
                    animation: bounceIn 2.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                
                .floating-food-container {
                    position: relative;
                    width: 100%;
                    max-width: 600px;
                    height: 600px;
                    margin: 0 auto;
                    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                    border-radius: 50%;
                    backdrop-filter: blur(20px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: floatAnimation 8s ease-in-out infinite, morphBlob 10s ease-in-out infinite;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
                }
                
                .food-orbit {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    animation: rotate360 20s linear infinite;
                }
                
                .food-item {
                    position: absolute;
                    font-size: 3.5rem;
                    animation: floatAnimation 6s ease-in-out infinite;
                    filter: drop-shadow(0 15px 25px rgba(0,0,0,0.3));
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                
                .food-item:hover {
                    transform: scale(1.3) rotate(10deg);
                    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.4));
                }
                
                .food-item:nth-child(1) { top: 15%; left: 50%; transform: translateX(-50%); animation-delay: 0s; }
                .food-item:nth-child(2) { top: 35%; right: 10%; animation-delay: -1s; }
                .food-item:nth-child(3) { bottom: 35%; right: 10%; animation-delay: -2s; }
                .food-item:nth-child(4) { bottom: 15%; left: 50%; transform: translateX(-50%); animation-delay: -3s; }
                .food-item:nth-child(5) { bottom: 35%; left: 10%; animation-delay: -4s; }
                .food-item:nth-child(6) { top: 35%; left: 10%; animation-delay: -2.5s; }
                
                .central-tiffin {
                    font-size: 8rem;
                    z-index: 10;
                    animation: rotate360 25s linear infinite, pulseGlow 4s ease-in-out infinite;
                    filter: drop-shadow(0 25px 50px rgba(0,0,0,0.4));
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .central-tiffin:hover {
                    transform: scale(1.2);
                    animation-duration: 5s;
                }
                
                .sparkle {
                    position: absolute;
                    color: #FFD700;
                    font-size: 2rem;
                    animation: sparkle 3s ease-in-out infinite;
                }
                
                .sparkle:nth-child(odd) { animation-delay: 1.5s; }
                
                .feature-card {
                    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    border: none;
                    background: linear-gradient(145deg, #ffffff, #f8f9fa);
                    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
                    border-radius: 25px;
                    overflow: hidden;
                    position: relative;
                    height: 100%;
                }
                
                .feature-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
                    transition: left 0.7s ease;
                }
                
                .feature-card:hover::before {
                    left: 100%;
                }
                
                .feature-card:hover {
                    transform: translateY(-20px) scale(1.05);
                    box-shadow: 0 25px 80px rgba(0,0,0,0.25);
                }
                
                .feature-icon {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.5rem;
                    margin: 0 auto 1.5rem;
                    animation: wave 3s ease-in-out infinite;
                    position: relative;
                    overflow: hidden;
                }
                
                .feature-icon::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: inherit;
                    border-radius: 50%;
                    opacity: 0.8;
                    animation: pulseGlow 3s ease-in-out infinite;
                }
                
                .feature-card:nth-child(1) .feature-icon { 
                    animation-delay: 0s; 
                }
                .feature-card:nth-child(2) .feature-icon { 
                    animation-delay: 0.5s; 
                }
                .feature-card:nth-child(3) .feature-icon { 
                    animation-delay: 1s; 
                }
                .feature-card:nth-child(4) .feature-icon { 
                    animation-delay: 1.5s; 
                }
                
                .testimonial-card {
                    background: linear-gradient(145deg, #ffffff, #f8f9fa);
                    border: none;
                    border-radius: 20px;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                    transition: all 0.4s ease;
                    height: 100%;
                }
                
                .testimonial-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 25px 60px rgba(0,0,0,0.2);
                }
                
                .cta-section {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    position: relative;
                    overflow: hidden;
                }
                
                .cta-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: 
                        radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
                    pointer-events: none;
                }
                
                .badge-animated {
                    animation: pulseGlow 3s ease-in-out infinite;
                    background: linear-gradient(45deg, #FFD700, #FFA500);
                    color: #000;
                }
                
                .btn-animated {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    border-radius: 50px;
                }
                
                .btn-animated::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    transition: left 0.6s ease;
                }
                
                .btn-animated:hover::before {
                    left: 100%;
                }
                
                .btn-animated:hover {
                    transform: translateY(-5px) scale(1.05);
                    box-shadow: 0 15px 40px rgba(0,0,0,0.25);
                }
                
                .stats-item {
                    animation: bounceIn 2s ease-out;
                    transition: all 0.3s ease;
                }
                
                .stats-item:hover {
                    transform: scale(1.1);
                }
                
                .stats-item:nth-child(1) { animation-delay: 0.2s; }
                .stats-item:nth-child(2) { animation-delay: 0.4s; }
                .stats-item:nth-child(3) { animation-delay: 0.6s; }
                
                .floating-info-card {
                    animation: floatAnimation 4s ease-in-out infinite;
                    background: rgba(255,255,255,0.95);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.3);
                    box-shadow: 0 25px 80px rgba(0,0,0,0.3);
                    border-radius: 25px;
                    max-width: 220px;
                    bottom: 10px;
                    right: 10px;
                }
                
                .section-title {
                    position: relative;
                    display: inline-block;
                }
                
                .section-title::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80px;
                    height: 4px;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    border-radius: 2px;
                }
                
                .gradient-text {
                    background: linear-gradient(45deg, #FFD700, #FFA500, #FF6B6B);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .features-section {
                    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
                }
                
                @media (max-width: 992px) {
                    .col-lg-3, .col-lg-6, .col-lg-8 {
                        flex: 0 0 100%;
                        max-width: 100%;
                    }
                    
                    .floating-food-container {
                        width: 400px;
                        height: 400px;
                    }
                    
                    .central-tiffin {
                        font-size: 6rem;
                    }
                }
                
                @media (max-width: 768px) {
                    .col-md-4, .col-md-6, .col-lg-3 {
                        flex: 0 0 100%;
                        max-width: 100%;
                    }
                    
                    .floating-food-container {
                        width: 350px;
                        height: 350px;
                    }
                    
                    .central-tiffin {
                        font-size: 5rem;
                    }
                    
                    .food-item {
                        font-size: 2.5rem;
                    }
                    
                    .feature-icon {
                        width: 80px;
                        height: 80px;
                        font-size: 2rem;
                    }
                    
                    .display-3 {
                        font-size: 2.5rem;
                    }
                    
                    .display-4 {
                        font-size: 2rem;
                    }
                }
                
                @media (max-width: 576px) {
                    .floating-food-container {
                        width: 280px;
                        height: 280px;
                    }
                    
                    .central-tiffin {
                        font-size: 4rem;
                    }
                    
                    .food-item {
                        font-size: 2rem;
                    }
                    
                    .display-3 {
                        font-size: 2rem;
                    }
                    
                    .px-5 {
                        padding-left: 2rem;
                        padding-right: 2rem;
                    }
                }
            `}</style>

            {/* Hero Section */}
            <div className="hero-section">
                <div className="container">
                    <div className="row align-items-center min-vh-100">
                        <div className="col-lg-6 text-white">
                            <div className="mb-4 animated-title">
                                <span className="badge badge-animated px-4 py-3 mb-4 fs-6 fw-bold">
                                    🌟 Most Trusted Tiffin Service in City
                                </span>
                            </div>
                            
                            <h1 className="display-3 fw-bold mb-4 animated-subtitle" style={{ lineHeight: '1.1' }}>
                                Welcome to <br />
                                <span className="gradient-text">
                                    Annapurna 🍱
                                </span>
                            </h1>
                            
                            <p className="lead mb-4 animated-description" style={{ fontSize: '1.4rem', opacity: 0.95 }}>
                                Your trusted online tiffin service platform, connecting you with hygienic,
                                affordable, and home-cooked meals delivered fresh to your doorstep.
                            </p>
                            
                            <p className="mb-5 animated-description" style={{ opacity: 0.85, fontSize: '1.1rem' }}>
                                Whether you're a student, working professional, or just looking for quality meals, 
                                we've got delicious options crafted with love and care.
                            </p>

                            <div className="d-flex flex-wrap gap-3 mb-5 animated-buttons">
                                <button className="btn btn-warning btn-lg px-5 py-3 fw-bold btn-animated" onClick={() => navigate('/login')}>
                                    Login Now
                                </button>
                                <button className="btn btn-outline-light btn-lg px-5 py-3 fw-bold btn-animated" onClick={() => navigate('/register')} >
                                    Join Annapurna
                                </button>
                            </div>

                            <div className="d-flex align-items-center justify-content-between animated-stats">
                                <div className="text-center stats-item">
                                    <h3 className="mb-1 fw-bold" style={{ color: '#FFD700' }}>1000+</h3>
                                    <small style={{ opacity: 0.8 }}>Happy Customers</small>
                                </div>
                                <div className="text-center stats-item">
                                    <h3 className="mb-1 fw-bold" style={{ color: '#FFD700' }}>100+</h3>
                                    <small style={{ opacity: 0.8 }}>Partner Chefs</small>
                                </div>
                                <div className="text-center stats-item">
                                    <h3 className="mb-1 fw-bold" style={{ color: '#FFD700' }}>4.9⭐</h3>
                                    <small style={{ opacity: 0.8 }}>Average Rating</small>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 text-center">
                            <div className="floating-food-container">
                                <div className="food-orbit">
                                    <div className="food-item">🍛</div>
                                    <div className="food-item">🍜</div>
                                    <div className="food-item">🥘</div>
                                    <div className="food-item">🍱</div>
                                    <div className="food-item">🍲</div>
                                    <div className="food-item">🥗</div>
                                </div>
                                
                                <div className="central-tiffin">🍱</div>
                                
                                <div className="sparkle" style={{ top: '15%', left: '25%' }}>✨</div>
                                <div className="sparkle" style={{ top: '70%', right: '20%' }}>⭐</div>
                                <div className="sparkle" style={{ bottom: '30%', left: '20%' }}>💫</div>
                                <div className="sparkle" style={{ top: '30%', right: '25%' }}>🌟</div>
                                <div className="sparkle" style={{ top: '50%', left: '15%' }}>✨</div>
                                <div className="sparkle" style={{ bottom: '50%', right: '15%' }}>⭐</div>
                                
                                <div className="card position-absolute floating-info-card">
                                    <div className="card-body p-4 text-center">
                                        <h6 className="mb-2 text-success fw-bold">🔥 Fresh Today!</h6>
                                        <p className="text-muted mb-2 small">Dal, Rice, Sabzi, Roti & More</p>
                                        <div className="mb-2">
                                            <span className="text-warning fs-6">⭐⭐⭐⭐⭐</span>
                                        </div>
                                        <span className="badge bg-success px-3 py-1">₹99 Only</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section py-5">
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col">
                            <h2 className="display-4 fw-bold mb-4 section-title">Why Choose Annapurna?</h2>
                            <p className="lead text-muted fs-5">Experience the best of home-cooked meals with modern convenience</p>
                        </div>
                    </div>

                    <div className="row">
                        {features.map((feature, index) => (
                            <div className="col-md-6 col-lg-3" key={index}>
                                <div className="card feature-card text-center h-100">
                                    <div className="card-body p-4">
                                        <div 
                                            className="feature-icon mb-3" 
                                            style={{ 
                                                background: `linear-gradient(135deg, ${feature.color}, ${feature.color}99)` 
                                            }}
                                        >
                                            <span style={{ position: 'relative', zIndex: 2 }}>{feature.icon}</span>
                                        </div>
                                        <h5 className="fw-bold mb-3">{feature.title}</h5>
                                        <p className="text-muted mb-0">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }} className="py-5">
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col">
                            <h2 className="display-5 fw-bold mb-4 section-title">What Our Customers Say</h2>
                            <p className="lead text-muted">Join thousands of satisfied customers</p>
                        </div>
                    </div>
                    <div className="row">
                        {testimonials.map((testimonial, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="card testimonial-card">
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <span key={i} className="text-warning fs-5">⭐</span>
                                            ))}
                                        </div>
                                        <p className="mb-3 fst-italic">"{testimonial.text}"</p>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <div 
                                                className="rounded-circle d-flex align-items-center justify-content-center me-3" 
                                                style={{ 
                                                    width: '50px', 
                                                    height: '50px',
                                                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                                    color: 'white'
                                                }}
                                            >
                                                <span className="fw-bold">{testimonial.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
                                                <small className="text-muted">Verified Customer</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="cta-section text-white py-5">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-lg-8 mx-auto">
                            <h2 className="display-4 fw-bold mb-4">Ready to Experience Home-Cooked Goodness?</h2>
                            <p className="lead mb-5 fs-5" style={{ opacity: 0.9 }}>
                                Join thousands of satisfied customers who trust Annapurna for their daily meals.
                                Start your journey to delicious, healthy eating today!
                            </p>
                            <div className="d-flex justify-content-center gap-4 flex-wrap">
                                <button 
                                    className="btn btn-light btn-lg px-5 py-3 btn-animated fw-bold" 
                                    style={{ 
                                        
                                        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                                        border: 'none',
                                        color: '#000'
                                        
                                    }}
                               onClick={() => navigate('/register')} >
                                    Get Started Today
                                </button>
                                <button className="btn btn-outline-light btn-lg px-5 py-3 btn-animated fw-bold" onClick={() => navigate('/tiffins')}>
                                    View Menu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home