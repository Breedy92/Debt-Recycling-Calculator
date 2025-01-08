import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Calculator } from './components/Calculator';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Analytics /> {/* Ensure Analytics is always rendered */}
      {showCalculator ? (
        <Calculator />
      ) : (
        <LandingPage onGetStarted={() => setShowCalculator(true)} />
      )}
    </div>
  );
}

export default App;
