AI-Powered Gallery Web Application
Overview:
This project is a full-stack web application that allows users to upload, view, and manage images through an interactive gallery interface. It combines a React-based frontend with a Node.js and Express backend, along with MongoDB for data storage. The system is designed to provide a smooth user experience while handling image data efficiently and supporting intelligent features for better image exploration.

Features:
The application includes a user authentication system that enables secure registration and login. Users can upload images, which are processed on the backend and stored efficiently, while their metadata is maintained in the database. The gallery interface dynamically displays images, allowing users to browse and manage their content easily. The project also includes support for AI-related enhancements such as image generation or tracking, making it more advanced than a basic gallery application.

Working:
The application works by allowing users to authenticate and interact with the system through the frontend. When an image is uploaded, it is sent to the backend, processed, and stored, while relevant details are saved in the database. The frontend fetches this data through API calls and renders it in a user-friendly gallery format. Any additional AI-based features enhance how images are generated or managed within the system.

🔌 API Endpoints
Auth Routes
POST /api/auth/register → Register user
POST /api/auth/login → Login user
Image Routes
POST /api/images/upload → Upload image
GET /api/images → Get all images
DELETE /api/images/:id → Delete image

Setup and Installation
1. Backend Setup
Navigate to the backend folder using cd backend.
Install all dependencies using npm install.
Create a .env file and add required variables such as MongoDB URI, port number, and Cloudinary credentials.
Ensure MongoDB is running or your cloud database is accessible.
Start the backend server using node app.js.
Verify that the server runs successfully on http://localhost:5000.
2. Frontend Setup
Navigate to the frontend folder using cd frontend.
Install dependencies using npm install.
Start the development server using npm run dev.
Open the provided local URL (usually http://localhost:5173) in your browser.
Ensure the frontend is properly connected to the backend API for full functionality.
