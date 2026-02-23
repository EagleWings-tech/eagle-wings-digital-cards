# Eagle Wings Digital Cards – Backend

Node.js + Express + MongoDB backend. Stores identity data and uploaded images; serves the API and the static frontend.

## Setup

1. **Copy env file and add your MongoDB connection string**

   ```bash
   cd server
   cp .env.example .env
   ```

   Edit `.env` and set `MONGO_URI` to your MongoDB Atlas connection string (e.g. `mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority`).

2. **Install dependencies and start**

   ```bash
   npm install
   npm start
   ```

   Server runs at **http://localhost:3000** (or the `PORT` in `.env`).

## Routes

- **POST /api/identity**  
  Multipart form data: all form fields + `profilePhoto` (required), optional `brandLogo`.  
  Creates an identity in MongoDB, saves images under `server/uploads/`, returns `{ id, cardUrl }`.

- **GET /api/identity/:id**  
  Returns the identity as JSON for the card view. 404 if not found.

## Static

- Frontend is served from the project root: `http://localhost:3000/form.html`, `http://localhost:3000/card/?id=xxx`.
- Uploaded images are served at `/uploads/<filename>`.
