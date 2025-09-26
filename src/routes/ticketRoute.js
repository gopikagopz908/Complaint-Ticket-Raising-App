
import express from 'express'
import { createTicket, deleteTicket, getAllTickets, getMyTickets, updateTicketStatus } from '../controllers/ticketController.js'
import { verifyTokenMiddleware } from '../middleWare/verifyToken.js'


const ticketRoute=express()



ticketRoute.post("/addTicket",verifyTokenMiddleware,createTicket)

ticketRoute.get("/my",verifyTokenMiddleware,getMyTickets)

ticketRoute.get("/getAll",getAllTickets)

ticketRoute.delete("/delete/:id",deleteTicket)


ticketRoute.put("/update/:id/status",updateTicketStatus)



export default ticketRoute

