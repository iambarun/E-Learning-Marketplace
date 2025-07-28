import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create express app
const app = express();

//apply middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} request for '${req.url}'`);
  next();});

//routes
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {console.log(`Server is running on port ${port}`);});
