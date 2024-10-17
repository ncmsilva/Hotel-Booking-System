import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config();
const app = express()

const conn_str = process.env.mongo_con_str;
console.log(conn_str)

mongoose.connect(conn_str).then(
    ()=>{
        console.log("Connected to the database")
    }
).catch(
    (err)=>{
        console.log(`Connection fail message ${err}`)
    }
)

app.listen(5002,(req,res)=>
{
    console.log("Sever is running on on port 5002")
});