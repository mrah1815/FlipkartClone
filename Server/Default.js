import {products} from "./Constants/Data.js"
import Product from "./Models/Product-Schema.js";

const DefaultData= async ()=>{
    try{
        // await Product.deleteMany({});
        // console.log("1done");
        await Product.insertMany(products);
        console.log("done3");
        console.log("Data imported sucessfully");    
    }catch(error){
        console.log("done2");
        console.log("error while inserting data",error.message);
    }
}

export default DefaultData;