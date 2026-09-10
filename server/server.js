const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected (using resilient local storage)'
  });
});

// Database Connection with non-blocking fallback
console.log('Connecting to MongoDB...');
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 3000 // Fast fail to avoid blocking if mongod is not local
}).then(() => {
  console.log('✅ MongoDB connected successfully to:', MONGO_URI);
}).catch(err => {
  console.warn('⚠️ MongoDB connection could not be established:', err.message);
  console.log('⚡ Resilient fallback active: All projects and messages are safely stored in local JSON database (server/data/).');
  console.log('💡 Tip: Set MONGO_URI in server/.env with your MongoDB Atlas connection string when ready!');
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio backend server running on http://localhost:${PORT}`);
});
