import React from 'react';
import TeamCard from '../components/TeamCard';
import { Users } from 'lucide-react';
import './Team.css';

const Team = () => {
    const facultyCoordinators = [
        {
            name: 'Dr. P. CHINNASAMY',
            role: 'Associate Professor/CSE',
            linkedin: '#',
            email: 'chinnasamy@klu.ac.in'
        },
        {
            name: 'Mr. GNANAKUMAR D',
            role: 'Assistant Professor/CSE',
            linkedin: '#',
            email: 'gnanakumar@klu.ac.in'
        }
    ];

    const coreTeam = [
        {
            name: 'Student 1',
            role: 'President',
            linkedin: '#',
            email: 'president@ieee.klu.ac.in'
        },
        {
            name: 'Student 2',
            role: 'Vice President',
            linkedin: '#',
            email: 'vp@ieee.klu.ac.in'
        },
        {
            name: 'Student 3',
            role: 'Secretary',
            linkedin: '#',
            email: 'secretary@ieee.klu.ac.in'
        },
        {
            name: 'Student 4',
            role: 'Treasurer',
            linkedin: '#',
            email: 'treasurer@ieee.klu.ac.in'
        }
    ];

    const techTeam = [
        {
            name: 'Student 5',
            role: 'Technical Lead',
            linkedin: '#',
            email: 'techlead@ieee.klu.ac.in'
        },
        {
            name: 'Student 6',
            role: 'Web Developer',
            linkedin: '#',
            email: 'webdev@ieee.klu.ac.in'
        },
        {
            name: 'Student 7',
            role: 'Design Lead',
            linkedin: '#',
            email: 'design@ieee.klu.ac.in'
        }
    ];

    const coordinators = [
        {
            name: 'Student 8',
            role: 'Event Coordinator',
            linkedin: '#',
            email: 'events@ieee.klu.ac.in'
        },
        {
            name: 'Student 9',
            role: 'Marketing Coordinator',
            linkedin: '#',
            email: 'marketing@ieee.klu.ac.in'
        },
        {
            name: 'Student 10',
            role: 'Outreach Coordinator',
            linkedin: '#',
            email: 'outreach@ieee.klu.ac.in'
        }
    ];

    return (
        <div className="team-page-container">
            <div className="team-wrapper">
                {/* Header */}
                <div className="team-header">
                    <div className="icon-wrapper-center mb-6">
                        <div className="icon-circle-large-team">
                            <Users size={40} className="text-white" />
                        </div>
                    </div>
                    <h1 className="page-title text-white mb-4">Our Team</h1>
                    <p className="page-subtitle text-light-orange">The People Behind IEEE EdSoc KARE</p>
                </div>

                {/* Faculty Coordinators */}
                <section className="team-section">
                    <div className="section-header-center mb-12">
                        <h2 className="section-title-large text-white mb-4">Faculty Coordinators</h2>
                        <p className="section-subtitle-medium text-light-orange">Guiding Our Journey to Excellence</p>
                    </div>
                    <div className="team-grid-2">
                        {facultyCoordinators.map((member, index) => (
                            <TeamCard key={index} {...member} />
                        ))}
                    </div>
                </section>

                {/* Core Team */}
                <section className="team-section">
                    <div className="section-header-center mb-12">
                        <h2 className="section-title-large text-white mb-4">Core Team</h2>
                        <p className="section-subtitle-medium text-light-orange">Leadership & Management</p>
                    </div>
                    <div className="team-grid-4">
                        {coreTeam.map((member, index) => (
                            <TeamCard key={index} {...member} />
                        ))}
                    </div>
                </section>

                {/* Technical Team */}
                <section className="team-section">
                    <div className="section-header-center mb-12">
                        <h2 className="section-title-large text-white mb-4">Technical Team</h2>
                        <p className="section-subtitle-medium text-light-orange">Innovation & Development</p>
                    </div>
                    <div className="team-grid-3">
                        {techTeam.map((member, index) => (
                            <TeamCard key={index} {...member} />
                        ))}
                    </div>
                </section>

                {/* Student Coordinators */}
                <section className="team-section">
                    <div className="section-header-center mb-12">
                        <h2 className="section-title-large text-white mb-4">Student Coordinators</h2>
                        <p className="section-subtitle-medium text-light-orange">Execution & Outreach</p>
                    </div>
                    <div className="team-grid-3">
                        {coordinators.map((member, index) => (
                            <TeamCard key={index} {...member} />
                        ))}
                    </div>
                </section>

                {/* Join Team CTA */}
                <section className="join-team-cta">
                    <h2 className="section-title text-white mb-4">Want to Join Our Team?</h2>
                    <p className="text-light-orange text-lg mb-8">
                        We're always looking for passionate individuals to contribute to our mission. If you're interested in technology, education, and leadership, we'd love to hear from you!
                    </p>
                    <button className="btn-primary-team">
                        Express Your Interest
                    </button>
                </section>
            </div>
        </div>
    );
};

export default Team;
