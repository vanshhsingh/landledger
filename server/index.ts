import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// API Routes
app.get('/api/test', (req, res) => {
  res.json({ message: "API is working!" });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html')));
  });
}

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});