// // Creating serverless function to grab the data from airtable 

// // Airtable - node framework to get data from airtable 
// require('dotenv').config();
// const Airtable = require('airtable-node');


// const airtable  = new Airtable({apiKey:process.env.AIRTABLE_API_KEY}).base('appAD5HTWsVxa4phs').table('products');


// exports.handler = async(event,context,cb) => {

//     try {
        
        
//         const {records} = await airtable.list();
        
    
//         const products = records.map((product) => {
           
        
//             const {id} = product;
//             const{name,price,image} = product.fields;
//             const {url} = image[0].url;
//             console.log(id,name,url,price)
//             return {id,url,name,price}
         
//         })
         
//         return {
//             headers: {
//             'Access-Control-Allow-Origin':"*"
//             },
//             statusCode:200,
//             body: JSON.stringify(products)
//         }
        
//     } catch (error) {
//         return {
//             statusCode: 500,
//             body:`Error from backend${error}`
//         }
//     }


// }


require('dotenv').config()
const Airtable = require('airtable-node')

const airtable  = new Airtable({apiKey:process.env.AIRTABLE_API_KEY}).base('appAD5HTWsVxa4phs').table('products');

exports.handler = async (event, context, cb) => {
  try {
    const { records } = await airtable.list()
    const products = records.map((product) => {
      const { id } = product
      const { name, image, price } = product.fields
      const url = image[0].url
      return { id, name, url, price }
    })
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Server Error',
    }
  }
}