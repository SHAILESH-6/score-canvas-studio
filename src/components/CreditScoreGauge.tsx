import React from 'react';

interface CreditScoreGaugeProps {
  score: number;
  className?: string;
}

const CreditScoreGauge: React.FC<CreditScoreGaugeProps> = ({ score, className = "" }) => {
  // Calculate needle position (180 degrees range, 0 degrees = 300 score, 180 degrees = 900 score)
  const normalizedScore = Math.max(300, Math.min(900, score));
  const angle = ((normalizedScore - 300) / 600) * 180;

  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score < 580) return 'hsl(var(--credit-poor))';
    if (score < 670) return 'hsl(var(--credit-fair))';
    if (score < 740) return 'hsl(var(--credit-good))';
    if (score < 800) return 'hsl(var(--credit-very-good))';
    return 'hsl(var(--credit-excellent))';
  };

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {/* Background arc */}
        <path
          d="M 30 100 A 70 70 0 0 1 170 100"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Score segments */}
        {/* Poor: 300-580 (Red) */}
        <path
          d="M 30 100 A 70 70 0 0 1 65 50"
          fill="none"
          stroke="hsl(var(--credit-poor))"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Fair: 580-670 (Orange) */}
        <path
          d="M 65 50 A 70 70 0 0 1 100 30"
          fill="none"
          stroke="hsl(var(--credit-fair))"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Good: 670-740 (Yellow) */}
        <path
          d="M 100 30 A 70 70 0 0 1 135 50"
          fill="none"
          stroke="hsl(var(--credit-good))"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Very Good: 740-800 (Light Green) */}
        <path
          d="M 135 50 A 70 70 0 0 1 170 100"
          fill="none"
          stroke="hsl(var(--credit-very-good))"
          strokeWidth="6"
          strokeLinecap="round"
        />
        
        {/* Excellent: 800-900 (Green) - just the end portion */}
        <path
          d="M 155 70 A 70 70 0 0 1 170 100"
          fill="none"
          stroke="hsl(var(--credit-excellent))"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Needle */}
        <line
          x1="100"
          y1="100"
          x2={100 + 50 * Math.cos((angle - 90) * Math.PI / 180)}
          y2={100 + 50 * Math.sin((angle - 90) * Math.PI / 180)}
          stroke="hsl(var(--foreground))"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Center dot */}
        <circle
          cx="100"
          cy="100"
          r="4"
          fill="hsl(var(--foreground))"
        />
      </svg>
      
      {/* Score display */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
        <div 
          className="text-4xl font-bold"
          style={{ color: getScoreColor(score) }}
        >
          {score}
        </div>
        <div className="text-sm text-muted-foreground">Credit Score</div>
      </div>
    </div>
  );
};

export default CreditScoreGauge;