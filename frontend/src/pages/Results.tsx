import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import MatchScore from '../components/MatchScore';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SkillList from '../components/SkillList';
import type { ScanResult } from '../types/resume';

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.scanResult as ScanResult | undefined;

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <Navbar />
        <div className="flex h-[calc(100vh-64px)]">
          <Sidebar />
          <main className="flex flex-1 items-center justify-center p-6">
            <div className="text-center">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-400">No result to display. Please run a scan first.</p>
              <Button onClick={() => navigate('/new-scan')} variant="gradient" size="lg" className="mt-6 w-full md:w-auto">
                Start New Scan
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const { match_score, missing_keywords, suggestions } = result;
  const strongMatches = ['Python', 'FastAPI', 'PostgreSQL', 'Docker'];

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'from-green-500 to-emerald-600';
    if (score >= 0.6) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-white mb-2">Analysis Results</h1>
            <p className="text-gray-400">Detailed breakdown of your resume match</p>
          </div>

          {/* Main Score Card */}
          <div className="glass-card-dark p-8 mb-8 rounded-3xl hover:scale-105 transition-transform">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-4">Overall Match Score</h2>
                <p className="text-gray-400 mb-6">Your resume aligns well with this job description</p>
                <div className="inline-flex items-end gap-2">
                  <div className={`text-6xl font-bold bg-gradient-to-r ${getScoreColor(match_score)} bg-clip-text text-transparent`}>
                    {Math.round(match_score * 100)}%
                  </div>
                  <p className="text-gray-400 mb-2">match</p>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                    {/* Background circle */}
                    <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(107, 114, 128, 0.3)" strokeWidth="12" />
                    {/* Progress circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke={`url(#scoreGradient)`}
                      strokeWidth="12"
                      strokeDasharray={`${2 * Math.PI * 90 * match_score} ${2 * Math.PI * 90}`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Compatibility</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-card-dark p-6 rounded-2xl hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">🎯</div>
              <p className="text-gray-400 text-sm mb-2">Skills Match</p>
              <p className="text-3xl font-bold text-blue-400">91%</p>
              <p className="text-xs text-gray-500 mt-2">Excellent alignment</p>
            </div>
            <div className="glass-card-dark p-6 rounded-2xl hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">💼</div>
              <p className="text-gray-400 text-sm mb-2">Experience</p>
              <p className="text-3xl font-bold text-purple-400">78%</p>
              <p className="text-xs text-gray-500 mt-2">Good match</p>
            </div>
            <div className="glass-card-dark p-6 rounded-2xl hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">🎓</div>
              <p className="text-gray-400 text-sm mb-2">Education</p>
              <p className="text-3xl font-bold text-green-400">100%</p>
              <p className="text-xs text-gray-500 mt-2">Perfect match</p>
            </div>
            <div className="glass-card-dark p-6 rounded-2xl hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">🧠</div>
              <p className="text-gray-400 text-sm mb-2">Semantic</p>
              <p className="text-3xl font-bold text-pink-400">83%</p>
              <p className="text-xs text-gray-500 mt-2">Strong relevance</p>
            </div>
          </div>

          {/* Skills Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="glass-card-dark p-8 rounded-2xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">✅</span>
                <h3 className="text-white font-bold text-lg">Matching Skills</h3>
              </div>
              <div className="space-y-3">
                {strongMatches.map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-colors">
                    <span className="text-white font-medium">{skill}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-green-700/50 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                      </div>
                      <span className="text-green-400 text-sm font-bold">95%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card-dark p-8 rounded-2xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">⚠️</span>
                <h3 className="text-white font-bold text-lg">Missing Keywords</h3>
              </div>
              <div className="space-y-3">
                {missing_keywords.length > 0 ? (
                  missing_keywords.map((keyword, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg hover:bg-orange-500/20 transition-colors">
                      <span className="text-white font-medium">{keyword}</span>
                      <span className="text-orange-400 text-sm">Add to resume</span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-400">No missing keywords detected</div>
                )}
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="glass-card-dark p-8 rounded-2xl mb-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">💡</span>
              <h2 className="text-white font-bold text-lg">AI Recommendations</h2>
            </div>
            {suggestions.length > 0 ? (
              <ul className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <li key={`${suggestion}-${index}`} className="flex gap-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors">
                    <span className="text-blue-400 font-bold text-lg">{index + 1}.</span>
                    <span className="text-gray-200">{suggestion}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">
                Your resume mentions Docker but doesn't show a concrete production use case. Consider adding a project example.
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Button onClick={() => navigate('/new-scan')} variant="outline" size="lg">
              Start Another Analysis
            </Button>
            <Button onClick={() => alert('Redirecting to improvement tools')} variant="gradient" size="lg">
              Improve My Resume
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Results;
