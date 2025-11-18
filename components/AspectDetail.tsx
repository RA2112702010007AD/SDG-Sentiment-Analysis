import React from 'react';
// Fix: Import `Sentiment` as a value as it's an enum used at runtime, and `Aspect` as a type.
import { type Aspect, Sentiment } from '../types';

interface AspectDetailProps {
  aspect: Aspect;
  onClear: () => void;
}

const sentimentConfig = {
    [Sentiment.Positive]: {
        textColor: 'text-green-700 dark:text-green-300',
        borderColor: 'border-green-500 dark:border-green-600',
        bgColor: 'bg-green-50 dark:bg-green-900/30',
    },
    [Sentiment.Negative]: {
        textColor: 'text-red-700 dark:text-red-300',
        borderColor: 'border-red-500 dark:border-red-600',
        bgColor: 'bg-red-50 dark:bg-red-900/30',
    },
    [Sentiment.Neutral]: {
        textColor: 'text-gray-700 dark:text-gray-300',
        borderColor: 'border-gray-500 dark:border-gray-600',
        bgColor: 'bg-gray-50 dark:bg-gray-700/30',
    },
};


export const AspectDetail: React.FC<AspectDetailProps> = ({ aspect, onClear }) => {
    const config = sentimentConfig[aspect.sentiment];
    const scorePercentage = Math.round(aspect.score * 100);

    return (
        <div className={`mt-6 p-4 border-l-4 ${config.borderColor} ${config.bgColor} rounded-r-lg shadow-md relative animate-fade-in`}>
             <button onClick={onClear} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" aria-label="Close aspect details">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">Aspect Details</h4>
            <div className="mt-2 space-y-2">
                <p><strong>Topic:</strong> <span className="font-medium text-indigo-600 dark:text-indigo-400">{aspect.aspect}</span></p>
                <p><strong>Sentiment:</strong> <span className={`font-semibold ${config.textColor}`}>{aspect.sentiment} ({scorePercentage}% confidence)</span></p>
                <div>
                    <p><strong>Context from text:</strong></p>
                    <blockquote className="mt-1 pl-3 border-l-2 border-gray-300 dark:border-gray-500 text-gray-600 dark:text-gray-400 italic">
                        "{aspect.context}"
                    </blockquote>
                </div>
            </div>
        </div>
    );
};