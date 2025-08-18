import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Site Info or Logo */}
        <div className="footer-brand">
          <Link to="/">
                  <img src="/images/Footer_logo2.png" className="footer-logo" alt="Podcast logo" />

               </Link>
          
          <p>&copy; {new Date().getFullYear()} Corrupted Frequency.</p> 
          <p>All rights reserved.</p>
         
        </div>

        {/* Footer Navigation */}
        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/podcasts">Podcasts</Link></li>
          <li><Link to="/contact">Merch</Link></li>
          <li><Link to="/press">Press</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>
    </footer>
  );
}