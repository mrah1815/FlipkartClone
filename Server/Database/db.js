import mongoose from "mongoose";

export const Connection= async ()=>{
    const URL=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@ecommerce-web.gqwjc8a.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce-web`;
    try{
       await mongoose.connect(URL);
       console.log("Database connected Successfully");
    }catch(error)
    {
        console.log("Error while connecting with the database",error.message);
    }
}
export default Connection;