import { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, User, ChevronDown } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: 'operator' | 'supervisor' | 'admin') => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'operator' | 'supervisor' | 'admin'>('operator');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      onLogin(role);
    }, 800);
  };

  const getRoleColor = () => {
    switch(role) {
      case 'operator': return 'cyan';
      case 'supervisor': return 'green';
      case 'admin': return 'purple';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-6">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/30 rounded-2xl mb-6">
            <Shield className="w-10 h-10 text-cyan-400" />
          </div>
          <h1 className="text-white text-3xl mb-2">Kakinada 360</h1>
          <p className="text-gray-400 text-sm">Command & Control System</p>
          <div className="mt-2 text-xs text-gray-600">
            Smart City Surveillance & Monitoring
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-[#0d1117] border-2 border-[#1f2937] rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[#1f2937] bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
            <h2 className="text-white text-lg">Secure Login</h2>
            <p className="text-xs text-gray-500 mt-1">Enter your credentials to access the system</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Role</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'operator' | 'supervisor' | 'admin')}
                  className="w-full bg-[#0a0e1a] border border-[#1f2937] rounded-lg px-4 py-3 text-white text-sm appearance-none cursor-pointer hover:border-cyan-500/50 focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="operator">Control Room Operator (CCO)</option>
                  <option value="supervisor">Supervisor (SI / Inspector)</option>
                  <option value="admin">System Administrator (DSP Office)</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
              <p className="text-xs text-gray-600 mt-1.5">
                {role === 'operator' && '→ Ground-level monitoring & first-level verification'}
                {role === 'supervisor' && '→ Event validation, approval authority & decision-making'}
                {role === 'admin' && '→ Governance, auditing, configuration & system oversight'}
              </p>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full bg-[#0a0e1a] border border-[#1f2937] rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder-gray-600 hover:border-cyan-500/50 focus:outline-none focus:border-cyan-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-[#0a0e1a] border border-[#1f2937] rounded-lg pl-10 pr-12 py-3 text-white text-sm placeholder-gray-600 hover:border-cyan-500/50 focus:outline-none focus:border-cyan-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500 bg-[#0a0e1a]"
                />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg text-white font-medium transition-all ${
                isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : `bg-${getRoleColor()}-500 hover:bg-${getRoleColor()}-600 hover:shadow-lg hover:shadow-${getRoleColor()}-500/20`
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="px-6 py-4 bg-[#0a0e1a] border-t border-[#1f2937]">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>🔒 Secure Connection</span>
              <span>v2.1.3</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <p className="text-xs text-yellow-500/90">
              Authorized Personnel Only • All sessions are logged
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-xs text-gray-600">
            © 2025 Kakinada Smart City Initiative
          </p>
          <p className="text-xs text-gray-700">
            Ministry of Home Affairs • Government of India
          </p>
        </div>
      </div>
    </div>
  );
}
