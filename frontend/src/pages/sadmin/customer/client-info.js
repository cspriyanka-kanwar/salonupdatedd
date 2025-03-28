import { useLocation, useNavigate } from "react-router-dom";
import SAAdminLayout from "../../../layouts/Salonadmin";
import Tabs from "rc-tabs";
import "rc-tabs/assets/index.css";
import { FaUser, FaPhone, FaEnvelope, FaCalendar, FaLock, FaGlobe, FaMoneyBillWave, FaCreditCard, FaWallet } from "react-icons/fa";
import { useState } from "react";

function ClientDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const client = location.state?.client;

  if (!client) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <p className="text-center text-red-500">No Client Data Found!</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  const tabItems = [
    { key: "info", label: "Info", content: <ClientInfo client={client} /> },
    { key: "client", label: "Client", content: <p>Client-specific details here.</p> },
    { key: "merge_client", label: "Merge Client", content: <p>Merge client section.</p> },
    { key: "appointments", label: "All Appointments", content: <p>Client appointments list.</p> },
    { key: "products", label: "Products", content: <p>Purchased products will be shown here.</p> },
    { key: "membership", label: "Membership", content: <p>Membership details.</p> },
    { key: "advance_amount", label: "Advance Amount", content: <AdvancePayment client={client} /> },
  ];

  return (
    <SAAdminLayout>
      <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Client Details</h1>

          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <Tabs
                defaultActiveKey="info"
                tabPosition="top"
                className="flex justify-center gap-8"
                items={tabItems.map(({ key, label, content }) => ({
                  key,
                  label,
                  children: content,
                }))}
              />
            </div>
          </div>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-blue-500 text-white ml-4 px-4 py-2 rounded-md"
          >
            Back
          </button>
        </div>
      </div>
    </SAAdminLayout>
  );
}

function AdvancePayment({ client }) {
  const [activeTab, setActiveTab] = useState('take');
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('cash');
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('visa');
  const [walletBalance, setWalletBalance] = useState('0');
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toLocaleDateString(),
      type: activeTab === 'take' ? 'Take Advance' : 'Return Advance',
      amount,
      paymentMode,
      cardNumber: paymentMode === 'card' ? cardNumber : '',
      cardType: paymentMode === 'card' ? cardType : '',
      walletBalance
    };
    setTransactions([...transactions, newTransaction]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    // Reset form
    setAmount('');
    setCardNumber('');
  };

  return (
    <div className="space-y-6">
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'take' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('take')}
        >
          Take Advance
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'return' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('return')}
        >
          Return Advance
        </button>
      </div>

      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success! </strong>
          <span className="block sm:inline">Transaction completed successfully.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2">Amount</label>
            <div className="flex items-center border p-2 rounded-md">
              <FaMoneyBillWave className="text-gray-500 mr-2" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border-none outline-none"
                placeholder="Enter amount"
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-2">Payment Mode</label>
            <div className="flex items-center border p-2 rounded-md">
              <FaCreditCard className="text-gray-500 mr-2" />
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full border-none outline-none"
                required
              >
                <option value="cash">Cash</option>
                <option value="paytm">Paytm</option>
                <option value="rtgs">RTGS</option>
                <option value="card">Credit/Debit Card</option>
              </select>
            </div>
          </div>
        </div>

        {paymentMode === 'card' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2">Card Number (last 4 digits)</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => {
                    if (e.target.value.length <= 4 && /^\d*$/.test(e.target.value)) {
                      setCardNumber(e.target.value);
                    }
                  }}
                  className="w-full border p-2 rounded-md"
                  placeholder="Last 4 digits"
                  maxLength={4}
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Card Type</label>
                <select
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
                  className="w-full border p-2 rounded-md"
                >
                  <option value="visa">Visa</option>
                  <option value="mastercard">Master Card</option>
                  <option value="amex">Amex</option>
                  <option value="discover">Discover Card</option>
                  <option value="dinner">Dinner Card</option>
                </select>
              </div>
            </div>
          </>
        )}

        <div>
          <label className="block font-semibold mb-2">Wallet Balance</label>
          <div className="flex items-center border p-2 rounded-md">
            <FaWallet className="text-gray-500 mr-2" />
            <input
              type="text"
              value={walletBalance}
              readOnly
              className="w-full border-none bg-gray-100"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={() => {
              setAmount('');
              setCardNumber('');
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </form>

      {transactions.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Type</th>
                  <th className="py-2 px-4 border">Amount</th>
                  <th className="py-2 px-4 border">Payment Mode</th>
                  <th className="py-2 px-4 border">Card Details</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border text-center">{txn.date}</td>
                    <td className="py-2 px-4 border text-center">{txn.type}</td>
                    <td className="py-2 px-4 border text-center">₹{txn.amount}</td>
                    <td className="py-2 px-4 border text-center">{txn.paymentMode}</td>
                    <td className="py-2 px-4 border text-center">
                      {txn.paymentMode === 'card' ? `${txn.cardType} ****${txn.cardNumber}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function ClientInfo({ client }) {
  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Customer ID</label>
          <div className="flex items-center border p-2 rounded-md">
            <FaUser className="text-gray-500 mr-2" />
            <input type="text" value={client.id} readOnly className="w-full bg-gray-100 border-none" />
          </div>
        </div>
        <div>
          <label className="block font-semibold">App User</label>
          <select className="w-full border p-2 rounded-md">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">First Name</label>
          <input type="text" value={client.name.split(' ')[0]} className="w-full border p-2 rounded-md" />
        </div>
        <div>
          <label className="block font-semibold">Last Name</label>
          <input type="text" value={client.name.split(' ')[1] || ''} className="w-full border p-2 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Gender</label>
          <div className="flex items-center gap-4">
            <label><input type="radio" name="gender" value="Male" checked={client.gender === 'Male'} /> Male</label>
            <label><input type="radio" name="gender" value="Female" checked={client.gender === 'Female'} /> Female</label>
          </div>
        </div>
        <div>
          <label className="block font-semibold">Client Status</label>
          <select className="w-full border p-2 rounded-md">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">ISD Code & Mobile</label>
          <div className="flex items-center border p-2 rounded-md">
            <FaPhone className="text-gray-500 mr-2" />
            <input type="text" value={client.number} className="w-full border-none" />
          </div>
        </div>
        <div>
          <label className="block font-semibold">Email</label>
          <div className="flex items-center border p-2 rounded-md">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input type="text" value={client.email} className="w-full border-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Birthday</label>
          <input type="date" className="w-full border p-2 rounded-md" />
        </div>
        <div>
          <label className="block font-semibold">Anniversary</label>
          <input type="date" className="w-full border p-2 rounded-md" />
        </div>
      </div>

      <div>
        <label className="block font-semibold">Password</label>
        <div className="flex items-center border p-2 rounded-md">
          <FaLock className="text-gray-500 mr-2" />
          <input type="password" className="w-full border-none" />
        </div>
      </div>
    </div>
  );
}

export default ClientDetails;