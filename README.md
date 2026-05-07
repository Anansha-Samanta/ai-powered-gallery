# AI-Powered Photo Gallery

A full-stack photo gallery application where users can upload images, get AI-generated captions automatically, generate images from text prompts, organize photos into albums and collages, and edit photos — all in one place.

## Tech Stack

**Backend** -Node.js, Express 5, MongoDB, Mongoose, JWT, bcryptjs, Multer, Cloudinary, OpenAI (gpt-4.1-mini vision), Replicate (Stable Diffusion XL), dotenv, cors, axios

**Frontend** - React 19, Vite 7, React Router DOM 7


## Environment Variables

Create a file called `.env` inside the `backend/` folder and fill in the values below. This file is already in `.gitignore` so it will never be committed to Git.

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
OPENAI_API_KEY=sk-...
REPLICATE_API_TOKEN=r8_...

Get `MONGO_URI` from MongoDB Atlas → Connect → Drivers. Get Cloudinary credentials from the Cloudinary Console dashboard. Get `OPENAI_API_KEY` from platform.openai.com/api-keys. Get `REPLICATE_API_TOKEN` from replicate.com/account/api-tokens.

To generate a secure random `JWT_SECRET` run this once and paste the output:

node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

## Installation

Clone the repo and install dependencies for both backend and frontend separately.

git clone https://github.com/your-username/ai-powered-gallery.git
cd ai-powered-gallery

Install backend dependencies:

cd backend
npm install

Install frontend dependencies:

cd ../frontend
npm install

Create the `.env` file:

cd ../backend
touch .env

Then open `backend/.env` and fill in all the values from the Environment Variables section above.

## Running the Project

Start the backend server (runs on port 5000):

cd backend
node app.js

When it starts successfully you will see:

CLEAN BACKEND RUNNING
AI FILE LOADED (REPLICATE)
MongoDB connected
Server running on 5000

Start the frontend dev server in a separate terminal (runs on port 5173):

cd frontend
npm run dev

Open your browser at `http://localhost:5173`


## All Commands

### Backend


# Install all backend dependencies
cd backend && npm install

# Start the server
node app.js

# Install nodemon globally for auto-reload during development
npm install -g nodemon

# Start with auto-reload (restarts on file save)
nodemon app.js

# Generate a secure JWT secret key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Check Node version
node -v

# Check npm version
npm -v


### Frontend

# Install all frontend dependencies
cd frontend && npm install

# Start development server at http://localhost:5173
npm run dev

# Build for production (output goes to frontend/dist/)
npm run build

# Preview the production build locally
npm run preview

# Run ESLint to check for code issues
npm run lint

### Git


# Check which branch you are on
git branch

# Switch to the stable branch
git checkout my-stable-version

# Switch to main branch
git checkout main

# See all commits
git log --oneline

# Check what files have changed
git status


### MongoDB Shell (mongosh)

Connect to your database:

mongosh "your_MONGO_URI_here"


Once connected, run any of these:
// List all collections in the database
show collections

// See all users
db.users.find().pretty()

// Find a user by email
db.users.findOne({ email: "user@example.com" })

// Count total registered users
db.users.countDocuments()

// See all images newest first
db.images.find().sort({ createdAt: -1 }).pretty()

// See all images uploaded by a specific user
db.images.find({ userId: ObjectId("paste_user_id_here") })

// Count total images
db.images.countDocuments()

// See all albums
db.albums.find().pretty()

// See all AI generation logs
db.aigenerations.find().sort({ createdAt: -1 }).pretty()

// See all edit records
db.edits.find().pretty()

// Delete a specific image by id
db.images.deleteOne({ _id: ObjectId("paste_image_id_here") })

// Drop a collection entirely
db.images.drop()

// Check existing indexes on images collection
db.images.getIndexes()
## API Endpoints

The backend runs on `http://localhost:5000`. All API routes are prefixed with `/api`.

### POST /api/auth/register

Registers a new user. Send as JSON:

{
  "username": "yourname",
  "email": "you@example.com",
  "password": "yourpassword"
}

### POST /api/auth/login

Logs in an existing user. Send as JSON:

{
  "email": "you@example.com",
  "password": "yourpassword"
}

Returns:

