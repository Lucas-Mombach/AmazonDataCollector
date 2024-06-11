import axios from "axios"
import cheerio from "cheerio"

export async function scrapeProducts (req, res){
  const keyword = req.query.keyword;
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
  
  
  const url = `https://www.amazon.com.br/s?k=${keyword}`;
  try {
    const htmlData = await
    axios.get(url,{headers: config.headers});
    const $ = cheerio.load(htmlData.data); 
    let products = [];
    products =  $('div.sg-col-4-of-24.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.s-widget-spacing-small.sg-col-4-of-20',htmlData.data)
    .map((_, product) => { 
      const $product = $(product); 
      const title = $product.find('span.a-size-base-plus.a-color-base.a-text-normal').text(); 
      const rating = $product.find('div.a-section.a-spacing-none.a-spacing-top-micro > div > span').attr('aria-label');
      const numberOfReviews = $product.find('div.a-section.a-spacing-none.a-spacing-top-micro > div.a-size-small').children('span').last().attr('aria-label');
      const imageUrl = $product.find('div.a-section.aok-relative.s-image-square-aspect> img.s-image').attr('src');

      return {'title': title, 'rating': rating, 'numberOfReviews': numberOfReviews, 'imageUrl': imageUrl} 

    }) 
    .toArray();
    res.json(products);
    
  } catch (error) {
    console.log(error);
  }
  
}



