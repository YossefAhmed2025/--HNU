import React from 'react';

export default function UniversityCard({ university, onSelect }) {
    return (
        <div className="university-card" onClick={onSelect}>
            <div className="card-logo">
                <img
                    src={university.logo}
                    alt={university.name}
                />
            </div>
            <h3>{university.name}</h3>
            <p>{university.description}</p>
            <button className="select-btn">اختر</button>
        </div>
    );
}
