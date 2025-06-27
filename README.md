# 📞 Client Details App

## Description

The **Client Details App** is a web application built with **Flask** for the backend and **React** for the frontend. It allows Clients to manage their contacts by providing functionalities to create, read, update, and delete (CRUD) contact informations. ✨

## Features

- **View Contacts**: Retrieve and display a list of all contacts. 👀
- **Create Contact**: Add new contacts with first name, last name, and email. ➕
- **Edit Contact**: Update existing contact information. ✏️
- **Delete Contact**: Remove contacts from the list. ❌
- **Responsive Modal**: A modal interface for creating and editing contacts. 🆕

## Technologies Used

- **Frontend**: 
  - React ⚛️
  - CSS 🎨
- **Backend**:
  - Flask 🐍
  - SQLAlchemy (ORM) 📦
  - SQLite (Database) 🗄️
- **APIs**: RESTful API for contact management 🌐
- **CORS**: To enable cross-origin requests between the frontend and backend 🔗

## Installation

### Prerequisites

- Node.js and npm (for React frontend) 🌱
- Python and pip (for Flask backend) 🐍
- SQLite (comes pre-installed with Python) 📚

### Backend Setup

1. Clone the repository:
   ```bash
   
   cd Client-Details-Web-App
   ```

2. Install the required Python packages:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Create a `.env` file and set the database URI:
   ```plaintext
   SQLALCHEMY_DATABASE_URI = sqlite:///mydatabase.db
   ```

4. Run the Flask backend:
   ```bash
   python main.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the required npm packages:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory and set the backend URL:
   ```plaintext
   REACT_APP_BACKEND_URL= "http://127.0.0.1:5000"
   ```

4. Start the React app:
   ```bash
   npm start
   ```

## Application Structure (MVC Architecture)

```
backend/                    # 🔙 Backend folder containing Flask API & database logic
│
├── controllers/            # 🧠 Controller layer – handles API routing and business logic
│   └── main.py             #    Defines all Flask routes (API endpoints) and links Models with Views
│
├── models/                 # 🗃️ Model layer – defines database structure
│   └── models.py           #    SQLAlchemy models for Contact, Client, and the linking table
│
├── config.py               # ⚙️ App configuration – sets up Flask app, CORS, database, env variables
├── .env                    # 🔐 Stores environment variables like database URI
└── requirements.txt        # 📦 Python dependencies for backend (Flask, SQLAlchemy, dotenv, etc.)
frontend/src/               # 🖥️ Frontend source folder using React for UI
│
├── components/             # 💡 View layer – reusable React components for the UI
│   ├── ContactForm.js      #    Form for adding/editing a contact
│   ├── ContactList.js      #    Displays the contact table with edit/delete options
│   ├── ClientForm.js       #    Form for creating a new client (with auto-code generation)
│   ├── ClientList.js       #    Displays the list of clients and linked contacts count
│   └── Tabs.js             #    Tab navigation component (Contacts ↔ Clients)
│
├── App.js                  # 🧩 Main app component – controls tab switching, modal logic, and state
├── App.css                 # 🎨 Application-wide styling (buttons, tables, modals, etc.)
└── index.js                # 🚪 Entry point for React – renders <App /> into the DOM

## Acknowledgments

- [Flask](https://flask.palletsprojects.com/) for the backend framework 🐍
- [React](https://reactjs.org/) for the frontend library ⚛️
- [SQLAlchemy](https://www.sqlalchemy.org/) for ORM capabilities 📦
- [CORS](https://flask-cors.readthedocs.io/en/latest/) for handling cross-origin requests 🔗
