const connectToMongo = require('./db'); // Correctly importing db.js
let cors = require('cors');
const express = require('express');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));

// Connect to MongoDB
connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});
