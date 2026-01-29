import React from 'react';
import EventCard from '../components/EventCard';
import { Trophy, Award, Calendar, CheckCircle, Check } from 'lucide-react';
import hyperLaunchImg from '../assets/hyper-launch-event.png';
import hyperLaunchFull from '../assets/hyper-launch-full.png';
import './Events.css';

const Events = () => {
    return (
        <div className="events-page-container">
            <div className="events-wrapper">
                {/* Header */}
                <div className="events-header">
                    <h1 className="page-title text-white mb-4">Our Events</h1>
                    <p className="page-subtitle text-light-orange">Inspiring Innovation Through Engaging Activities</p>
                </div>

                {/* Flagship Event Banner */}
                <section className="section-spacer">
                    <div className="flagship-banner">
                        <div className="flex-center mb-4">
                            <CheckCircle size={64} className="text-white" />
                        </div>
                        <h2 className="flagship-title">Successfully Completed</h2>
                        <p className="flagship-subtitle">HYPER LAUNCH – EDU TECH HACK SERIES 2K26</p>
                    </div>

                    {/* Event Details */}
                    <div className="event-details-card">
                        <div className="grid-2-col-no-gap">
                            <div className="image-wrapper-h80">
                                <img
                                    src={hyperLaunchFull}
                                    alt="HYPER LAUNCH Event"
                                    className="full-cover-img"
                                />
                            </div>
                            <div className="p-8-12">
                                <h3 className="event-title text-orange mb-6">HYPER LAUNCH – EDU TECH HACK SERIES 2K26</h3>

                                <div className="meta-stack mb-8">
                                    <div className="meta-row">
                                        <Calendar className="text-light-orange mt-1 flex-shrink-0" size={20} />
                                        <div>
                                            <p className="text-light-orange font-semibold mb-1">Date</p>
                                            <p className="text-white">24, 25 & 26 January 2026</p>
                                        </div>
                                    </div>

                                    <div className="meta-row">
                                        <Award className="text-light-orange mt-1 flex-shrink-0" size={20} />
                                        <div>
                                            <p className="text-light-orange font-semibold mb-1">Venue</p>
                                            <p className="text-white">9th Block Seminar Hall</p>
                                        </div>
                                    </div>

                                    <div className="meta-row">
                                        <Trophy className="text-light-orange mt-1 flex-shrink-0" size={20} />
                                        <div>
                                            <p className="text-light-orange font-semibold mb-1">Duration</p>
                                            <p className="text-white">36 Hours of Intensive Innovation</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="highlights-box mb-6">
                                    <h4 className="text-orange mb-3 font-semibold">Event Highlights</h4>
                                    <ul className="highlights-list text-white">
                                        <li className="highlight-item">
                                            <Check className="text-light-orange flex-shrink-0" size={18} />
                                            <span>36-hour non-stop hackathon experience</span>
                                        </li>
                                        <li className="highlight-item">
                                            <Check className="text-light-orange flex-shrink-0" size={18} />
                                            <span>Internship opportunities for top performers</span>
                                        </li>
                                        <li className="highlight-item">
                                            <Check className="text-light-orange flex-shrink-0" size={18} />
                                            <span>2 IEEE credits for all participants</span>
                                        </li>
                                        <li className="highlight-item">
                                            <Check className="text-light-orange flex-shrink-0" size={18} />
                                            <span>Industry mentors and expert guidance</span>
                                        </li>
                                        <li className="highlight-item">
                                            <Check className="text-light-orange flex-shrink-0" size={18} />
                                            <span>Exciting prizes and certificates</span>
                                        </li>
                                    </ul>
                                </div>

                                <p className="text-dim-90">
                                    An intensive 36-hour hackathon focused on educational technology innovation. Students from various departments competed to develop cutting-edge solutions for modern educational challenges, showcasing their technical prowess, creativity, and teamwork.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Winners Section */}
                <section className="section-spacer">
                    <div className="section-header-center mb-12">
                        <h2 className="section-title-large text-white mb-4">✨ Congratulations to the Winners! ✨</h2>
                        <p className="section-subtitle-medium text-light-orange">Celebrating Excellence and Innovation</p>
                    </div>

                    <div className="winners-grid">
                        {/* First Place */}
                        <div className="winner-card-gradient gradient-orange-blue hover-scale">
                            <div className="winner-card-inner">
                                <div className="text-center mb-6">
                                    <div className="trophy-circle bg-orange mb-4">
                                        <Trophy size={40} className="text-white" />
                                    </div>
                                    <p className="text-orange font-bold text-2xl mb-2">1st Place</p>
                                    <div className="divider-orange"></div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-white mb-2 font-bold">Team "404 Error"</h3>
                                    <p className="text-orange text-lg font-semibold mb-4">
                                        🥇 Prize: ₹13,000
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Second Place */}
                        <div className="winner-card-gradient gradient-light-orange-blue hover-scale">
                            <div className="winner-card-inner">
                                <div className="text-center mb-6">
                                    <div className="trophy-circle bg-light-orange mb-4">
                                        <Trophy size={40} className="text-white" />
                                    </div>
                                    <p className="text-light-orange font-bold text-2xl mb-2">2nd Place</p>
                                    <div className="divider-light-orange"></div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-white mb-2 font-bold">TEAM ATLAS</h3>
                                    <p className="text-light-orange text-lg font-semibold mb-4">
                                        🥈 Prize: ₹7,000
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Third Place */}
                        <div className="winner-card-gradient gradient-white-blue hover-scale">
                            <div className="winner-card-inner">
                                <div className="text-center mb-6">
                                    <div className="trophy-circle bg-white mb-4">
                                        <Trophy size={40} className="text-navy" />
                                    </div>
                                    <p className="text-white font-bold text-2xl mb-2">3rd Place</p>
                                    <div className="divider-white"></div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-white mb-2 font-bold">TEAM OG</h3>
                                    <p className="text-white text-lg font-semibold mb-4">
                                        🥉 Prize: ₹5,000
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Upcoming Events */}
                <section className="section-spacer">
                    <div className="section-header-center mb-12">
                        <h2 className="section-title-large text-white mb-4">Upcoming Events</h2>
                        <p className="section-subtitle-medium text-light-orange">Mark Your Calendars</p>
                    </div>

                    <div className="events-grid">
                        <div className="event-card-upcoming gradient-border-orange p-8 text-center">
                            <Calendar size={48} className="text-orange mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-white mb-4">Eduathon Hackathon</h3>
                            <p className="text-dim-90 mb-6">
                                Join us for an exciting hackathon experience!
                                <br />
                                <span className="text-light-orange font-semibold">Venue:</span> 9th Block Seminar Hall
                            </p>
                            <div className="inline-block bg-orange-10 text-orange px-4 py-2 rounded-full font-semibold border border-orange-20">
                                Coming Soon - March 19th
                            </div>
                        </div>
                    </div>
                </section>

                {/* Past Events */}
                <section>
                    <div className="section-header-center mb-12">
                        <h2 className="section-title-large text-white mb-4">Past Events</h2>
                        <p className="section-subtitle-medium text-light-orange">A Legacy of Innovation and Learning</p>
                    </div>

                    <div className="events-grid">
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
                                'Exciting prizes and certificates'
                            ]}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Events;
