import axios from "axios"
import cheerio from "cheerio"
import express from "express"
import dotenv from "dotenv"

//load environment var
dotenv.config();

const config = {
  
    "headers": {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8", 
      "Accept-Encoding": "gzip, deflate, br", 
      "Accept-Language": "en-US,en;q=0.5", 
      "Host": "amazon.com.br", 
      "Sec-Fetch-Dest": "document", 
      "Sec-Fetch-Mode": "navigate", 
      "Sec-Fetch-Site": "cross-site", 
      "Sec-Fetch-User": "?1", 
      "Upgrade-Insecure-Requests": "1", 
      "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:125.0) Gecko/20100101 Firefox/125.0", 
      "X-Amzn-Trace-Id": "Root=1-663cbf21-5e7f13f22874c83401bf94be"
    }
  };


const url = 'https://www.amazon.com.br/s?k=liquidificador';
const PORT = process.env.PORT || 4000;
const app = express();

try {
  const data = await
      axios.get(url,config.headers);

} catch (error) {
  console.log(error);
}

app.listen(PORT,() => console.log(`listing on port ${PORT}`) );



