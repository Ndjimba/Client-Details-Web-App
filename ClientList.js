import React from "react";

const ClientList = ({ clients }) => {
  return (
    <div className="contact-list">
      <h2>Clients</h2>
      {clients.length === 0 ? (
        <p className="no-contacts">No client(s) found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th># of Linked Contacts</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.code}</td>
                <td style={{ textAlign: "center" }}>
                  {client.linkedContacts ? client.linkedContacts.length : 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientList;
