'use client';

import { useState } from 'react';

export default function Home() {
  const [courseUrl, setCourseUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Sending request to backend with URL:', courseUrl);
    
    try {
      let response;
      try {
        console.log('Attempting to connect to port 5000...');
        response = await fetch('http://localhost:5000/api/scrape', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ courseUrl }),
        });
      } catch (error) {
        console.log('Port 5000 failed, trying port 5001...', error);
        response = await fetch('http://localhost:5001/api/scrape', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ courseUrl }),
        });
      }

      const data = await response.json();
      console.log('Response from backend:', data);
      setMessage(data.message);
    } catch (error) {
      console.error('Error during request:', error);
      setMessage('Error scraping course data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-8">Coursera Course Scraper</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="url"
          value={courseUrl}
          onChange={(e) => setCourseUrl(e.target.value)}
          placeholder="Enter Coursera course URL"
          className="w-full p-2 border rounded mb-4"
          required
        />
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-500 text-white p-2 rounded 
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          {isLoading ? 'Scraping...' : 'Scrape Course'}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-green-600">{message}</p>
      )}
    </main>
  );
} 