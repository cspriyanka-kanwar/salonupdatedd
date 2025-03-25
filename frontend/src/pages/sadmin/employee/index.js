import React, { useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
const AssignServicesTab = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [employeeName, setEmployeeName] = useState("Cherly");
  const [selectedServices, setSelectedServices] = useState([]);
  const [genderFilter, setGenderFilter] = useState("all");

  // Sample services data
  const servicesData = [
    {
      category: "Cherly's Bleach",
      services: [
        { name: "Cherly Face Bleach", gender: "female" },
        { name: "Keratin", gender: "both" },
        { name: "Keratin Hair Treatment", gender: "both" }
      ]
    },
    {
      category: "De Tan",
      services: [
        { name: "Face", gender: "both" },
        { name: "Feet", gender: "both" },
        { name: "Arms", gender: "both" },
        { name: "De Tan Full Back", gender: "both" },
        { name: "Full Legs", gender: "both" },
        { name: "Half Arms", gender: "both" },
        { name: "Half Back", gender: "both" },
        { name: "Half Legs", gender: "both" },
        { name: "Wrist Half", gender: "both" }
      ]
    }
  ];

  const handleServiceToggle = (serviceName) => {
    if (selectedServices.includes(serviceName)) {
      setSelectedServices(selectedServices.filter(name => name !== serviceName));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  const handleSelectAll = () => {
    const allServices = servicesData.flatMap(category => 
      category.services.map(service => service.name)
    );
    setSelectedServices(allServices);
  };

  const handleUnselectAll = () => {
    setSelectedServices([]);
  };

  const handleAssignByGender = (gender) => {
    const genderServices = servicesData.flatMap(category => 
      category.services
        .filter(service => service.gender === gender || service.gender === "both")
        .map(service => service.name)
    );
    setSelectedServices(genderServices);
  };

  const filteredServices = servicesData.map(category => ({
    ...category,
    services: category.services.filter(service => {
      if (genderFilter === "all") return true;
      return service.gender === genderFilter || service.gender === "both";
    })
  }));

  return (
    <div className="p-6">
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h3 className="text-2xl font-bold mb-4">Success!</h3>
            <p>New staff member is successfully created</p>
            <p className="font-semibold mt-2">{employeeName}</p>
            <button 
              onClick={() => setShowSuccessPopup(false)}
              className="mt-6 px-6 py-2 bg-white text-green-600 rounded-lg font-medium"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Assign Services to {employeeName}</h2>
        <div className="flex space-x-4 mb-6">
          <button 
            onClick={handleSelectAll}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Assign All
          </button>
          <button 
            onClick={handleUnselectAll}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Unassign All
          </button>
          <button 
            onClick={() => handleAssignByGender("male")}
            className="px-4 py-2 bg-purple-500 text-white rounded"
          >
            Assign Male
          </button>
          <button 
            onClick={() => handleAssignByGender("female")}
            className="px-4 py-2 bg-pink-500 text-white rounded"
          >
            Assign Female
          </button>
        </div>

        <div className="mb-4">
          <label className="mr-4">Filter by Gender:</label>
          <select 
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="space-y-8">
        {filteredServices.map((category, catIndex) => (
          <div key={catIndex} className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.services.map((service, serviceIndex) => (
                <div key={serviceIndex} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`service-${catIndex}-${serviceIndex}`}
                    checked={selectedServices.includes(service.name)}
                    onChange={() => handleServiceToggle(service.name)}
                    className="mr-2 h-5 w-5"
                  />
                  <label htmlFor={`service-${catIndex}-${serviceIndex}`}>
                    {service.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <button 
          type="button" 
          className="px-6 py-2 bg-gray-300 rounded-lg"
        >
          Back
        </button>
        <button 
          type="button" 
          onClick={() => setShowSuccessPopup(true)}
          className="px-6 py-2 bg-green-500 text-white rounded-lg"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
};
const WorkingShiftTab = () => <div>Working Shift Content</div>;
const DaysOffTab = () => <div>Days Off Content</div>;

const EmployeeTabs = () => {
  const [activeTab, setActiveTab] = useState("info");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const tabItems = [
    { key: "info", label: "Info", children: <InfoTab /> },
    { key: "assignServices", label: "Assign Services", children: <AssignServicesTab /> },
    { key: "workingShift", label: "Working Shift", children: <WorkingShiftTab /> },
    { key: "daysOff", label: "Days Off", children: <DaysOffTab /> },
  ];

  return (
    <SAAdminLayout>
      <div className="max-w-4xl mx-auto p-8 shadow-lg rounded-xl bg-white mt-10 space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600 drop-shadow-lg">
          Employee Management
        </h1>
        <div className="flex justify-center space-x-12 border-b pb-4">
          {tabItems.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`px-6 py-3 font-medium transition duration-300 ${activeTab === tab.key ? "border-b-4 border-blue-500 text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-6">{tabItems.find((tab) => tab.key === activeTab)?.children}</div>
      </div>
    </SAAdminLayout>
  );
};

const InfoTab = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [tableData, setTableData] = useState([]);
  const [assignService, setAssignService] = useState(false);
  const [softwareAccess, setSoftwareAccess] = useState(false);

  const jobRoles = [
    "Hair Stylist", "Spa Therapist", "Adult Manager", "Beautician", "Branch Manager", "Edit Service",
    "Franchise Owner", "Hair Dresser", "House Keeping"
  ];

  const handleAddRole = () => {
    if (selectedRole && selectedLocation) {
      setTableData([...tableData, { location: selectedLocation, role: selectedRole, assignService, softwareAccess }]);
      setSelectedRole("");
    }
  };

  const handleRemoveRole = (index) => {
    setTableData(tableData.filter((_, i) => i !== index));
  };

  return (
    <form className="space-y-6 p-6">
      <div className="grid grid-cols-2 gap-6">
        <input type="text" placeholder="Employee Name" className="w-full p-4 border rounded-lg" />
        <input type="text" placeholder="Employee Code" className="w-full p-4 border rounded-lg" />
        <input type="date" placeholder="Date of Joining" className="w-full p-4 border rounded-lg" />
        <input type="email" placeholder="Email" className="w-full p-4 border rounded-lg" />
        <input type="text" placeholder="ISD Code" className="w-full p-4 border rounded-lg" />
        <input type="text" placeholder="Mobile Number" className="w-full p-4 border rounded-lg" />
      </div>
      <div className="grid grid-cols-2 gap-6 items-center">
        <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="w-full p-4 border rounded-lg bg-white">
          <option value="">Select Location</option>
          <option value="All India">All India</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Delhi">Delhi</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
        </select>
        <div className="flex items-center space-x-3">
          <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="p-2 border rounded-lg bg-white">
            <option value="">Select a Role</option>
            {jobRoles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <button type="button" onClick={handleAddRole} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Add More</button>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold">About Employee</h2>
        <textarea placeholder="Enter details about the employee" className="w-full p-4 border rounded-lg"></textarea>
      </div>
      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Job Role</th>
            <th className="p-2 border">Assign Service</th>
            <th className="p-2 border">Software Access</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td className="p-2 border">{data.location}</td>
              <td className="p-2 border">{data.role}</td>
              <td className="p-2 border">
                <input type="checkbox" checked={data.assignService} onChange={() => {}} disabled />
              </td>
              <td className="p-2 border">
                <input type="checkbox" checked={data.softwareAccess} onChange={() => {}} disabled />
              </td>
              <td className="p-2 border">
                <button onClick={() => handleRemoveRole(index)} className="px-2 py-1 bg-red-500 text-white rounded">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end space-x-4 mt-6">
        <button type="button" className="px-6 py-3 bg-red-500 text-white rounded-lg">Cancel</button>
        <button type="submit" className="px-6 py-3 bg-green-500 text-white rounded-lg">Save</button>
      </div>
    </form>
  );
};

export default EmployeeTabs;