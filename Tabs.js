import React from "react";

const Tabs = ({ activeTab, onChangeTab }) => {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <button onClick={() => onChangeTab("contacts")} className="create-button">
        Contacts
      </button>
      <button onClick={() => onChangeTab("clients")} className="create-button">
        Clients
      </button>
    </div>
  );
};

export default Tabs;