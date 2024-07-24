import mongoose from "mongoose"
import DB_NAME from "../constants.js"

const connectDB = async() => {
      try{
            console.log(DB_NAME);
            const ConnectDB = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
            console.log("DB connected ",process.env.PORT);
      }catch(error){
            console.log("ERROR GENARATED in DB connection ",error);
            process.exit(1);
      }
}

export default connectDB;