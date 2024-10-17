import express from "express"

const app = express()



app.listen(5002,(req,res)=>
{
    console.log("Sever is running on on port 5002")
});