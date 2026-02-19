# Getting Started - Local Setup & Deployment to Render

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- A free MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)
- A GitHub account (for pushing code)
- A Render account (https://render.com - free tier available)

## 🚀 Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create `.env` File

Copy the example file and add your configuration:

```bash
cp .env.example .env
```

Edit `.env` with your values:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/book-selling?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-change-in-production
NODE_ENV=development
```

### 3. Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Create a database user with username and password
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/...`
6. Replace `username` and `password` in your `.env` file

### 4. Start Development Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

## 📦 Project Structure

```
book-selling-platform/
├── server/
│   ├── models/              # MongoDB schemas (Book, User, Order)
│   ├── routes/              # API endpoints (auth, books, users)
│   ├── middleware/          # Authentication middleware
│   └── index.js             # Main server file
├── public/                  # Frontend files (HTML, CSS, JS)
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── categories.html
│   ├── profile.html
│   ├── style.css
│   └── api.js               # API client library
├── .env.example             # Environment template
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies
├── render.yaml              # Render deployment config
└── README.md                # Documentation
```

## 🚀 Deploy to Render

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - book selling platform"
git remote add origin https://github.com/yourusername/book-selling-platform.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to MongoDB Atlas (Important!)

1. Log in to MongoDB Atlas
2. Go to Clusters → Connect → Choose "Drivers"
3. Keep your connection string safe - you'll need it for Render

### Step 3: Create Render Service

1. Go to https://render.com and sign up/log in
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure environment:
   - **Name**: book-selling-platform
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or Starter)

### Step 4: Add Environment Variables

In Render dashboard, go to **Environment** and add:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/book-selling?retryWrites=true&w=majority
JWT_SECRET = your-unique-secret-key-here-use-something-strong
NODE_ENV = production
```

**⚠️ IMPORTANT**: Use strong values for JWT_SECRET in production!

### Step 5: Deploy

Click the **Deploy** button. View logs to verify deployment is successful.

Once deployed, your app will be available at: `https://your-app-name.onrender.com`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Books
- `GET /api/books` - Get all books (paginated)
- `GET /api/books?category=Fiction` - Filter by category
- `GET /api/books?search=query` - Search books
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create book (requires auth)
- `PUT /api/books/:id` - Update book (requires auth)
- `DELETE /api/books/:id` - Delete book (requires auth)

### Users
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/profile` - Update profile (requires auth)

## 🛠️ Development

### Run in Development Mode (with auto-reload)
```bash
npm run dev
```

### Code Structure

**Backend** (`server/` folder):
- Mongoose models for data schemas
- Express routes for API endpoints
- JWT authentication middleware
- CORS enabled for frontend

**Frontend** (`public/` folder):
- Vanilla HTML/CSS/JavaScript
- `api.js` - Centralized API client library
- RESTful calls to backend

## 🔐 Security Notes

1. **Never commit `.env`** - It's in `.gitignore`
2. **Use strong JWT_SECRET** in production
3. **Validate all inputs** on both frontend and backend
4. **HTTPS enabled** automatically on Render
5. **Password hashing** with bcryptjs

## 🐛 Troubleshooting

### Connection Refused
- Check MongoDB connection string in `.env`
- Verify IP whitelist in MongoDB Atlas (allow 0.0.0.0/0 for Render)

### Port Already in Use
```bash
# Use different port
PORT=5001 npm run dev
```

### Environment Variables Not Loading
- Double-check `.env` file exists in project root
- Make sure variables are set in Render dashboard

### CORS Errors
- Verify origin is allowed in server CORS configuration
- Check frontend API calls use correct base URL

## 📚 Learning Resources

- Express.js Documentation: https://expressjs.com
- MongoDB/Mongoose: https://mongoosejs.com
- Render Deployment: https://docs.render.com
- REST API Best Practices: https://restfulapi.net

## 🤝 Next Steps

1. **Add more features**: Payment integration, reviews, wishlist
2. **Improve UI**: Add animations, polish design
3. **Add tests**: Unit and integration tests
4. **Analytics**: Track user behavior
5. **SEO**: Optimize for search engines

## 💬 Support

For issues:
1. Check this guide
2. Review server logs in Render
3. Check browser console for frontend errors
4. Verify MongoDB connection

Happy coding! 📚
