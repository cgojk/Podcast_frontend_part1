import React from "react"
import FormsContact from "../components/FormsContact.jsx";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPinterest } from 'react-icons/fa';

export default function Contact() {
    return (
    <section className="contact-section container">
        

            <h1 className="team-title center">Contact Us</h1>
            
            <p className="title_section-sm"> We would love to hear from you. Whether you have a question about our podcasts, need assistance, or just want to share your thoughts, we are here to help.</p>
        
        <FormsContact/>
       
        <section class="social_section">
          <div class="container">
            <p className="title_section-sm color">Follow us on social media for updates and news about our Podcasts </p>
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