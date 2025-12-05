import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'form'
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  return (
    <>
      {currentPage === 'home' ? (
        <HomePage
          onUniversitySelect={(university) => {
            setSelectedUniversity(university);
            setCurrentPage('form');
          }}
        />
      ) : (
        <FormPage
          university={selectedUniversity}
          onBack={() => setCurrentPage('home')}
        />
      )}
    </>
  );
}

