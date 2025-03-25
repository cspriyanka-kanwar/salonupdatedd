import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManagerLayout from "../../../layouts/ManagerLayout"; // Assuming you have a ManagerLayout
import { FaEye } from "react-icons/fa"; // Eye icon from react-icons

const ClientProfile = () => {
  // Sample data for clients, can be replaced with real data fetched from an API
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "John Doe",
      contact: "john@example.com",
      phone: "+1234567890",
      branchId: "BR001",
      city: "New York",
      address: "123 Main St, New York, NY",
    },
    {
      id: 2,
      name: "Jane Smith",
      contact: "jane@example.com",
      phone: "+1987654321",
      branchId: "BR002",
      city: "Los Angeles",
      address: "456 Oak St, Los Angeles, CA",
    },
    {
      id: 3,
      name: "Jim Brown",
      contact: "jim@example.com",
      phone: "+1122334455",
      branchId: "BR003",
      city: "Chicago",
      address: "789 Pine St, Chicago, IL",
    },
  ]);

  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [searchQueryPhone, setSearchQueryPhone] = useState(""); // Search filter for phone number
  const [searchQueryName, setSearchQueryName] = useState(""); // Search filter for name

  const handleViewDetails = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true); // Open modal
    toast.info(`Viewing details of ${client.name}`);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleSearchChangePhone = (e) => {
    setSearchQueryPhone(e.target.value);
  };

  const handleSearchChangeName = (e) => {
    setSearchQueryName(e.target.value);
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQueryName.toLowerCase()) && // First filter by Name
      client.phone.includes(searchQueryPhone) // Then filter by Phone Number
  );

  return (
    <ManagerLayout>
      {/* Client Table with Filter */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Registered Clients</h2>

        {/* Name Filter */}
        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <label className="text-lg font-medium text-gray-700">Filter by Name</label>
            <input
              type="text"
              value={searchQueryName}
              onChange={handleSearchChangeName}
              placeholder="Enter client name"
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone Number Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-lg font-medium text-gray-700">Filter by Phone</label>
            <input
              type="text"
              value={searchQueryPhone}
              onChange={handleSearchChangePhone}
              placeholder="Enter phone number"
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full table-auto bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr className="text-gray-600">
                <th className="px-6 py-3 text-left">SR.NO.</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Contact</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Branch ID</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => (
                <tr key={client.id} className="border-t hover:bg-gray-100">
                  <td className="px-6 py-3 text-center font-medium text-gray-700">{index + 1}</td> {/* Serial Number with Tailwind CSS */}
                  <td className="px-6 py-3">{client.name}</td>
                  <td className="px-6 py-3">{client.contact}</td>
                  <td className="px-6 py-3">{client.phone}</td>
                  <td className="px-6 py-3">{client.branchId}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleViewDetails(client)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for displaying client details */}
      {isModalOpen && selectedClient && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 animate__animated animate__fadeIn">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Client Details</h3>
            <div className="space-y-4">
              <p><strong>Name:</strong> {selectedClient.name}</p>
              <p><strong>Contact:</strong> {selectedClient.contact}</p>
              <p><strong>Phone:</strong> {selectedClient.phone}</p>
              <p><strong>Branch ID:</strong> {selectedClient.branchId}</p>
              <p><strong>City:</strong> {selectedClient.city}</p>
              <p><strong>Address:</strong> {selectedClient.address}</p>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <ToastContainer position="top-right" autoClose={3000} />
    </ManagerLayout>
  );
};

export default ClientProfile;



