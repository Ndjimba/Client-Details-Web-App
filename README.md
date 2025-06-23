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

## Application Structure

```
.
├── backend
│   ├── app.py                 # Main Flask application
│   ├── config.py              # Configuration settings for Flask and SQLAlchemy
│   └── models.py              # Database models (Contact)
└── frontend
    ├── src
    │   ├── App.js             # Main React component
    │   ├── ContactList.js      # Component to display the list of contacts
    │   └── ContactForm.js      # Component for adding/editing contacts
    └── package.json            # npm package configuration
```

## Usage

1. **Creating a Contact**: Click on "Add New Contact" to open the modal, fill in the details, and submit the form. 📝
2. **Editing a Contact**: Click "Edit" next to the desired contact to populate the form with existing data, make changes, and submit. ✨
3. **Deleting a Contact**: Click "Delete" next to a contact to remove it from the list after confirming the action. ⚠️

## License

## Acknowledgments

- [Flask](https://flask.palletsprojects.com/) for the backend framework 🐍
- [React](https://reactjs.org/) for the frontend library ⚛️
- [SQLAlchemy](https://www.sqlalchemy.org/) for ORM capabilities 📦
- [CORS](https://flask-cors.readthedocs.io/en/latest/) for handling cross-origin requests 🔗
