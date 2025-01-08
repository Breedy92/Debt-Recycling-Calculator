import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Calculator } from './components/Calculator';

function App() {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {showCalculator ? (
        <Calculator />
      ) : (
        <LandingPage onGetStarted={() => setShowCalculator(true)} />
      )}
    </div>
  );
}

export default App;