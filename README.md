# 🧠 Self-Improvement App

A full-stack application to help users improve their lives by tracking personalized behaviors and to-do items for each. Built with **ReactJS**, **NodeJS**, **Express**, and **MongoDB**.

---

## 🚀 Features

### 🔐 User Management
- Register and login using email and password
- JWT-based authentication
- Users only see and manage their own data

### 🧭 Behavior Tracking
- Create, view, and delete custom behaviors
- Behaviors are dynamic and user-specific

### ✅ Improvement Items (To-Dos)
- Add/edit/delete improvement items under each behavior
- Each behavior has its own to-do list

### 🏆 Top Behaviors
- Homepage displays **top 5 behaviors** with the most improvement items

### 🔍 Behavior Search
- Search behaviors by title (case-insensitive)

---

## 📁 Project Structure

root/
├── server/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
└── client/
├── components/
├── pages/
├── App.js
├── api.js
└── index.js


---

## ⚙️ Installation

### 1. Clone the Repository
```bash
    git clone https://github.com/sarthak03dot/Self-improvement-Eubrics.git
    cd Self-improvement-Eubrics
```

### 2. Setup Backend
```bash
    cd backend
    npm install
```

####  Create .env in backend/
```bash
    MONGODB_URI=your_mongo_connection_string
    JWT_SECRET=your_secret_key
```

#### node server.js
# Server runs on http://localhost:5000

### 3. Setup Frontend
```bash
    cd ../frontend
    npm install
    npm start
```

# Runs on http://localhost:3000

 ### 🔐 API Endpoints
#### Auth
```bash
    POST /api/auth/register

    POST /api/auth/login
```
### Behaviors

    GET /api/behaviors/top5

    POST /api/behaviors/

    GET /api/behaviors/:id

    DELETE /api/behaviors/:id

    GET /api/behaviors/search?title=...

### Items

    POST /api/items/

    PUT /api/items/:id

    DELETE /api/items/:id

## 🛠️ Tech Stack

    Frontend: ReactJS, React Router, Axios

    Backend: Node.js, Express.js

    Database: MongoDB, Mongoose

    Auth: JSON Web Tokens (JWT)

    Styling: Add your own or use Bootstrap/Material UI

## 📄 License

This project is licensed for educational/demo use. Customize it further as per your needs.
#### 💡 Author

######  Sarthak Singh
###### Email: [sarthak03december@gmail.com]
###### GitHub: @sarthak03dot


---

