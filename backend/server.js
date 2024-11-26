import express from 'express';
import cors from 'cors';
import axios from 'axios';
import cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/scrape', async (req, res) => {
  try {
    const { courseUrl } = req.body;
    
    const response = await axios.get(courseUrl);
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

    console.log('Scraped Course Data:', courseData);
    res.json({ message: 'Course data printed in console', data: courseData });
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ error: 'Failed to scrape course data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 