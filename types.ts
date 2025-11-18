export enum Sentiment {
  Positive = 'Positive',
  Negative = 'Negative',
  Neutral = 'Neutral',
}

export interface Aspect {
  aspect: string;
  sentiment: Sentiment;
  score: number;
  context: string;
}

export interface OverallSentiment {
  sentiment: Sentiment;
  score: number;
  explanation: string;
}

export interface EvaluationMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}

export interface AnalysisResult {
  overallSentiment: OverallSentiment;
  aspects: Aspect[];
  baselineMetrics: EvaluationMetrics;
  hybridMetrics: EvaluationMetrics;
}