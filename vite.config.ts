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
                index                 : "./index.html",
                betOnAgency           : "./src/betOnAgency.html",
                betOnBetter           : "./src/betOnBetter.html",
                betOnExpertise        : "./src/betOnExpertise.html",
                betOnExpertiseLink1   : "./src/betOnExpertiseLink1.html",
                betOnExpertiseLink2   : "./src/betOnExpertiseLink2.html",
                betOnExpertiseLink3   : "./src/betOnExpertiseLink3.html",
                betOnExpertiseLink4   : "./src/betOnExpertiseLink4.html",
                betOnExpertiseLink5   : "./src/betOnExpertiseLink5.html",
                betOnFutur            : "./src/betOnFutur.html",
                betOnFuturLink1       : "./src/betOnFuturLink1.html",
                betOnTalent           : "./src/betOnTalent.html",
                betOnYou              : "./src/betOnYou.html",
                betOnYouArea          : "./src/betOnYouArea.html",
                betOnYouLink1         : "./src/betOnYouLink1.html",
                betOnYouLink2         : "./src/betOnYouLink2.html",
                betOnYouLink3         : "./src/betOnYouLink3.html",
                supportRh             : "./src/supportRH.html",
                welcome               : "./src/welcome.html",
                // betOnAgencyJs         : "./src/betOnAgency.js",
                // betOnBetterJs         : "./src/betOnBetter.js",
                // betOnExpertiseJs      : "./src/betOnExpertise.js",
                // betOnExpertiseLink1Js : "./src/betOnExpertiseLink1.js",
                // betOnExpertiseLink2Js : "./src/betOnExpertiseLink2.js",
                // betOnExpertiseLink3Js : "./src/betOnExpertiseLink3.js",
                // betOnExpertiseLink4Js : "./src/betOnExpertiseLink4.js",
                // betOnExpertiseLink5Js : "./src/betOnExpertiseLink5.js",
                // betOnFuturJs          : "./src/betOnFutur.js",
                // betOnFuturLink1Js     : "./src/betOnFuturLink1.js",
                // betOnTalentJs         : "./src/betOnTalent.js",
                // betOnYouJs            : "./src/betOnYou.js",
                // betOnYouAreaJs        : "./src/betOnYouArea.js",
                // betOnYouLink1Js       : "./src/betOnYouLink1.js",
                // betOnYouLink2Js       : "./src/betOnYouLink2.js",
                // betOnYouLink3Js       : "./src/betOnYouLink3.js",
                // supportRhJs           : "./src/supportRH.js",
                // welcomeJs             : "./src/welcome.js",
                ...getMapsScripts(maps),
            },
        },
    },
    plugins: [...getMapsOptimizers(maps, optimizerOptions)],
    server: {
        
        host: "localhost",
        headers: {
            "Access-Control-Allow-Origin"       : "*",
            "Access-Control-Allow-Methods"      : "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers"      : "X-Requested-With, content-type, Authorization, Origin, Content-Type, Accept, Authorization",
            "Access-Control-Allow-Credentials"  : "true",
            "Cache-Control"                     : "no-cache, no-store, must-revalidate",
        },
        open: "/",
    },
});
