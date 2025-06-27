from flask import request, jsonify  # ✅ Include jsonify
from config import app, db           # ✅ Import app and db here
from models import Contact, Client, client_contacts  # ✅ Import all models
import os
import re

# Utility function to generate unique client code
def generate_client_code(name):
    prefix = ''.join([word[0].upper() for word in name.split()[:3]])
    if len(prefix) < 3:
        prefix = prefix.ljust(3, 'X')
    prefix = prefix[:3]

    index = 1
    while True:
        code = f"{prefix}{index:03}"
        if not Client.query.filter_by(code=code).first():
            return code
        index += 1

@app.route("/")
def home():
    return jsonify({"message": "Hello, World!"})

@app.route("/clients", methods=["GET"])
def get_clients():
    clients = Client.query.order_by(Client.name.asc()).all()
    if not clients:
        return jsonify({"message": "No client(s) found"}), 200
    return jsonify([c.to_json() for c in clients])

@app.route("/create_client", methods=["POST"])
def create_client():
    data = request.json
    name = data.get("name")
    if not name:
        return jsonify({"message": "Client name is required"}), 400

    code = generate_client_code(name)
    new_client = Client(name=name, code=code)

    db.session.add(new_client)
    db.session.commit()
    return jsonify({"message": "Client created", "client": new_client.to_json()}), 201

@app.route("/link_contact", methods=["POST"])
def link_contact():
    data = request.json
    contact_id = data.get("contactId")
    client_id = data.get("clientId")

    contact = Contact.query.get(contact_id)
    client = Client.query.get(client_id)

    if not contact or not client:
        return jsonify({"message": "Invalid contact or client ID"}), 400

    if contact not in client.contacts:
        client.contacts.append(contact)
        db.session.commit()

    return jsonify({"message": "Contact linked"}), 200

@app.route("/unlink_contact", methods=["POST"])
def unlink_contact():
    data = request.json
    contact_id = data.get("contactId")
    client_id = data.get("clientId")

    contact = Contact.query.get(contact_id)
    client = Client.query.get(client_id)

    if not contact or not client:
        return jsonify({"message": "Invalid contact or client ID"}), 400

    if contact in client.contacts:
        client.contacts.remove(contact)
        db.session.commit()

    return jsonify({"message": "Contact unlinked"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
