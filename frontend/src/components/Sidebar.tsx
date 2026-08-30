import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/new-scan', label: 'New Scan', icon: '📄' },
    { to: '/history', label: 'History', icon: '⏱️' },
    { to: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="h-full w-72 bg-gradient-to-b from-white/40 to-white/20 backdrop-blur-md border-r border-white/20 p-6 sticky left-0 top-20">
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 mb-4">Navigation</h3>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 transform scale-105'
                  : 'text-gray-700 hover:bg-white/30 hover:shadow-md'
              }`
            }
          >
            <span className="text-xl group-hover:scale-110 transition-transform">{link.icon}</span>
            <span className="font-semibold">{link.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
