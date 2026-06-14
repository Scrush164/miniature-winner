const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const dataFile = path.join(process.cwd(), 'data.json');

app.use(express.json());
app.use(express.static('public'));

//GET and POST Routes
app.get('/api/data', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  res.json(data);
});

app.post('/api/data', (req, res) => {
  fs.writeFileSync(dataFile, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
