import React, { useEffect, useState } from "react";
import {
  ChefHat,
  Users,
  Clock,
  Heart,
  Award,
  Github,
  Linkedin,
} from "lucide-react";

import amolImage from "../assets/images/AmolGavit.jpg";
import pallavi from "../assets/images/pallavi.jpg";
import meenakshi from "../assets/images/Meenakshi.jpg";
import suchi from "../assets/images/SuchiTripathi.jpg";
import shilpa from "../assets/images/Shilpa.jpg";
export default function About() {
  const [counters, setCounters] = useState({
    years: 0,
    meals: 0,
    customers: 0,
  });

  // Counter animation effect
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      const targets = { years: 8, meals: 25000, customers: 1500 };
      const increments = {
        years: targets.years / steps,
        meals: targets.meals / steps,
        customers: targets.customers / steps,
      };

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setCounters({
          years: Math.min(
            Math.floor(increments.years * currentStep),
            targets.years
          ),
          meals: Math.min(
            Math.floor(increments.meals * currentStep),
            targets.meals
          ),
          customers: Math.min(
            Math.floor(increments.customers * currentStep),
            targets.customers
          ),
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, stepTime);
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  const teamMembers = [
    {
      name: "Amol Gavit",
      role: "Project Lead & Spring Boot Developer",
      desc: "He ensures every meal is prepared with care and authentic flavors. As the project lead and backend developer, he built the foundation of this website using Spring Boot to make home-style food easily accessible to everyone.",
      image: amolImage,
      linkedin: "https://www.linkedin.com/in/amolgavit26/",
      github: "https://github.com/amolgavit26",
    },
    {
      name: "Pallavi Sahay",
      role: "Frontend Developer (ReactJS, Bootstrap, Tailwind CSS)",
      desc: "Designs and develops the user interface of our website using ReactJS, Bootstrap, and Tailwind CSS to ensure a smooth, responsive, and user-friendly experience.",
      image: pallavi,
      linkedin: "https://www.linkedin.com/in/pallavi-sahay-a871bb220/",
      github: "https://github.com/pallavisahay",
    },
    {
      name: "Meenakshi Lokhande",
      role: ".NET Developer",
      desc: "Develops and maintains backend systems using .NET technologies to ensure reliable performance and smooth integration across the platform.",
      image: meenakshi,
      linkedin: "https://www.linkedin.com/in/meenakshi-lokhande-a692b4258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/Meenakshi3101",
    },
    {
      name: "Suchi Tripathi",
      role: "Frontend Developer",
      desc: "Collaborates on designing and developing responsive, user-friendly interfaces to enhance the overall user experience of the website.",
      image: suchi,
      linkedin: "https://www.linkedin.com/in/suchi/",
      github: "https://github.com/Suchitripathi/Cdac-Feb25.git",
    },
    {
      name: "Shilpa Pandey",
      role: ".NET Developer",
      desc: "Works on backend development using .NET technologies, focusing on building secure, scalable, and efficient features to support smooth platform operations.",
      image: shilpa,
      linkedin: "http://www.linkedin.com/in/shilpa-pandey-b42940279",
      github: "https://github.com/Shilpa-u/Shilpa_Pandey_JH-PG-DAC-Feb25",
    },
  ];

  return (
    <div className="about-wrapper">
      {/* Animated background elements */}
      <div className="floating-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="floating-triangle triangle-1"></div>
        <div className="floating-triangle triangle-2"></div>
        <div className="floating-spice spice-1">🌿</div>
        <div className="floating-spice spice-2">🌶️</div>
        <div className="floating-spice spice-3">⭐</div>
      </div>

      <div className="container">
        {/* Header Section */}
        <div className="header-section">
          <div className="icon-wrapper-main">
            <ChefHat size={48} className="header-icon" />
          </div>
          <h2 className="main-title">About Our Tiffin Service</h2>
          <p className="main-subtitle">
            Bringing the taste of home to your doorstep with fresh, nutritious,
            and delicious meals
          </p>
        </div>

        {/* Story and Mission Section */}
        <div className="story-mission-section">
          <div className="story-column">
            <div className="content-card">
              <h4 className="section-title">Our Story</h4>
              <p className="story-text">
                We created this website to make it easier for people to enjoy
                the comfort of home-cooked meals, no matter where they are. What
                began in a small kitchen with a passion for authentic,
                home-style cooking has grown into a tiffin service trusted by
                hundreds of families across India.
                <br />
                <br />
                The idea was born out of the need for healthy, delicious, and
                affordable meals—especially for students and working
                professionals living away from home. Through this platform, we
                bring fresh, daily-prepared meals made with traditional recipes
                straight to your doorstep, ensuring every bite feels like home.
              </p>
            </div>
          </div>

          <div className="mission-column">
            <div className="glass-card mission-card">
              <div className="mission-section">
                <div className="mission-icon-wrapper">
                  <Heart size={24} />
                </div>
                <h5 className="mission-title">Our Mission</h5>
                <p className="mission-text">
                  To provide nutritious, home-style meals that nourish both body
                  and soul, making healthy eating convenient and affordable for
                  everyone.
                </p>
              </div>

              <div className="vision-section">
                <div className="vision-icon-wrapper">
                  <Award size={24} />
                </div>
                <h5 className="vision-title">Our Vision</h5>
                <p className="vision-text">
                  To become India's most trusted tiffin service, known for
                  quality, consistency, and the warmth of home-cooked meals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <Clock size={36} />
              </div>
              <h3 className="stat-number">{counters.years}+</h3>
              <p className="stat-label">Years of Service</p>
              <p className="stat-desc">
                Serving delicious meals with consistency and care
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <ChefHat size={36} />
              </div>
              <h3 className="stat-number">
                {counters.meals.toLocaleString()}+
              </h3>
              <p className="stat-label">Meals Served</p>
              <p className="stat-desc">
                Fresh, home-style meals delivered with love
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <Users size={36} />
              </div>
              <h3 className="stat-number">{counters.customers}+</h3>
              <p className="stat-label">Happy Customers</p>
              <p className="stat-desc">
                Families and professionals who trust us daily
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h4 className="team-title">Meet Our Team</h4>
          <p className="team-subtitle">
            Meet the passionate team behind your favorite meals — and the website that brings them to you.
          </p>

          <div className="team-grid">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="team-card">
                <div className="team-image-wrapper">
                  <div className="team-image-placeholder">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="team-image"
                    />
                  </div>
                </div>
                <div className="team-info">
                  <h5 className="team-name">{member.name}</h5>
                  <span className="team-role">{member.role}</span>
                  <p className="team-desc">{member.desc}</p>
                  <div className="team-links">
                    <a
                      href={member.linkedin}
                      className="social-link linkedin-link"
                    >
                      <Linkedin size={16} />
                      LinkedIn
                    </a>
                    <a href={member.github} className="social-link github-link">
                      <Github size={16} />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        .team-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
}

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .about-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
          background-size: 400% 400%;
          animation: gradientShift 20s ease infinite;
          padding: 80px 20px;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
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
          animation: float 25s infinite linear;
        }

        .floating-triangle {
          position: absolute;
          width: 0;
          height: 0;
          animation: floatReverse 30s infinite linear;
        }

        .floating-spice {
          position: absolute;
          font-size: 24px;
          animation: spiceFloat 20s infinite linear;
          opacity: 0.6;
        }

        .circle-1 {
          width: 120px;
          height: 120px;
          top: 10%;
          left: 5%;
          animation-delay: 0s;
        }

        .circle-2 {
          width: 80px;
          height: 80px;
          top: 70%;
          right: 10%;
          animation-delay: -8s;
        }

        .circle-3 {
          width: 60px;
          height: 60px;
          bottom: 20%;
          left: 15%;
          animation-delay: -15s;
        }

        .triangle-1 {
          top: 25%;
          right: 15%;
          border-left: 30px solid transparent;
          border-right: 30px solid transparent;
          border-bottom: 50px solid rgba(255, 255, 255, 0.1);
          animation-delay: -12s;
        }

        .triangle-2 {
          bottom: 40%;
          left: 8%;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-bottom: 35px solid rgba(255, 255, 255, 0.1);
          animation-delay: -6s;
        }

        .spice-1 {
          top: 15%;
          right: 25%;
          animation-delay: -3s;
        }

        .spice-2 {
          bottom: 30%;
          right: 20%;
          animation-delay: -9s;
        }

        .spice-3 {
          top: 60%;
          left: 10%;
          animation-delay: -14s;
        }

        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-30px) rotate(90deg); }
          50% { transform: translateY(0px) rotate(180deg); }
          75% { transform: translateY(30px) rotate(270deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }

        @keyframes floatReverse {
          0% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(20px) rotate(-90deg); }
          50% { transform: translateY(0px) rotate(-180deg); }
          75% { transform: translateY(-20px) rotate(-270deg); }
          100% { transform: translateY(0px) rotate(-360deg); }
        }

        @keyframes spiceFloat {
          0% { transform: translateX(0px) translateY(0px) rotate(0deg); }
          25% { transform: translateX(30px) translateY(-20px) rotate(90deg); }
          50% { transform: translateX(0px) translateY(0px) rotate(180deg); }
          75% { transform: translateX(-30px) translateY(20px) rotate(270deg); }
          100% { transform: translateX(0px) translateY(0px) rotate(360deg); }
        }

        .container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .header-section {
          text-align: center;
          margin-bottom: 80px;
        }

        .icon-wrapper-main {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 30px;
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          animation: iconPulse 3s ease-in-out infinite;
        }

        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .header-icon {
          color: white;
        }

        .main-title {
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .main-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .story-mission-section {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          margin-bottom: 80px;
          align-items: start;
        }

        .content-card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 40px;
          transition: all 0.3s ease;
        }

        .content-card:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .section-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          margin-bottom: 25px;
        }

        .story-text {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.8;
          font-size: 16px;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 30px;
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .mission-section, .vision-section {
          margin-bottom: 30px;
        }

        .mission-section:last-child, .vision-section:last-child {
          margin-bottom: 0;
        }

        .mission-icon-wrapper, .vision-icon-wrapper {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .mission-title, .vision-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: white;
          margin-bottom: 12px;
        }

        .mission-text, .vision-text {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          font-size: 15px;
        }

        .stats-section {
          margin-bottom: 80px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 40px 30px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .stat-icon-wrapper {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 20px;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          margin-bottom: 8px;
        }

        .stat-desc {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          line-height: 1.5;
        }

        .team-section {
          text-align: center;
        }

        .team-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 15px;
        }

        .team-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 50px;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .team-card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          transition: all 0.3s ease;
          min-height: 400px;
          display: flex;
          flex-direction: column;
        }

        .team-card:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .team-image-wrapper {
          margin-bottom: 20px;
        }