{
  "token": "<JWT — valid for 7 days>",
  "user": {
    "_id": "...",
    "username": "...",
    "email": "...",
    "profilePic": "",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
### POST /api/images/upload

Uploads a photo to Cloudinary and auto-generates an AI caption. Send as `multipart/form-data` with fields `image` (the file), `userId`, and `title`.

### GET /api/images/:userId

Returns all images belonging to a user, sorted newest first.

### DELETE /api/images/:id

Deletes an image from both Cloudinary and MongoDB using the image `_id`.

### POST /api/ai/generate

Generates an image from a text prompt using Replicate. Send as JSON:

{
  "prompt": "a sunset over mountains in watercolor style"
}

Returns:
{
  "result": "https://replicate.delivery/..."
}

If Replicate fails, returns a fallback placeholder image URL so the UI never breaks.

### GET /test-direct

Returns the string `Direct route working`. Use to confirm the server is up.
## MongoDB Collections

The app uses five collections. Mongoose creates them automatically on first use — no manual setup needed.

### users

Stores registered accounts. The `email` field has a unique constraint. Passwords are stored as bcrypt hashes, never plain text.
{
  _id: ObjectId,
  username: String,       // required
  email: String,          // required, unique
  password: String,       // required, bcrypt hashed
  profilePic: String,     // default ""
  createdAt: Date,
  updatedAt: Date
}

### images

Stores every uploaded photo. The `publicId` field is the Cloudinary asset ID used for deletion. The `aiCaption` field is filled automatically by OpenAI after every upload. Two indexes are defined: one on `tags` for fast filtering, one on `createdAt` descending for sorted fetches.
{
  _id: ObjectId,
  userId: ObjectId,           // ref: User, required
  imageUrl: String,           // required — Cloudinary HTTPS URL
  publicId: String,           // required — Cloudinary public_id
  title: String,              // default ""
  description: String,        // default ""
  tags: [String],             // default []
  aiCaption: String,          // default "" — set by OpenAI vision
  isEdited: Boolean,          // default false
  originalImageId: ObjectId,  // ref: Image, default null
  createdAt: Date,
  updatedAt: Date
}

### albums

Groups of images created by the user. `imageIds` is an array of references to Image documents.
{
  _id: ObjectId,
  userId: ObjectId,       // ref: User
  name: String,           // required
  description: String,    // default ""
  imageIds: [ObjectId],   // refs to Image
  coverImage: String,     // default ""
  createdAt: Date,
  updatedAt: Date
}

### edits

Tracks edit history for photos. `editType` is an array of strings describing what edits were applied.
{
  _id: ObjectId,
  userId: ObjectId,          // ref: User
  originalImageId: ObjectId, // ref: Image
  editedImageUrl: String,
  editType: [String],
  createdAt: Date,
  updatedAt: Date
}

### aigenerations

Logs every AI image generation request with the prompt used and the resulting image URL.


{
  _id: ObjectId,
  userId: ObjectId,
  prompt: String,
  generatedImageUrl: String,
  createdAt: Date,
  updatedAt: Date
}

## Frontend Routes

/               Landing page
/register       Create a new account
/login          Log in
/home           Main gallery dashboard
/search         Search and browse photos
/create         Upload a new photo
/ai             Generate an image with a text prompt
/photo          Single photo detail view
/editphoto      Edit a photo
/album          Create an album
/viewalbum      View an existing album
/collage        Create a collage
/viewcollage    View an existing collage
/profile        User profile

## How AI Captioning Works

When a photo is uploaded, the backend converts the file buffer to a base64 data URI, uploads it to Cloudinary, then immediately sends the returned Cloudinary URL to OpenAI's `gpt-4.1-mini` model with the instruction "Describe this image in one short sentence." The caption comes back and is saved in the `aiCaption` field of the image document in MongoDB. If OpenAI fails for any reason, the upload still succeeds and `aiCaption` is set to `"No caption generated"`.

## How AI Image Generation Works

The `/ai` page sends a text prompt to `POST /api/ai/generate`. The backend calls Replicate's hosted `stability-ai/sdxl` model and waits for the output URL. That URL is returned to the frontend as `{ result: "https://..." }`. If Replicate throws an error, a deterministic placeholder from `picsum.photos` seeded with the prompt is returned instead so the UI never breaks.

## How Upload and Cloudinary Works

Multer is configured with `memoryStorage`, so uploaded files never touch the disk — they live in memory as a buffer. The buffer is converted to a base64 data URI and sent directly to Cloudinary's uploader into the `gallery-app` folder. Cloudinary returns a `secure_url` (the HTTPS CDN link used to display the image) and a `public_id` (the internal identifier used to delete the image later). Both are saved to MongoDB alongside the title and AI caption.

## Authentication

Registration hashes the password with bcryptjs at 10 salt rounds before saving to MongoDB. Login normalizes the email (trim + lowercase), compares the password against the hash, then signs a JWT with `JWT_SECRET` that expires in 7 days. The response includes the token and the full user object with the password field removed. For protected requests, the client sends the token in the `Authorization` header without a `Bearer` prefix. The `authMiddleware` verifies the token and attaches `req.user = { id }` before the request reaches the controller.

## Troubleshooting

**MongoDB never connects** — Check that `MONGO_URI` in `.env` is correct and that your IP address is whitelisted in MongoDB Atlas under Network Access.

**Upload fails** — Verify `CLOUD_NAME`, `CLOUD_API_KEY`, and `CLOUD_API_SECRET` match exactly what is shown on your Cloudinary dashboard.

**AI caption always says "No caption generated"** — Check that `OPENAI_API_KEY` is valid and your OpenAI account has available credits.

**Replicate always uses the picsum fallback** — Check that `REPLICATE_API_TOKEN` is set and your Replicate account has billing configured, as SDXL requires it.

**CORS errors in the browser** — Make sure the backend is running on port 5000 and the frontend is calling `http://localhost:5000/api/...`.

**401 Unauthorized errors** — The `authMiddleware` expects the token sent as `Authorization: <token>` without a `Bearer` prefix. Make sure the frontend sends it exactly that way.

**Cannot find module errors** — Run `npm install` inside both the `backend/` and `frontend/` folders separately.
