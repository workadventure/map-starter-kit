import express from 'express';
import * as path from "node:path";
import * as fs from "node:fs";
import cors from 'cors';
import { FrontController } from './controller/FrontController';
import { MapController } from './controller/MapController';
import { UploaderController } from './controller/UploaderController';

const app = express();

// Middleware to set correct MIME types for TypeScript files
// For JavaScript files, we use setHeaders in express.static options
/*app.use((req, res, next) => {
    const url = req.url;
    
    // Set correct MIME type for TypeScript files
    if (url.endsWith('.ts') || url.endsWith('.tsx')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    }
    
    next();
});*/

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

// Serve dist/assets FIRST with explicit MIME type configuration
// This ensures compiled JavaScript files from getMapsScripts are served correctly
// This route must be before express.static('.') to take precedence
app.use('/assets', express.static(path.join(process.cwd(), 'dist', 'assets'), {
    ...staticOptions,
    setHeaders: (res, filePath) => {
        // Explicitly set Content-Type for JavaScript files to avoid MIME type issues
        if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        }
    }
}));

// Middleware to exclude /src from express.static - let Vite handle TypeScript transformation
// VitePluginNode will automatically add Vite middleware that transforms TypeScript files
const staticMiddleware = express.static('.', {
    ...staticOptions,
    setHeaders: (res, filePath) => {
        // Explicitly set Content-Type for JavaScript files to avoid MIME type issues
        if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        }
    }
});

// Middleware to transform and serve TypeScript files as JavaScript
// This bundles the file with its dependencies to resolve npm imports
app.use('/src', async (req, res, next) => {
    // Only handle .ts and .tsx files - transform them to JavaScript
    if (req.path.endsWith('.ts') || req.path.endsWith('.tsx')) {
        try {
            // req.path includes /src/, so we need to join it correctly
            const filePath = path.join(process.cwd(), 'src', req.path.startsWith('/') ? req.path.slice(1) : req.path);
            
            // Check if file exists
            if (!fs.existsSync(filePath)) {
                return res.status(404).send('File not found');
            }
            
            // Use dynamic import to get esbuild (available via Vite)
            const esbuild = await import('esbuild');
            
            // Bundle the TypeScript file with its dependencies
            // This resolves npm imports like @workadventure/scripting-api-extra
            const result = await esbuild.build({
                entryPoints: [filePath],
                bundle: true,
                format: 'esm',
                target: 'esnext',
                write: false,
                platform: 'browser',
                sourcemap: false,
                // Externalize WorkAdventure global API (available in the browser)
                external: ['WA'],
            });
            
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
            return res.send(result.outputFiles[0].text);
        } catch (error) {
            console.error('Error transforming TypeScript file:', error);
            return next(error);
        }
    }
    // For non-TypeScript files in /src, pass to next middleware
    next();
});

// Serve static files, but skip /src (handled above)
app.use((req, res, next) => {
    // Skip /src requests - they are handled by the transformation middleware above
    if (req.path.startsWith('/src/')) {
        return next(); // Let the transformation middleware handle it or pass to Vite
    }
    // For other files, use express.static
    staticMiddleware(req, res, next);
});

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

// Verify and log all controllers created
controllers.forEach(controller => {
    console.log(`Controller created: ${controller.constructor.name}`);
});

export default app;
// Export for VitePluginNode compatibility
export const viteNodeApp = app;
