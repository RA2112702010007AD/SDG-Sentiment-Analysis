import React from 'react';
import { type OverallSentiment, Sentiment } from '../types';

interface SentimentCardProps {
  data: OverallSentiment;
}

const sentimentConfig = {
  [Sentiment.Positive]: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    textColor: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/30',
    ringColor: 'ring-green-500 dark:ring-green-600',
  },
  [Sentiment.Negative]: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    textColor: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-900/30',
    ringColor: 'ring-red-500 dark:ring-red-600',
  },
  [Sentiment.Neutral]: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    textColor: 'text-gray-600 dark:text-gray-300',
    bgColor: 'bg-gray-50 dark:bg-gray-700/30',
    ringColor: 'ring-gray-500 dark:ring-gray-600',
  },
};


export const SentimentCard: React.FC<SentimentCardProps> = ({ data }) => {
    const config = sentimentConfig[data.sentiment];
    const scorePercentage = Math.round(data.score * 100);

    return (
        <div className={`p-6 rounded-lg shadow-lg flex flex-col items-center text-center ${config.bgColor} ring-2 ${config.ringColor}`}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Overall Sentiment</h3>
            <div className="mb-4">
                {config.icon}
            </div>
            <p className={`text-2xl font-bold ${config.textColor}`}>{data.sentiment}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">({scorePercentage}% confidence)</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm italic">"{data.explanation}"</p>
        </div>
    );
};