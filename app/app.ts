import express from 'express';
import * as path from "node:path";
import cors from 'cors';
import { FrontController } from './controller/FrontController';
import { MapController } from './controller/MapController';
import { UploaderController } from './controller/UploaderController';

const app = express();

// CORS configuration to handle cross-origin issues
const isDevelopment = process.env.NODE_ENV !== 'production';

const corsOptions = {
    credentials: true, // Allow sending cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers'
    ],
    exposedHeaders: ['Content-Length', 'Content-Type'],
    maxAge: 86400, // Cache the OPTIONS requests for 24 hours
};

// Apply the CORS middleware
// The CORS middleware automatically handles the OPTIONS requests (preflight)
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// Configure the static assets for Express
const staticOptions = {
    maxAge: '1d', // Cache the files for 1 day
    etag: true, // Enable ETag for cache validation
    lastModified: true, // Enable Last-Modified header
};

// Serve all the static files from the project root
// This includes index.html, index.js, the .tmj, .png, etc. files
app.use(express.static('.', staticOptions));

// Serve the public folder with a custom path
app.use('/public', express.static(path.join(process.cwd(), 'public'), staticOptions));

// Serve the tilesets folder with a longer cache (rarely modified)
app.use('/tilesets', express.static(path.join(process.cwd(), 'tilesets'), {
    maxAge: '7d',
    etag: true,
    lastModified: true,
}));

const controllers = [
    new MapController(app),
    new FrontController(app),
    new UploaderController(app),
];

// Check if we are in production (for Vite)
const isProd = process.env.NODE_ENV === 'production';
if (isProd)
    app.listen(3000);

export const viteNodeApp = app;

// Verify and log all controllers created
controllers.forEach(controller => {
    console.log(`Controller created: ${controller.constructor.name}`);
});
