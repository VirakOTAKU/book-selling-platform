# Book Selling Platform

A professional book selling marketplace built with Node.js, Express, MongoDB, and a modern frontend.

## Features

- User authentication (registration, login, logout)
- Book catalog with categories
- Search functionality
- User profiles
- Responsive design
- RESTful API backend
- MongoDB database integration

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Additional**: bcryptjs for password hashing, CORS for cross-origin requests

## Installation

### Prerequisites

- Node.js 18.x or higher
- MongoDB Atlas account (free tier available)
- npm or yarn

### Setup

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd book-selling-platform
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`)
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB connection string and JWT secret
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/book-selling
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

6. Server runs on `http://localhost:5000`

## Deployment on Render

### Steps

1. Push your repository to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect your GitHub repository
5. Configure environment:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables from `.env.example`
6. Deploy!

For MongoDB:
- Use MongoDB Atlas (free tier at https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Add it to your Render environment variables

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get single book
- `GET /api/books/category/:category` - Get books by category
- `GET /api/books/search?q=query` - Search books
- `POST /api/books` - Add new book (admin)
- `PUT /api/books/:id` - Update book (admin)
- `DELETE /api/books/:id` - Delete book (admin)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## Project Structure

```
book-selling-platform/
├── server/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Custom middleware
│   ├── index.js         # Main server file
│   └── config.js        # Configuration
├── public/              # Frontend files (HTML, CSS, JS)
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore file
├── package.json         # Dependencies
└── README.md            # This file
```

## Development

For development with auto-reload:
```bash
npm run dev
```

## Security

- Passwords are hashed using bcryptjs
- JWT for secure authentication
- CORS enabled for safe API access
- Validate all user inputs
- Never commit `.env` files to version control

## License

ISC

## Support

For issues or questions, please create an issue in the repository.
