from config import db

# Association table (many-to-many relationship)
client_contacts = db.Table('client_contacts',
    db.Column('client_id', db.Integer, db.ForeignKey('client.id'), primary_key=True),
    db.Column('contact_id', db.Integer, db.ForeignKey('contact.id'), primary_key=True)
)

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    clients = db.relationship('Client', secondary=client_contacts, back_populates='contacts')

    def full_name(self):
        return f"{self.last_name} {self.first_name}"

    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            "linkedClients": [{"name": c.name, "code": c.code} for c in self.clients]
        }

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    code = db.Column(db.String(6), unique=True, nullable=False)
    contacts = db.relationship('Contact', secondary=client_contacts, back_populates='clients')

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "code": self.code,
            "linkedContacts": [{"fullName": c.full_name(), "email": c.email} for c in self.contacts]
        }
