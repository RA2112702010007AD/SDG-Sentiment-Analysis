import React, { useState } from 'react';
import { SentimentCard } from './SentimentCard';
import { AspectSentimentChart } from './AspectSentimentChart';
import { EvaluationMetricsCard } from './EvaluationMetricsCard';
import { LoadingSpinner } from './LoadingSpinner';
import { AspectDetail } from './AspectDetail';
import type { AnalysisResult, Aspect } from '../types';

interface AnalysisDashboardProps {
  isLoading: boolean;
  error: string | null;
  analysisResult: AnalysisResult | null;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ isLoading, error, analysisResult }) => {
  const [selectedAspect, setSelectedAspect] = useState<Aspect | null>(null);

  const handleBarClick = (aspect: Aspect | null) => {
    setSelectedAspect(aspect);
  };
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg shadow-lg text-red-700 dark:text-red-300 min-h-[400px]">
        <h3 className="font-bold">An Error Occurred</h3>
        <p>{error}</p>
      </div>
    );
  }
  
  if (!analysisResult) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center text-gray-500 dark:text-gray-400 min-h-[400px] flex items-center justify-center">
        <p>Enter some text and click "Analyze Sentiment" to see the results.</p>
      </div>
    );
  }
  
  const { overallSentiment, aspects, baselineMetrics, hybridMetrics } = analysisResult;

  return (
    <div className="space-y-8 animate-fade-in">
        <SentimentCard data={overallSentiment} />

        <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Model Performance Evaluation</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <EvaluationMetricsCard 
                    title="Baseline Model (Gemini)" 
                    metrics={baselineMetrics}
                />
                <EvaluationMetricsCard 
                    title="Simulated Hybrid System" 
                    metrics={hybridMetrics} 
                    isHybrid={true}
                />
            </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Aspect-Based Sentiment Map</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">This chart visualizes the sentiment for each specific topic found in the text. Click on a bar to see more details.</p>
            <AspectSentimentChart aspects={aspects} onBarClick={handleBarClick} selectedAspect={selectedAspect} />
            {selectedAspect && (
                <AspectDetail aspect={selectedAspect} onClear={() => setSelectedAspect(null)} />
            )}
        </div>
    </div>
  );
};