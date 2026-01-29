import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="contact-page-container">
            <div className="contact-wrapper">
                {/* Header */}
                <div className="contact-header">
                    <div className="icon-wrapper-center mb-6">
                        <div className="icon-circle-large-contact">
                            <Mail size={40} className="text-white" />
                        </div>
                    </div>
                    <h1 className="page-title text-white mb-4">Contact Us</h1>
                    <p className="page-subtitle text-light-orange">Get in Touch with IEEE EdSoc KARE</p>
                </div>

                <div className="contact-grid mb-16">
                    {/* Contact Form */}
                    <div className="contact-form-card shadow-2xl">
                        <h2 className="section-title text-orange mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="form-space">
                            <div>
                                <label className="form-label mb-2">
                                    <User size={18} className="text-light-orange" />
                                    <span>Your Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="form-label mb-2">
                                    <Mail size={18} className="text-light-orange" />
                                    <span>Your Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label className="form-label mb-2">
                                    <MessageSquare size={18} className="text-light-orange" />
                                    <span>Your Message</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="form-textarea"
                                    placeholder="Tell us what you'd like to know or discuss..."
                                />
                            </div>

                            {submitted && (
                                <div className="success-message">
                                    Thank you! Your message has been sent successfully.
                                </div>
                            )}

                            <Button variant="primary" size="lg" className="w-full">
                                <Send size={20} className="mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="info-stack">
                        <div className="info-card-plain shadow-lg">
                            <h2 className="section-title text-orange mb-6">Contact Information</h2>

                            <div className="info-list">
                                <div className="info-item">
                                    <div className="icon-circle-small flex-shrink-0">
                                        <MapPin size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-light-orange mb-2 font-semibold">Address</h3>
                                        <p className="text-dim-90">
                                            School of Computing<br />
                                            Department of Computer Science and Engineering<br />
                                            Kalasalingam Academy of Research and Education<br />
                                            Krishnankoil, Tamil Nadu - 626126<br />
                                            India
                                        </p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="icon-circle-small flex-shrink-0">
                                        <Mail size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-light-orange mb-2 font-semibold">Email</h3>
                                        <a href="mailto:ieeeedsoc@klu.ac.in" className="text-dim-90 hover-orange transition-colors">
                                            ieeeedsoc@klu.ac.in
                                        </a>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="icon-circle-small flex-shrink-0">
                                        <Phone size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-light-orange mb-2 font-semibold">Phone</h3>
                                        <p className="text-dim-90">+91 XXXXX XXXXX</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Student Coordinators */}
                        <div className="info-card-plain shadow-lg">
                            <h2 className="section-title-medium text-orange mb-6">Student Coordinators</h2>

                            <div className="coordinator-list">
                                <div className="coordinator-item">
                                    <p className="text-light-orange font-semibold mb-1">Rajesh Kumar</p>
                                    <p className="text-dim-80 text-sm mb-2">Chapter President</p>
                                    <a href="mailto:president@ieeeedsoc.klu.ac.in" className="contact-link-small hover-underline">
                                        president@ieeeedsoc.klu.ac.in
                                    </a>
                                </div>

                                <div className="coordinator-item">
                                    <p className="text-light-orange font-semibold mb-1">Priya Sharma</p>
                                    <p className="text-dim-80 text-sm mb-2">Vice President</p>
                                    <a href="mailto:vp@ieeeedsoc.klu.ac.in" className="contact-link-small hover-underline">
                                        vp@ieeeedsoc.klu.ac.in
                                    </a>
                                </div>

                                <div className="coordinator-item">
                                    <p className="text-light-orange font-semibold mb-1">Aditya Krishnan</p>
                                    <p className="text-dim-80 text-sm mb-2">Event Coordinator</p>
                                    <a href="mailto:events@ieeeedsoc.klu.ac.in" className="contact-link-small hover-underline">
                                        events@ieeeedsoc.klu.ac.in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Join IEEE Section */}
                <section className="join-section shadow-2xl">
                    <h2 className="section-title-large text-white mb-4">Become a Member of IEEE Education Society</h2>
                    <p className="text-white-90 text-lg mb-8 max-w-3xl mx-auto">
                        Join the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity. As an IEEE member, you'll gain access to exclusive resources, networking opportunities, and professional development programs.
                    </p>

                    <div className="benefits-grid-bottom mb-8">
                        <div className="benefit-box">
                            <h3 className="text-white font-semibold mb-2">Access Resources</h3>
                            <p className="text-white-80 text-sm">
                                IEEE journals, publications, and educational materials
                            </p>
                        </div>
                        <div className="benefit-box">
                            <h3 className="text-white font-semibold mb-2">Network Globally</h3>
                            <p className="text-white-80 text-sm">
                                Connect with professionals worldwide
                            </p>
                        </div>
                        <div className="benefit-box">
                            <h3 className="text-white font-semibold mb-2">Advance Your Career</h3>
                            <p className="text-white-80 text-sm">
                                Certifications and professional development
                            </p>
                        </div>
                    </div>

                    <div className="cta-group">
                        <a
                            href="https://www.ieee.org/membership/join/index.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-white"
                        >
                            Join IEEE Now
                        </a>
                        <button
                            onClick={() => navigate('/about')}
                            className="btn-outline-white"
                        >
                            Learn More About Us
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contact;
