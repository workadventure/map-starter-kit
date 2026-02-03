import express from 'express';
import * as fs from "node:fs";
import * as path from "node:path";
import Mustache from 'mustache';

export class FrontController {
    private app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
        // Assets are now configured in app.ts
        this.setupRoutes();
        this.setupRoutesStep1();
        this.setupRoutesStep2();
        this.setupRoutesStep3();
        this.setupRoutesStep4();
    }

    private setupRoutes() {
        // Route for the Mustache renderer on "/"
        this.app.get('/', async (req, res) => {
            try {
                res.send(await this.renderTemplate('index.html'));
            } catch (error) {
                console.error('Error rendering template:', error);
                res.status(500).send('Error rendering template');
            }
        });
    }

    /**
     * Render a template file
     * @param filename - The filename of the template to render
     * @returns The rendered template
     */
    private async renderTemplate(filename: string): Promise<string> {
        // Read the HTML template
        const templatePath = path.join(process.cwd(), `${filename}.html`);
        const template = await fs.promises.readFile(templatePath, 'utf-8');
        // Render the template with Mustache (without data for now)
        return Mustache.render(template, {});
    }

    /**
     * Setup the routes for file "step1-git.html"
     * @returns void
     */
    private setupRoutesStep1() {
        this.app.get('/step1-git', async (req, res) => {
            res.send(await this.renderTemplate('step1-git'));
        });
    }

    /**
     * Setup the routes for file "step2-hosting.html"
     * @returns void
     */
    private setupRoutesStep2() {
        this.app.get('/step2-hosting', async (req, res) => {
            res.send(await this.renderTemplate('step2-hosting'));
        });
    }

    /**
     * Setup the routes for file "step3-steps.html"
     * @returns void
     */
    private setupRoutesStep3() {
        this.app.get('/step3-steps', async (req, res) => {
            res.send(await this.renderTemplate('step3-steps'));
        });
    }

    /**
     * Setup the routes for file "step4-map.html"
     * @returns void
     */
    private setupRoutesStep4() {
        this.app.get('/step4-validated', async (req, res) => {
            res.send(await this.renderTemplate('step4-validated'));
        });
    }
    
}
