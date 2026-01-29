import React from 'react';
import { Calendar, MapPin, Clock, Award } from 'lucide-react';
import './EventCard.css';

const EventCard = ({
    title,
    date,
    venue,
    duration,
    description,
    image,
    status = 'upcoming',
    highlights
}) => {
    return (
        <div className="event-card-container group">
            <div className="event-card-image-wrapper">
                <img
                    src={image}
                    alt={title}
                    className="event-card-img"
                />
                {status === 'completed' && (
                    <div className="event-status-badge">
                        Completed
                    </div>
                )}
            </div>

            <div className="event-card-content">
                <h3 className="event-card-title">{title}</h3>

                <div className="event-card-meta">
                    <div className="meta-item">
                        <Calendar size={18} className="meta-icon" />
                        <span>{date}</span>
                    </div>

                    {venue && (
                        <div className="meta-item">
                            <MapPin size={18} className="meta-icon" />
                            <span>{venue}</span>
                        </div>
                    )}

                    {duration && (
                        <div className="meta-item">
                            <Clock size={18} className="meta-icon" />
                            <span>{duration}</span>
                        </div>
                    )}
                </div>

                <p className="event-card-description">
                    {description}
                </p>

                {highlights && highlights.length > 0 && (
                    <div className="event-highlights-section">
                        <div className="highlights-container-redesign">
                            <Award size={20} className="highlights-icon-redesign" />
                            <ul className="highlights-list-redesign">
                                {highlights.map((highlight, index) => (
                                    <li key={index}>• {highlight}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventCard;
