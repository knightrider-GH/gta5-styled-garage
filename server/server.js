const express = require('express');
const cors = require('cors');
const seedData = require('./seedData');

const app = express();
app.use(cors());
app.use(express.json());

// Prepare in-memory data with guaranteed _id for React keys
const inMemoryCars = seedData.map((car, index) => ({
  _id: car._id || `car_${index + 1}`,
  ...car
}));

// Setup API route
app.get('/api/cars', (req, res) => {
  try {
    const { category } = req.query;
    if (category && category.toLowerCase() !== 'all') {
      const filtered = inMemoryCars.filter(
        c => c.category && c.category.toLowerCase() === category.toLowerCase()
      );
      return res.json(filtered);
    }
    res.json(inMemoryCars);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cars.' });
  }
});

// Purchase order simulation endpoint
app.post('/api/orders', (req, res) => {
  const { carId, buyerName, buyerEmail } = req.body;
  res.json({
    status: 'success',
    message: `Order confirmed for ${buyerName}`,
    orderId: `GTA-${Math.floor(100000 + Math.random() * 900000)}`
  });
});

app.listen(5000, () => {
  console.log('--------------------------------------------------');
  console.log('🏎️  Pape Motors Backend Server is live!');
  console.log(`✅ Loaded ${inMemoryCars.length} cars instantly into memory.`);
  console.log('🚀 API available at: http://localhost:5000/api/cars');
  console.log('--------------------------------------------------');
});

