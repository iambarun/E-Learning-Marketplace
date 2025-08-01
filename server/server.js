import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} request for '${req.url}'`);
  next();
});

// Load routes dynamically - Enterprise approach
const loadRoutes = async () => {
  try {
    const routesDir = path.join(__dirname, 'routes');
    
    // Check if routes directory exists
    if (!fs.existsSync(routesDir)) {
      console.warn('Routes directory not found, creating...');
      fs.mkdirSync(routesDir, { recursive: true });
      return;
    }

    const routeFiles = fs.readdirSync(routesDir);
    let loadedCount = 0;
    
    for (const file of routeFiles) {
      if (file.endsWith('.js')) {
        const fullPath = path.join(routesDir, file);
        const fileUrl = pathToFileURL(fullPath).href;
        
        try {
          const route = await import(fileUrl);
          
          if (route.default && typeof route.default === 'function') {
            app.use('/api', route.default);
            console.log(`✅ Loaded route: ${file}`);
            loadedCount++;
          } else {
            console.warn(`⚠️  Route file ${file} doesn't export a valid router`);
          }
        } catch (routeError) {
          console.error(`❌ Failed to load route ${file}:`, routeError.message);
        }
      }
    }
    
    console.log(`📁 Successfully loaded ${loadedCount} of ${routeFiles.filter(f => f.endsWith('.js')).length} route files`);
    
    if (loadedCount === 0) {
      console.warn('⚠️  No routes were successfully loaded!');
    }
    
  } catch (error) {
    console.error('💥 Error loading routes:', error);
    process.exit(1); // Exit on critical error
  }
};

// Start server function
const startServer = async () => {
  try {
    // Load routes first
    await loadRoutes();
    
    // Default route
    app.get('/', (req, res) => {
      res.send('Welcome to the server!');
    });

    // Port
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`🌐 API endpoints available at http://localhost:${port}/api/`);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();