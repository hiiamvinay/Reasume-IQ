import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <div className="max-w-4xl text-center animate-fade-in-up">
          {/* Badge */}
          <div className="mb-8 inline-block px-6 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
            <span className="text-white text-sm font-semibold">🚀 AI-Powered Resume Analysis</span>
          </div>

          {/* Main Title */}
          <h1 className="mb-6 text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg">
            Know Your Resume's
            <br />
            <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
              True Potential
            </span>
          </h1>

          {/* Description */}
          <p className="mb-8 text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
            Compare your resume against any job description using advanced AI-powered semantic matching. Get actionable insights to land your dream job.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
            <Link to="/signup">
              <Button variant="gradient" size="lg" className="w-full md:w-auto">
                Start Analyzing Now
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full md:w-auto">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="glass-card p-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Match Score</h3>
              <p className="text-gray-700">Instant AI analysis of how well your resume matches the job requirements</p>
            </div>
            <div className="glass-card p-8">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Skill Gaps</h3>
              <p className="text-gray-700">Discover missing skills and keywords to improve your application</p>
            </div>
            <div className="glass-card p-8">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">AI Suggestions</h3>
              <p className="text-gray-700">Get personalized recommendations to strengthen your profile</p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-4">
              <div className="text-3xl font-bold text-white">10K+</div>
              <p className="text-white/80 text-sm">Resumes Analyzed</p>
            </div>
            <div className="glass-card p-4">
              <div className="text-3xl font-bold text-white">95%</div>
              <p className="text-white/80 text-sm">Accuracy Rate</p>
            </div>
            <div className="glass-card p-4">
              <div className="text-3xl font-bold text-white">5K+</div>
              <p className="text-white/80 text-sm">Happy Users</p>
            </div>
            <div className="glass-card p-4">
              <div className="text-3xl font-bold text-white">24/7</div>
              <p className="text-white/80 text-sm">Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
