#  SigmaGPT - AI SaaS Chat Application 
![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-success)
![Google OAuth](https://img.shields.io/badge/Auth-Google_OAuth-red)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Gemini AI](https://img.shields.io/badge/AI-Gemini-blueviolet)

SigmaGPT is a production-ready full-stack AI SaaS chatbot built with the MERN Stack. It enables users to chat with AI, analyze uploaded images using AI Vision, and securely manage conversations with JWT Authentication and Google OAuth.

##  Features

*  JWT Authentication
*  Google OAuth Login
*  AI Chat Assistant
*  AI Vision (Image Upload & Analysis)
*  Thread-Based Chat History
*  Pin & Unpin Chats
*  Edit Messages
*  Delete Messages
*  Responsive Design
*  ImageKit Image Upload
*   Secure Logout


## 🛠 Tech Stack

### Frontend

* React.js
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Passport.js
* Google OAuth 2.0

### AI & Cloud

* Google Gemini API
* ImageKit

##  Installation

### Clone the repository

```bash
git clone https://github.com/76210/SigmaGPT-AI-SaaS.git
```

### Backend

```bash
cd Backend
npm install
npm start
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

##  Environment Variables

Create a `.env` file inside the Backend folder.


```env
# Server
PORT=8080

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# OpenRouter
OPENROUTER_API_KEY=your_openrouter_api_key

# JWT
JWT_SECRET=your_jwt_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

##  Future Improvements

* Streaming AI Responses
* Dark Mode
* Chat Search
* Voice Input

##  Author
**Khushboo Verma**
GitHub: https://github.com/76210 
