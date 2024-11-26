import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Proxy endpoint for Coursera content
app.get('/api/proxy-course', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    // Set headers to allow iframe
    res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    
    // Send the HTML content
    res.send(response.data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to proxy course content' });
  }
});

// Original scraping endpoint
app.post('/api/scrape', async (req, res) => {
  console.log('Received scrape request:', req.body);
  
  try {
    const { courseUrl } = req.body;
    
    if (!courseUrl) {
      return res.status(400).json({ error: 'Course URL is required' });
    }

    if (!courseUrl.includes('coursera.org')) {
      return res.status(400).json({ error: 'Please provide a valid Coursera URL' });
    }

    const response = await axios.get(courseUrl);
    const $ = cheerio.load(response.data);
    
    const courseTitle = $('h1').first().text().trim();
    const courseDescription = $('[data-e2e="course-description"]').text().trim();
    const syllabus = [];
    
    $('[data-e2e="course-syllabus-item"]').each((i, elem) => {
      syllabus.push($(elem).text().trim());
    });

    const courseData = {
      title: courseTitle || 'Course Title Not Found',
      description: courseDescription || 'Description Not Found',
      syllabus: syllabus.length ? syllabus : ['Syllabus Not Found'],
      url: courseUrl
    };

    console.log('Successfully scraped course data:', courseData);
    res.json({ message: 'Course data retrieved successfully', data: courseData });
  } catch (error) {
    console.error('Scraping error:', error.message);
    res.status(500).json({ 
      error: 'Failed to scrape course data', 
      details: error.message 
    });
  }
});

const PORT = 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy. Trying port ${PORT + 1}`);
    server.close();
    app.listen(PORT + 1, () => {
      console.log(`Server running on port ${PORT + 1}`);
    });
  }
}); 