'use client';

import { useState, useRef } from 'react';

type CourseData = {
  title: string;
  description: string;
  syllabus: string[];
  url: string;
};

export default function Home() {
  const [courseUrl, setCourseUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidCourse, setIsValidCourse] = useState(false);
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('about:blank');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isCoursera = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes('coursera.org');
    } catch {
      return false;
    }
  };

  const loadCourseraPage = () => {
    setIframeUrl('https://www.coursera.org/embed');
  };

  const navigateToUrl = () => {
    if (courseData && isCoursera(courseData.url)) {
      setIframeUrl(courseData.url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!isCoursera(courseUrl)) {
      setMessage('Please enter a valid Coursera URL');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseUrl }),
      });

      const data = await response.json();
      if (data.error) {
        setMessage(data.error);
      } else {
        setCourseData(data.data);
        setIsValidCourse(true);
        setIframeUrl(courseUrl); // Set the iframe URL to the course URL
      }
    } catch (error) {
      console.error('Error during request:', error);
      setMessage('Error scraping course data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExit = () => {
    setIsValidCourse(false);
    setCourseData(null);
    setCourseUrl('');
    setMessage('');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isValidCourse && courseData) {
    return (
      <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="absolute top-4 left-4 p-2 rounded-lg shadow-md transition-colors duration-200 z-50"
          style={{
            background: isDarkMode ? '#4B5563' : '#E5E7EB',
            color: isDarkMode ? '#fff' : '#374151'
          }}
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
        </button>

        {/* Exit Button */}
        <button
          onClick={handleExit}
          className="absolute top-4 right-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2 z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Exit Course
        </button>

        {/* Left side - Coursera Website with Navigation */}
        <div className="w-1/2 h-full border-r border-gray-200 flex flex-col">
          {/* Navigation Controls */}
          <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex gap-2">
              <button
                onClick={loadCourseraPage}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-200'
                }`}
              >
                Coursera Home
              </button>
              <button
                onClick={navigateToUrl}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-200'
                }`}
              >
                Course Page
              </button>
            </div>
          </div>
          
          {/* Iframe */}
          <div className="flex-1">
            <iframe
              ref={iframeRef}
              src={iframeUrl}
              className="w-full h-full"
              title="Coursera"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              referrerPolicy="origin"
            />
          </div>
        </div>

        {/* Right side - Chat Interface */}
        <div className={`w-1/2 h-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="h-full flex flex-col p-6">
            {/* Chat Header */}
            <div className="mb-4">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {courseData.title}
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Ask questions about your course content
              </p>
            </div>

            {/* Chat Messages Area */}
            <div className={`flex-1 rounded-xl shadow-sm border mb-4 p-4 overflow-y-auto ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'
            }`}>
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className={`rounded-full p-4 mb-4 ${isDarkMode ? 'bg-gray-600' : 'bg-blue-50'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${isDarkMode ? 'text-gray-300' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <p className={`font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Chat functionality coming soon...
                </p>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-400'}>
                  You'll be able to ask questions about the course content here.
                </p>
              </div>
            </div>

            {/* Chat Input */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Ask a question about the course..."
                className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                }`}
                disabled
              />
              <button 
                className={`px-6 py-3 rounded-xl opacity-50 cursor-not-allowed transition-all duration-200 flex items-center gap-2 ${
                  isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                }`}
                disabled
              >
                <span>Send</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-24 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-lg shadow-md transition-colors duration-200"
        style={{
          background: isDarkMode ? '#4B5563' : '#E5E7EB',
          color: isDarkMode ? '#fff' : '#374151'
        }}
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
      </button>

      <div className={`p-8 rounded-2xl shadow-lg max-w-md w-full ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h1 className={`text-2xl font-bold mb-6 text-center ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          Coursera Course Assistant
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            value={courseUrl}
            onChange={(e) => setCourseUrl(e.target.value)}
            placeholder="Enter Coursera course URL"
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            }`}
            required
          />
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-200
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
              ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            {isLoading ? 'Loading...' : 'Start Learning'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-red-500 text-center">{message}</p>
        )}
      </div>
    </main>
  );
} 