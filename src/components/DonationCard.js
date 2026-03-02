import React from 'react';
import './DonationCard.css';

function DonationCard({ title, description, icon, amount }) {
    return (
        <div className="donation-card">
            <div className="donation-card-icon">
                {typeof icon === 'string' && icon.startsWith('http') ? (
                    <img src={icon} alt={title} className="donation-icon-img" />
                ) : (
                    icon
                )}
            </div>
            <h3 className="donation-card-title">{title}</h3>
            <p className="donation-card-description">{description}</p>
            {amount && <p className="donation-card-amount">{amount}</p>}
            <button className="btn btn-primary donation-card-btn">Donate Now</button>
        </div>
    );
}

export default DonationCard;
