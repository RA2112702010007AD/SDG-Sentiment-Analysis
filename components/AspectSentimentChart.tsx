import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import type { Aspect } from '../types';
import { Sentiment } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface AspectSentimentChartProps {
  aspects: Aspect[];
  onBarClick: (aspect: Aspect | null) => void;
  selectedAspect: Aspect | null;
}

const sentimentToScore = (sentiment: Sentiment): number => {
  switch (sentiment) {
    case Sentiment.Positive:
      return 1;
    case Sentiment.Negative:
      return -1;
    case Sentiment.Neutral:
      return 0;
    default:
      return 0;
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  const { theme } = useTheme();
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isDark = theme === 'dark';
    return (
      <div className={`p-3 rounded-lg shadow-lg ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}>
        <p className={`font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{`${label}`}</p>
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{`Sentiment: ${data.sentiment}`}</p>
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{`Confidence: ${Math.round(data.score * 100)}%`}</p>
      </div>
    );
  }
  return null;
};


export const AspectSentimentChart: React.FC<AspectSentimentChartProps> = ({ aspects, onBarClick, selectedAspect }) => {
  const { theme } = useTheme();
  const chartData = aspects.map(a => ({
    ...a,
    value: sentimentToScore(a.sentiment) * a.score,
  }));
  
  if (!aspects || aspects.length === 0) {
    return <div className="text-center text-gray-500 dark:text-gray-400 p-8">No specific aspects were identified in the text.</div>;
  }

  const handleClick = (data: any) => {
    if (data && data.activePayload && data.activePayload[0]) {
      const clickedAspect = data.activePayload[0].payload as Aspect;
      if (selectedAspect && selectedAspect.aspect === clickedAspect.aspect) {
        onBarClick(null);
      } else {
        onBarClick(clickedAspect);
      }
    }
  };

  const tickColor = theme === 'dark' ? '#9CA3AF' : '#374151'; // gray-400 vs gray-700
  const gridColor = theme === 'dark' ? '#374151' : '#E5E7EB'; // gray-700 vs gray-200
  const legendColor = theme === 'dark' ? '#D1D5DB' : '#4B5563'; // gray-300 vs gray-600

  return (
    <div className="w-full h-80 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                onClick={handleClick}
            >
                <CartesianGrid stroke={gridColor} strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[-1, 1]} ticks={[-1, -0.5, 0, 0.5, 1]} tick={{ fill: tickColor }} label={{ value: 'Sentiment Score (Negative to Positive)', position: 'insideBottom', offset: -5, fill: tickColor }} />
                <YAxis dataKey="aspect" type="category" width={120} tick={{ fontSize: 12, fill: tickColor }} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: theme === 'dark' ? 'rgba(107, 114, 128, 0.3)' : 'rgba(230, 230, 230, 0.5)'}} />
                <Legend formatter={(value) => <span style={{color: legendColor}}>{value}</span>} />
                <Bar dataKey="value" name="Sentiment Score" >
                    {
                        chartData.map((entry, index) => {
                            const isSelected = selectedAspect?.aspect === entry.aspect;
                            const color = entry.sentiment === Sentiment.Positive ? '#22c55e' : entry.sentiment === Sentiment.Negative ? '#ef4444' : '#6b7280';
                            return <Cell key={`cell-${index}`} fill={color} opacity={isSelected ? 1 : 0.6} stroke={isSelected ? '#3b82f6' : 'none'} strokeWidth={2} />;
                        })
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
};