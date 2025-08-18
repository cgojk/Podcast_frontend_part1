import React from "react"
import FormsContact from "../components/FormsContact.jsx";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPinterest } from 'react-icons/fa';

export default function Contact() {
    return (
        <section className="contact-section">
        <div className="contact-page">
            
            <div className="about-page-content">
                
            </div>
            <div className="about-page-cta">
               
                
            </div>
        </div>
        <FormsContact/>
       
        <section class="social section">
          <div class="container">
            <p>Follow us on social media for updates and news about our Podcasts </p>
              <div class="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow Us On Facebook">
                  <FaFacebook size={32} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Follow Us On Twitter">
                  <FaTwitter size={32} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow Us On Instagram">
                  <FaInstagram size={32} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Follow Us On Linkedin">
                      <FaLinkedin size={32} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Follow Us On Youtube">
                <FaYoutube size={32} />
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Follow Us On Pinterest">
                  <FaPinterest size={32} />
                </a>
              </div>
            </div>
          </section>
        </section>

    );
}