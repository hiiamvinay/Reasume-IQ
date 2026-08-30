import React from 'react';

interface SkillListProps {
  skills: string[];
  variant: 'match' | 'missing';
}

const SkillList: React.FC<SkillListProps> = ({ skills, variant }) => {
  const isMatch = variant === 'match';
  const bgColor = isMatch
    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30'
    : 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30';
  const textColor = isMatch ? 'text-green-300' : 'text-orange-300';
  const icon = isMatch ? '✓' : '⚠';
  const title = isMatch ? '✅ Matching Skills' : '⚠️ Missing Keywords';

  return (
    <div className="space-y-4">
      <h4 className="text-white font-bold text-lg flex items-center gap-2">
        {isMatch ? '✅' : '⚠️'} {title}
      </h4>
      <div className="space-y-2">
        {skills.length === 0 || (skills.length === 1 && skills[0] === 'None missing') ? (
          <div className={`p-4 rounded-lg border ${bgColor} text-center`}>
            <p className={`text-sm font-medium ${textColor}`}>
              {isMatch ? 'Great matching skills found!' : 'No missing keywords!'}
            </p>
          </div>
        ) : (
          skills.map((skill) => (
            <div
              key={skill}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${bgColor} hover:scale-105 transition-transform cursor-default group`}
            >
              <span className={`${textColor} font-bold`}>{icon}</span>
              <span className="text-white font-medium text-sm">{skill}</span>
              {!isMatch && (
                <span className="text-xs text-orange-300/70 group-hover:text-orange-300 transition-colors">
                  → Add to resume
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillList;
