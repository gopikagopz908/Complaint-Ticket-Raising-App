import asyncHandler from "../middleWare/asyncHandler.js";
import { createTicketService, deleteTicketService, getUserTicketsService, updateTicketStatusService } from "../services/ticketService.js";
import CustomError from "../utils/customError.js";
import Ticket from "../models/ticketModel.js"

export const createTicket = asyncHandler(async (req, res) => {
  const { name, description, priority } = req.body;
  const ticket = await createTicketService(req.user._id, name, description, priority);

  res.status(201).json({
    message: "Ticket created successfully",
    ticket,
  });
});

export const getMyTickets = asyncHandler(async (req, res) => {
  const tickets = await getUserTicketsService(req.user._id);

  res.status(200).json({
    message: "Tickets fetched successfully",
    tickets,
  });
});




export const getAllTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find().populate("user", "name email"); // populate user details

  res.status(200).json({
    message: "Tickets fetched successfully",
    tickets,
  });
});

export const deleteTicket=asyncHandler(async(req,res)=>{
    const{id}=req.params;
    if(!id){
        throw new CustomError("id not found",404)
    }

    const result=await deleteTicketService(id)

    return res.status(200).json({
        message:"Ticket deleted successfully",
        result
    })
})

export const updateTicketStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id) {
    throw new CustomError("Ticket ID not found", 404);
  }

  const validStatuses = ["Open", "In Progress", "Resolved", "Closed"];
  if (!validStatuses.includes(status)) {
    throw new CustomError("Invalid status", 400);
  }

  const result = await updateTicketStatusService(id, status);

  return res.status(200).json({
    message: "Ticket status updated successfully",
    result,
  });
});