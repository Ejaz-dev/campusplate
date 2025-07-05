import React, { useState } from 'react';
import { Utensils, ArrowLeft, User, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

const StudentLogin = ({ setActivePortal, onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  // Predefined student accounts for demo
  const demoAccounts = [
    { email: 'ejaz.khan@mun.ca', password: 'demo123', name: 'Ejaz Khan', program: 'Computer Science' },
    { email: 'sarah.johnson@mun.ca', password: 'demo123', name: 'Sarah Johnson', program: 'Engineering' },
    { email: 'mike.chen@mun.ca', password: 'demo123', name: 'Mike Chen', program: 'Business' }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLogging(true);

    // Simulate login delay
    setTimeout(() => {
      const account = demoAccounts.find(acc => 
        acc.email === formData.email && acc.password === formData.password
      );

      if (account || formData.email === 'demo' && formData.password === 'demo') {
        onLogin(account || { name: 'Demo Student', program: 'Demo Program', email: 'demo@mun.ca' });
      } else {
        alert('Invalid credentials! Try:\nEmail: ejaz.khan@mun.ca\nPassword: demo123\n\nOr use: demo / demo');
        setIsLogging(false);
      }
    }, 1500);
  };

  const quickLogin = (account) => {
    setFormData({ email: account.email, password: account.password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-2xl shadow-xl">
              <Utensils className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
            Student Login
          </h1>
          <p className="text-gray-600">Access your CampusPlate student account</p>
        </div>

        {/* Quick Demo Accounts */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3 text-sm">🚀 Quick Demo Login:</h3>
          <div className="space-y-2">
            {demoAccounts.slice(0, 2).map(account => (
              <button
                key={account.email}
                onClick={() => quickLogin(account)}
                className="w-full text-left p-2 bg-white rounded-lg hover:bg-blue-100 transition-colors text-xs border border-blue-200"
              >
                <div className="font-medium text-blue-800">{account.name}</div>
                <div className="text-blue-600">{account.email}</div>
              </button>
            ))}
            <button
              onClick={() => setFormData({ email: 'demo', password: 'demo' })}
              className="w-full text-left p-2 bg-white rounded-lg hover:bg-blue-100 transition-colors text-xs border border-blue-200"
            >
              <div className="font-medium text-blue-800">Quick Demo</div>
              <div className="text-blue-600">demo / demo</div>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Student Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your.name@mun.ca or 'demo'"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
              disabled={isLogging || !formData.email || !formData.password}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg ${
                isLogging || !formData.email || !formData.password
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700'
              }`}
            >
              {isLogging ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                'Login to Student Portal'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Secure MUN Authentication</span>
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

export default StudentLogin;