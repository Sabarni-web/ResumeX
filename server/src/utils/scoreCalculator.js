/**
 * Normalize a score to a 0-100 range.
 */
const normalizeScore = (score, min = 0, max = 1) => {
  const normalized = ((score - min) / (max - min)) * 100;
  return Math.max(0, Math.min(100, Math.round(normalized)));
};

/**
 * Calculate weighted average from an object of { category: score } with weights.
 */
const weightedAverage = (scores, weights) => {
  let totalWeight = 0;
  let weightedSum = 0;

  Object.keys(scores).forEach((key) => {
    const weight = weights[key] || 1;
    weightedSum += scores[key] * weight;
    totalWeight += weight;
  });

  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
};

/**
 * Get a letter grade from a numeric score.
 */
const getGrade = (score) => {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B+';
  if (score >= 60) return 'B';
  if (score >= 50) return 'C';
  if (score >= 40) return 'D';
  return 'F';
};

module.exports = { normalizeScore, weightedAverage, getGrade };
