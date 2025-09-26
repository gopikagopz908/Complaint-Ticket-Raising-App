import Ticket from "../models/ticketModel.js"
import CustomError from "../utils/customError.js";



export const createTicketService = async (userId, name, description, priority) => {
  if (!name || !description) {
    throw new Error("Name and description are required");
  }

  return await Ticket.create({
    user: userId,
    name,
    description,
    priority,
  });
};

export const getUserTicketsService = async (userId) => {
  return await Ticket.find({ user: userId }).sort("-createdAt");
};


export const deleteTicketService=async(id)=>{
    const existing=await Ticket.findById(id)

    if(!existing){
        throw new CustomError("Ticket not found",404)
    }
    return Ticket.findByIdAndDelete(id)
}


export const updateTicketStatusService = async (id, status) => {
  const ticket = await Ticket.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  return ticket;
};
