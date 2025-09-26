
import express from "express"
import cors from 'cors'
import userRoute from "./src/routes/userRoute.js";
import ticketRoute from "./src/routes/ticketRoute.js";

const app=express()


app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true   // important if you're using cookies/sessions
}));

app.use('/api/user',userRoute)

app.use('/api/ticket',ticketRoute)

export default app;