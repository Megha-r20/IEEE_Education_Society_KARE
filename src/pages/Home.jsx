import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import EventCard from '../components/EventCard';
import { GraduationCap, Users, Lightbulb, Award, Rocket, Code, Trophy } from 'lucide-react';
import ieeeLogo from '../assets/ieee-edu-logo.png';
import hyperLaunchImg from '../assets/hyper-launch-event.png';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg-effects">
                    <div className="blur-circle-orange"></div>
                    <div className="blur-circle-blue"></div>
                </div>

                <div className="hero-content">
                    <div className="hero-text-center">
                        <div className="logo-wrapper-center">
                            <img
                                src={ieeeLogo}
                                alt="IEEE Education Society"
                                className="hero-logo"
                            />
                        </div>

                        <h1 className="hero-title text-white">
                            Kalasalingam Academy of Research and Education
                        </h1>
                        <p className="hero-subtitle text-orange">
                            Empowering Education Through Technology
                        </p>

                        <div className="hero-actions">
                            <Button variant="primary" size="lg" className="hero-btn" onClick={() => navigate('/contact')}>
                                Join IEEE
                            </Button>
                            <Button variant="outline" size="lg" className="hero-btn btn-outline-orange" onClick={() => navigate('/events')}>
                                View Events
                            </Button>
                        </div>

                        {/* Recognition Badge */}
                        <div className="recognition-badge">
                            <Award className="text-orange" size={20} />
                            <span>Officially Recognized IEEE Chapter</span>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="stats-grid-home">
                        <div className="stat-card-home hover-scale">
                            <Users className="mx-auto stat-icon text-orange" size={32} />
                            <p className="stat-value text-white">50+</p>
                            <p className="stat-label text-dim-80">Active Members</p>
                        </div>
                        <div className="stat-card-home hover-scale">
                            <Rocket className="mx-auto stat-icon text-orange" size={32} />
                            <p className="stat-value text-white">2+</p>
                            <p className="stat-label text-dim-80">Events Conducted</p>
                        </div>
                        <div className="stat-card-home hover-scale">
                            <Trophy className="mx-auto stat-icon text-orange" size={32} />
                            <p className="stat-value text-white">10+</p>
                            <p className="stat-label text-dim-80">Winners & Achievers</p>
                        </div>
                        <div className="stat-card-home hover-scale">
                            <Code className="mx-auto stat-icon text-orange" size={32} />
                            <p className="stat-value text-white">50+</p>
                            <p className="stat-label text-dim-80">Hours of Learning</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Event Section */}
            <section className="featured-section">
                <div className="featured-wrapper">
                    <div className="featured-header">
                        <h2 className="section-title-large text-white">Featured Event</h2>
                        <p className="section-subtitle-medium text-orange">Our Latest Achievement</p>
                    </div>

                    <div className="featured-card-wrapper">
                        <EventCard
                            title="HYPER LAUNCH – EDU TECH HACK SERIES 2K26"
                            date="24, 25 & 26 January 2026"
                            venue="9th Block Seminar Hall"
                            duration="36 Hours"
                            description="An intensive 36-hour hackathon focused on educational technology innovation. Students competed to develop cutting-edge solutions for modern educational challenges, showcasing their technical skills and creativity."
                            image={hyperLaunchImg}
                            status="completed"
                            highlights={[
                                'Internship opportunities for top performers',
                                '2 IEEE credits for all participants',
                                'Industry mentor guidance',
                                'Cash prizes and certificates'
                            ]}
                        />
                    </div>

                    <div className="view-all-container">
                        <Button variant="primary" size="lg" className="view-all-btn font-semibold" onClick={() => navigate('/events')}>
                            View All Events
                        </Button>
                    </div>
                </div>
            </section>

            {/* Why Join Section */}
            <section className="why-join-section">
                <div className="why-join-wrapper">
                    <div className="section-header-center">
                        <h2 className="section-title-large text-white">Why Join IEEE EdSoc?</h2>
                        <p className="section-subtitle-medium text-light-orange">Benefits of Being Part of Our Chapter</p>
                    </div>

                    <div className="benefits-grid">
                        <div className="benefit-card hover-shadow-orange">
                            <div className="icon-circle-benefit">
                                <GraduationCap size={32} className="text-white" />
                            </div>
                            <h3 className="benefit-title text-orange text-xl">Professional Development</h3>
                            <p className="text-dim-80">
                                Access to IEEE resources, workshops, and certification programs to enhance your technical and professional skills.
                            </p>
                        </div>

                        <div className="benefit-card hover-shadow-orange">
                            <div className="icon-circle-benefit">
                                <Users size={32} className="text-white" />
                            </div>
                            <h3 className="benefit-title text-orange text-xl">Networking Opportunities</h3>
                            <p className="text-dim-80">
                                Connect with industry professionals, faculty, and peers who share your passion for technology and education.
                            </p>
                        </div>

                        <div className="benefit-card hover-shadow-orange">
                            <div className="icon-circle-benefit">
                                <Lightbulb size={32} className="text-white" />
                            </div>
                            <h3 className="benefit-title text-orange text-xl">Innovation & Research</h3>
                            <p className="text-dim-80">
                                Participate in hackathons, research projects, and technical competitions to showcase your innovation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Community Card */}
            <section className="community-cta-section">
                <div className="community-card">
                    <h2 className="community-title text-white">Join Our Growing Community</h2>
                    <p className="community-description text-light-orange">
                        Be part of a dynamic community that shapes the future of technology and education.
                    </p>
                    <div className="community-actions">
                        <a
                            href="https://www.ieee.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="community-btn-primary"
                        >
                            Visit IEEE.org
                        </a>
                        <a
                            href="https://edusocie.ieee.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="community-btn-outline"
                        >
                            IEEE Education Society
                        </a>
                    </div>
                </div>
            </section>

            {/* University Affiliation Section */}
            <section className="affiliation-section">
                <div className="affiliation-content">
                    <p className="text-light-orange affiliation-subtitle">Proudly Associated With</p>
                    <h3 className="text-white affiliation-title">Kalasalingam Academy of Research and Education</h3>
                    <p className="text-dim-80">School of Computing | Department of Computer Science and Engineering</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
