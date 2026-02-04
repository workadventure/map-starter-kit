import express from 'express';
import * as fs from "node:fs";
import * as path from "node:path";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

/** Metadata returned by map-storage for each map (WAM file). */
export interface MapStorageMetadata {
    copyright?: string;
    description?: string;
    name?: string;
    thumbnail?: string;
}

/** Single map entry returned by map-storage GET /maps/ (value in the map). */
export interface MapStorageEntry {
    mapUrl: string;
    wamFileUrl?: string;
    metadata?: MapStorageMetadata;
}

/** Response shape: Map<wamfile, { mapUrl, metadata }>. In JSON this is a plain object. */
export interface MapStorageListResponse {
    [wamFile: string]: MapStorageEntry;
}

/** Hydrated map item returned by our API to the frontend. */
export interface MapListItem {
    wamFileUrl: string;
    filename: string;
    mapName: string | null;
    mapDescription?: string;
    mapCopyright?: string;
    mapImage: string | null;
    mapUrl: string;
}

/**
 * Converts the map-storage response (Map<wamfile, entry>) into a list of MapListItem.
 */
export function hydrateMapStorageList(
    raw: MapStorageListResponse,
    mapStorageBaseUrl: string
): MapListItem[] {
    const list: MapListItem[] = [];
    const baseUrl = mapStorageBaseUrl.replace(/\/$/, '');

    for (const [wamFile, entry] of Object.entries(raw)) {
        if (!entry || typeof entry !== 'object') continue;

        const rawWamFileUrl = entry.wamFileUrl ?? wamFile;
        const wamFileUrlNormalized = rawWamFileUrl.startsWith('http')
            ? new URL(rawWamFileUrl).pathname.replace(/^\//, '')
            : rawWamFileUrl.replace(/^\//, '');

        const filename = wamFileUrlNormalized.split('/').pop() ?? wamFileUrlNormalized;
        const nameFromFile = filename.replace(/\.(tmj|wam)$/i, '');

        const meta = entry.metadata ?? {};
        const mapUrl = entry.mapUrl ?? (entry as unknown as { mapUrl?: string }).mapUrl ?? '';

        let mapImage: string | null = null;
        if (meta.thumbnail) {
            if (meta.thumbnail.startsWith('http')) {
                mapImage = meta.thumbnail;
            } else {
                const thumbFile = meta.thumbnail.replace(/^\//, '');
                const wamDir = wamFileUrlNormalized.includes('/')
                    ? wamFileUrlNormalized.replace(/\/[^/]*$/, '')
                    : '';
                const thumbPath = wamDir ? `${wamDir}/${thumbFile}` : thumbFile;
                mapImage = `${baseUrl}/${thumbPath}`;
            }
        }

        list.push({
            wamFileUrl: wamFileUrlNormalized,
            filename,
            mapName: meta.name ?? nameFromFile,
            mapDescription: meta.description,
            mapCopyright: meta.copyright,
            mapImage,
            mapUrl: mapUrl.startsWith('http') ? mapUrl : `${baseUrl}/${mapUrl.replace(/^\//, '')}`,
        });
    }

    return list;
}

export class UploaderController {
    private router: express.Router;
    private app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
        this.router = express.Router();
        this.setupMiddleware();
        this.setupRoutes();
        // Register the router on the application with the "/uploader" prefix
        this.app.use('/uploader', this.router);
    }

    private setupMiddleware() {
        // Middleware to parse JSON bodies
        this.router.use(express.json());
    }

    private setupRoutes() {
        // Route to configure MAP_STORAGE mode
        this.router.post('/configure', async (req, res) => {
            try {
                const { mapStorageUrl, mapStorageApiKey, uploadDirectory } = req.body;

                // Validate required fields
                if (!mapStorageUrl || !mapStorageApiKey || !uploadDirectory) {
                    return res.status(400).json({
                        error: 'Missing required fields',
                        required: ['mapStorageUrl', 'mapStorageApiKey', 'uploadDirectory']
                    });
                }

                // Update .env file
                await this.updateEnvFile();

                // Create or update .env.secret file
                await this.createEnvSecretFile({
                    mapStorageUrl,
                    mapStorageApiKey,
                    uploadDirectory
                });

                res.json({
                    success: true,
                    message: 'Configuration updated successfully'
                });
            } catch (error) {
                console.error('Error configuring uploader:', error);
                res.status(500).json({
                    error: 'Error configuring uploader',
                    message: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });

        // Route to get current configuration status
        this.router.get('/status', async (req, res) => {
            try {
                const envPath = path.join(process.cwd(), '.env');
                const envSecretPath = path.join(process.cwd(), '.env.secret');

                const envContent = await fs.promises.readFile(envPath, 'utf-8');
                const uploadMode = envContent.match(/UPLOAD_MODE=(.+)/)?.[1]?.trim() || 'GH_PAGES';

                const hasSecretFile = await fs.promises.access(envSecretPath)
                    .then(() => true)
                    .catch(() => false);

                let secretConfig: {
                    mapStorageUrl: string | null;
                    mapStorageApiKey: string | null;
                    uploadDirectory: string | null;
                } | null = null;
                if (hasSecretFile) {
                    const secretContent = await fs.promises.readFile(envSecretPath, 'utf-8');
                    const mapStorageUrl = secretContent.match(/MAP_STORAGE_URL=(.+)/)?.[1]?.trim();
                    const mapStorageApiKey = secretContent.match(/MAP_STORAGE_API_KEY=(.+)/)?.[1]?.trim();
                    const uploadDirectory = secretContent.match(/UPLOAD_DIRECTORY=(.+)/)?.[1]?.trim();

                    secretConfig = {
                        mapStorageUrl: mapStorageUrl || null,
                        mapStorageApiKey: mapStorageApiKey || null, // Hide the actual key
                        uploadDirectory: uploadDirectory || null
                    };
                }

                res.json({
                    uploadMode,
                    hasSecretFile,
                    secretConfig
                });
            } catch (error) {
                console.error('Error getting uploader status:', error);
                res.status(500).json({
                    error: 'Error getting uploader status',
                    message: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });

        // Route to get list of maps from map-storage (for self-hosted step4)
        this.router.get('/maps-storage-list', async (req, res) => {
            try {
                const envSecretPath = path.join(process.cwd(), '.env.secret');
                const hasSecretFile = await fs.promises.access(envSecretPath)
                    .then(() => true)
                    .catch(() => false);

                if (!hasSecretFile) {
                    return res.status(400).json({
                        error: 'Configuration not found',
                        message: 'Please configure the upload settings first.'
                    });
                }

                const secretContent = await fs.promises.readFile(envSecretPath, 'utf-8');
                const mapStorageUrl = secretContent.match(/MAP_STORAGE_URL=(.+)/)?.[1]?.trim();
                const mapStorageApiKey = secretContent.match(/MAP_STORAGE_API_KEY=(.+)/)?.[1]?.trim();

                if (!mapStorageUrl || !mapStorageApiKey) {
                    return res.status(400).json({
                        error: 'Missing map-storage configuration',
                        message: 'MAP_STORAGE_URL and MAP_STORAGE_API_KEY must be set in .env.secret.'
                    });
                }

                const baseUrl = mapStorageUrl.replace(/\/$/, '');
                const listUrl = `${baseUrl}/maps/`;

                const response = await fetch(listUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${mapStorageApiKey}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const text = await response.text();
                    console.error('Map-storage list error:', response.status, text);
                    return res.status(response.status).json({
                        error: 'Map-storage request failed',
                        message: response.status === 401
                            ? 'Invalid API key. Check MAP_STORAGE_API_KEY in your .env.secret.'
                            : `Map-storage returned ${response.status}: ${text.slice(0, 200)}`
                    });
                }

                const data = await response.json();
                // Map-storage returns Map<wamfile, { mapUrl, metadata }> (as a plain object in JSON)
                const raw = typeof data === 'object' && data !== null ? data : {};
                const rawMap: MapStorageListResponse = !Array.isArray(raw) && typeof raw.maps === 'object' && raw.maps !== null
                    ? (raw.maps as MapStorageListResponse)
                    : !Array.isArray(raw)
                    ? (raw as MapStorageListResponse)
                    : {};
                const maps = hydrateMapStorageList(rawMap, baseUrl);
                const playBaseUrl = secretContent.match(/PLAY_BASE_URL=(.+)/)?.[1]?.trim() || null;
                res.json({ maps, mapStorageUrl: baseUrl, playBaseUrl });
            } catch (error) {
                console.error('Error fetching maps from map-storage:', error);
                res.status(500).json({
                    error: 'Error fetching maps list',
                    message: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });

        // Route to upload map
        this.router.post('/upload', async (req, res) => {
            try {
                // Verify that configuration exists
                const envSecretPath = path.join(process.cwd(), '.env.secret');

                // Check if .env.secret exists
                const hasSecretFile = await fs.promises.access(envSecretPath)
                    .then(() => true)
                    .catch(() => false);

                if (!hasSecretFile) {
                    return res.status(400).json({
                        error: 'Configuration not found',
                        message: 'Please configure the upload settings first using /uploader/configure'
                    });
                }

                // Execute upload
                await this.runUpload();

                res.json({
                    success: true,
                    message: 'Map uploaded successfully'
                });
            } catch (error) {
                console.error('Error uploading map:', error);
                res.status(500).json({
                    error: 'Error uploading map',
                    message: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
    }

    private async runUpload(): Promise<void> {
        const projectRoot = process.cwd();
        
        try {
            // Execute npm run upload-only
            // The command will read environment variables from .env and .env.secret
            const { stdout, stderr } = await execAsync('npm run upload', {
                cwd: projectRoot,
                env: {
                    ...process.env,
                    // Ensure we're using the current process environment
                    NODE_ENV: process.env.NODE_ENV || 'development'
                },
                maxBuffer: 10 * 1024 * 1024 // 10MB buffer for output
            });

            if (stderr && !stderr.includes('warning')) {
                console.warn('Upload stderr:', stderr);
            }
            
            console.info('Upload stdout:', stdout);
            console.info('Upload completed successfully');
        } catch (error) {
            console.error('Error executing upload-only:', error);
            throw error;
        }
    }

    private async updateEnvFile(): Promise<void> {
        const envPath = path.join(process.cwd(), '.env');
        
        // Read the current .env file
        let envContent = await fs.promises.readFile(envPath, 'utf-8');

        // Step 1: Comment UPLOAD_MODE=GH_PAGES if it's not commented (must be at start of line, no # before)
        envContent = envContent.replace(
            /^UPLOAD_MODE=GH_PAGES\s*$/m,
            '# UPLOAD_MODE=GH_PAGES'
        );

        // Step 2: Uncomment UPLOAD_MODE=MAP_STORAGE if it's commented (has # at start)
        envContent = envContent.replace(
            /^#\s*UPLOAD_MODE=MAP_STORAGE\s*$/m,
            'UPLOAD_MODE=MAP_STORAGE'
        );

        // Step 3: If UPLOAD_MODE=MAP_STORAGE doesn't exist (neither commented nor uncommented), add it
        if (!envContent.match(/^UPLOAD_MODE=MAP_STORAGE\s*$/m)) {
            // Check if there's a commented GH_PAGES line we can replace
            if (envContent.match(/^#\s*UPLOAD_MODE=GH_PAGES\s*$/m)) {
                // Replace the commented GH_PAGES line with uncommented MAP_STORAGE
                envContent = envContent.replace(
                    /^#\s*UPLOAD_MODE=GH_PAGES\s*$/m,
                    'UPLOAD_MODE=MAP_STORAGE'
                );
            } else {
                // Add UPLOAD_MODE=MAP_STORAGE at the end if no UPLOAD_MODE line exists at all
                if (!envContent.match(/^#?\s*UPLOAD_MODE=/m)) {
                    envContent += '\nUPLOAD_MODE=MAP_STORAGE\n';
                }
            }
        }

        // Write the updated content back to .env
        await fs.promises.writeFile(envPath, envContent, 'utf-8');
    }

    private async createEnvSecretFile(config: {
        mapStorageUrl: string;
        mapStorageApiKey: string;
        uploadDirectory: string;
    }): Promise<void> {
        const envSecretPath = path.join(process.cwd(), '.env.secret');

        // Create the .env.secret file with the provided configuration
        const secretContent = `# Secret configuration file for MAP_STORAGE upload mode
# This file is not committed to git (see .gitignore)

MAP_STORAGE_URL=${config.mapStorageUrl}
MAP_STORAGE_API_KEY=${config.mapStorageApiKey}
UPLOAD_DIRECTORY=${config.uploadDirectory}
`;

        await fs.promises.writeFile(envSecretPath, secretContent, 'utf-8');
    }
}
