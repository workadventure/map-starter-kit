import 'dotenv/config';
import { defineConfig } from "vite";
import { getMaps, getMapsOptimizers, getMapsScripts, LogLevel, OptimizeOptions } from "wa-map-optimizer-vite";

const maps = getMaps();

let optimizerOptions: OptimizeOptions = {
    logs: process.env.LOG_LEVEL && process.env.LOG_LEVEL in LogLevel ? LogLevel[process.env.LOG_LEVEL] : LogLevel.NORMAL,
};

if (process.env.TILESET_OPTIMIZATION && process.env.TILESET_OPTIMIZATION === "true") {
    const qualityMin = process.env.TILESET_OPTIMIZATION_QUALITY_MIN ? parseInt(process.env.TILESET_OPTIMIZATION_QUALITY_MIN) : 0.9;
    const qualityMax = process.env.TILESET_OPTIMIZATION_QUALITY_MAX ? parseInt(process.env.TILESET_OPTIMIZATION_QUALITY_MAX) : 1;

    optimizerOptions.output = {
        tileset: {
            compress: {
                quality: [qualityMin, qualityMax],
            }
        }
    }
}

export default defineConfig({
    base: "./",
    build: {
        rollupOptions: {
            input: {
                index               : "./index.html",
                betOnAgency         : "./src/betOnAgency.html",
                betOnBetter         : "./src/betOnBetter.html",
                betOnExpertise      : "./src/betOnExpertise.html",
                betOnExpertiselink1 : "./src/betOnExpertiselink1.html",
                betOnExpertiselink2 : "./src/betOnExpertiselink2.html",
                betOnExpertiselink3 : "./src/betOnExpertiselink3.html",
                betOnExpertiselink4 : "./src/betOnExpertiselink4.html",
                betOnExpertiselink5 : "./src/betOnExpertiselink5.html",
                betOnFutur          : "./src/betOnFutur.html",
                betOnFuturLink1     : "./src/betOnFuturLink1.html",
                betOnTalent         : "./src/betOnTalent.html",
                betOnYou            : "./src/betOnYou.html",
                betOnYouArea        : "./src/betOnYouArea.html",
                betOnYouLink1       : "./src/betOnYouLink1.html",
                betOnYouLink2       : "./src/betOnYouLink2.html",
                betOnYouLink3       : "./src/betOnYouLink3.html",
                supportRh           : "./src/supportRH.html",
                welcome             : "./src/welcome.html",
                ...getMapsScripts(maps),
            },
        },
    },
    plugins: [...getMapsOptimizers(maps, optimizerOptions)],
    server: {
        host: "localhost",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
            "Cache-Control": "no-cache, no-store, must-revalidate",
        },
        open: "/",
    },
});
