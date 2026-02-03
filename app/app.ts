import express from 'express';
import * as fs from "node:fs";

const app = express();

app.get('/maps/list', async (req, res) => {
    // Returns a JSON list of available maps (all TMJ files)
    const mapsDir = './';

    // Recursive function to find all .tmj files
    async function findTmjFiles(dir: string, baseDir: string = dir): Promise<string[]> {
        const files = await fs.promises.readdir(dir, { withFileTypes: true });
        const tmjFiles: string[] = [];

        for (const file of files) {
            const fullPath = `${dir}/${file.name}`;

            if (file.isDirectory()) {
                // Recursively search subdirectories
                const subFiles = await findTmjFiles(fullPath, baseDir);
                tmjFiles.push(...subFiles);
            } else if (file.name.endsWith('.tmj')) {
                // Get relative path from base directory with .tmj extension
                const relativePath = fullPath.substring(baseDir.length + 1);
                tmjFiles.push(relativePath);
            }
        }

        return tmjFiles;
    }

    const maps = await findTmjFiles(mapsDir);
    res.json(maps);
});

if (import.meta.env.PROD)
    app.listen(3000);

export const viteNodeApp = app;