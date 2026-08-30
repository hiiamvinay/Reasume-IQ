import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getScanHistory } from '../services/scan';
import type { ScanResult } from '../types/resume';

const History: React.FC = () => {
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getScanHistory();
        setScans(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const getScanColor = (score: number) => {
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
            <h1 className="text-3xl font-bold text-white mb-2">Scan History</h1>
            <p className="text-gray-400">View all your resume analyses</p>
          </div>

          {loading ? (
            <div className="glass-card-dark p-12 text-center">
              <div className="inline-block">
                <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-400 mt-4">Loading your history...</p>
            </div>
          ) : scans.length === 0 ? (
            <div className="glass-card-dark p-16 text-center rounded-2xl">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-white mb-2">No Scans Yet</h3>
              <p className="text-gray-400 mb-6">Start by running your first resume analysis</p>
              <Link to="/new-scan">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                  Create First Scan
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {scans.map((scan, idx) => (
                <Link key={scan.id} to="/results" state={{ scanResult: scan }}>
                  <div className="glass-card-dark p-6 hover:bg-white/[0.08] transition-all cursor-pointer rounded-2xl group transform hover:translate-x-2">
                    <div className="flex items-center justify-between gap-6">
                      {/* Left Side - Info */}
                      <div className="flex-1 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-white font-semibold group-hover:text-blue-300 transition-colors mb-1">
                            Job Analysis #{scan.id.slice(0, 8)}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {new Date(scan.created_at).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Right Side - Score */}
                      <div className="flex-shrink-0">
                        <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${getScanColor(scan.match_score)} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                          <div className="text-center">
                            <p className="text-white text-3xl font-bold">{Math.round(scan.match_score * 100)}</p>
                            <p className="text-white text-xs font-semibold opacity-90">Match</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default History;
