# 🫀 Organ Donation Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to simplify and streamline the organ donation process by connecting donors, recipients, hospitals, and administrators on a single platform.

This project enables donors to register organ donations, recipients to request organs, hospitals to manage medical records, and administrators to oversee the entire donation workflow efficiently.

---

## 📌 Project Overview

The Organ Donation Management System aims to digitize the traditional organ donation process by providing a centralized platform for managing donor registrations, recipient requests, hospital information, and administrative operations.

The application improves transparency, reduces manual work, and helps organize organ donation records in an efficient and secure manner.

---

## ✨ Features

### 👨‍⚕️ Admin

- Secure Admin Login
- View all registered donors
- View recipient requests
- Manage hospital records
- Monitor organ donation data
- Centralized dashboard for administration

### ❤️ Donor Module

- Register as an organ donor
- Submit donor details
- Store donor information securely
- View donor information

### 🏥 Hospital Module

- Register hospitals
- Manage hospital details
- Access donor and recipient information

### 🩺 Recipient Module

- Submit organ request
- Store recipient information
- Manage organ requirements

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router DOM
- Axios
- CSS

### Backend

- Node.js
- Express.js
- JWT Authentication
- REST API

### Database

- MongoDB
- Mongoose

### Development Tools

- Git
- GitHub
- Nodemon
- VS Code

---

## 📂 Project Structure

```
Organ_Donation_System/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation Guide

### Clone Repository

```bash
git clone https://github.com/divyaingle17/Organ_Donation_System.git
```

### Navigate into the project

```bash
cd Organ_Donation_System
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## ▶️ Running the Project

### Start MongoDB

```bash
mongod
```

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

Backend will run at:

```
http://localhost:3000
```

---

## 🗄️ Database

This project uses **MongoDB** with **Mongoose**.

Collections include:

- Users
- Donors
- Recipients
- Hospitals

---

## 🔐 Authentication

- JWT Authentication
- Protected Routes
- Admin Login

---

## 📸 Screenshots

> Add screenshots of your application here.

Example:

- Home Page
- Admin Login
- Admin Dashboard
- Donor Registration
- Recipient Form
- Hospital Page

---

## 🚀 Future Enhancements

- Email Notifications
- Organ Matching Algorithm
- Blood Group Compatibility Check
- Search & Filter
- Dashboard Analytics
- Appointment Scheduling
- PDF Report Generation
- Role-Based Access Control
- Responsive Mobile Design
- Cloud Deployment

---

## 👩‍💻 Developed By

**Divya Ingle**

BBA (Computer Applications)

Aspiring Full Stack MERN Developer

GitHub:
https://github.com/divyaingle17

---

## 📄 License

This project is developed for educational and learning purposes.
