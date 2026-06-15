const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const dataFile = path.join(process.cwd(), 'data.json');

app.use(express.json());
app.use(express.static('public'));

// Initialize data.json if it doesn't exist
const initializeData = () => {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ assets: [], liabilities: [] }, null, 2));
  }
};

initializeData();

//GET and POST Routes
app.get('/api/data', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    res.json(data);
  } catch (err) {
    res.json({ assets: [], liabilities: [] });
  }
});

app.post('/api/data', (req, res) => {
  fs.writeFileSync(dataFile, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

// Serve index.html for root and any HTML routes, but skip static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
