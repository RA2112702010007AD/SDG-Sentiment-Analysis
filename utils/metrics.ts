import type { EvaluationMetrics } from './types';

/**
 * Generates simulated evaluation metrics for a baseline and a hybrid model.
 * The baseline metrics are derived from the Gemini model's confidence score.
 * The hybrid metrics represent a simulated improvement, illustrating the benefit
 * of an ensemble approach (e.g., using a Random Forest meta-classifier).
 * @param confidenceScore - The confidence score from the overall sentiment analysis (0.0 to 1.0).
 * @returns An object containing baseline and hybrid evaluation metrics.
 */
export const generateSimulatedEvaluationMetrics = (confidenceScore: number): { baseline: EvaluationMetrics, hybrid: EvaluationMetrics } => {
  // Base metrics derived from confidence. A higher confidence score results in a better baseline.
  const baselinePrecision = 0.82 + (confidenceScore * 0.15); // Range: 82% - 97%
  const baselineRecall = 0.88 + (confidenceScore * 0.10); // Range: 88% - 98%
  
  const baseline: EvaluationMetrics = {
    accuracy: 0.85 + (confidenceScore * 0.14), // Range: 85% - 99%
    precision: baselinePrecision,
    recall: baselineRecall,
    f1Score: (2 * baselinePrecision * baselineRecall) / (baselinePrecision + baselineRecall),
  };

  // Hybrid metrics show a simulated improvement over the baseline.
  const hybridPrecision = baseline.precision + (1 - baseline.precision) * 0.3; // Close 30% of the gap to 100%
  const hybridRecall = baseline.recall + (1 - baseline.recall) * 0.2; // Close 20% of the gap
  
  const hybrid: EvaluationMetrics = {
    accuracy: baseline.accuracy + (1 - baseline.accuracy) * 0.4, // Close 40% of the gap
    precision: hybridPrecision,
    recall: hybridRecall,
    f1Score: (2 * hybridPrecision * hybridRecall) / (hybridPrecision + hybridRecall),
  };

  // Helper to ensure values are capped at a realistic 99.9% for display
  const clamp = (metrics: EvaluationMetrics): EvaluationMetrics => ({
    accuracy: Math.min(0.999, metrics.accuracy),
    precision: Math.min(0.999, metrics.precision),
    recall: Math.min(0.999, metrics.recall),
    f1Score: Math.min(0.999, metrics.f1Score),
  });

  return {
    baseline: clamp(baseline),
    hybrid: clamp(hybrid),
  };
};