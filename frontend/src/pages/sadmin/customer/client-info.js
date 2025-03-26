import { useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import Tabs from "rc-tabs";
import "rc-tabs/assets/index.css";

function ClientInfo() {
  const [activeKey, setActiveKey] = useState("info");

  return (
    <SAAdminLayout>
      <div className="p-4 bg-white shadow rounded-lg">
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          animated={{ inkBar: true }}
        >
          <Tabs.TabPane tab="Info" key="info">
            <div>Client information content goes here.</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="All Appointments" key="appointments">
            <div>All appointments content goes here.</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Advance" key="advance">
            <div>Advance payment details go here.</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Outstanding" key="outstanding">
            <div>Outstanding balance details go here.</div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </SAAdminLayout>
  );
}

export default ClientInfo;
