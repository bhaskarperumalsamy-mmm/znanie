import React from 'react';
import './TeamCard.css';

function TeamCard({ name, designation, bio, country, image }) {
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="team-card">
            <div className="team-card-avatar">
                {image ? (
                    <img src={image} alt={name} className="team-card-img" />
                ) : (
                    <span className="team-card-initials">{getInitials(name)}</span>
                )}
            </div>
            <h3 className="team-card-name">{name}</h3>
            <p className="team-card-designation">{designation}</p>
            {country && (
                <div className="team-card-country-box">
                    <span className="team-card-country">{country}</span>
                </div>
            )}
            {bio && <p className="team-card-bio">{bio}</p>}
        </div>
    );
}

export default TeamCard;
