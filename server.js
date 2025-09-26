import dotenv from 'dotenv';
import app from './app.js';
import dbConnect from './dbConfig/dbConnect.js';



dotenv.config()

dbConnect()   

const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})

