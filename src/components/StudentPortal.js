import React, { useState } from 'react';
import { Utensils, Heart, Clock, MapPin, ArrowLeft, Search, User, Bell, Star, X, AlertTriangle } from 'lucide-react';
import LocationMap from './LocationMap';

const getWalkingTime = (distance) => {
  if (distance === "On campus") return "2-5 min walk";
  const km = parseFloat(distance);
  if (isNaN(km)) return "5 min walk";
  return `${Math.ceil(km * 12)} min walk`;
};

const getUrgencyInfo = (pickupTime) => {
  const now = new Date();
  const [startTime] = pickupTime.split(' - ');
  
  try {
    const [time, period] = startTime.trim().split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let pickup24Hour = hours;
    if (period === 'PM' && hours !== 12) {
      pickup24Hour = hours + 12;
    } else if (period === 'AM' && hours === 12) {
      pickup24Hour = 0;
    }
    
    const pickupDate = new Date();
    pickupDate.setHours(pickup24Hour, minutes || 0, 0, 0);
    
    if (pickupDate < now) {
      pickupDate.setDate(pickupDate.getDate() + 1);
    }
    
    const diffMinutes = Math.floor((pickupDate - now) / (1000 * 60));
    
    if (diffMinutes < 45 && diffMinutes > 0) {
      return {
        isUrgent: true,
        message: `⚡ Expires in ${diffMinutes}min!`,
        bgColor: 'bg-red-50 border-red-200',
        borderColor: 'border-l-4 border-red-500',
        textColor: 'text-red-800',
        sortPriority: 1
      };
    } 
    else if (diffMinutes < 120 && diffMinutes > 0) {
      return {
        isUrgent: false,
        message: `🕐 Pickup soon - ${Math.floor(diffMinutes/60)}h ${diffMinutes%60}min`,
        bgColor: 'bg-orange-50 border-orange-200',
        borderColor: 'border-l-4 border-orange-500',
        textColor: 'text-orange-800',
        sortPriority: 2
      };
    } 
    else {
      return {
        isUrgent: false,
        message: '✅ Plenty of time',
        bgColor: 'bg-green-50 border-green-200',
        borderColor: 'border-l-4 border-green-500',
        textColor: 'text-green-800',
        sortPriority: 3
      };
    }
  } catch (error) {
    return {
      isUrgent: false,
      message: '✅ Plenty of time',
      bgColor: 'bg-green-50 border-green-200',
      borderColor: 'border-l-4 border-green-500',
      textColor: 'text-green-800',
      sortPriority: 3
    };
  }
};

// Helper function to get the start of the current week (Monday)
const getWeekStart = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  const monday = new Date(d.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
};

// Helper function to check if a date is in the current week
const isInCurrentWeek = (date) => {
  const weekStart = getWeekStart();
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);
  
  const checkDate = new Date(date);
  return checkDate >= weekStart && checkDate < weekEnd;
};

