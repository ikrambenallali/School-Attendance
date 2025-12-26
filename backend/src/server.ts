// import "dotenv/config";

import dotenv from "dotenv";
import path from "path";

// charge explicitement le .env à la racine du projet (backend/.env)
dotenv.config({ path: path.resolve(__dirname, "../.env") });
// console.log("DATABASE_URL =", process.env.DATABASE_URL);

import app from "./app";


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
