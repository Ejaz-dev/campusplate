import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import StudentPortal from './components/StudentPortal';
import ProviderPortal from './components/ProviderPortal';
import StudentLogin from './components/StudentLogin';
import ProviderLogin from './components/ProviderLogin';
import './App.css';

function App() {
  const [activePortal, setActivePortal] = useState('landing');
  const [studentUser, setStudentUser] = useState(null);
  const [providerUser, setProviderUser] = useState(null);

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

  // Shared state for all meals - lifted up from individual components
  const [availableMeals, setAvailableMeals] = useState([
    {
      id: 1,
      title: "Gourmet Pizza Slices",
      provider: "Tony's Pizza Palace",
      providerType: "Local Restaurant",
      cuisine: "Italian",
      quantity: 8,
      originalQuantity: 8,
      pickupTime: formatTime(urgentTime1),
      location: "245 Duckworth Street",
      dietary: ["Vegetarian Option", "Dairy"],
      description: "Fresh pizza slices from today's preparation - margherita and pepperoni",
      postedTime: "30 mins ago",
      rating: 4.8,
      distance: "0.8",
      postedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      claimed: 0,
      status: "Active",
      estimatedValue: 25.50,
      views: 12,
      category: "Main Course"
    },
    {
      id: 2,
      title: "Fresh Sushi Rolls",
      provider: "Sakura Sushi Bar",
      providerType: "Local Restaurant", 
      cuisine: "Japanese",
      quantity: 12,
      originalQuantity: 12,
      pickupTime: formatTime(soonTime),
      location: "180 Water Street",
      dietary: ["Contains Fish", "Gluten-Free"],
      description: "California rolls and veggie rolls prepared fresh today",
      postedTime: "45 mins ago",
      rating: 4.9,
      distance: "1.2",
      postedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      claimed: 0,
      status: "Active",
      estimatedValue: 32.80,
      views: 18,
      category: "Main Course"
    },
    {
      id: 3,
      title: "Authentic Chicken Biryani",
      provider: "MUN Dining - UC Cafeteria",
      providerType: "Campus Dining",
      cuisine: "South Asian",
      quantity: 5,
      originalQuantity: 5,
      pickupTime: formatTime(laterTime),
      location: "UC Cafeteria Exit",
      dietary: ["Halal", "Dairy-Free"],
      description: "Fragrant basmati rice with spiced chicken, served with raita",
      postedTime: "1 hour ago",
      rating: 4.7,
      distance: "On campus",
      postedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      claimed: 0,
      status: "Active",
      estimatedValue: 18.50,
      views: 8,
      category: "Main Course"
    },
    {
      id: 4,
      title: "Mediterranean Mezze Bowl",
      provider: "Campus Corner Deli",
      cuisine: "Mediterranean",
      quantity: 8,
      originalQuantity: 8,
      pickupTime: formatTime(urgentTime2),
      location: "Campus Corner - Front Counter",
      dietary: ["Vegetarian", "Vegan"],
      description: "Hummus, falafel, tabbouleh, and fresh vegetables",
      postedTime: "45 mins ago",
      rating: 4.6,
      distance: "On campus",
      postedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      claimed: 0,
      status: "Active",
      estimatedValue: 15.75,
      views: 15,
      category: "Main Course"
    },
    {
      id: 5,
      title: "Korean Bulgogi Bowl",
      provider: "Bruneau Centre Kitchen",
      cuisine: "East Asian",
      quantity: 3,
      originalQuantity: 3,
      pickupTime: formatTime(laterTime),
      location: "Bruneau Centre Kitchen",
      dietary: ["Halal", "Gluten-Free"],
      description: "Marinated beef with steamed rice and kimchi",
      postedTime: "1 hour ago",
      rating: 4.9,
      distance: "On campus",
      postedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      claimed: 0,
      status: "Active",
      estimatedValue: 22.00,
      views: 6,
      category: "Main Course"
    },
    {
      id: 6,
      title: "Italian Pasta Primavera",
      provider: "Marketplace Café",
      cuisine: "Italian",
      quantity: 6,
      originalQuantity: 6,
      pickupTime: formatTime(soonTime),
      location: "Marketplace - Counter 2",
      dietary: ["Vegetarian"],
      description: "Fresh pasta with seasonal vegetables in herb sauce",
      postedTime: "2 hours ago",
      rating: 4.7,
      distance: "On campus",
      postedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      claimed: 0,
      status: "Active",
      estimatedValue: 16.25,
      views: 9,
      category: "Main Course"
    }
  ]);

  // Function to add new meals (called from ProviderPortal)
  const addNewMeal = (newMealData) => {
    const meal = {
      id: Date.now(), // Simple ID generation
      ...newMealData,
      quantity: parseInt(newMealData.quantity),
      originalQuantity: parseInt(newMealData.quantity),
      postedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      claimed: 0,
      status: 'Active',
      estimatedValue: parseFloat(newMealData.estimatedValue) || 0,
      rating: 0,
      views: 0,
      postedTime: "Just now"
    };
    setAvailableMeals([meal, ...availableMeals]);
  };

  // Function to update meal quantities (called from StudentPortal when claiming)
  const updateMealQuantity = (mealId, newQuantity) => {
    setAvailableMeals(availableMeals.map(meal => 
      meal.id === mealId ? { 
        ...meal, 
        quantity: newQuantity,
        claimed: meal.originalQuantity - newQuantity,
        status: newQuantity === 0 ? 'Completed' : 'Active'
      } : meal
    ));
  };

  // Handle login functions
  const handleStudentLogin = (userData) => {
    setStudentUser(userData);
    setActivePortal('student');
  };

  const handleProviderLogin = (userData) => {
    setProviderUser(userData);
    setActivePortal('provider');
  };

  // Handle logout (when going back to landing)
  const handleLogout = () => {
    setStudentUser(null);
    setProviderUser(null);
    setActivePortal('landing');
  };

  const renderPortal = () => {
    switch (activePortal) {
      case 'student-login':
        return (
          <StudentLogin 
            setActivePortal={setActivePortal}
            onLogin={handleStudentLogin}
          />
        );
      case 'provider-login':
        return (
          <ProviderLogin 
            setActivePortal={setActivePortal}
            onLogin={handleProviderLogin}
          />
        );
      case 'student':
        return studentUser ? (
          <StudentPortal 
            setActivePortal={handleLogout}
            availableMeals={availableMeals}
            updateMealQuantity={updateMealQuantity}
            studentUser={studentUser}
          />
        ) : (
          <StudentLogin 
            setActivePortal={setActivePortal}
            onLogin={handleStudentLogin}
          />
        );
      case 'provider':
        return providerUser ? (
          <ProviderPortal 
            setActivePortal={handleLogout}
            availableMeals={availableMeals}
            addNewMeal={addNewMeal}
            providerUser={providerUser}
          />
        ) : (
          <ProviderLogin 
            setActivePortal={setActivePortal}
            onLogin={handleProviderLogin}
          />
        );
      default:
        return <LandingPage setActivePortal={setActivePortal} />;
    }
  };

  return (
    <div className="App">
      {renderPortal()}
    </div>
  );
}

export default App;