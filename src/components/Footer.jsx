import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container-new">
            <div className="footer-content-wrapper">
                <div className="footer-grid">
                    {/* About Section */}
                    <div>
                        <h3 className="footer-heading">IEEE Education Society</h3>
                        <p className="footer-text-dim mb-4">
                            Empowering education through technology at Kalasalingam Academy of Research and Education.
                        </p>
                        <p className="footer-tagline">
                            "Advancing Technology for Humanity"
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="footer-heading">Quick Links</h3>
                        <ul className="footer-links-list">
                            <li>
                                <a href="https://www.ieee.org/" target="_blank" rel="noopener noreferrer" className="footer-link">
                                    IEEE.org
                                </a>
                            </li>
                            <li>
                                <a href="https://edusocie.ieee.org/" target="_blank" rel="noopener noreferrer" className="footer-link">
                                    IEEE Education Society
                                </a>
                            </li>
                            <li>
                                <a href="https://www.klu.ac.in/" target="_blank" rel="noopener noreferrer" className="footer-link">
                                    Kalasalingam University
                                </a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">
                                    Join IEEE
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="footer-heading">Contact Us</h3>
                        <div className="footer-contact-list">
                            <div className="contact-item-row">
                                <MapPin size={16} className="contact-icon mt-1" />
                                <p>
                                    School of Computing, Dept. of CSE<br />
                                    Kalasalingam Academy of Research and Education<br />
                                    Krishnankoil, Tamil Nadu - 626126
                                </p>
                            </div>
                            <div className="contact-item-row center-align">
                                <Mail size={16} className="contact-icon" />
                                <a href="mailto:ieeeedsoc@klu.ac.in" className="footer-link">
                                    ieeeedsoc@klu.ac.in
                                </a>
                            </div>
                            <div className="contact-item-row center-align">
                                <Phone size={16} className="contact-icon" />
                                <p>+91 XXXXX XXXXX</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media & Copyright */}
                <div className="footer-bottom-bar">
                    <div className="footer-socials">
                        <a href="#" className="social-link-item"><Linkedin size={20} /></a>
                        <a href="#" className="social-link-item"><Twitter size={20} /></a>
                        <a href="#" className="social-link-item"><Instagram size={20} /></a>
                        <a href="#" className="social-link-item"><Facebook size={20} /></a>
                    </div>
                    <p className="copyright-text">
                        © {new Date().getFullYear()} IEEE Education Society - KARE. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
