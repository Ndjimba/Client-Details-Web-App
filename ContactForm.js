import React, { useState, useEffect } from "react";

const ContactForm = ({ existingContact = {}, updateCallback }) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        setFirstName(existingContact.firstName || "");
        setLastName(existingContact.lastName || "");
        setEmail(existingContact.email || "");
    }, [existingContact]);

    const isUpdating = Object.keys(existingContact).length !== 0;

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = { firstName, lastName, email };
        const url = `${BACKEND_URL}/${isUpdating ? `update_contact/${existingContact.id}` : "create_contact"}`;
        const options = {
            method: isUpdating ? "PATCH" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            updateCallback();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert(error.message);
        }
    };

    return (
        <form onSubmit={onSubmit} className="contact-form">
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="submit-button">
                {isUpdating ? "Update" : "Create"} Contact
            </button>
        </form>
    );
};

export default ContactForm;