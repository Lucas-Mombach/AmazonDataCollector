import axios from "axios"
import cheerio from "cheerio"
// import express from "express"
import dotenv from "dotenv"
import fs from "fs"

//load environment var
dotenv.config();

const config = {
  
    "headers": {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8", 
      "Accept-Encoding": "gzip, deflate, br", 
      "Accept-Language": "en-US,en;q=0.5", 
      "Host": "www.amazon.com.br", 
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
//const app = express();

async function fetchData(){
  
  try {
    const htmlData = await
    axios.get(url,{headers: config.headers});
    const $ = cheerio.load(htmlData.data); 
    let products = [];
    products =  $('div.sg-col-4-of-24.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.s-widget-spacing-small.sg-col-4-of-20',htmlData.data)
    .map((_, product) => { 
      const $product = $(product); 
      const title = $product.find('span.a-size-base-plus.a-color-base.a-text-normal').text(); 

      // const rating = $product.find('a').text();
      // const numberOfReviews = $product.find('a').text();
      // const imageUrl = $product.find('a').attr('href');
      
      


      // return {'title': title, 'rating': rating, 'numberOfReviews': numberOfReviews, 'imageUrl': imageUrl} 

      return {'title': title};
    }) 
    .toArray();
    
    //just to see what axios is catching

    // let data = htmlData.data;
    // fs.writeFile('dataHTML.txt', data, (err) => {
    // // In case of a error throw err.
    //   if (err) throw err;
    //   })
    

    console.log(products);

  } catch (error) {
    console.log(error);
  }
}
fetchData();
// app.listen(PORT,() => console.log(`listing on port ${PORT}`) );
