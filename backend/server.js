const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Use task routes
app.use('/api', taskRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
