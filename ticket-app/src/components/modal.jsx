import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

const CreateTicketModal = ({ isOpen, onClose, onTicketCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "Low",
  });

  if (!isOpen) return null; 

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/ticket/addTicket", formData);
      toast.success("Ticket created successfully!");
      setFormData({ name: "", description: "", priority: "Low" });

      if (onTicketCreated) onTicketCreated();
      if (onClose) onClose(); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create ticket");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Create Ticket</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label>Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketModal;
