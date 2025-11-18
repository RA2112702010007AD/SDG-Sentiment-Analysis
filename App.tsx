import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TextInputArea } from './components/TextInputArea';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { analyzeAspectSentiment, getOverallSentiment } from './services/geminiService';
import { generateSimulatedEvaluationMetrics } from './utils/metrics';
import type { AnalysisResult } from './types';

function App() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);


  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      // Use Promise.all to run API calls concurrently for better performance.
      const [aspects, overallSentiment] = await Promise.all([
        analyzeAspectSentiment(text),
        getOverallSentiment(text),
      ]);

      const { baseline, hybrid } = generateSimulatedEvaluationMetrics(overallSentiment.score);

      setAnalysisResult({
        overallSentiment,
        aspects,
        baselineMetrics: baseline,
        hybridMetrics: hybrid,
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <TextInputArea
              text={text}
              onTextChange={setText}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-1">
            <AnalysisDashboard
              isLoading={isLoading}
              error={error}
              analysisResult={analysisResult}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;