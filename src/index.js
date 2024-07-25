import connectDB from "./db/db.js";
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({
      path:"./path"
})

connectDB()
.then(()=>{
      app.listen(process.env.PORT || 8000,()=>{
            console.log(`NETWORK connected wow..........! https://localhost:${process.env.PORT}`);
      });
})
.catch((error)=>{
      console.error(error);
})

