import express from 'express';
import * as fs from "node:fs";
import * as path from "node:path";

export class MapController {
    private router: express.Router;
    private app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
        this.router = express.Router();
        this.setupRoutes();
        // Register the router on the application with the "/maps" prefix
        this.app.use('/maps', this.router);
    }

    /**
     * Setup the routes for the map controller
     * @returns void
     */
    private setupRoutes() {
        // Route to retrieve the list of maps with their properties
        this.router.get('/list', async (req, res) => {
            try {
                const mapsDir = './';
                const maps = await this.getMapsWithProperties(mapsDir);
                res.json(maps);
            } catch (error) {
                console.error('Error getting maps list:', error);
                res.status(500).json({ error: 'Error getting maps list' });
            }
        });
    }

    /**
     * Get the list of maps with their properties
     * @param dir - The directory to search for maps
     * @param baseDir - The base directory to use for relative paths
     * @returns The list of maps with their properties
     */
    private async getMapsWithProperties(dir: string, baseDir: string = dir): Promise<any[]> {
        let files = await fs.promises.readdir(dir, { withFileTypes: true });
        const maps: any[] = [];

        for (const file of files) {
            const fullPath = path.join(dir, file.name);

            // Exclude the "dist" folder
            if(file.name === 'dist') continue;

            if (file.isDirectory()) {
                // Recursively search subdirectories
                const subMaps = await this.getMapsWithProperties(fullPath, baseDir);
                maps.push(...subMaps);
            } else if (file.name.endsWith('.tmj')) {
                try {
                    // Read and parse TMJ file
                    const tmjContent = await fs.promises.readFile(fullPath, 'utf-8');
                    const tmjData = JSON.parse(tmjContent);

                    // Extract properties
                    const properties = tmjData.properties || [];
                    const findProperty = (key: string) => {
                        const item = properties.find((p: any) => p.name === key);
                        return item ? item.value : null;
                    };

                    // Get file stats for size and date
                    const stats = await fs.promises.stat(fullPath);
                    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
                    const lastModified = stats.mtime;

                    // Get relative path
                    const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');

                    // Extract filename without extension
                    const filename = path.basename(file.name, '.tmj');

                    maps.push({
                        path: relativePath,
                        filename: filename,
                        mapName: findProperty('mapName') || filename,
                        mapImage: findProperty('mapImage') || null,
                        mapDescription: findProperty('mapDescription') || '',
                        mapCopyright: findProperty('mapCopyright') || '',
                        size: fileSizeInMB,
                        lastModified: lastModified.toISOString(),
                        lastModifiedFormatted: lastModified.toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                    });
                } catch (error) {
                    console.error(`Error reading TMJ file ${fullPath}:`, error);
                }
            }
        }

        return maps;
    }
}
