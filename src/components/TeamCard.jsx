import React from 'react';
import { Linkedin, Mail, Users } from 'lucide-react';
import './TeamCard.css';

const TeamCard = ({ name, role, linkedin, email }) => {
    return (
        <div className="team-card-container">
            <div className="team-card-image-wrapper">
                <div className="team-card-avatar-circle">
                    <Users size={80} className="team-card-icon" />
                </div>
            </div>

            <div className="team-card-content">
                <h3 className="team-card-name">{name}</h3>
                <p className="team-card-role">{role}</p>

                <div className="team-card-socials">
                    {linkedin && (
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="team-social-link"
                        >
                            <Linkedin size={16} />
                        </a>
                    )}
                    {email && (
                        <a
                            href={`mailto:${email}`}
                            className="team-social-link"
                        >
                            <Mail size={16} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
