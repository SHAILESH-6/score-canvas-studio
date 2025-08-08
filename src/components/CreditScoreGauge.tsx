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
      <svg viewBox="0 0 240 140" className="w-full h-full">
        {/* Perfect semicircle background */}
        <path
          d="M 40 120 A 80 80 0 0 1 200 120"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Credit score segments - Perfect semicircle divisions */}
        {/* Poor: 300-580 (Red) */}
        <path
          d="M 40 120 A 80 80 0 0 1 85 60"
          fill="none"
          stroke="hsl(var(--credit-poor))"
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Fair: 580-670 (Orange) */}
        <path
          d="M 85 60 A 80 80 0 0 1 120 40"
          fill="none"
          stroke="hsl(var(--credit-fair))"
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Good: 670-740 (Yellow) */}
        <path
          d="M 120 40 A 80 80 0 0 1 155 60"
          fill="none"
          stroke="hsl(var(--credit-good))"
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Very Good: 740-800 (Light Green) */}
        <path
          d="M 155 60 A 80 80 0 0 1 180 85"
          fill="none"
          stroke="hsl(var(--credit-very-good))"
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Excellent: 800-900 (Green) */}
        <path
          d="M 180 85 A 80 80 0 0 1 200 120"
          fill="none"
          stroke="hsl(var(--credit-excellent))"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Needle - positioned from center */}
        <line
          x1="120"
          y1="120"
          x2={120 + 60 * Math.cos((angle - 90) * Math.PI / 180)}
          y2={120 + 60 * Math.sin((angle - 90) * Math.PI / 180)}
          stroke="hsl(var(--foreground))"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Center dot */}
        <circle
          cx="120"
          cy="120"
          r="6"
          fill="hsl(var(--foreground))"
        />
        
        {/* Score labels */}
        <text x="40" y="135" textAnchor="middle" className="text-xs fill-muted-foreground">300</text>
        <text x="200" y="135" textAnchor="middle" className="text-xs fill-muted-foreground">900</text>
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