import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await axiosInstance.get("/ticket/getAll"); 
      setTickets(res.data.tickets);
      console.log(res.data.tickets, "all tickets");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);


  const handleDelete = async (id) => {
  if (!id) return;

  try {
   
    await axiosInstance.delete(`/ticket/delete/${id}`);

    setTickets((prevTickets) => prevTickets.filter((ticket) => ticket._id !== id));

    toast.success("Ticket deleted successfully")
  } catch (error) {
    console.error("Failed to delete ticket:", error);
    toast(error.response?.data?.message || "Failed to delete ticket");
  }
};

 const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.put(`/ticket/update/${id}/status`, { status: newStatus });

     
      setTickets((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, status: newStatus } : t
        )
      );

      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Tickets</h1>

      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <table className="min-w-full border border-gray-800">
          <thead className="bg-gray-200">
            <tr>
            <th className="border px-4 py-2 text-left">User</th> 

              {/* <th className="border px-4 py-2 text-left">Name</th> */}
              <th className="border px-4 py-2 text-left">Description</th>
              <th className="border px-4 py-2 text-left">Priority</th>
              <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Actions</th> {/* new column */}

            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{ticket.user?.name || ticket.user}</td>

                {/* <td className="border px-4 py-2">{ticket.name}</td> */}
                <td className="border px-4 py-2">{ticket.description}</td>
                <td className="border px-4 py-2">{ticket.priority}</td>
  <td className="border px-4 py-2">
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      handleStatusChange(ticket._id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>       <td className="border px-4 py-2 flex gap-2">

  <button
    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1"
    onClick={() => handleDelete(ticket._id)}
  >
    <FaTrash />
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllTickets;
