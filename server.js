import express from "express"
import cors from "cors"
import {scrapeProducts} from "./api/index.js"
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const app = express();
const __dirname = path.dirname(__filename);

const port  = 3000;
app.listen(port,() => {
  console.log(`listening on port ${port}`);
});


export default app;