.team-image-placeholder {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
}
        .placeholder-icon {
          color: white;
        }

        .team-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .team-name {
          font-size: 1.3rem;
          font-weight: 600;
          color: white;
          margin-bottom: 8px;
        }

        .team-role {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 15px;
          display: block;
        }

        .team-desc {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 20px;
          flex: 1;
        }

        .team-links {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 20px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .linkedin-link {
          background: rgba(0, 119, 181, 0.3);
          color: white;
        }

        .linkedin-link:hover {
          background: rgba(0, 119, 181, 0.5);
          transform: translateY(-2px);
          color: white;
        }

        .github-link {
          background: rgba(51, 51, 51, 0.3);
          color: white;
        }

        .github-link:hover {
          background: rgba(51, 51, 51, 0.5);
          transform: translateY(-2px);
          color: white;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .story-mission-section {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .main-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .about-wrapper {
            padding: 60px 15px;
          }
          
          .main-title {
            font-size: 2rem;
          }
          
          .main-subtitle {
            font-size: 1rem;
          }
          
          .content-card, .glass-card {
            padding: 25px;
          }
          
          .stat-card, .team-card {
            padding: 25px 20px;
          }
          
          .team-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
          
          .floating-circle, .floating-triangle, .floating-spice {
            opacity: 0.3;
            transform: scale(0.7);
          }
        }

        @media (max-width: 480px) {
          .about-wrapper {
            padding: 40px 10px;
          }
          
          .main-title {
            font-size: 1.8rem;
          }
          
          .icon-wrapper-main {
            width: 60px;
            height: 60px;
            margin-bottom: 20px;
          }
          
          .content-card, .glass-card {
            padding: 20px;
          }
          
          .stat-card, .team-card {
            padding: 20px 15px;
          }
          
          .floating-circle, .floating-triangle, .floating-spice {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
