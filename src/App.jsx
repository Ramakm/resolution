import React, { useState } from 'react';
import Landing from './components/Landing';
import Calendar from './components/Calendar';
import { generatePlan } from './services/llm';

function App() {
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async ({ resolution, provider, apiKey }) => {
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generatePlan(resolution, provider, apiKey);
      setPlan(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setError(null);
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
      {!plan ? (
        <Landing onGenerate={handleGenerate} error={error} />
      ) : (
        <Calendar plan={plan} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
