import React, { useState } from 'react';
import { 
  ChefHat, Store, ArrowLeft, Plus, Clock, MapPin, Users, TrendingUp, 
  DollarSign, Globe, Bell, Eye, Edit, Trash2, Star, CheckCircle, AlertCircle
} from 'lucide-react';
import LocationMap from './LocationMap';

const ProviderPortal = ({ setActivePortal }) => {
  const [postedMeals, setPostedMeals] = useState([
    {
      id: 1,
      title: "Gourmet Pizza Buffet Surplus",
      description: "Artisan pizzas from our lunch buffet - margherita, pepperoni, and veggie supreme",
      cuisine: "Italian",
      quantity: 12,
      originalQuantity: 18,
      pickupTime: "4:00 PM - 6:00 PM",
      location: "UC Cafeteria - Main Counter",
      dietary: ["Vegetarian", "Gluten-Free Option"],
      postedAt: "2:30 PM",
      claimed: 6,
      status: "Active",
      estimatedValue: 89.50,
      rating: 4.7,
      views: 45,
      category: "Main Course"
    },
    {
      id: 2,
      title: "Fresh Sushi Selection",
      description: "California rolls, salmon nigiri, and vegetable maki from today's prep",
      cuisine: "Japanese",
      quantity: 0,
      originalQuantity: 15,
      pickupTime: "3:00 PM - 5:00 PM",
      location: "Campus Corner Sushi Bar",
      dietary: ["Contains Fish", "Gluten-Free"],
      postedAt: "1:45 PM",
      claimed: 15,
      status: "Completed",
      estimatedValue: 127.80,
      rating: 4.9,
      views: 78,
      category: "Main Course"
    }
  ]);

  const [newMeal, setNewMeal] = useState({
    title: '',
    description: '',
    cuisine: '',
    quantity: '',
    pickupTime: '',
    location: '',
    dietary: [],
    category: '',
    estimatedValue: ''
  });

  const [showForm, setShowForm] = useState(false);

  const providerProfile = {
    name: "MUN Dining Services",
    manager: "Sarah Mitchell",
    type: "University Dining",
    since: "2025",
    rating: 4.8,
    verified: true
  };

  const analytics = {
    totalMealsPosted: 156,
    totalClaimed: 134,
    wasteReduced: 86.2,
    costSavings: 2840.50,
    studentsSaved: 89,
    avgRating: 4.6
  };

  const handleAddMeal = () => {
    if (newMeal.title && newMeal.quantity && newMeal.pickupTime && newMeal.location) {
      const meal = {
        id: Date.now(),
        ...newMeal,
        quantity: parseInt(newMeal.quantity),
        originalQuantity: parseInt(newMeal.quantity),
        postedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        claimed: 0,
        status: 'Active',
        estimatedValue: parseFloat(newMeal.estimatedValue) || 0,
        rating: 0,
        views: 0
      };
      setPostedMeals([meal, ...postedMeals]);
      setNewMeal({
        title: '', description: '', cuisine: '', quantity: '', pickupTime: '',
        location: '', dietary: [], category: '', estimatedValue: ''
      });
      setShowForm(false);
    }
  };

  const handleDietaryChange = (dietary) => {
    setNewMeal(prev => ({
      ...prev,
      dietary: prev.dietary.includes(dietary)
        ? prev.dietary.filter(d => d !== dietary)
        : [...prev.dietary, dietary]
    }));
  };

  const cuisineOptions = ['South Asian', 'East Asian', 'Middle Eastern', 'Mediterranean', 'Italian', 'Mexican', 'American', 'Japanese', 'Other'];
  const categoryOptions = ['Main Course', 'Side Dish', 'Appetizer', 'Dessert', 'Beverage', 'Snack'];
  const dietaryOptions = ['Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'];

  const getCuisineColor = (cuisine) => {
    const colors = {
      'Italian': 'bg-green-100 text-green-800',
      'Japanese': 'bg-red-100 text-red-800',
      'South Asian': 'bg-orange-100 text-orange-800',
      'Mediterranean': 'bg-blue-100 text-blue-800',
      'Mexican': 'bg-yellow-100 text-yellow-800',
      'Middle Eastern': 'bg-purple-100 text-purple-800'
    };
    return colors[cuisine] || 'bg-gray-100 text-gray-800';
  };

  const getDietaryColor = (dietary) => {
    const colors = {
      'Vegetarian': 'bg-emerald-100 text-emerald-800',
      'Vegan': 'bg-purple-100 text-purple-800',
      'Halal': 'bg-green-100 text-green-800',
      'Gluten-Free': 'bg-blue-100 text-blue-800',
      'Contains Fish': 'bg-cyan-100 text-cyan-800'
    };
    return colors[dietary] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Colorful Professional Header */}
      <div className="bg-white shadow-lg border-b-4 border-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 rounded-xl shadow-lg">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  CampusPlate Provider Portal
                </h1>
                <p className="text-gray-600 text-sm">Share surplus meals with students in need</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 rounded-full px-3 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-green-800">Live</span>
              </div>
              
              <div className="relative">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Bell className="w-5 h-5 text-blue-600 cursor-pointer" />
                </div>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">7</span>
              </div>

              <div className="flex items-center space-x-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl px-4 py-3 border border-orange-200">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  MD
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-gray-800">{providerProfile.name}</div>
                  <div className="text-xs text-orange-600 font-medium">{providerProfile.manager}</div>
                </div>
                {providerProfile.verified && (
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                )}
              </div>

              <button
                onClick={() => setActivePortal('landing')}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-lg flex items-center space-x-2 transform hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Colorful Analytics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Store className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 opacity-70" />
            </div>
            <div className="text-3xl font-bold mb-1">{analytics.totalMealsPosted}</div>
            <div className="text-blue-100 text-sm font-medium">Total Meals Posted</div>
            <div className="text-xs text-blue-200 mt-2">↗️ +12% from last week</div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <CheckCircle className="w-5 h-5 opacity-70" />
            </div>
            <div className="text-3xl font-bold mb-1">{analytics.totalClaimed}</div>
            <div className="text-green-100 text-sm font-medium">Meals Claimed</div>
            <div className="text-xs text-green-200 mt-2">✅ {analytics.wasteReduced}% success rate</div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Globe className="w-6 h-6" />
              </div>
              <Star className="w-5 h-5 opacity-70" />
            </div>
            <div className="text-3xl font-bold mb-1">{analytics.studentsSaved}</div>
            <div className="text-purple-100 text-sm font-medium">Students Helped</div>
            <div className="text-xs text-purple-200 mt-2">🎯 Impact growing daily</div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <DollarSign className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 opacity-70" />
            </div>
            <div className="text-3xl font-bold mb-1">${analytics.costSavings.toLocaleString()}</div>
            <div className="text-orange-100 text-sm font-medium">Cost Savings</div>
            <div className="text-xs text-orange-200 mt-2">💰 Waste disposal savings</div>
          </div>
        </div>
        
                

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Meal Posting */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center text-gray-800">
                  <Plus className="mr-2 text-orange-600" />
                  Post New Meal
                </h2>
                {!showForm && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl text-sm hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg"
                  >
                    + Quick Post
                  </button>
                )}
              </div>
              
              {showForm ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Meal Title *"
                    value={newMeal.title}
                    onChange={(e) => setNewMeal({...newMeal, title: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
                  
                  <textarea
                    placeholder="Detailed Description *"
                    value={newMeal.description}
                    onChange={(e) => setNewMeal({...newMeal, description: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-24 transition-colors"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={newMeal.cuisine}
                      onChange={(e) => setNewMeal({...newMeal, cuisine: e.target.value})}
                      className="p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    >
                      <option value="">Select Cuisine *</option>
                      {cuisineOptions.map(cuisine => (
                        <option key={cuisine} value={cuisine}>{cuisine}</option>
                      ))}
                    </select>
                    
                    <select
                      value={newMeal.category}
                      onChange={(e) => setNewMeal({...newMeal, category: e.target.value})}
                      className="p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    >
                      <option value="">Category</option>
                      {categoryOptions.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Quantity *"
                      value={newMeal.quantity}
                      onChange={(e) => setNewMeal({...newMeal, quantity: e.target.value})}
                      className="p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Value ($)"
                      value={newMeal.estimatedValue}
                      onChange={(e) => setNewMeal({...newMeal, estimatedValue: e.target.value})}
                      className="p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    />
                  </div>
                  
                  <input
                    type="text"
                    placeholder="Pickup Time (e.g., 2:00 PM - 4:00 PM) *"
                    value={newMeal.pickupTime}
                    onChange={(e) => setNewMeal({...newMeal, pickupTime: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
                  
                  <input
                    type="text"
                    placeholder="Pickup Location *"
                    value={newMeal.location}
                    onChange={(e) => setNewMeal({...newMeal, location: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Dietary Information</label>
                    <div className="grid grid-cols-2 gap-3">
                      {dietaryOptions.map(diet => (
                        <label key={diet} className="flex items-center text-sm font-medium">
                          <input
                            type="checkbox"
                            checked={newMeal.dietary.includes(diet)}
                            onChange={() => handleDietaryChange(diet)}
                            className="mr-2 text-orange-500 focus:ring-orange-500 rounded"
                          />
                          <span>{diet}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleAddMeal}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-bold transform hover:scale-105 shadow-lg"
                    >
                      🚀 Post Meal
                    </button>
                    <button
                      onClick={() => setShowForm(false)}
                      className="px-6 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🍽️</div>
                  <p className="text-gray-600 mb-4 font-bold">Ready to share surplus meals?</p>
                  <p className="text-gray-500 text-sm mb-6">Help students while reducing waste and earning sustainability credits</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-bold transform hover:scale-105 shadow-lg"
                  >
                    🚀 Post Your First Meal
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Posted Meals */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center text-gray-800">
                  <Store className="mr-2 text-green-600" />
                  My Posted Meals ({postedMeals.length})
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold">{analytics.avgRating}</span>
                  </div>
                  <span>Average Rating</span>
                </div>
              </div>
              
              {postedMeals.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-8xl mb-6">📋</div>
                  <h3 className="text-xl font-bold text-gray-600 mb-3">No meals posted yet</h3>
                  <p className="text-gray-500 mb-8">Start posting surplus meals to help students and reduce waste</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-bold text-lg shadow-lg"
                  >
                    Post Your First Meal
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {postedMeals.map(meal => (
                    <div key={meal.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-orange-300 transition-all">
                      {/* Meal Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{meal.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              meal.status === 'Active' ? 'bg-green-100 text-green-800' :
                              meal.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {meal.status}
                            </span>
                            {meal.rating > 0 && (
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-bold">{meal.rating}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-3 leading-relaxed">{meal.description}</p>
                        </div>
                        
                        <div className="ml-6 text-right">
                          <div className={`px-4 py-2 rounded-xl text-sm font-bold mb-2 ${
                            meal.quantity > 0 ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {meal.quantity} / {meal.originalQuantity} left
                          </div>
                          <div className="text-xs text-gray-500">
                            👀 {meal.views} views
                          </div>
                        </div>
                      </div>

                      {/* Colorful Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {meal.dietary.map(diet => (
                          <span key={diet} className={`px-3 py-1 rounded-full text-xs font-bold ${getDietaryColor(diet)}`}>
                            {diet}
                          </span>
                        ))}
                        {meal.cuisine && (
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCuisineColor(meal.cuisine)}`}>
                            {meal.cuisine}
                          </span>
                        )}
                        {meal.category && (
                          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold">
                            {meal.category}
                          </span>
                        )}
                      </div>

                      {/* Meal Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-green-600" />
                          <div>
                            <div className="font-bold text-gray-700">Pickup Time</div>
                            <div className="text-gray-600">{meal.pickupTime}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-red-600" />
                          <div>
                            <div className="font-bold text-gray-700">Location</div>
                            <div className="text-gray-600">{meal.location}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <div>
                            <div className="font-bold text-gray-700">Est. Value</div>
                            <div className="text-gray-600">${meal.estimatedValue.toFixed(2)}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <div>
                            <div className="font-bold text-gray-700">Students Helped</div>
                            <div className="text-gray-600">{meal.claimed}</div>
                          </div>
                        </div>
                      </div>

                      {/* Impact Metrics */}
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-4 border border-green-200">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-green-600">{meal.claimed}</div>
                            <div className="text-xs text-gray-600 font-medium">Students Helped</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-blue-600">
                              {((meal.claimed / meal.originalQuantity) * 100).toFixed(0)}%
                            </div>
                            <div className="text-xs text-gray-600 font-medium">Success Rate</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-purple-600">
                              ${(meal.claimed * (meal.estimatedValue / meal.originalQuantity)).toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-600 font-medium">Value Rescued</div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4 text-xs text-gray-500 font-medium">
                          <span>Posted at {meal.postedAt}</span>
                          <span>•</span>
                          <span>ID: {meal.id}</span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors bg-blue-50 rounded-lg hover:bg-blue-100">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors bg-orange-50 rounded-lg hover:bg-orange-100">
                            <Edit className="w-4 h-4" />
                          </button>
                          {meal.status === 'Completed' && (
                            <button className="p-2 text-gray-600 hover:text-red-600 transition-colors bg-red-50 rounded-lg hover:bg-red-100">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Success Message */}
                      {meal.status === 'Completed' && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-green-800 font-bold text-sm">
                              🎉 All meals claimed! Outstanding impact achieved!
                            </span>
                          </div>
                          <div className="mt-2 text-xs text-green-700 font-medium">
                            You helped {meal.claimed} students and saved ${meal.estimatedValue.toFixed(2)} worth of food
                          </div>
                        </div>
                      )}

                      {/* Low Stock Warning */}
                      {meal.quantity > 0 && meal.quantity <= 2 && meal.status === 'Active' && (
                        <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl">
                         <div className="flex items-center space-x-2">
                           <AlertCircle className="w-5 h-5 text-orange-600" />
                           <span className="text-orange-800 font-bold text-sm">
                             ⚡ Low stock alert! Only {meal.quantity} portions remaining
                           </span>
                         </div>
                       </div>
                     )}
                   </div>
                 ))}
               </div>
             )}
           </div>
         </div>
       </div>

       {/* Colorful Sustainability Footer */}
       <div className="mt-12 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white text-center">
         <h2 className="text-3xl font-bold mb-4">🌍 Sustainability Leadership Dashboard</h2>
         <p className="text-green-100 mb-6 text-lg font-medium">
           Your contributions are making a real difference in reducing food waste and supporting student nutrition
         </p>
         
         {/* Achievement Badges */}
         <div className="flex justify-center items-center space-x-8 mb-6">
           <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
             <div className="text-2xl mb-2">🏆</div>
             <div className="text-sm font-bold">Eco Champion</div>
             <div className="text-xs text-green-200">Top 5% Provider</div>
           </div>
           <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
             <div className="text-2xl mb-2">⭐</div>
             <div className="text-sm font-bold">5-Star Rating</div>
             <div className="text-xs text-blue-200">Excellent Service</div>
           </div>
           <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
             <div className="text-2xl mb-2">🌱</div>
             <div className="text-sm font-bold">Carbon Neutral</div>
             <div className="text-xs text-purple-200">Net Zero Impact</div>
           </div>
           <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
             <div className="text-2xl mb-2">👥</div>
             <div className="text-sm font-bold">Community Hero</div>
             <div className="text-xs text-yellow-200">89+ Students Helped</div>
           </div>
         </div>
         
         {/* Certifications */}
         <div className="flex justify-center items-center space-x-6 opacity-90">
           <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
             <CheckCircle className="w-5 h-5" />
             <span className="text-sm font-bold">ISO 14001 Certified</span>
           </div>
           <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
             <Star className="w-5 h-5" />
             <span className="text-sm font-bold">HACCP Compliant</span>
           </div>
           <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
             <Globe className="w-5 h-5" />
             <span className="text-sm font-bold">UN SDG Partner</span>
           </div>
         </div>
         
         <div className="mt-6 text-sm text-green-200 font-medium">
           Recognized as an A+ Sustainability Partner • Serving Memorial University since {providerProfile.since}
         </div>
       </div>
     </div>
   </div>
 );
};

export default ProviderPortal;