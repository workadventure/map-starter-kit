# Server-side Code (`app/`)

This directory contains the **server-side Express.js application** code that runs on Node.js.

## 📁 Structure

- **`app.ts`**: Main Express application entry point
  - Configures CORS, static file serving, and middleware
  - Initializes all controllers
  - Exports the Express app for VitePluginNode integration

- **`controller/`**: Express route controllers
  - **`FrontController.ts`**: Handles frontend routes and HTML rendering with Mustache
  - **`MapController.ts`**: Handles map-related API endpoints (`/maps/list`)
  - **`UploaderController.ts`**: Handles map upload and configuration (`/uploader/*`)

## ⚠️ Important Notes

- **This code runs on the server**, not in the browser
- **Not compiled by Vite** - TypeScript is compiled separately for the server
- Used for API endpoints, server-side rendering, and backend logic
- Do **NOT** place map scripts here - they belong in `src/`

## 🔄 Development

The server is integrated with Vite via `VitePluginNode` for hot module replacement during development.
