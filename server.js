const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Proxy route to handle requests to GeeksforGeeks API
app.get('/api/search', async (req, res) => {
    try {
      const skills = req.query.skills;
      const apiUrl = `https://practiceapi.geeksforgeeks.org/api/latest/jobs/skills/?skills=${skills}`;
  
      console.log(`Requesting API: ${apiUrl}`);
  
      const response = await axios.get(apiUrl);
  
      console.log('API response received:', response.data);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching data from API:', error.message);
      res.status(500).json({ error: 'Error fetching data' });
    }
  });
  

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
