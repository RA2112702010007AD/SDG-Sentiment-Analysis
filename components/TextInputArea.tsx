import React from 'react';

interface TextInputAreaProps {
  text: string;
  onTextChange: (text: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const sampleText = `We are thrilled about the new student exchange program, which has received overwhelmingly positive feedback. However, concerns remain regarding the bureaucracy involved in securing research funding. The joint policy on data sharing is a neutral but necessary step forward. Unfortunately, the collaboration on renewable energy has stalled due to political disagreements, which is a major setback.`;

export const TextInputArea: React.FC<TextInputAreaProps> = ({ text, onTextChange, onAnalyze, isLoading }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col h-full">
      <textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Enter text here..."
        className="w-full flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out resize-none min-h-[300px] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
        disabled={isLoading}
      />
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onTextChange(sampleText)}
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          disabled={isLoading}
        >
          Load Sample Text
        </button>
        <button
          onClick={onAnalyze}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze Sentiment'
          )}
        </button>
      </div>
    </div>
  );
};