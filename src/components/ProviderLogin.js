import React, { useState } from 'react';
import { ChefHat, ArrowLeft, User, Lock, Eye, EyeOff, CheckCircle, Shield } from 'lucide-react';

const ProviderLogin = ({ setActivePortal, onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  // Predefined provider accounts for demo
  const demoAccounts = [
    { 
      username: 'mun.dining', 
      password: 'provider123', 
      name: 'MUN Dining Services',
      manager: 'Sarah Mitchell',
      type: 'University Dining'
    },
    { 
      username: 'campus.corner', 
      password: 'provider123', 
      name: 'Campus Corner Deli',
      manager: 'Mike Thompson',
      type: 'Campus Restaurant'
    },
    { 
      username: 'bruneau.kitchen', 
      password: 'provider123', 
      name: 'Bruneau Centre Kitchen',
      manager: 'Lisa Chen',
      type: 'Campus Dining'
    }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLogging(true);

    // Simulate login delay
    setTimeout(() => {
      const account = demoAccounts.find(acc => 
        acc.username === formData.username && acc.password === formData.password
      );

      if (account || formData.username === 'demo' && formData.password === 'demo') {
        onLogin(account || { 
          name: 'Demo Provider', 
          manager: 'Demo Manager', 
          type: 'Demo Restaurant',
          username: 'demo'
        });
      } else {
        alert('Invalid credentials! Try:\nUsername: mun.dining\nPassword: provider123\n\nOr use: demo / demo');
        setIsLogging(false);
      }
    }, 1500);
  };

  const quickLogin = (account) => {
    setFormData({ username: account.username, password: account.password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-2xl shadow-xl">
              <ChefHat className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
            Provider Login
          </h1>
          <p className="text-gray-600">Access your CampusPlate provider dashboard</p>
        </div>

        {/* Quick Demo Accounts */}
        <div className="bg-orange-50 rounded-xl p-4 mb-6 border border-orange-200">
          <h3 className="font-bold text-orange-800 mb-3 text-sm">🚀 Quick Demo Login:</h3>
          <div className="space-y-2">
            {demoAccounts.slice(0, 2).map(account => (
              <button
                key={account.username}
                onClick={() => quickLogin(account)}
                className="w-full text-left p-2 bg-white rounded-lg hover:bg-orange-100 transition-colors text-xs border border-orange-200"
              >
                <div className="font-medium text-orange-800">{account.name}</div>
                <div className="text-orange-600">{account.username} • {account.manager}</div>
              </button>
            ))}
            <button
              onClick={() => setFormData({ username: 'demo', password: 'demo' })}
              className="w-full text-left p-2 bg-white rounded-lg hover:bg-orange-100 transition-colors text-xs border border-orange-200"
            >
              <div className="font-medium text-orange-800">Quick Demo</div>
              <div className="text-orange-600">demo / demo</div>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Provider Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder="mun.dining or 'demo'"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Enter password or 'demo'"
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLogging || !formData.username || !formData.password}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg ${
                isLogging || !formData.username || !formData.password
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700'
              }`}
            >
              {isLogging ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                'Access Provider Dashboard'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Secure Provider Authentication</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
              <CheckCircle className="w-3 h-3 text-blue-500" />
              <span>HACCP Certified • ISO 27001 Compliant</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setActivePortal('landing')}
          className="w-full mt-6 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl transition-all flex items-center justify-center space-x-2 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};

export default ProviderLogin;