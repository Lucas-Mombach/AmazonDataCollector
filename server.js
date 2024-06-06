import express from "express"
import cors from "cors"
import {scrapeProducts} from "./api/index.js"
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const app = express();
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.post("/api/scrape",scrapeProducts);

app.use("/public", express.static(__dirname + "/public"));
app.use("/", (req,res) => {
  res.sendFile(__dirname + "/index.html")
});

- Serve static Assets
- Serve HTML File
app.use("*",(req,res) =>
  res.status(404).json ({error:"not found"}));
  
const port  = 3000;
app.listen(port,() => {
  console.log(`listening on port ${port}`);
});


export default app;