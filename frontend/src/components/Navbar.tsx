import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20 shadow-lg">
      <div className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ResumeIQ
          </span>
        </Link>
        <div className="flex items-center gap-3">
          {user && (
            <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-white/40 backdrop-blur-sm border border-white/20">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{user.name?.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-gray-700 font-medium text-sm">{user.name}</span>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
