import React from 'react';
import Button from './Button';

interface SuggestionCardProps {
  original: string;
  suggested: string;
  onApply?: () => void;
  onCopy?: () => void;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({
  original,
  suggested,
  onApply,
  onCopy,
}) => {
  return (
    <div className="glass-card-dark p-6 rounded-2xl space-y-4 hover:bg-white/[0.08] transition-all border-l-4 border-blue-500">
      {/* Original */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Original</p>
        <div className="rounded-lg bg-gray-800/50 border border-gray-700 p-4">
          <p className="text-gray-300 text-sm line-through opacity-70">{original}</p>
        </div>
      </div>

      {/* Suggestion */}
      <div>
        <p className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">💡 AI Suggestion</p>
        <div className="rounded-lg bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/30 p-4">
          <p className="text-blue-200 font-semibold text-sm">{suggested}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        {onApply && (
          <Button size="sm" variant="gradient" onClick={onApply} className="flex-1">
            ✓ Apply
          </Button>
        )}
        {onCopy && (
          <Button size="sm" variant="outline" onClick={onCopy} className="flex-1">
            📋 Copy
          </Button>
        )}
      </div>
    </div>
  );
};

export default SuggestionCard;
