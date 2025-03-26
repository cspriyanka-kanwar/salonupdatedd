import React, { useState } from "react";
import Tabs from "rc-tabs";

import "rc-tabs/assets/index.css";
import SAAdminLayout from "../../../layouts/Salonadmin";

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
      <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg bg-white">
        <h1 className="text-4xl font-extrabold text-center mb-6 
               text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600
               drop-shadow-lg shadow-green-500/50 transform transition duration-300 hover:scale-105">
          Employee Management
        </h1>
        <Tabs activeKey={activeTab} onChange={handleTabChange} items={tabItems} />
      </div>
    </SAAdminLayout>
  );
};

const InfoTab = () => {
  const [employeeCode, setEmployeeCode] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [isdCode, setIsdCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [softwareAccess, setSoftwareAccess] = useState("no");
  const [salary, setSalary] = useState("");

  return (
    <form className="space-y-2">
      <input type="text" placeholder="Employee Code" value={employeeCode} onChange={(e) => setEmployeeCode(e.target.value)} className="w-full p-2 border rounded" />
      <input type="date" placeholder="Date of Joining" value={dateOfJoining} onChange={(e) => setDateOfJoining(e.target.value)} className="w-full p-2 border rounded" />
      <input type="date" placeholder="Date of Birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="w-full p-2 border rounded" />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
      <input type="text" placeholder="ISD Code" value={isdCode} onChange={(e) => setIsdCode(e.target.value)} className="w-full p-2 border rounded" />
      <input type="text" placeholder="Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="w-full p-2 border rounded" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border rounded" />
      <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-2 border rounded bg-white">
        <option value="">Select Location</option>
        <option value="location1">Location 1</option>
        <option value="location2">Location 2</option>
      </select>
      <select value={jobRole} onChange={(e) => setJobRole(e.target.value)} className="w-full p-2 border rounded bg-white">
        <option value="">Select Job Role</option>
        <option value="hairStylist">Hair Stylist</option>
        <option value="spaTherapist">Spa Therapist</option>
      </select>
      <div className="flex gap-2">
        <label>Software Access:</label>
        <label><input type="radio" value="yes" checked={softwareAccess === "yes"} onChange={() => setSoftwareAccess("yes")} /> Yes</label>
        <label><input type="radio" value="no" checked={softwareAccess === "no"} onChange={() => setSoftwareAccess("no")} /> No</label>
      </div>
      <input type="text" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full p-2 border rounded" />
    </form>
  );
};

const AssignServicesTab = () => {
  const [assignServices, setAssignServices] = useState("no");

  return (
    <div>
      <label>Assign Services:</label>
      <label><input type="radio" value="yes" checked={assignServices === "yes"} onChange={() => setAssignServices("yes")} /> Yes</label>
      <label><input type="radio" value="no" checked={assignServices === "no"} onChange={() => setAssignServices("no")} /> No</label>
    </div>
  );
};

const WorkingShiftTab = () => {
  const [duties, setDuties] = useState([]);

  const handleDutyChange = (duty) => {
    setDuties((prev) =>
      prev.includes(duty) ? prev.filter((d) => d !== duty) : [...prev, duty]
    );
  };

  return (
    <div>
      <label>Duties:</label>
      <label><input type="checkbox" checked={duties.includes("hairSpa")} onChange={() => handleDutyChange("hairSpa")} /> Hair Spa</label>
      <label><input type="checkbox" checked={duties.includes("hairDresser")} onChange={() => handleDutyChange("hairDresser")} /> Hair Dresser</label>
    </div>
  );
};

const DaysOffTab = () => {
  const [daysOff, setDaysOff] = useState([]);

  const handleDayOffChange = (day) => {
    setDaysOff((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div>
      <label>Days Off:</label>
      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
        <label key={day}>
          <input type="checkbox" checked={daysOff.includes(day.toLowerCase())} onChange={() => handleDayOffChange(day.toLowerCase())} /> {day}
        </label>
      ))}
    </div>
  );
};

export default EmployeeTabs;
