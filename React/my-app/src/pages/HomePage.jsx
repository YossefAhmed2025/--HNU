import React, { useEffect, useRef } from 'react';
import UniversityCard from '../components/UniversityCard';
import bgVideo from '../assets/background.mp4';
import helwanGov from '../assets/helwan-gov.png';
import newLogo from '../assets/new_logo.png';
import helwanTech from '../assets/helwan-tech.png';
import '../styles/HomePage.css';

const universities = [
    {
        id: 'government',
        name: 'جامعة حلوان الحكومية',
        description: 'للطلاب المنتسبين للجامعة الحكومية',
        logo: helwanGov,
    },
    {
        id: 'private',
        name: 'جامعة حلوان الأهلية',
        description: 'للطلاب المنتسبين للجامعة الأهلية',
        logo: newLogo,
    },
    {
        id: 'tech',
        name: 'جامعة حلوان التكنولوجية',
        description: 'للطلاب المنتسبين للجامعة التكنولوجية',
        logo: helwanTech,
    },
];

export default function HomePage({ onUniversitySelect }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '1') onUniversitySelect('tech');       // First card: Tech
            else if (e.key === '2') onUniversitySelect('private'); // Second card: Private
            else if (e.key === '3') onUniversitySelect('government'); // Third card: Government
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onUniversitySelect]);

    return (
        <>
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="video-background"
                src={bgVideo}
            />
            <div className="video-overlay"></div>
            <div className="container">
                <header>
                    <h1 className="logo">قريبين</h1>
                    <p className="subtitle">صوتك يهمنا، شاركنا رأيك</p>
                </header>
                <main>
                    <div className="welcome-message">
                        <h2>اختر جامعتك</h2>
                        <p>اختر الجامعة التابع لها لبدء مشاركة اقتراحاتك وشكاويك</p>
                    </div>
                    <div className="university-options">
                        {universities.map((uni) => (
                            <UniversityCard
                                key={uni.id}
                                university={uni}
                                onSelect={() => onUniversitySelect(uni.id)}
                            />
                        ))}
                    </div>
                </main>
                <footer>
                    <p>© 2025 قريبين - جميع الحقوق محفوظة</p>
                </footer>
            </div>
        </>
    );
}
