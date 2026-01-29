import React from 'react';
import { Award, CheckCircle, Calendar, TrendingUp, Star, Lightbulb, Users, Rocket } from 'lucide-react';
import './Achievements.css';

const Achievements = () => {
    const milestones = [
        {
            year: '2024',
            month: 'March',
            title: 'Idea Conception',
            description: 'The vision to establish an IEEE Education Society Student Branch Chapter at Kalasalingam Academy of Research and Education (KARE) was conceived by a group of passionate students aiming to promote innovation and excellence in education through technology.',
            icon: Lightbulb
        },
        {
            year: '2024',
            month: 'May',
            title: 'Core Team Formation',
            description: 'A committed student core team was formed to lead the initiative. With guidance from faculty mentors, the team worked towards aligning with IEEE standards, planning impactful activities, and building a strong foundation for the chapter.',
            icon: Users
        },
        {
            year: '2025',
            month: 'August 18',
            title: 'IEEE Chapter Officially Recognized',
            description: 'The IEEE Education Society officially approved the Student Branch Chapter at KARE (Chapter ID: SBC34451H), marking a significant milestone and granting global recognition to our efforts.',
            icon: Award
        },
        {
            year: '2025',
            month: 'September',
            title: 'Launch of IEEE Societies',
            description: 'The IEEE Student Branch at KARE successfully launched four IEEE societies — Education, Signal Processing, Photonics, and Information Theory — creating new platforms for research, collaboration, and student engagement.',
            icon: CheckCircle
        },
        {
            year: '2026',
            month: 'January',
            title: 'HYPER LAUNCH – Edu Tech Hack Series 2K26',
            description: 'Our chapter organized HYPER LAUNCH, a flagship 36-hour EdTech hackathon, bringing together innovative minds to solve real-world challenges. The event featured industry collaboration, IEEE EE credits, internship opportunities, and showcased student creativity and technical excellence.',
            icon: Rocket
        },
        {
            year: 'Future',
            month: 'Next',
            title: 'So More to Go… 🚀',
            description: 'With a strong foundation in place, our chapter continues to grow through technical workshops, hackathons, industry collaborations, research initiatives, and leadership development—driving lasting impact in education and technology.',
            icon: TrendingUp
        }
    ];

    const achievements = [
        {
            title: 'Events Conducted',
            count: '2+',
            description: 'Technical workshops, hackathons, and seminars',
            colorClass: 'gradient-orange'
        },
        {
            title: 'Student Participation',
            count: '50+',
            description: 'Active participants across all events',
            colorClass: 'gradient-blue'
        },
        {
            title: 'Workshops Planned',
            count: '5+',
            description: 'Upcoming technical sessions for members',
            colorClass: 'gradient-orange'
        },
        {
            title: 'Industry Collaborations',
            count: '2+',
            description: 'Partnerships with leading tech companies',
            colorClass: 'gradient-blue'
        }
    ];

    return (
        <div className="achievements-page-container">
            <div className="achievements-wrapper">
                {/* Header */}
                <div className="achievements-header">
                    <div className="icon-wrapper-center mb-6">
                        <div className="icon-circle-large">
                            <Award size={40} className="text-white" />
                        </div>
                    </div>
                    <h1 className="page-title text-white mb-4">Achievements & Recognition</h1>
                    <p className="page-subtitle text-light-orange">Celebrating Our Journey of Excellence</p>
                </div>

                {/* IEEE Recognition Section */}
                <section className="achievements-section">
                    <div className="recognition-card">
                        <div className="p-8-12">
                            <div className="flex-col-md-row gap-8">
                                <div className="flex-shrink-0">
                                    <div className="icon-circle-xl shadow-2xl">
                                        <CheckCircle size={64} className="text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="badge-pill mb-4">
                                        Official Recognition
                                    </div>
                                    <h2 className="section-title text-white mb-4">
                                        IEEE Education Society Chapter Approval
                                    </h2>
                                    <p className="text-dim mb-4">
                                        We are proud to announce that our student chapter has been officially recognized and approved by the IEEE Education Society. This recognition validates our commitment to advancing education through technology and our dedication to maintaining the highest standards of IEEE excellence.
                                    </p>
                                    <div className="quote-box">
                                        <p className="text-light-orange italic">
                                            "The IEEE Education Society Student Chapter at Kalasalingam Academy of Research and Education has demonstrated exceptional commitment to promoting excellence in education and technology. We are pleased to grant official recognition to this dynamic student chapter."
                                        </p>
                                        <p className="text-white mt-3 text-sm">
                                            - IEEE Education Society
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Achievements Stats */}
                <section className="achievements-section">
                    <div className="section-header-center mb-12">
                        <h2 className="section-title-large text-white mb-4">By The Numbers</h2>
                        <p className="section-subtitle-medium text-light-orange">Our Impact in Statistics</p>
                    </div>
                    <div className="stats-grid">
                        {achievements.map((achievement, index) => (
                            <div
                                key={index}
                                className={`stat-card-gradient ${achievement.colorClass} hover-scale`}
                            >
                                <p className="stat-count mb-3">{achievement.count}</p>
                                <p className="stat-title mb-2">{achievement.title}</p>
                                <p className="stat-desc">{achievement.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="achievements-section">
                    <div className="section-header-center mb-12">
                        <h2 className="section-title-large text-white mb-4">Our Journey</h2>
                        <p className="section-subtitle-medium text-light-orange">Timeline of Milestones</p>
                    </div>

                    <div className="timeline-container">
                        {/* Timeline Line */}
                        <div className="timeline-line"></div>

                        {/* Timeline Items */}
                        <div className="timeline-items">
                            {milestones.map((milestone, index) => {
                                const Icon = milestone.icon;
                                const isEven = index % 2 === 0;

                                return (
                                    <div
                                        key={index}
                                        className={`timeline-item ${isEven ? 'row-normal' : 'row-reverse'}`}
                                    >
                                        {/* Content */}
                                        <div className={`timeline-content ${isEven ? 'content-left' : 'content-right'}`}>
                                            <div className="timeline-card hover-shadow">
                                                <div className="badge-pill-small mb-3">
                                                    {milestone.month} {milestone.year}
                                                </div>
                                                <h3 className="text-orange mb-2">{milestone.title}</h3>
                                                <p className="text-dim-80 text-sm">{milestone.description}</p>
                                            </div>
                                        </div>

                                        {/* Icon */}
                                        <div className="timeline-icon-wrapper">
                                            <Icon size={28} className="text-white" />
                                        </div>

                                        {/* Spacer for alternating layout */}
                                        <div className="timeline-spacer"></div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Recognition Badges */}
                <section className="achievements-section">
                    <div className="section-header-center mb-12">
                        <h2 className="section-title-large text-white mb-4">Certifications & Badges</h2>
                        <p className="section-subtitle-medium text-light-orange">Our Official Credentials</p>
                    </div>

                    <div className="badges-grid">
                        <div className="badge-card hover-scale">
                            <div className="badge-icon-circle mb-6">
                                <Award size={48} className="text-white" />
                            </div>
                            <h3 className="text-white mb-3">IEEE Chapter Status</h3>
                            <p className="text-dim-80 text-sm">
                                Officially recognized IEEE Education Society Student Chapter
                            </p>
                        </div>

                        <div className="badge-card hover-scale">
                            <div className="badge-icon-circle mb-6">
                                <Star size={48} className="text-white" />
                            </div>
                            <h3 className="text-white mb-3">Active Chapter</h3>
                            <p className="text-dim-80 text-sm">
                                Consistently active in conducting quality educational programs
                            </p>
                        </div>

                        <div className="badge-card hover-scale">
                            <div className="badge-icon-circle mb-6">
                                <TrendingUp size={48} className="text-white" />
                            </div>
                            <h3 className="text-white mb-3">Growing Impact</h3>
                            <p className="text-dim-80 text-sm">
                                Expanding reach and influence in the academic community
                            </p>
                        </div>
                    </div>
                </section>

                {/* Future Goals */}
                <section className="goals-section">
                    <Calendar size={48} className="mx-auto text-orange mb-6" />
                    <h2 className="section-title text-white mb-4">Looking Ahead</h2>
                    <p className="text-light-orange text-lg mb-6 max-w-3xl mx-auto">
                        As we continue to grow, we aim to expand our impact by conducting more innovative programs, fostering industry partnerships, and providing our members with unparalleled opportunities for professional growth and development.
                    </p>
                    <div className="goals-tags">
                        <div className="goal-tag">
                            International Collaborations
                        </div>
                        <div className="goal-tag">
                            Research Publications
                        </div>
                        <div className="goal-tag">
                            More Hackathons
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Achievements;
