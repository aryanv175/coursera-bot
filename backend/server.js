import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Add a test endpoint
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Backend is running!' });
});

app.post('/api/scrape', async (req, res) => {
  console.log('Received scrape request:', req.body);
  
  try {
    const { courseUrl } = req.body;
    
    if (!courseUrl) {
      console.log('No URL provided');
      return res.status(400).json({ error: 'Course URL is required' });
    }

    console.log('Attempting to fetch:', courseUrl);
    
    const response = await axios.get(courseUrl);
    console.log('Successfully fetched the page');
    
    const $ = cheerio.load(response.data);
    
    // Basic scraping of course content
    const courseTitle = $('h1').first().text().trim();
    const courseDescription = $('[data-e2e="course-description"]').text().trim();
    const syllabus = [];
    
    // Get syllabus items
    $('[data-e2e="course-syllabus-item"]').each((i, elem) => {
      syllabus.push($(elem).text().trim());
    });

    const courseData = {
      title: courseTitle,
      description: courseDescription,
      syllabus: syllabus
    };

    console.log('Successfully scraped course data:', courseData);
    res.json({ message: 'Course data printed in console', data: courseData });
  } catch (error) {
    console.error('Scraping error:', error.message);
    res.status(500).json({ error: 'Failed to scrape course data', details: error.message });
  }
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the server by visiting: http://localhost:${PORT}/api/test`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy. Trying port ${PORT + 1}`);
    server.close();
    app.listen(PORT + 1, () => {
      console.log(`Server running on port ${PORT + 1}`);
    });
  } else {
    console.error('Server error:', err);
  }
}); 