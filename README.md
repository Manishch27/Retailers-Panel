# Retailer-Admin Management Application (CSC Details Update)

## Table of Contents
- [Demo Screenshots](#demo-screenshots)
- [Project Overview](#project-overview)
- [Features](#features)
  - [Admin Role](#admin-role)
  - [Retailer Role](#retailer-role)
- [Technologies Used](#technologies-used)
- [System Architecture](#system-architecture)
- [Installation Guide](#installation-guide)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [License](#license)

## Demo Screenshots
<div style="display: flex; gap: 10px; flex-wrap: wrap;"> 
 <img src="https://i.ibb.co/Js8MdFJ/Screenshot-244.png" alt="Login Page" width="300"> 
 <img src="https://i.ibb.co/T4yfj7V/Screenshot-245.png" alt="Admin Dashboard" width="300">
 <img src="https://i.ibb.co/6vyKvSc/Screenshot-248.png" alt="Retailer Dashboard" width="300">
 <img src="https://i.ibb.co/nQVBjJp/Screenshot-250.png" alt="Application Form" width="300">
 <img src="https://i.ibb.co/k22fFy8/Screenshot-247.png" alt="Token Management" width="300"> 
 <img src="https://i.ibb.co/SJVwM3v/Screenshot-246.png" alt="Create a retailer" width="300"> 
</div>

## Project Overview
The **Retailer-Admin Management Application** is a MERN (MongoDB, Express, React, Node.js) stack project designed to manage and streamline interactions between admins and retailers. Admins can create and manage retailers, monitor applications, and update their statuses, while retailers can submit applications and view their statuses and token balances. The system also integrates the Mantra MFS100 fingerprint scanner to capture customer fingerprints and stores them securely in Cloudinary.

## Features

### Admin Role
- Manage retailers (add, update, delete, and view details).
- View total number of retailers and submitted applications.
- Update the status of applications (Pending, Rejected, Success).
- Add tokens to retailer accounts.
- Download uploaded fingerprint images.

### Retailer Role
- View total number of applications submitted.
- Submit applications with details including:
  - Full Name
  - Father's Name
  - Date of Birth
  - Gender
  - Aadhaar Number
  - Mobile Number
  - Email ID (Optional)
  - Address
  - Post Office
  - District
  - State
  - Purpose
  - Five fingerprint images captured using the Mantra MFS100.
- Track application statuses (Pending, Rejected, Success).
- Monitor token balance in the dashboard.

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Multer (for file uploads)
- Cloudinary (for storing fingerprint images)
- JWT (for authentication)

### Frontend
- React.js
- Redux Toolkit
- ShadCN/UI Components
- Tailwind CSS

### Fingerprint Scanner
- Mantra MFS100 SDK (for fingerprint capture and processing)

## System Architecture
```
Frontend (React) <--> Backend (Express) <--> Database (MongoDB)
          |                               
          +--> Cloudinary (for fingerprint images)
```

## Installation Guide

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/retailer-admin-management.git
   cd retailer-admin-management/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables by creating a `.env` file:
   ```env
   PORT=8001
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   CLOUDINARY_NAME=<your_cloudinary_name>
   CLOUDINARY_API_KEY=<your_cloudinary_api_key>
   CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:8001/api/v1
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## License
This project is licensed under the MIT License.
