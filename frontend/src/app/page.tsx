'use client';

import { useState } from 'react';

export default function Home() {
  const [courseUrl, setCourseUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseUrl }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error scraping course data');
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
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Scrape Course
        </button>
      </form>

      {message && (
        <p className="mt-4 text-green-600">{message}</p>
      )}
    </main>
  );
} 