const StudentPortal = ({ setActivePortal }) => {
  // Get current time for creating realistic urgent times
  const now = new Date();
  const urgentTime1 = new Date(now.getTime() + 25 * 60000);
  const urgentTime2 = new Date(now.getTime() + 35 * 60000);
  const soonTime = new Date(now.getTime() + 90 * 60000);
  const laterTime = new Date(now.getTime() + 4 * 60 * 60000);

  const formatTime = (date) => {
    const endTime = new Date(date.getTime() + 30 * 60000);
    const formatOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    return `${date.toLocaleTimeString([], formatOptions)} - ${endTime.toLocaleTimeString([], formatOptions)}`;
  };

  const [availableMeals, setAvailableMeals] = useState([
    {
      id: 1,
      title: "Gourmet Pizza Slices",
      provider: "Tony's Pizza Palace",
      providerType: "Local Restaurant",
      cuisine: "Italian",
      quantity: 8,
      pickupTime: formatTime(urgentTime1),
      location: "245 Duckworth Street",
      dietary: ["Vegetarian Option", "Dairy"],
      description: "Fresh pizza slices from today's preparation - margherita and pepperoni",
      postedTime: "30 mins ago",
      rating: 4.8,
      distance: "0.8"
    },
    {
      id: 2,
      title: "Fresh Sushi Rolls",
      provider: "Sakura Sushi Bar",
      providerType: "Local Restaurant", 
      cuisine: "Japanese",
      quantity: 12,
      pickupTime: formatTime(soonTime),
      location: "180 Water Street",
      dietary: ["Contains Fish", "Gluten-Free"],
      description: "California rolls and veggie rolls prepared fresh today",
      postedTime: "45 mins ago",
      rating: 4.9,
      distance: "1.2"
    },
    {
      id: 3,
      title: "Authentic Chicken Biryani",
      provider: "MUN Dining - UC Cafeteria",
      providerType: "Campus Dining",
      cuisine: "South Asian",
      quantity: 5,
      pickupTime: formatTime(laterTime),
      location: "UC Cafeteria Exit",
      dietary: ["Halal", "Dairy-Free"],
      description: "Fragrant basmati rice with spiced chicken, served with raita",
      postedTime: "1 hour ago",
      rating: 4.7,
      distance: "On campus"
    },
    {
      id: 4,
      title: "Mediterranean Mezze Bowl",
      provider: "Campus Corner Deli",
      cuisine: "Mediterranean",
      quantity: 8,
      pickupTime: formatTime(urgentTime2),
      location: "Campus Corner - Front Counter",
      dietary: ["Vegetarian", "Vegan"],
      description: "Hummus, falafel, tabbouleh, and fresh vegetables",
      postedTime: "45 mins ago",
      rating: 4.6,
      distance: "On campus"
    },
    {
      id: 5,
      title: "Korean Bulgogi Bowl",
      provider: "Bruneau Centre Kitchen",
      cuisine: "East Asian",
      quantity: 3,
      pickupTime: formatTime(laterTime),
      location: "Bruneau Centre Kitchen",
      dietary: ["Halal", "Gluten-Free"],
      description: "Marinated beef with steamed rice and kimchi",
      postedTime: "1 hour ago",
      rating: 4.9,
      distance: "On campus"
    },
    {
      id: 6,
      title: "Italian Pasta Primavera",
      provider: "Marketplace Café",
      cuisine: "Italian",
      quantity: 6,
      pickupTime: formatTime(soonTime),
      location: "Marketplace - Counter 2",
      dietary: ["Vegetarian"],
      description: "Fresh pasta with seasonal vegetables in herb sauce",
      postedTime: "2 hours ago",
      rating: 4.7,
      distance: "On campus"
    }
  ]);

  // Enhanced claimed meals state with claim dates
  const [claimedMeals, setClaimedMeals] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const studentProfile = {
    name: "Ejaz Khan",
    email: "ejaz.khan@mun.ca",
    program: "Computer Science",
    year: "3rd Year"
  };

  // Calculate weekly claims
  const currentWeekClaims = claimedMeals.filter(meal => 
    isInCurrentWeek(meal.claimedDate)
  ).length;
  
  const maxWeeklyClaims = 2;
  const canClaimMore = currentWeekClaims < maxWeeklyClaims;

  const handleClaimMeal = (mealId) => {
    if (!canClaimMore) {
      alert(`⚠️ Weekly limit reached! You can only claim ${maxWeeklyClaims} meals per week. Your limit resets every Monday.`);
      return;
    }

    const meal = availableMeals.find(m => m.id === mealId);
    if (meal && meal.quantity > 0) {
      const claimedMeal = {
        ...meal,
        claimCode: `CP-${Date.now().toString().slice(-6)}`,
        claimedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        claimedDate: new Date(),
        status: 'active'
      };
      setClaimedMeals([claimedMeal, ...claimedMeals]);
      setAvailableMeals(availableMeals.map(m => 
        m.id === mealId ? { ...m, quantity: m.quantity - 1 } : m
      ));
    }
  };

  const handleRemoveClaim = (claimCode) => {
    const claimedMeal = claimedMeals.find(m => m.claimCode === claimCode);
    if (claimedMeal && claimedMeal.status === 'active') {
      // Remove from claimed meals completely (not just change status)
      setClaimedMeals(claimedMeals.filter(m => m.claimCode !== claimCode));
      
      // Add quantity back to available meals
      setAvailableMeals(availableMeals.map(m => 
        m.id === claimedMeal.id ? { ...m, quantity: m.quantity + 1 } : m
      ));
    }
  };


  // Filter and sort meals (urgent first)
  const filteredMeals = availableMeals
    .filter(meal => {
      if (meal.quantity === 0) return false;
      if (selectedFilter !== 'all' && !meal.dietary.some(diet => 
        diet.toLowerCase().includes(selectedFilter.toLowerCase())
      )) return false;
      if (searchTerm && !meal.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !meal.cuisine.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      const urgencyA = getUrgencyInfo(a.pickupTime);
      const urgencyB = getUrgencyInfo(b.pickupTime);
      return urgencyA.sortPriority - urgencyB.sortPriority;
    });

  const filters = [
    { value: 'all', label: 'All Meals', count: availableMeals.filter(m => m.quantity > 0).length, color: 'blue' },
    { value: 'halal', label: 'Halal', count: availableMeals.filter(m => m.quantity > 0 && m.dietary.includes('Halal')).length, color: 'green' },
    { value: 'vegetarian', label: 'Vegetarian', count: availableMeals.filter(m => m.quantity > 0 && m.dietary.includes('Vegetarian')).length, color: 'emerald' },
    { value: 'vegan', label: 'Vegan', count: availableMeals.filter(m => m.quantity > 0 && m.dietary.includes('Vegan')).length, color: 'purple' }
  ];

  const getFilterColors = (color, isSelected) => {
    const colors = {
      blue: isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      green: isSelected ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100',
      emerald: isSelected ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
      purple: isSelected ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
    };
    return colors[color];
  };

  const getCuisineColor = (cuisine) => {
    const colors = {
      'South Asian': 'bg-orange-100 text-orange-800',
      'Mediterranean': 'bg-blue-100 text-blue-800',
      'East Asian': 'bg-red-100 text-red-800',
      'Italian': 'bg-green-100 text-green-800',
      'Japanese': 'bg-red-100 text-red-800',
      'Mexican': 'bg-yellow-100 text-yellow-800',
      'Middle Eastern': 'bg-purple-100 text-purple-800'
    };
    return colors[cuisine] || 'bg-gray-100 text-gray-800';
  };

  const getDietaryColor = (dietary) => {
    const colors = {
      'Halal': 'bg-green-100 text-green-800',
      'Vegetarian': 'bg-emerald-100 text-emerald-800',
      'Vegan': 'bg-purple-100 text-purple-800',
      'Gluten-Free': 'bg-blue-100 text-blue-800',
      'Dairy-Free': 'bg-indigo-100 text-indigo-800',
      'Vegetarian Option': 'bg-emerald-100 text-emerald-800',
      'Contains Fish': 'bg-cyan-100 text-cyan-800',
      'Dairy': 'bg-yellow-100 text-yellow-800'
    };
    return colors[dietary] || 'bg-gray-100 text-gray-800';
  };

  // Count urgent meals
  const urgentMealsCount = filteredMeals.filter(meal => getUrgencyInfo(meal.pickupTime).isUrgent).length;
  const activeClaims = claimedMeals.filter(m => m.status === 'active');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-gradient-to-r from-blue-500 to-green-500">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-xl shadow-lg">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  CampusPlate Student Portal
                </h1>
                <p className="text-gray-600 text-sm">Find affordable surplus meals on campus</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Bell className="w-5 h-5 text-orange-600 cursor-pointer" />
                </div>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">3</span>
              </div>
              <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl px-4 py-3 border border-blue-200">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  EK
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-gray-800">{studentProfile.name}</div>
                  <div className="text-xs text-blue-600 font-medium">{studentProfile.program}</div>
                </div>
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

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Weekly Limit Status */}
            <div className={`rounded-2xl shadow-lg p-6 border-l-4 ${
              canClaimMore ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
            }`}>
              <h3 className={`font-bold mb-4 flex items-center ${
                canClaimMore ? 'text-green-800' : 'text-red-800'
              }`}>
                {canClaimMore ? <Heart className="mr-2 text-green-600" /> : <AlertTriangle className="mr-2 text-red-600" />}
                Weekly Claims
              </h3>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  canClaimMore ? 'text-green-600' : 'text-red-600'
                }`}>
                  {currentWeekClaims} / {maxWeeklyClaims}
                </div>
                <div className={`text-sm font-medium mb-3 ${
                  canClaimMore ? 'text-green-700' : 'text-red-700'
                }`}>
                  {canClaimMore ? `${maxWeeklyClaims - currentWeekClaims} claims remaining` : 'Weekly limit reached'}
                </div>
                {!canClaimMore && (
                  <div className="text-xs text-red-600 bg-red-100 rounded-lg p-2 font-medium">
                    Limit resets every Monday
                  </div>
                )}
              </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <Search className="mr-2 text-blue-600" />
                Search Meals
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search food"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-4">Dietary Preferences</h3>
              <div className="space-y-3">
                {filters.map(filter => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedFilter(filter.value)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all transform hover:scale-105 flex justify-between items-center font-medium ${
                      getFilterColors(filter.color, selectedFilter === filter.value)
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                      selectedFilter === filter.value ? 'bg-white/20' : 'bg-white shadow-sm'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Claims Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <Heart className="mr-2 text-purple-600" />
                Active Claims ({activeClaims.length})
              </h3>
              {activeClaims.length === 0 ? (
                <div className="text-center py-6">
                  <div className="text-6xl mb-3">🍽️</div>
                  <p className="text-gray-500 text-sm font-medium">No active claims</p>
                  <p className="text-gray-400 text-xs">Claim a meal to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeClaims.map(meal => (
                    <div key={meal.claimCode} className="border-2 border-green-200 rounded-xl p-4 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-sm text-gray-800">{meal.title}</h4>
                        <button
                          onClick={() => handleRemoveClaim(meal.claimCode)}
                          className="bg-red-100 hover:bg-red-200 text-red-600 p-1 rounded-full transition-colors group"
                          title="Cancel claim"
                        >
                          <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{meal.provider}</p>
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-lg p-3 mb-3">
                        <p className="text-xs text-green-800 font-bold">🎫 Claim Code: {meal.claimCode}</p>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1 font-medium">
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1 text-red-500" />
                          {meal.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1 text-blue-500" />
                          {meal.pickupTime}
                        </div>
                        <div className="text-purple-600">Claimed: {meal.claimedAt}</div>
                      </div>
                      <div className="mt-3 text-xs text-green-700 bg-green-100 rounded-lg p-2 font-medium">
                        💡 Show this code when picking up your meal
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Enhanced Stats Bar */}
            <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl shadow-lg p-6 mb-8 text-white">
              <div className="flex justify-between items-center">
                <div className="flex space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold">🍽️ {filteredMeals.length}</div>
                    <div className="text-blue-100 text-sm font-medium">Meals Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-200">⚡ {urgentMealsCount}</div>
                    <div className="text-blue-100 text-sm font-medium">Urgent Pickups</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">🎯 {activeClaims.length}</div>
                    <div className="text-blue-100 text-sm font-medium">Active Claims</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${canClaimMore ? 'text-green-200' : 'text-red-200'}`}>
                      {canClaimMore ? '✅' : '⚠️'} {maxWeeklyClaims - currentWeekClaims}
                    </div>
                    <div className="text-blue-100 text-sm font-medium">Claims Remaining</div>
                  </div>
                </div>
                <div className="text-blue-100 text-sm font-medium">
                  Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <MapPin className="mr-2 text-red-600" />
                Campus Meal Locations
              </h2>
              <LocationMap 
                meals={filteredMeals} 
                height="350px"
                onLocationSelect={(location) => {
                  console.log('Selected location:', location);
                }}
              />
              <div className="mt-4 text-sm text-gray-500 text-center">
                <span className="inline-flex items-center mr-4">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Has available meals
                </span>
                <span className="inline-flex items-center">
                  <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                  No meals available
                </span>
              </div>
            </div>

            {/* Available Meals */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Available Meals
                </span>
                {urgentMealsCount > 0 && (
                  <span className="ml-4 text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium animate-pulse">
                    ⚡ {urgentMealsCount} expiring soon
                  </span>
                )}
                {selectedFilter !== 'all' && (
                  <span className="ml-2 text-lg text-blue-600 font-medium">
                    - {filters.find(f => f.value === selectedFilter)?.label}
                  </span>
                )}
              </h2>
              
              {filteredMeals.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-8xl mb-6">🔍</div>
                  <h3 className="text-xl font-bold text-gray-600 mb-3">No meals match your criteria</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredMeals.map(meal => {
                    const urgencyInfo = getUrgencyInfo(meal.pickupTime);
                    const walkingTime = getWalkingTime(meal.distance);
                    
                    return (
                      <div 
                        key={meal.id} 
                        className={`border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all transform hover:scale-105 ${urgencyInfo.borderColor}`}
                      >
                        {/* Urgency Badge */}
                        {urgencyInfo.isUrgent && (
                          <div className={`${urgencyInfo.bgColor} border ${urgencyInfo.textColor} px-3 py-2 rounded-lg mb-4 text-center font-bold text-sm animate-pulse`}>
                            {urgencyInfo.message}
                          </div>
                        )}
                        
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-800">{meal.title}</h3>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-bold text-gray-600">{meal.rating}</span>
                              </div>
                            </div>
                            <p className="text-blue-600 font-bold text-sm mb-2">{meal.provider}</p>
                            <p className="text-gray-600 mb-3 leading-relaxed">{meal.description}</p>
                          </div>
                          <div className="ml-6 text-right">
                            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                              {meal.quantity} available
                            </span>
                            <div className="text-xs text-gray-500 mt-2 font-medium">{meal.postedTime}</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {meal.dietary.map(diet => (
                            <span key={diet} className={`px-3 py-1 rounded-full text-xs font-bold ${getDietaryColor(diet)}`}>
                              {diet}
                            </span>
                          ))}
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCuisineColor(meal.cuisine)}`}>
                            {meal.cuisine}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600 space-y-2 font-medium">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-green-600" />
                              <span>Pickup: {meal.pickupTime}</span>
                              {!urgencyInfo.isUrgent && (
                                <span className={`ml-2 text-xs px-2 py-1 rounded-full ${urgencyInfo.bgColor} ${urgencyInfo.textColor}`}>
                                  {urgencyInfo.message}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-red-600" />
                              <span>{meal.location}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-blue-600 mr-1">🚶‍♂️</span>
                              <span className="text-blue-600 font-semibold">{walkingTime}</span>
                              <span className="ml-2 text-gray-500">
                                ({meal.distance === "On campus" ? "On campus" : `${meal.distance} km away`})
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleClaimMeal(meal.id)}
                            disabled={meal.quantity === 0 || !canClaimMore}
                            className={`px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg ${
                              meal.quantity > 0 && canClaimMore
                                ? urgencyInfo.isUrgent 
                                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 animate-pulse'
                                  : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {meal.quantity === 0 
                              ? 'Unavailable' 
                              : !canClaimMore 
                                ? 'Weekly Limit Reached'
                                : urgencyInfo.isUrgent 
                                  ? '⚡ Claim Now!' 
                                  : '🎫 Claim Meal'
                            }
                          </button>
                        </div>

                        {/* Weekly Limit Warning */}
                        {!canClaimMore && (
                          <div className="mt-4 p-3 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl">
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="w-5 h-5 text-red-600" />
                              <span className="text-red-800 font-bold text-sm">
                                Weekly claim limit reached ({currentWeekClaims}/{maxWeeklyClaims})
                              </span>
                            </div>
                            <div className="mt-2 text-xs text-red-700 font-medium">
                              Your limit resets every Monday. Cancel an existing claim to free up a slot.
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Footer with Weekly Limit Info */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">🎓 Student Success & Sustainability</h2>
          <p className="text-blue-100 mb-6 text-lg font-medium">
            Making nutritious meals accessible while reducing food waste on campus
          </p>
          
          {/* Weekly Limit Explanation */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-3">📋 How Claims Work</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-bold">Weekly Limit</div>
                <div className="text-blue-200">2 meals per student per week</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">🔄</div>
                <div className="font-bold">Reset Schedule</div>
                <div className="text-blue-200">Every Monday at midnight</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">❌</div>
                <div className="font-bold">Cancel Anytime</div>
                <div className="text-blue-200">Free up slots for other meals</div>
              </div>
            </div>
          </div>
          
          {/* Impact Stats */}
          <div className="flex justify-center items-center space-x-8 opacity-90">
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <span className="text-sm font-bold">🌱 Sustainable Dining</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <span className="text-sm font-bold">🤝 Community Support</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <span className="text-sm font-bold">💪 Student Success</span>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-green-200 font-medium">
            Proudly serving Memorial University students • Making every meal count
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;