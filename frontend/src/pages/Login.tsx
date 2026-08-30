import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/auth';
import Button from '../components/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login({ email, password });
      const { access_token, user } = response.data;
      authLogin(user, access_token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <div className="glass-card backdrop-blur-md p-10 rounded-3xl shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">📄</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-center text-gray-600 text-sm mb-8">Sign in to your ResumeIQ account</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/30 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/30 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              variant="gradient"
              size="lg"
              className="w-full"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-gray-600 text-sm">OR</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-700">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Sign up here
            </Link>
          </p>

          {/* Back to Landing */}
          <p className="text-center text-gray-600 text-sm mt-6">
            <Link to="/" className="hover:text-gray-800 transition-colors">
              ← Back to home
            </Link>
          </p>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="text-white/80 text-sm">
            <div className="text-2xl mb-2">🚀</div>
            <p className="font-medium">Fast</p>
          </div>
          <div className="text-white/80 text-sm">
            <div className="text-2xl mb-2">🔒</div>
            <p className="font-medium">Secure</p>
          </div>
          <div className="text-white/80 text-sm">
            <div className="text-2xl mb-2">🎯</div>
            <p className="font-medium">Accurate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
