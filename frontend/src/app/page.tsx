'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import SignInModal from '@/components/SignInModal';
import './landing.css';

export default function LandingPage() {
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, loading, logout } = useAuth();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const handleSignOut = async () => {
    await logout();
  };

  const handleGetStarted = () => {
    if (!user) {
      setIsSignInModalOpen(true);
    } else {
      window.open('https://github.com/aryanv175/coursera-extension/tree/main', '_blank');
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const bg = e.currentTarget.querySelector('.interactive-bg') as HTMLElement;
    if (bg) {
      bg.style.setProperty('--mouse-x', `${x}%`);
      bg.style.setProperty('--mouse-y', `${y}%`);
    }
  };

  return (
    <div className={`min-h-screen font-['Outfit'] ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left side - Theme Toggle */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={toggleTheme}
            className={`p-2 rounded-lg shadow-lg transition-all duration-200 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            }`}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </motion.button>

          {/* Right side - Sign In/User Profile */}
          <div className="flex items-center gap-4">
            {!user && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setIsSignInModalOpen(true)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-white hover:bg-gray-700' 
                    : 'bg-white text-gray-800 hover:bg-gray-50'
                }`}
              >
                Sign In
              </motion.button>
            )}

            {user && (
              <div className="relative group">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${
                  isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-50'
                }`}>
                  {user.photoURL && (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || 'User'} 
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span className="text-sm font-medium">
                    {user.displayName}
                  </span>
                </div>

                {/* Dropdown Menu */}
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <button
                    onClick={handleSignOut}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      isDarkMode 
                        ? 'text-white hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section relative" onMouseMove={handleMouseMove}>
        <div className="interactive-bg" />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative container mx-auto px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className={`text-7xl font-bold mb-6 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Course<span className="text-gradient">Mate</span>
            </h1>
            <p className={`text-xl mb-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Transform your learning experience with AI-powered assistance. Get instant answers, 
              deep insights, and personalized support for your Coursera courses.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="glow relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:shadow-lg transition-all duration-200"
            >
              {user ? 'Download the Extension' : 'Get the Extension'}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-20 ${isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Smart Learning',
                description: 'AI-powered assistance that adapts to your learning style and pace',
                icon: '🧠',
                delay: 0.2,
              },
              {
                title: 'Instant Answers',
                description: 'Get immediate, accurate responses to your course-related questions',
                icon: '⚡',
                delay: 0.4,
              },
              {
                title: 'Deep Understanding',
                description: 'Gain comprehensive insights that enhance your learning experience',
                icon: '🎯',
                delay: 0.6,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay }}
                className={`feature-card p-8 rounded-2xl ${
                  isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-white/80'
                }`}
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className={`py-20 ${isDarkMode ? 'bg-gray-900/30' : 'bg-gray-50/50'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Chrome Extension', description: 'Install the chrome extension' },
              { step: '02', title: 'Access Content', description: 'View course materials side by side' },
              { step: '03', title: 'Get Support', description: 'Ask questions and receive instant help' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-gradient font-bold text-4xl mb-4">{item.step}</div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className={`py-20 ${isDarkMode ? 'bg-gray-900/40' : 'bg-white/60'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold text-center mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Choose Your Plan
          </h2>
          <p className={`text-center mb-12 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Select the perfect plan for your learning journey
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Standard Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`feature-card p-8 rounded-2xl relative ${
                isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-white/80'
              }`}
            >
              <div className="text-center">
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Standard
                </h3>
                <div className="flex justify-center items-baseline mb-4">
                  <span className={`text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$5</span>
                  <span className={`text-lg ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    1 Course Summary
                  </li>
                  <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    2 Questionnaires
                  </li>
                  <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    3 Quizzes
                  </li>
                </ul>
                <button className="w-full px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all duration-200">
                  Get Started
                </button>
              </div>
            </motion.div>

            {/* Professional Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`feature-card p-8 rounded-2xl relative transform scale-105 z-10 ${
                isDarkMode 
                  ? 'bg-gray-800/80 hover:bg-gray-800' 
                  : 'bg-white/90 hover:bg-white'
              } shadow-xl hover:shadow-2xl`}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </span>
              </div>
              <div className="text-center">
                <h3 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Professional
                </h3>
                <div className="flex justify-center items-baseline mb-4">
                  <span className={`text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$15</span>
                  <span className={`text-xl ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>/mo</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-6 h-6 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-lg">5 Course Summary</span>
                  </li>
                  <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-6 h-6 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-lg">10 Questionnaires</span>
                  </li>
                  <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-6 h-6 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-lg">7 Quizzes</span>
                  </li>
                </ul>
                <button className="w-full px-6 py-4 rounded-xl font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                  Get Started
                </button>
              </div>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`feature-card p-8 rounded-2xl relative ${
                isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-white/80'
              }`}
            >
              <div className="text-center">
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Premium
                </h3>
                <div className="flex justify-center items-baseline mb-4">
                  <span className={`text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$20</span>
                  <span className={`text-lg ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    10 Course Summary
                  </li>
                  <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    20 Questionnaires
                  </li>
                  <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    15 Quizzes
                  </li>
                </ul>
                <button className="w-full px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all duration-200">
                  Get Started
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      

      {/* Footer */}
      <footer className={`py-8 ${isDarkMode ? 'bg-gray-900/80' : 'bg-gray-50/80'}`}>
        <div className="container mx-auto px-4 text-center">
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            © 2024 CourseMate. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Sign In Modal */}
      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)} 
      />
    </div>
  );
} 