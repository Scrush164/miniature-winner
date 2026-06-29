const express = require('express');
const { PrismaClient } = require('@prisma/client');




const app = express();
const dataFile = path.join(process.cwd(), 'data.json');

app.use(express.json());
app.use(express.static('public'));



const publicPath = path.join(__dirname, 'public');
console.log('Serving static files from:', publicPath);
console.log('Exists?', fs.existsSync(publicPath));
console.log('Contents:', fs.readdirSync(publicPath));


// Serve index.html for root and any HTML routes, but skip static files...hopefully
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//GET and POST Routes
app.get('/api/data', async (req, res) => {
  try {
    // Fetch assets and liabilities from the database
    const transaction = await prisma.transaction.findMany();
    
    
    res.json({transaction});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.post('/api/data', (req, res) => {
  fs.writeFileSync(dataFile, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});
app.get('*', (req, res) => {
  const {name, amount, type} = req.body;
     const newTransaction = await prisma.transaction.create({
      data: {
        name,
        amount: parseFloat(amount),
        type // "asset" or "liability"
      }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
