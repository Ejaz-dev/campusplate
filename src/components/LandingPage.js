import React, { useState, useEffect } from 'react';
import { Users, Store, Globe, Heart, Utensils, TrendingUp, Shield, Clock, Award } from 'lucide-react';

const LandingPage = ({ setActivePortal }) => {
  const [stats, setStats] = useState({
    mealsRescued: 2847,
    studentsHelped: 653,
    partnersActive: 12,
    wasteReduced: 85.3
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      program: "Computer Science",
      year: "3rd Year",
      text: "As a student on a tight budget, CampusPlate has been a lifesaver. I get quality meals from campus dining without breaking the bank.",
      avatar: "👩‍💻"
    },
    {
      name: "Marcus Thompson", 
      program: "Engineering",
      year: "2nd Year",
      text: "I love that I can find vegetarian options easily and help reduce food waste at the same time. Win-win!",
      avatar: "👨‍🔬"
    },
    {
      name: "Emily Chen",
      program: "Business",
      year: "4th Year",
      text: "CampusPlate fits perfectly into my busy schedule. Quick meals between classes without the campus pricing!",
      avatar: "👩‍🎓"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate real-time stats updates
    const statsTimer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        mealsRescued: prev.mealsRescued + Math.floor(Math.random() * 3),
        studentsHelped: prev.studentsHelped + Math.floor(Math.random() * 2)
      }));
    }, 5000);
    return () => clearInterval(statsTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-green-600 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <Utensils className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            CampusPlate
          </h1>
          <p className="text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Smart Food Rescue Platform Connecting Surplus Campus Meals with University Students at Memorial University
            </p>
          
          {/* Live Stats Bar */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-300">{stats.mealsRescued.toLocaleString()}</div>
                <div className="text-sm text-blue-200">Meals Rescued</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">{stats.studentsHelped}</div>
                <div className="text-sm text-blue-200">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-300">{stats.partnersActive}</div>
                <div className="text-sm text-blue-200">Active Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-300">{stats.wasteReduced}%</div>
                <div className="text-sm text-blue-200">Waste Reduced</div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-xl w-fit mx-auto mb-6">
              <Globe className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold mb-4">AI-Powered Matching</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Advanced algorithms match students with culturally appropriate meals based on dietary preferences, allergies, and cultural background
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4 rounded-xl w-fit mx-auto mb-6">
              <TrendingUp className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold mb-4">Real-Time Analytics</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Live dashboards track food waste reduction, student nutrition impact, and sustainability metrics with predictive insights
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 p-4 rounded-xl w-fit mx-auto mb-6">
              <Shield className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold mb-4">Enterprise Security</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Bank-level encryption, GDPR compliance, and secure authentication ensuring student privacy and data protection
            </p>
          </div>
        </div>

        {/* Student Testimonials Carousel */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Student Success Stories</h2>
          <div className="text-center">
            <div className="text-6xl mb-4">{testimonials[currentTestimonial].avatar}</div>
            <blockquote className="text-lg italic text-blue-100 mb-4 leading-relaxed">
              "{testimonials[currentTestimonial].text}"
            </blockquote>
            <div className="font-semibold text-white">
              {testimonials[currentTestimonial].name}
            </div>
            <div className="text-sm text-blue-200">
              {testimonials[currentTestimonial].program} • {testimonials[currentTestimonial].country}
            </div>
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial ? 'bg-white' : 'bg-white/30'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>

        {/* Portal Selection */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-12">Access Your Portal</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <button
              onClick={() => setActivePortal('student-login')}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
            >
              <div className="flex items-center justify-center space-x-4">
                <Users className="w-8 h-8 group-hover:animate-pulse" />
                <div>
                  <div>Student Portal</div>
                  <div className="text-sm font-normal text-blue-200">Find & claim meals</div>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => setActivePortal('provider-login')}
              className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-green-500/25 transform hover:scale-105"
            >
              <div className="flex items-center justify-center space-x-4">
                <Store className="w-8 h-8 group-hover:animate-pulse" />
                <div>
                  <div>Provider Portal</div>
                  <div className="text-sm font-normal text-green-200">Share surplus food</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="mt-20 text-center">
          <div className="flex justify-center items-center space-x-8 opacity-70">
            <div className="flex items-center space-x-2">
              <Award className="w-6 h-6" />
              <span className="text-sm">UN SDG Impact Award 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6" />
              <span className="text-sm">ISO 27001 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6" />
              <span className="text-sm">Featured in TechCrunch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;