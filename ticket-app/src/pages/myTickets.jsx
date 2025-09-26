import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import CreateTicketModal from "../components/modal";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTickets = async () => {
    try {
      const res = await axiosInstance.get("/ticket/my");
      setTickets(res.data.tickets);
      console.log(res.data.tickets,"kkkkkkkkkk")
    } catch (err) {
     console.log(err)
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold ">My Tickets</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Ticket
        </button>
      </div>

      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <table className="min-w-full border border-gray-800 ">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Description</th>
              <th className="border px-4 py-2 text-left">Priority</th>
              <th className="border px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{ticket.name}</td>
                <td className="border px-4 py-2">{ticket.description}</td>
                <td className="border px-4 py-2">{ticket.priority}</td>
                <td className="border px-4 py-2">{ticket.status}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTicketCreated={fetchTickets}
      />
    </div>
  );
};

export default MyTickets;
