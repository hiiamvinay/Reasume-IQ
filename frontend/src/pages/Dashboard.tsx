import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { getScanHistory } from '../services/scan';
import type { ScanResult } from '../types/resume';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const response = await getScanHistory();
        setScans(response.data.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  const avgScore = scans.length ? scans.reduce((sum, scan) => sum + scan.match_score, 0) / scans.length : 0;
  const maxScore = scans.length ? Math.max(...scans.map(s => s.match_score)) : 0;

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
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{user?.name}</span>
            </h1>
            <p className="text-gray-400">Track your resume performance and improve your chances</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Resumes Card */}
            <div className="glass-card-dark p-8 hover:scale-105 transition-transform cursor-pointer group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-2">Total Resumes</p>
                  <p className="text-4xl font-bold text-white">{scans.length}</p>
                </div>
                <div className="text-5xl group-hover:scale-110 transition-transform">📋</div>
              </div>
              <p className="text-gray-500 text-sm mt-4">Analyzed resumes</p>
            </div>

            {/* Average Score Card */}
            <div className="glass-card-dark p-8 hover:scale-105 transition-transform cursor-pointer group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-2">Average Match</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {Math.round(avgScore * 100)}%
                  </p>
                </div>
                <div className="text-5xl group-hover:scale-110 transition-transform">📊</div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                <div className={`bg-gradient-to-r ${getScoreColor(avgScore)} h-2 rounded-full`} style={{ width: `${avgScore * 100}%` }}></div>
              </div>
            </div>

            {/* Best Score Card */}
            <div className="glass-card-dark p-8 hover:scale-105 transition-transform cursor-pointer group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-2">Best Match</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {Math.round(maxScore * 100)}%
                  </p>
                </div>
                <div className="text-5xl group-hover:scale-110 transition-transform">🏆</div>
              </div>
              <p className="text-gray-500 text-sm mt-4">Your highest score</p>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="mb-8">
            <Link to="/new-scan">
              <Button variant="gradient" size="lg" className="w-full md:w-auto">
                + Start New Scan
              </Button>
            </Link>
          </div>

          {/* Recent Scans Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📈</span> Recent Scans
            </h2>
            {loading ? (
              <div className="glass-card-dark p-12 text-center">
                <div className="inline-block">
                  <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-400 mt-4">Loading your scans...</p>
              </div>
            ) : scans.length === 0 ? (
              <div className="glass-card-dark p-12 text-center">
                <div className="text-5xl mb-4">📭</div>
                <p className="text-gray-400 text-lg">No scans yet. Start by uploading your resume!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {scans.map((scan, idx) => (
                  <Link key={scan.id} to={`/results`}>
                    <div className="glass-card-dark p-6 hover:bg-white/[0.08] transition-all cursor-pointer group transform hover:translate-x-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="text-white font-semibold group-hover:text-blue-300 transition-colors">
                              Job #{scan.id.slice(0, 8)}
                            </p>
                            <p className="text-gray-400 text-sm">{new Date(scan.created_at).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="w-24 h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
                            <div className="text-center">
                              <p className="text-white text-2xl font-bold">{Math.round(scan.match_score * 100)}</p>
                              <p className="text-white text-xs">Match</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
