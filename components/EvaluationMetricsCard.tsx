import React from 'react';
import type { EvaluationMetrics } from '../types';

interface EvaluationMetricsCardProps {
  title: string;
  metrics: EvaluationMetrics;
  isHybrid?: boolean;
}

const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

const MetricItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
        <p className="text-sm font-bold text-gray-800 dark:text-gray-200 tabular-nums">{value}</p>
    </div>
);

const InfoTooltip: React.FC = () => (
    <div className="relative group">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 dark:bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            These metrics are simulated to illustrate how a hybrid system (e.g., an LLM combined with a traditional classifier like XGBoost) can improve upon a baseline model.
        </div>
    </div>
);


export const EvaluationMetricsCard: React.FC<EvaluationMetricsCardProps> = ({ title, metrics, isHybrid = false }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
                {isHybrid && <InfoTooltip />}
            </div>
            <div className="space-y-2">
                <MetricItem label="Accuracy" value={formatPercent(metrics.accuracy)} />
                <MetricItem label="Precision" value={formatPercent(metrics.precision)} />
                <MetricItem label="Recall" value={formatPercent(metrics.recall)} />
                <MetricItem label="F1-Score" value={formatPercent(metrics.f1Score)} />
            </div>
        </div>
    );
};