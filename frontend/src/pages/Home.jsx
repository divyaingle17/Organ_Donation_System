import React from "react";
import { Link } from "react-router-dom";
import { Heart, Users, HandHeart } from "lucide-react";

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Give the Gift of Life ❤️</h1>
        <p>
          Join our mission to save lives through organ donation and make a real
          impact.
        </p>
        <div className="hero-buttons">
          <Link to="/donors" className="btn primary">
            Become a Donor
          </Link>
          <Link to="/recipients" className="btn secondary">
            Find an Organ
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>Why Organ Donation Matters</h2>
        <div className="cards">
          <div className="card">
            <Heart size={40} color="#16a34a" />
            <h3>Save Lives</h3>
            <p>
              One donor can save up to eight lives and improve many more through
              tissue donation.
            </p>
          </div>
          <div className="card">
            <Users size={40} color="#16a34a" />
            <h3>Build a Better Society</h3>
            <p>
              Your decision inspires others to join a compassionate, life-saving
              community.
            </p>
          </div>
          <div className="card">
            <HandHeart size={40} color="#16a34a" />
            <h3>Spread Awareness</h3>
            <p>
              Awareness is key — encourage family and friends to register and
              become donors.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to Make a Difference?</h2>
        <p>
          Take the first step today — become a donor or help someone find hope.
        </p>
        <div className="cta-buttons">
          <Link to="/donor/register" className="btn primary">
            Register as Donor
          </Link>
          <Link to="/contact" className="btn secondary">
            Contact Us
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} OrganLife | Made with ❤️ to save lives
        </p>
      </footer>

      {/* Inline CSS */}
      <style>{`
        .home-container {
          font-family: Arial, sans-serif;
          color: #333;
          background-color: #f9fafb;
          margin: 0;
          padding: 0;
        }

        .hero {
          background: linear-gradient(to right, #16a34a, #14b8a6);
          color: white;
          text-align: center;
          padding: 80px 20px;
        }

        .hero h1 {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .hero p {
          font-size: 1.1rem;
          margin-bottom: 25px;
        }

        .hero-buttons, .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-block;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
          text-decoration: none;
          transition: 0.3s;
        }

        .btn.primary {
          background: white;
          color: #16a34a;
          border: none;
        }

        .btn.primary:hover {
          background: #f0f0f0;
        }

        .btn.secondary {
          border: 2px solid white;
          color: white;
          background: transparent;
        }

        .btn.secondary:hover {
          background: white;
          color: #16a34a;
        }

        .about {
          text-align: center;
          padding: 60px 20px;
          max-width: 1000px;
          margin: auto;
        }

        .about h2 {
          font-size: 2rem;
          margin-bottom: 30px;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .card {
          background: white;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: 0.3s;
        }

        .card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .card h3 {
          font-size: 1.2rem;
          margin: 10px 0;
        }

        .cta {
          background: #16a34a;
          color: white;
          text-align: center;
          padding: 60px 20px;
        }

        .cta h2 {
          font-size: 2rem;
          margin-bottom: 15px;
        }

        .cta p {
          font-size: 1.1rem;
          margin-bottom: 25px;
        }

        .footer {
          background: #111827;
          color: #d1d5db;
          text-align: center;
          padding: 20px;
          font-size: 0.9rem;
        }

        @media (max-width: 600px) {
          .hero h1 {
            font-size: 2rem;
          }
          .about h2, .cta h2 {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  );
}
