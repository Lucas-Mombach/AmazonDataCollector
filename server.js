import express from "express"
import cors from "cors"
import {scrapeProducts} from "./api/scrapeProducts.js"
import path from "path";
import { fileURLToPath } from 'url';


const app = express();
//access the current file's path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json()); // parses incoming requests with JSON payloads
app.use(cors());
app.post("/api/scrape",scrapeProducts);

app.use("/public", express.static(__dirname + "/public")); // serve static components aka index.js and styles.css

app.use("/", (req,res) => { //serve the front page
  res.sendFile(__dirname + "/index.html")
});

app.use("*",(req,res) =>
  res.status(404).json ({error:"not found"}));

const port  = 3000;
app.listen(port,() => { // starts server listen on port 3000
  console.log(`listening on port ${port}`);
});


export default app;