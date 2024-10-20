import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import JWT from "jsonwebtoken"
import userRoute from "./routes/userRoute.js"
import galleryItemRouter from "./routes/galleryItemRoute.js"
import bodyParser from "body-parser"
import CategoryRoute from "./routes/categoryRoute.js"

dotenv.config();
const app = express()

app.use(bodyParser.json())

const conn_str = process.env.mongo_con_str;
console.log(conn_str)

app.use((req,res,next)=>{

    const token = req.header("Authorization")?.replace("Bearer ", "")
    const JWT_key = process.env.JWT_key
    
        if(token)
        {
            JWT.verify(token,JWT_key, (err, decorded)=>{
                if(decorded)
                {
                    req.user = decorded
                    next()
                }
                else
                {
                    next()
                }
            })
        }
        else
        {
            next()
        }
    })

mongoose.connect(conn_str).then(
    ()=>{
        console.log("Connected to the database")
    }
).catch(
    (err)=>{
        console.log(`Connection fail message ${err}`)
    }
)

app.use("/api/users",userRoute)
app.use("/api/galleryItems", galleryItemRouter)
app.use("/api/category", CategoryRoute)

app.listen(5002,(req,res)=>
{
    console.log("Sever is running on on port 5002")
});