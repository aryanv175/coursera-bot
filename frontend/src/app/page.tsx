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
      router.push('/try');
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
      <div className="relative">
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
              {user ? 'Get Started' : 'Sign In to Start'}
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
              { step: '01', title: 'Enter Course URL', description: 'Paste your Coursera course URL' },
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