import React from 'react';
import { Target, Eye, BookOpen, Award, Users, GraduationCap } from 'lucide-react';
import KareUniversityImg from '../assets/kare-university.png';
import './About.css';

const About = () => {
    return (
        <div className="about-page-container">
            <div className="about-wrapper">
                {/* Header */}
                <div className="about-header">
                    <h1 className="page-title">About Us</h1>
                    <p className="page-subtitle">Empowering the Next Generation of Technologists</p>
                </div>

                {/* IEEE Education Society Introduction */}
                <section className="about-section">
                    <div className="content-card">
                        <div className="grid-2-col center-items">
                            <div>
                                <h2 className="section-title text-orange mb-6">IEEE Education Society</h2>
                                <p className="text-dim mb-4">
                                    The IEEE Education Society is a global organization dedicated to advancing excellence in education and developing technologies for effective teaching and learning. Our mission is to be the premier international organization promoting innovative education activities in electrical and electronics engineering and allied fields.
                                </p>
                                <p className="text-dim mb-4">
                                    We provide quality programs and services to members worldwide, fostering collaboration between educators, researchers, and students to enhance educational methods and technologies.
                                </p>
                                <p className="tagline-italic">
                                    "Advancing Technology for Humanity"
                                </p>
                            </div>
                            <div className="image-container">
                                <img
                                    src="https://images.unsplash.com/photo-1573757056004-065ad36e2cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwdGVjaG5vbG9neSUyMGZ1dHVyZXxlbnwxfHx8fDE3Njk1MDc0MzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                    alt="Innovation"
                                    className="rounded-image shadow-effect"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="about-section">
                    <div className="grid-2-col">
                        <div className="info-card hover-effect">
                            <div className="icon-circle mb-6">
                                <Target size={32} />
                            </div>
                            <h3 className="card-title mb-4">Our Mission</h3>
                            <p className="text-dim">
                                To foster excellence in education, research, and professional development through innovative technology solutions. We aim to create a collaborative environment where students can explore, learn, and contribute to the advancement of educational technologies.
                            </p>
                        </div>

                        <div className="info-card hover-effect">
                            <div className="icon-circle mb-6">
                                <Eye size={32} />
                            </div>
                            <h3 className="card-title mb-4">Our Vision</h3>
                            <p className="text-dim">
                                To be the leading student chapter that bridges the gap between academic learning and industry requirements, preparing students to become future leaders in technology and education while maintaining the highest standards of IEEE excellence.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Chapter Role */}
                <section className="about-section">
                    <div className="section-header-center mb-12">
                        <h2 className="section-title-large text-white mb-4">Role of Our Chapter</h2>
                        <p className="section-subtitle-medium text-light-orange">How We Impact Education & Technology</p>
                    </div>

                    <div className="grid-3-col">
                        <div className="role-card hover-scale">
                            <BookOpen className="role-icon text-orange mb-4" size={48} />
                            <h3 className="text-white mb-3">Educational Excellence</h3>
                            <p className="text-dim-80">
                                Organizing workshops, seminars, and training programs to enhance technical and soft skills of students.
                            </p>
                        </div>

                        <div className="role-card hover-scale">
                            <Users className="role-icon text-orange mb-4" size={48} />
                            <h3 className="text-white mb-3">Community Building</h3>
                            <p className="text-dim-80">
                                Creating a vibrant community of technology enthusiasts who collaborate and innovate together.
                            </p>
                        </div>

                        <div className="role-card hover-scale">
                            <Award className="role-icon text-orange mb-4" size={48} />
                            <h3 className="text-white mb-3">Recognition & Growth</h3>
                            <p className="text-dim-80">
                                Providing platforms for students to showcase their talents and gain recognition at national and international levels.
                            </p>
                        </div>
                    </div>
                </section>

                {/* University Section */}
                <section className="about-section">
                    <div className="university-card">
                        <div className="grid-2-col center-items">
                            <div className="image-container">
                                <img
                                    src={KareUniversityImg}
                                    alt="University Campus"
                                    className="rounded-image shadow-effect"
                                />
                            </div>
                            <div>
                                <div className="icon-circle mb-6">
                                    <GraduationCap size={32} className="text-white" />
                                </div>
                                <h2 className="section-title text-orange mb-6">
                                    Kalasalingam Academy of Research and Education
                                </h2>
                                <p className="text-dim mb-4">
                                    Kalasalingam Academy of Research and Education (Deemed to be University) is a premier institution committed to excellence in education, research, and innovation. Located in Krishnankoil, Tamil Nadu, KARE has been consistently ranked among the top universities in India.
                                </p>
                                <div className="university-details">
                                    <div className="detail-row">
                                        <div className="dot"></div>
                                        <p className="text-dim">
                                            <span className="text-light-orange font-semibold">School of Computing:</span> A center of excellence fostering innovation in computer science and engineering.
                                        </p>
                                    </div>
                                    <div className="detail-row">
                                        <div className="dot"></div>
                                        <p className="text-dim">
                                            <span className="text-light-orange font-semibold">Department of CSE:</span> Dedicated to producing skilled professionals ready for industry challenges.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Faculty Advisors */}
                <section className="about-section">
                    <div className="section-header-center mb-12">
                        <h2 className="section-title-large text-white mb-4">Faculty Advisors</h2>
                        <p className="section-subtitle-medium text-light-orange">Guiding Our Journey to Excellence</p>
                    </div>

                    <div className="advisor-grid">
                        <div className="advisor-card hover-shadow">
                            <div className="advisor-avatar">
                                PC
                            </div>
                            <h3 className="text-white mb-2">Dr. P. CHINNASAMY</h3>
                            <p className="text-orange text-sm mb-3">Associate Professor/CSE</p>
                            <p className="text-dim-80 text-sm">
                                Department of Computer Science and Engineering
                            </p>
                        </div>

                        <div className="advisor-card hover-shadow">
                            <div className="advisor-avatar">
                                GD
                            </div>
                            <h3 className="text-white mb-2">Mr. GNANAKUMAR D</h3>
                            <p className="text-orange text-sm mb-3">Assistant Professor/CSE</p>
                            <p className="text-dim-80 text-sm">
                                Department of Computer Science and Engineering
                            </p>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="cta-box text-center">
                    <h2 className="section-title text-white mb-4">Join Our Growing Community</h2>
                    <p className="section-subtitle-medium text-light-orange mb-6">
                        Be part of a dynamic community that shapes the future of technology and education.
                    </p>
                    <div className="cta-links">
                        <a
                            href="https://www.ieee.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary-link"
                        >
                            Visit IEEE.org
                        </a>
                        <a
                            href="https://edusocie.ieee.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline-link"
                        >
                            IEEE Education Society
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
