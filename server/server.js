import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// //routes
// fs.readdirSync("./routes").map((r) => 
//   app.use("/api", require(`./routes/${r}`))
// );

// Load routes dynamically
const loadRoutes = async () => {
  try {
    const routeFiles = fs.readdirSync("./routes");
    
    for (const file of routeFiles) {
      if (file.endsWith('.js')) {
        const routePath = `./routes/${file}`;
        const route = await import(routePath);
        app.use("/api", route.default);
        console.log(`Loaded route: ${file}`);
      }
    }
  } catch (error) {
    console.error('Error loading routes:', error);
  }
};

// Load routes
await loadRoutes();

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});


//port
const port = process.env.PORT || 8000;
app.listen(port, () => {console.log(`Server is running on port ${port}`);});
