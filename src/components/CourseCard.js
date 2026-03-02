import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

function CourseCard({ title, description, level, duration, icon, link }) {
    return (
        <div className="course-card">
            <div className="course-card-icon">
                {typeof icon === 'string' && icon.startsWith('http') ? (
                    <img src={icon} alt={title} className="course-icon-img" />
                ) : (
                    icon
                )}
            </div>
            <h3 className="course-card-title">{title}</h3>
            <p className="course-card-description">{description}</p>
            <div className="course-card-meta">
                {level && <span className="course-card-level">📊 {level}</span>}
                {duration && <span className="course-card-duration">⏱️ {duration}</span>}
            </div>
            {link && (
                <Link to={link} className="course-card-link">
                    Learn More →
                </Link>
            )}
        </div>
    );
}

export default CourseCard;
