import React from 'react';

interface MatchScoreProps {
  score: number;
  size?: 'sm' | 'lg';
}

const MatchScore: React.FC<MatchScoreProps> = ({ score, size = 'lg' }) => {
  const percentage = Math.round(score * 100);
  const radius = size === 'lg' ? 100 : 60;
  const strokeWidth = size === 'lg' ? 14 : 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 80) return '#10b981'; // Green
    if (percentage >= 60) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const getGradient = () => {
    if (percentage >= 80) return 'from-green-400 to-emerald-600';
    if (percentage >= 60) return 'from-yellow-400 to-orange-600';
    return 'from-red-400 to-pink-600';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg height={radius * 2} width={radius * 2} className="drop-shadow-lg">
          {/* Background Circle */}
          <circle
            stroke="rgba(107, 114, 128, 0.2)"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress Circle with Gradient */}
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <circle
            stroke="url(#scoreGradient)"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
        </svg>
        {/* Center Badge */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-center bg-gradient-to-r ${getGradient()} bg-clip-text`}>
            <p className={`font-black ${size === 'lg' ? 'text-5xl' : 'text-3xl'} text-transparent`}>
              {percentage}%
            </p>
            <p className="text-white text-xs font-bold mt-1">Match Score</p>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">Overall Compatibility</p>
        <p className={`text-sm font-semibold mt-1 ${
          percentage >= 80 ? 'text-green-400' : percentage >= 60 ? 'text-yellow-400' : 'text-red-400'
        }`}>
          {percentage >= 80 ? '🎉 Excellent Match!' : percentage >= 60 ? '👍 Good Match' : '⚠️ Needs Improvement'}
        </p>
      </div>
    </div>
  );
};

export default MatchScore;
