import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/manager/dashboard";
import CreateBooking from "../pages/manager/booking/createbooking";
import ViewBooking from "../pages/manager/booking/viewbooking";
import Allclient   from "../pages/manager/client/allclient";
import Singleclient  from "../pages/manager/client/singleclient";
import ClientProfile from "../pages/manager/client/client-profile";
import ServiceHistroy from "../pages/manager/service/service";
import PaymentHistroy from  "../pages/manager/payment/payment" ;
import WalletBalance from "../pages/manager/wallet/wallet";
import AdancePayment from  "../pages/manager/advance-payment/advance-payment";

const managerPageRoutes = () => {
  return (
    <Routes>
      <Route path="/manager/dashboard" element={<Dashboard />} />
      <Route path="/manager/create-booking" element={<CreateBooking />} />
      <Route path="/manager/view-booking" element={<ViewBooking />} />
      <Route path="/manager/all-client" element={<Allclient />} />
      <Route path="/manager/single-client" element={<Singleclient />} />
      <Route path="/manager/client-profile" element={<ClientProfile/>} />
      <Route path="/manager/service-histroy" element={<ServiceHistroy/>} />
      <Route path="/manager/payment-histroy" element={<PaymentHistroy/>} />
      <Route path="/manager/wallet-balance" element={< WalletBalance/>} />
      <Route path="/manager/advance-payment" element={<AdancePayment/>} />

    </Routes>
  );
};

export default managerPageRoutes;

