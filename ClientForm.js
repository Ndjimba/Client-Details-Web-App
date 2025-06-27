import React, { useState } from "react";

const ClientForm = ({ updateCallback }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Client name is required");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/create_client`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create client");
      }

      setName("");
      setError("");
      setSuccess("Client created successfully");
      updateCallback(); // Refresh the client list
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };

  return (
    <form onSubmit={onSubmit} className="contact-form">
      <h2>Create New Client</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <div className="form-group">
        <label htmlFor="clientName">Client Name</label>
        <input
          type="text"
          id="clientName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Create Client
      </button>
    </form>
  );
};

export default ClientForm;
