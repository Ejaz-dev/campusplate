import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import StudentPortal from './components/StudentPortal';
import ProviderPortal from './components/ProviderPortal';
import './App.css';

function App() {
  const [activePortal, setActivePortal] = useState('landing');

  const renderPortal = () => {
    switch (activePortal) {
      case 'student':
        return <StudentPortal setActivePortal={setActivePortal} />;
      case 'provider':
        return <ProviderPortal setActivePortal={setActivePortal} />;
      default:
        return <LandingPage setActivePortal={setActivePortal} />;
    }
  };

  return (
    <div className="App">
      {renderPortal()}
    </div>
  );
}

export default App;